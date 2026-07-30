import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Monitor, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import ReportStatusController from './ReportStatusController';

export const dynamic = 'force-dynamic';

export default async function ReportDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const report = await prisma.report.findUnique({
    where: { id: resolvedParams.id },
    include: { attachments: true }
  });

  if (!report) {
    notFound();
  }


  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="dashboard-header">
        <div>
          <Link href="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldAlert color="var(--primary)" /> Report Details
          </h1>
        </div>
        
        <ReportStatusController reportId={report.id} initialStatus={report.status} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tag size={16} /> Category
          </h3>
          <p style={{ fontSize: '1.125rem', fontWeight: 500, textTransform: 'capitalize' }}>{report.category}</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Monitor size={16} /> Platform
          </h3>
          <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>{report.platform}</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} /> Submitted On
          </h3>
          <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>
            {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Tracking Code</h3>
        <div className="tracking-code-box" style={{ margin: '0 0 2rem 0', fontSize: '1.25rem', padding: '1rem' }}>
          {report.trackingCode}
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Description</h3>
        <div style={{ 
          background: 'rgba(255,255,255,0.7)', 
          padding: '1.5rem', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.6'
        }}>
          {report.description}
        </div>
      </div>

      {report.attachments.length > 0 && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ImageIcon size={20} /> Attachments
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {report.attachments.map((attachment) => (
              <div key={attachment.id} style={{ 
                borderRadius: 'var(--radius-md)', 
                overflow: 'hidden', 
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.7)',
                padding: '0.5rem'
              }}>
                <a href={attachment.blobUrl} target="_blank" rel="noreferrer" style={{ display: 'block' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={attachment.blobUrl} 
                    alt="Report Evidence" 
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)', objectFit: 'contain', maxHeight: '300px' }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
