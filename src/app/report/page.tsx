'use client';

import { useState } from 'react';
import { ShieldAlert, Send } from 'lucide-react';
import Link from 'next/link';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="card animate-fade-in" style={{ textAlign: 'center' }}>
        <div className="success-icon">
          <ShieldAlert size={40} />
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--success)' }}>Report Submitted Securely</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your report has been encrypted and securely stored. Please save your tracking code. 
          This is the <strong>ONLY</strong> way to check the status or add information later.
        </p>
        
        <div className="tracking-code-box">
          X9K2-M4P7-V8R3-L5T1
        </div>
        
        <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginBottom: '2rem' }}>
          Warning: If you lose this code, we cannot recover it. We do not know who you are.
        </p>
        
        <Link href="/" className="btn btn-secondary">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <ShieldAlert color="var(--primary)" size={28} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Anonymous Report</h2>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
        This connection is secure. We do not log your IP address. Please provide as much detail as possible.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-select" required defaultValue="">
            <option value="" disabled>Select category</option>
            <option value="harassment">Harassment</option>
            <option value="fraud">Fraud / Embezzlement</option>
            <option value="security">Security Vulnerability</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Platform / Location</label>
          <input type="text" className="form-input" placeholder="e.g. Discord, Internal Network, etc." required />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea 
            className="form-textarea" 
            placeholder="Please describe the incident in detail..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Evidence (Optional)</label>
          <input type="file" className="form-input" style={{ padding: '0.5rem' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Max 10MB. We will automatically strip EXIF metadata from images.
          </span>
        </div>
        
        <div className="form-group" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
           <Turnstile siteKey="1x00000000000000000000AA" />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Encrypting & Submitting...' : (
            <>
              Submit Securely <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
