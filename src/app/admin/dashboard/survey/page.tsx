import { prisma } from '@/lib/prisma';
import SurveyCharts from '@/components/SurveyCharts';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SurveyAdminDashboard() {
  const responses = await prisma.surveyResponse.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div>
          <Link href="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BarChart3 size={32} color="var(--primary)" /> 
            Survey Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Visualizing {responses.length} total survey responses.</p>
        </div>
      </div>

      <SurveyCharts data={responses} />
      
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '4rem', marginBottom: '1.5rem' }}>Recent Responses</h2>
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr className="table-header-row" style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Tracking Code</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Familiarity (Q1)</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Experienced? (Q2)</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {responses.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No survey responses found.
                  </td>
                </tr>
              ) : (
                responses.slice(0, 20).map((resp) => {
                  const answers = resp.answers as Record<string, any>;
                  return (
                    <tr key={resp.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--primary)' }}>
                        {resp.trackingCode}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {answers?.q1 || '-'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {answers?.q2 || '-'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                        {new Date(resp.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
