'use server';

import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';

export async function createReport(data: { category: string, platform: string, description: string }) {
  try {
    if (!data || typeof data.category !== 'string' || typeof data.platform !== 'string' || typeof data.description !== 'string') {
      return { success: false, error: 'Invalid or missing required fields' };
    }
    if (!data.category.trim() || !data.platform.trim() || !data.description.trim()) {
      return { success: false, error: 'Fields cannot be empty' };
    }

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

    return { success: true, trackingCode };
  } catch (error) {
    console.error('Failed to create report:', error);
    return { success: false, error: 'Failed to submit report. Please try again later.' };
  }
}
