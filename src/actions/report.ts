'use server';

import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

export async function createReport(data: { category: string, platform: string, description: string }) {
  // Generate a random tracking code in the format XXXX-XXXX-XXXX
  const trackingCode = randomBytes(6).toString('hex').toUpperCase().match(/.{1,4}/g)?.join('-') || 'ERRR';
  
  await prisma.report.create({
    data: {
      trackingCode,
      category: data.category,
      platform: data.platform,
      description: data.description, // Encrypted at rest in production
      status: 'pending'
    }
  });

  return { trackingCode };
}
