'use server';

import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return { success: false, error: 'Invalid input' };
  }

  try {
    // Prisma automatically uses parameterized queries, preventing SQL injection
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      // Return generic error to prevent username enumeration
      return { success: false, error: 'Invalid username or password' };
    }

    const isValid = await argon2.verify(admin.passwordHash, password);

    if (!isValid) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });
    
    // Create an audit log
    await prisma.auditLog.create({
      data: {
        adminId: admin.id,
        action: 'LOGIN_SUCCESS'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An internal error occurred' };
  }

  // Redirect must be called outside try-catch
  redirect('/admin/dashboard');
}
