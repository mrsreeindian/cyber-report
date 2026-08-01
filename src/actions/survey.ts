'use server';

import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

export async function submitSurvey(answers: Record<string, string | string[]>) {
  try {
    const cookieStore = await cookies();
    
    // Check if user already submitted
    if (cookieStore.get('survey_submitted')) {
      return { success: false, error: 'You have already submitted this survey.' };
    }

    // Generate tracking code
    const trackingCode = randomBytes(6).toString('hex').toUpperCase().match(/.{1,4}/g)?.join('-') || 'SURV';
    
    await prisma.surveyResponse.create({
      data: {
        trackingCode,
        answers: answers
      }
    });

    // Set cookie to prevent multiple submissions (1 year expiry)
    cookieStore.set('survey_submitted', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365 
    });

    return { success: true, trackingCode };
  } catch (error) {
    console.error('Failed to submit survey:', error);
    return { success: false, error: 'Failed to submit survey. Please try again later.' };
  }
}
