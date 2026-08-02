import { FileText, Search, Shield, Filter, LogOut, Download, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import ClearDataButton from '@/components/ClearDataButton';

// Server component
export const dynamic = 'force-dynamic';

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';

  // Fetch database counts safely to prevent RAM explosion
  const whereClause: Prisma.ReportWhereInput | undefined = q ? {
    OR: [
      { trackingCode: { contains: q, mode: 'insensitive' } },
      { category: { contains: q, mode: 'insensitive' } },
      { platform: { contains: q, mode: 'insensitive' } },
      { status: { contains: q, mode: 'insensitive' } }
    ]
  } : undefined;

  const totalReports = await prisma.report.count({ where: whereClause });
  const pendingReports = await prisma.report.count({ 
    where: whereClause ? { AND: [whereClause, { status: 'pending' }] } : { status: 'pending' } 
  });

  // Fetch limited reports for the table view
  const reports = await prisma.report.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    take: 100 // Cap to prevent large payload bottlenecks
  });

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, admin.</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/admin/dashboard/survey" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            Survey Analytics
          </Link>
          <Link href="/admin/dashboard/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            <UserPlus size={16} /> Add Admin
          </Link>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/admin/dashboard/export-all" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: 'var(--success)' }}>
            <Download size={16} /> Export Database
          </a>
          <ClearDataButton />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(52, 211, 153, 0.1)', color: 'var(--success)', borderRadius: 'var(--radius-lg)' }}>
            <FileText size={24} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{totalReports}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Reports</div>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(251, 191, 36, 0.1)', color: 'var(--warning)', borderRadius: 'var(--radius-lg)' }}>
            <Search size={24} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{pendingReports}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending Review</div>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(155, 135, 245, 0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-lg)' }}>
            <Shield size={24} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>12</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Audit Logs</div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Recent Reports</h2>
      
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <form className="table-toolbar" action="/admin/dashboard" method="GET">
          <div className="form-group" style={{ marginBottom: 0, width: '300px' }}>
            <input 
              type="text" 
              name="q"
              defaultValue={q}
              className="form-input" 
              placeholder="Search by keyword, platform, tracking code..." 
              style={{ padding: '0.5rem 1rem' }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <Search size={16} /> Search
            </button>
            <a href={`/admin/dashboard/export${q ? `?q=${encodeURIComponent(q)}` : ''}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} /> Export to Excel
            </a>
          </div>
        </form>
        
        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr className="table-header-row" style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Tracking Code</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Category</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No reports found.
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--primary)' }}>
                    {report.trackingCode}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textTransform: 'capitalize' }}>
                    {report.category}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '999px', 
                      fontSize: '0.75rem', 
                      background: report.status === 'pending' || report.status === 'standby' ? 'rgba(251, 191, 36, 0.1)' : report.status === 'rejected' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
                      color: report.status === 'pending' || report.status === 'standby' ? 'var(--warning)' : report.status === 'rejected' ? 'var(--danger)' : 'var(--success)' 
                    }}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                    {new Date(report.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <Link href={`/admin/dashboard/report/${report.id}`} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                      Review
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
