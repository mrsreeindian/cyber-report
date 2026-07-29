'use client';

import { FileText, Search, Shield, Filter, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, sugham.</p>
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
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>24</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Reports</div>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(251, 191, 36, 0.1)', color: 'var(--warning)', borderRadius: 'var(--radius-lg)' }}>
            <Search size={24} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 700 }}>5</div>
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
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="form-group" style={{ marginBottom: 0, width: '300px' }}>
            <input type="text" className="form-input" placeholder="Search by Tracking Code..." style={{ padding: '0.5rem 1rem' }} />
          </div>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <Filter size={16} /> Filter
          </button>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
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
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--primary)' }}>X9K2-M4P7-V8R3</td>
              <td style={{ padding: '1rem 1.5rem' }}>Security Vulnerability</td>
              <td style={{ padding: '1rem 1.5rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(251, 191, 36, 0.1)', color: 'var(--warning)' }}>Pending</span>
              </td>
              <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>Just now</td>
              <td style={{ padding: '1rem 1.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>Review</button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', color: 'var(--primary)' }}>B2N5-L9Q1-C7X4</td>
              <td style={{ padding: '1rem 1.5rem' }}>Harassment</td>
              <td style={{ padding: '1rem 1.5rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', background: 'rgba(52, 211, 153, 0.1)', color: 'var(--success)' }}>Resolved</span>
              </td>
              <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>2 days ago</td>
              <td style={{ padding: '1rem 1.5rem' }}>
                <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
