'use server';

import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { headers } from 'next/headers';

export async function createReport(data: { category: string, platform: string, description: string, evidence?: string | null, turnstileToken?: string }) {
  try {
    if (!data || typeof data.category !== 'string' || typeof data.platform !== 'string' || typeof data.description !== 'string') {
      return { success: false, error: 'Invalid or missing required fields' };
    }
    if (!data.category.trim() || !data.platform.trim() || !data.description.trim()) {
      return { success: false, error: 'Fields cannot be empty' };
    }

    if (!data.turnstileToken) {
      return { success: false, error: 'CAPTCHA verification missing' };
    }

    const reqHeaders = await headers();
    const ip = reqHeaders.get('x-forwarded-for') || '';
    
    const turnstileFormData = new URLSearchParams();
    turnstileFormData.append('secret', process.env.TURNSTILE_SECRET || '');
    turnstileFormData.append('response', data.turnstileToken);
    turnstileFormData.append('remoteip', ip);

    let turnstileResult;
    try {
      const siteverify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: turnstileFormData.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if (!siteverify.ok) {
        const text = await siteverify.text();
        console.error('Turnstile verification non-200 response:', siteverify.status, text);
        throw new Error(`siteverify ${siteverify.status}`);
      }
      turnstileResult = await siteverify.json();
    } catch (err) {
      console.error('Turnstile network/parsing error:', err);
      return { success: false, error: 'CAPTCHA verification failed (network error)' };
    }

    if (!turnstileResult.success) {
      return { success: false, error: 'CAPTCHA verification failed' };
    }

    // Generate a random tracking code in the format XXXX-XXXX-XXXX
    const trackingCode = randomBytes(6).toString('hex').toUpperCase().match(/.{1,4}/g)?.join('-') || 'ERRR';
    
    const report = await prisma.report.create({
      data: {
        trackingCode,
        category: data.category,
        platform: data.platform,
        description: data.description, // Encrypted at rest in production
        status: 'pending'
      }
    });

    if (data.evidence) {
      const match = data.evidence.match(/^data:([^;]+);/);
      const fileType = match ? match[1] : 'application/octet-stream';
      
      await prisma.attachment.create({
        data: {
          reportId: report.id,
          blobUrl: data.evidence,
          fileType
        }
      });
    }

    return { success: true, trackingCode };
  } catch (error) {
    console.error('Failed to create report:', error);
    return { success: false, error: 'Failed to submit report. Please try again later.' };
  }
}
