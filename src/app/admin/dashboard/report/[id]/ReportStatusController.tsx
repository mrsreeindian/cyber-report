'use client';

import { useState, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { updateReportStatus } from '@/actions/admin';

type ReportStatusControllerProps = {
  reportId: string;
  initialStatus: string;
};

export default function ReportStatusController({ reportId, initialStatus }: ReportStatusControllerProps) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setCurrentStatus(initialStatus);
  }, [initialStatus]);

  const handleStatusChange = async (newStatus: string) => {
    setIsPending(true);
    setCurrentStatus(newStatus);
    try {
      await updateReportStatus(reportId, newStatus);
    } catch (e) {
      setCurrentStatus(initialStatus);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mobile-flex-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', width: '100%' }}>
      <span style={{ 
        padding: '0.5rem 1rem', 
        borderRadius: '999px', 
        fontSize: '0.875rem', 
        fontWeight: 600,
        background: currentStatus === 'pending' || currentStatus === 'standby' ? 'rgba(251, 191, 36, 0.1)' : currentStatus === 'rejected' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
        color: currentStatus === 'pending' || currentStatus === 'standby' ? 'var(--warning)' : currentStatus === 'rejected' ? 'var(--danger)' : 'var(--success)',
        display: 'flex', alignItems: 'center',
        transition: 'all 0.1s ease-in-out'
      }}>
        Status: {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
        {isPending && <span style={{ marginLeft: '0.5rem', opacity: 0.7, fontSize: '0.75rem' }}>(Updating...)</span>}
      </span>
      
      <div className="mobile-wrap" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
        <button 
          onClick={() => handleStatusChange('approved')} 
          disabled={isPending || currentStatus === 'approved'}
          className="btn btn-secondary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--success)', opacity: currentStatus === 'approved' ? 0.5 : 1, transition: 'all 0.1s' }}
        >
          <Check size={16} /> Approve
        </button>
        
        <button 
          onClick={() => handleStatusChange('standby')} 
          disabled={isPending || currentStatus === 'standby'}
          className="btn btn-secondary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--warning)', opacity: currentStatus === 'standby' ? 0.5 : 1, transition: 'all 0.1s' }}
        >
          <Clock size={16} /> Standby
        </button>
        
        <button 
          onClick={() => handleStatusChange('rejected')} 
          disabled={isPending || currentStatus === 'rejected'}
          className="btn btn-secondary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--danger)', opacity: currentStatus === 'rejected' ? 0.5 : 1, transition: 'all 0.1s' }}
        >
          <X size={16} /> Reject
        </button>
      </div>
    </div>
  );
}
