'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';

import { setupAdminAccount, checkAdminExists } from '@/actions/auth';

export default function AdminSetup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [setupComplete, setSetupComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    // Check if admin already exists
    checkAdminExists().then((exists) => {
      if (exists) {
        router.push('/admin'); // Redirect to login if already setup
      } else {
        setIsChecking(false);
      }
    }).catch(() => setIsChecking(false));
  }, [router]);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const result = await setupAdminAccount(formData);
      if (result && result.success && result.otpauthUrl) {
        const url = await QRCode.toDataURL(result.otpauthUrl);
        setQrCodeDataUrl(url);
        setSetupComplete(true);
      } else {
        setError(result?.error || 'Setup failed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return <div style={{ textAlign: 'center', marginTop: '20vh', color: 'var(--text-secondary)' }}>Checking system status...</div>;
  }

  if (setupComplete) {
    return (
      <div className="card animate-fade-in" style={{ maxWidth: '500px', margin: '10vh auto 0', width: '100%', textAlign: 'center' }}>
        <CheckCircle2 size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Admin Account Created!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Your highly secure admin account has been provisioned. 
          <br /><br />
          <strong>CRITICAL:</strong> Scan the QR code below with your Authenticator App (Google Authenticator, Authy, Apple Passwords). You will need the 6-digit code to log in.
        </p>
        
        <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '2rem' }}>
          {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="2FA QR Code" width={200} height={200} />}
        </div>
        
        <button 
          onClick={() => router.push('/admin')} 
          className="btn btn-primary" 
          style={{ width: '100%' }}
        >
          Proceed to Login
        </button>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in" style={{ maxWidth: '450px', margin: '10vh auto 0', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ 
          width: '64px', height: '64px', 
          backgroundColor: 'rgba(91, 140, 112, 0.1)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <ShieldCheck size={32} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Initial Admin Setup</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>
          Create the master admin account. <br/>2FA will be automatically enforced.
        </p>
      </div>

      <form onSubmit={handleSetup}>
        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(248, 113, 113, 0.1)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid rgba(248, 113, 113, 0.3)', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Username</label>
          <input 
            type="text" 
            className="form-input" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            autoComplete="new-username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password (Min 8 chars)</label>
          <input 
            type="password"
            className="form-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            autoComplete="new-password"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '1.5rem' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Provisioning...' : 'Create Admin & Setup 2FA'}
        </button>
      </form>
    </div>
  );
}
