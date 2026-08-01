'use client';

import { useState } from 'react';
import { clearAllData } from '@/actions/admin';
import { Trash2 } from 'lucide-react';

export default function ClearDataButton() {
  const [isClearing, setIsClearing] = useState(false);

  const handleClear = async () => {
    if (confirm('Are you sure you want to completely clear the database? This action cannot be undone.')) {
      setIsClearing(true);
      await clearAllData();
      setIsClearing(false);
    }
  };

  return (
    <button 
      onClick={handleClear} 
      disabled={isClearing}
      className="btn btn-secondary" 
      style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}
    >
      <Trash2 size={16} /> {isClearing ? 'Clearing...' : 'Clear Database'}
    </button>
  );
}
