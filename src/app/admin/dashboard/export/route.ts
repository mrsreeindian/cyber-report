import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/encryption';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';

    const reports = await prisma.report.findMany({
      where: q ? {
        OR: [
          { trackingCode: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
          { platform: { contains: q, mode: 'insensitive' } },
          { status: { contains: q, mode: 'insensitive' } }
        ]
      } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { attachments: true }
    });

    const headers = ['Tracking Code', 'Category', 'Platform', 'Status', 'Submission Date', 'Description', 'Attachments (Base64 URIs)'];
    
    const escapeCsv = (str: string) => {
      if (!str) return '';
      const stringified = String(str);
      // CSV escaping rules: if string contains comma, newline, or double quote, wrap in double quotes. 
      // Also, escape internal double quotes by doubling them ("").
      if (stringified.includes(',') || stringified.includes('"') || stringified.includes('\n') || stringified.includes('\r')) {
        return `"${stringified.replace(/"/g, '""')}"`;
      }
      return stringified;
    };

    const rows = reports.map(report => {
      // In this app attachments are stored as Base64 Data URIs which can be quite long.
      const attachmentLinks = report.attachments.map(a => a.blobUrl).join(' ; ');
      
      return [
        escapeCsv(report.trackingCode),
        escapeCsv(report.category),
        escapeCsv(report.platform),
        escapeCsv(report.status),
        escapeCsv(new Date(report.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })),
        escapeCsv(decrypt(report.description)),
        escapeCsv(attachmentLinks)
      ].join(',');
    });

    // Add BOM for Excel UTF-8 support
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="behind_the_smiles_reports_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
  }
}
