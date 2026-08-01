import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/encryption';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      include: { attachments: true }
    });

    const surveys = await prisma.surveyResponse.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const escapeCsv = (str: string) => {
      if (!str) return '';
      const stringified = String(str);
      if (stringified.includes(',') || stringified.includes('"') || stringified.includes('\n') || stringified.includes('\r')) {
        return `"${stringified.replace(/"/g, '""')}"`;
      }
      return stringified;
    };

    // 1. Build Reports Section
    const reportHeaders = ['Tracking Code', 'Category', 'Platform', 'Status', 'Submission Date', 'Description', 'Attachments (Base64 URIs)'];
    const reportRows = reports.map(report => {
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

    // 2. Build Surveys Section
    const surveyHeaders = [
      'Tracking Code', 
      'Submission Date', 
      'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q10_Other', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15'
    ];
    
    const surveyRows = surveys.map(survey => {
      const answers = survey.answers as Record<string, any> || {};
      const formatAnswer = (ans: any) => Array.isArray(ans) ? ans.join('; ') : (ans || '');
      
      return [
        escapeCsv(survey.trackingCode),
        escapeCsv(new Date(survey.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })),
        escapeCsv(formatAnswer(answers.q1)),
        escapeCsv(formatAnswer(answers.q2)),
        escapeCsv(formatAnswer(answers.q3)),
        escapeCsv(formatAnswer(answers.q4)),
        escapeCsv(formatAnswer(answers.q5)),
        escapeCsv(formatAnswer(answers.q6)),
        escapeCsv(formatAnswer(answers.q7)),
        escapeCsv(formatAnswer(answers.q8)),
        escapeCsv(formatAnswer(answers.q9)),
        escapeCsv(formatAnswer(answers.q10)),
        escapeCsv(formatAnswer(answers.q10_other)),
        escapeCsv(formatAnswer(answers.q11)),
        escapeCsv(formatAnswer(answers.q12)),
        escapeCsv(formatAnswer(answers.q13)),
        escapeCsv(formatAnswer(answers.q14)),
        escapeCsv(formatAnswer(answers.q15))
      ].join(',');
    });

    // Combine them with section titles
    let csvContent = '\uFEFF'; // Add BOM for Excel UTF-8 support
    
    csvContent += '--- INCIDENT REPORTS ---\n';
    csvContent += reportHeaders.join(',') + '\n';
    csvContent += reportRows.join('\n') + '\n\n\n';
    
    csvContent += '--- SURVEY RESPONSES ---\n';
    csvContent += surveyHeaders.join(',') + '\n';
    csvContent += surveyRows.join('\n') + '\n';

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="cyber_report_full_database_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export full database' }, { status: 500 });
  }
}
