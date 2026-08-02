'use client';

import { useState } from 'react';
import { UserPlus, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'qrcode';

import { registerAdminAccount } from '@/actions/auth';

export default function RegisterAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [setupComplete, setSetupComplete] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
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
      const result = await registerAdminAccount(formData);
      if (result && result.success && result.otpauthUrl) {
        const url = await QRCode.toDataURL(result.otpauthUrl);
        setQrCodeDataUrl(url);
        setSetupComplete(true);
      } else {
        setError(result?.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (setupComplete) {
    return (
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Link href="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <CheckCircle2 size={64} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Admin Account Created!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            A new administrative account has been provisioned. 
            <br /><br />
            <strong>CRITICAL:</strong> Have the new administrator scan this QR code with their Authenticator App before they leave this page. They will need the 6-digit code to log in.
          </p>
          
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '2rem' }}>
            {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="2FA QR Code" width={200} height={200} />}
          </div>
          
          <button 
            onClick={() => router.push('/admin/dashboard')} 
            className="btn btn-primary" 
            style={{ width: '100%' }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', textDecoration: 'none' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <div className="card" style={{ maxWidth: '450px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '64px', height: '64px', 
            backgroundColor: 'rgba(91, 140, 112, 0.1)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <UserPlus size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Register New Admin</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>
            Provision a new administrator account. <br/>2FA will be enforced automatically.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          {error && (
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(248, 113, 113, 0.1)', color: 'var(--danger)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid rgba(248, 113, 113, 0.3)', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">New Username</label>
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
            <label className="form-label">Temporary Password (Min 8 chars)</label>
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
    </div>
  );
}
