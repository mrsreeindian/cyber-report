'use client';

import { useOptimistic, useTransition } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { updateReportStatus } from '@/actions/admin';

type ReportStatusControllerProps = {
  reportId: string;
  initialStatus: string;
};

export default function ReportStatusController({ reportId, initialStatus }: ReportStatusControllerProps) {
  const [optimisticStatus, addOptimisticStatus] = useOptimistic(
    initialStatus,
    (state: string, newStatus: string) => newStatus
  );
  
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      addOptimisticStatus(newStatus);
      await updateReportStatus(reportId, newStatus);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
      <span style={{ 
        padding: '0.5rem 1rem', 
        borderRadius: '999px', 
        fontSize: '0.875rem', 
        fontWeight: 600,
        background: optimisticStatus === 'pending' || optimisticStatus === 'standby' ? 'rgba(251, 191, 36, 0.1)' : optimisticStatus === 'rejected' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
        color: optimisticStatus === 'pending' || optimisticStatus === 'standby' ? 'var(--warning)' : optimisticStatus === 'rejected' ? 'var(--danger)' : 'var(--success)',
        display: 'flex', alignItems: 'center'
      }}>
        Status: {optimisticStatus.charAt(0).toUpperCase() + optimisticStatus.slice(1)}
        {isPending && <span style={{ marginLeft: '0.5rem', opacity: 0.7, fontSize: '0.75rem' }}>(Updating...)</span>}
      </span>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => handleStatusChange('approved')} 
          disabled={isPending || optimisticStatus === 'approved'}
          className="btn btn-secondary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--success)', opacity: optimisticStatus === 'approved' ? 0.5 : 1 }}
        >
          <Check size={16} /> Approve
        </button>
        
        <button 
          onClick={() => handleStatusChange('standby')} 
          disabled={isPending || optimisticStatus === 'standby'}
          className="btn btn-secondary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--warning)', opacity: optimisticStatus === 'standby' ? 0.5 : 1 }}
        >
          <Clock size={16} /> Standby
        </button>
        
        <button 
          onClick={() => handleStatusChange('rejected')} 
          disabled={isPending || optimisticStatus === 'rejected'}
          className="btn btn-secondary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--danger)', opacity: optimisticStatus === 'rejected' ? 0.5 : 1 }}
        >
          <X size={16} /> Reject
        </button>
      </div>
    </div>
  );
}
