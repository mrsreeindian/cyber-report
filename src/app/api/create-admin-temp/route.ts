import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as argon2 from 'argon2';
import { generateSecret, generateURI } from 'otplib';

export async function GET() {
  const username = '6769420';
  const password = 'ajpfan69';
  
  const mfaSecret = generateSecret();
  const hashedPassword = await argon2.hash(password);

  await prisma.admin.create({
    data: {
      username,
      passwordHash: hashedPassword,
      mfaSecret,
      role: 'admin'
    }
  });

  const otpauthUrl = generateURI({
    issuer: 'Behind The Smiles (Admin)',
    label: username,
    secret: mfaSecret
  });
  
  return NextResponse.json({ success: true, mfaSecret, otpauthUrl });
}
