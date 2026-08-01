import { prisma } from '@/lib/prisma';
import SurveyCharts from '@/components/SurveyCharts';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SurveyAdminDashboard() {
  const responses = await prisma.surveyResponse.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Aggregate data for Question 1 (Familiarity)
  const q1Counts = responses.reduce((acc: any, curr) => {
    const ans = (curr.answers as Record<string, any>)?.q1 || 'Unanswered';
    acc[ans] = (acc[ans] || 0) + 1;
    return acc;
  }, {});
  const q1ChartData = Object.entries(q1Counts).map(([name, value]) => ({ name: String(name), value: Number(value) }));

  // Aggregate data for Question 2 (Experienced)
  const q2Counts = responses.reduce((acc: any, curr) => {
    const ans = (curr.answers as Record<string, any>)?.q2 || 'Unanswered';
    acc[ans] = (acc[ans] || 0) + 1;
    return acc;
  }, {});
  const q2ChartData = Object.entries(q2Counts).map(([name, value]) => ({ name: String(name), value: Number(value) }));

  // Aggregate data for Question 5 (What can be considered cyberbullying)
  const q5Counts = responses.reduce((acc: any, curr) => {
    const ansArray = (curr.answers as Record<string, any>)?.q5 || [];
    if (Array.isArray(ansArray)) {
      ansArray.forEach(ans => {
        acc[ans] = (acc[ans] || 0) + 1;
      });
    }
    return acc;
  }, {});
  const q5ChartData = Object.entries(q5Counts)
    .map(([name, value]) => ({ name: String(name), value: Number(value) }))
    .sort((a, b) => b.value - a.value);

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

      <SurveyCharts 
        q1ChartData={q1ChartData} 
        q2ChartData={q2ChartData} 
        q5ChartData={q5ChartData} 
        totalResponses={responses.length} 
      />
      
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
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {responses.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
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
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <Link href={`/admin/dashboard/survey/${resp.id}`} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                          Review
                        </Link>
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
