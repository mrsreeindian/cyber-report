'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateReportStatus(reportId: string, status: string) {
  try {
    await prisma.report.update({
      where: { id: reportId },
      data: { status }
    });
    revalidatePath(`/admin/dashboard/report/${reportId}`);
    revalidatePath(`/admin/dashboard`);
  } catch (error) {
    console.error('Failed to update report status:', error);
  }
}

export async function clearAllData() {
  try {
    await prisma.attachment.deleteMany();
    await prisma.auditLog.deleteMany();
    await prisma.report.deleteMany();
    await prisma.surveyResponse.deleteMany();
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/dashboard/survey');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to clear data:', error);
    return { success: false, error: 'Failed to clear database' };
  }
}
