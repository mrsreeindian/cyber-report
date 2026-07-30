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
    return { success: true };
  } catch (error) {
    console.error('Failed to update report status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}
