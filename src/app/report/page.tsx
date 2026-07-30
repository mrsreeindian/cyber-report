'use client';

import { useState } from 'react';
import { ShieldAlert, Send } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { createReport } from '@/actions/report';

export default function ReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  
  const [formData, setFormData] = useState({
    category: '',
    platform: '',
    description: '',
    evidence: null as string | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File is too large. Max size is 10MB.');
        e.target.value = '';
        return;
      }
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              // Exporting to Data URL automatically strips EXIF metadata (making the claim factually correct)
              const dataUrl = canvas.toDataURL(file.type);
              setFormData({ ...formData, evidence: dataUrl });
            }
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData({ ...formData, evidence: event.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, evidence: null });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const turnstileToken = (document.querySelector('[name="cf-turnstile-response"]') as HTMLInputElement)?.value || '';
    
    try {
      const result = await createReport({ ...formData, turnstileToken });
      if (result.success && result.trackingCode) {
        setTrackingCode(result.trackingCode);
        setIsSuccess(true);
      } else {
        throw new Error(result.error || 'Failed to submit report');
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while submitting your report. Please try again.';
      alert(errorMessage);
      // Reset Turnstile on failure
      if ((window as any).turnstile) {
        (window as any).turnstile.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '4rem 3rem', maxWidth: '800px', margin: '4rem auto' }}>
        <div className="success-icon" style={{ width: '100px', height: '100px', margin: '0 auto 2.5rem' }}>
          <ShieldAlert size={48} />
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--success)', letterSpacing: '-0.03em' }}>Your Voice Was Heard</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          We have securely encrypted and safely stored your truth. Please copy and save your unique tracking code below. 
          This is the <strong>only</strong> key to check the status or follow up.
        </p>
        
        <div className="tracking-code-box" style={{ fontSize: '2rem', padding: '2rem' }}>
          {trackingCode}
        </div>
        
        <p style={{ color: 'var(--danger)', fontSize: '1rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem auto', opacity: 0.8 }}>
          <em>Note: We do not know who you are. If you lose this code, we cannot recover it.</em>
        </p>
        
        <Link href="/" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Return to Safety
        </Link>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in" style={{ maxWidth: '850px', margin: '3rem auto', padding: '4rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', textAlign: 'center' }}>
        <div className="hero-badge delay-100 animate-fade-in" style={{ marginBottom: '1.5rem', letterSpacing: '0.15em', fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
          We're Here For You
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Share Your Truth</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Take a deep breath. You are completely safe here. We don't log IPs or device details. Please share as much as you're comfortable with.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-select" 
            required 
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="" disabled>Select category</option>
            <option value="harassment">Harassment</option>
            <option value="fraud">Fraud / Embezzlement</option>
            <option value="security">Security Vulnerability</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Platform / Location</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. Discord, Internal Network, etc." 
            required 
            value={formData.platform}
            onChange={(e) => setFormData({...formData, platform: e.target.value})}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '2.5rem' }}>
          <label className="form-label" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>What happened?</label>
          <textarea 
            className="form-textarea" 
            placeholder="Please take your time and describe the incident in detail..."
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={{ minHeight: '200px', fontSize: '1.1rem', lineHeight: '1.6' }}
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Evidence (Optional)</label>
          <input type="file" className="form-input" style={{ padding: '0.5rem' }} accept="image/*" onChange={handleFileChange} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Max 10MB. We will automatically strip EXIF metadata from images.
          </span>
        </div>
        
        <div className="form-group" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey="0x4AAAAAAECGAVwIvGYojfWi" data-action="turnstile-spin-v2"></div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.15rem', marginTop: '1rem' }}
          disabled={isSubmitting || !formData.category || !formData.platform || !formData.description}
        >
          {isSubmitting ? 'Encrypting & Safely Submitting...' : (
            <>
              Submit Securely <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
