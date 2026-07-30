import { FileText, Search, Shield, Filter, LogOut } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Server component
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch real reports from the database
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, admin.</p>
        </div>
        
        <Link href="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          <LogOut size={16} /> Logout
        </Link>
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
        <div className="table-toolbar">
          <div className="form-group" style={{ marginBottom: 0, width: '300px' }}>
            <input type="text" className="form-input" placeholder="Search by Tracking Code..." style={{ padding: '0.5rem 1rem' }} />
          </div>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <Filter size={16} /> Filter
          </button>
        </div>
        
        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border)' }}>
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
                      background: report.status === 'pending' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
                      color: report.status === 'pending' ? 'var(--warning)' : 'var(--success)' 
                    }}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                      Review
                    </button>
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
