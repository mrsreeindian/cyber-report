'use server';

import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { authenticator } from 'otplib';

export async function loginAdmin(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return { success: false, error: 'Invalid input' };
  }

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return { success: false, error: 'Invalid input' };
  }

  try {
    let admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return { success: false, error: 'Invalid username or password' };
    }

    const isValid = await argon2.verify(admin.passwordHash, password);

    if (!isValid) {
      return { success: false, error: 'Invalid username or password' };
    }

    // Verify 2FA code if MFA is enabled
    if (admin.mfaSecret) {
      const totpCode = formData.get('totpCode');
      if (!totpCode || typeof totpCode !== 'string') {
        return { success: false, error: '2FA code required' };
      }
      
      const isMfaValid = authenticator.verify({
        token: totpCode.trim(),
        secret: admin.mfaSecret
      });
      
      if (!isMfaValid) {
        return { success: false, error: 'Invalid 2FA code' };
      }
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

  return { success: true };
}

export async function checkAdminExists() {
  const count = await prisma.admin.count();
  return count > 0;
}

export async function setupAdminAccount(formData: FormData) {
  const count = await prisma.admin.count();
  if (count > 0) {
    return { success: false, error: 'An admin account already exists. Setup is locked.' };
  }

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password || username.length < 3 || password.length < 8) {
    return { success: false, error: 'Invalid username or password (password must be at least 8 chars)' };
  }

  try {
    const mfaSecret = authenticator.generateSecret();
    const hashedPassword = await argon2.hash(password);

    await prisma.admin.create({
      data: {
        username,
        passwordHash: hashedPassword,
        mfaSecret,
        role: 'superadmin'
      }
    });

    const otpauthUrl = authenticator.keyuri(username, 'Behind The Smiles (Admin)', mfaSecret);
    return { success: true, otpauthUrl };
  } catch (error) {
    console.error('Setup error:', error);
    return { success: false, error: 'An error occurred during setup' };
  }
}
