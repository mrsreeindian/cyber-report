'use client';

import { useState } from 'react';
import { ShieldCheck, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { loginAdmin } from '@/actions/auth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const result = await loginAdmin(formData);
      if (result && result.success) {
        router.push('/admin/dashboard');
      } else {
        setError(result?.error || 'Login failed');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card animate-fade-in" style={{ maxWidth: '450px', margin: '10vh auto 0', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ 
          width: '64px', height: '64px', 
          backgroundColor: 'rgba(155, 135, 245, 0.1)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <ShieldCheck size={32} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Admin Portal</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Authorized Personnel Only
        </p>
      </div>

      <form onSubmit={handleLogin}>
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
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              autoComplete="current-password"
              style={{ paddingRight: '3rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '0.5rem', marginBottom: '1rem' }}></div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Authenticating...' : (
            <>
              <LockKeyhole size={18} /> Secure Login
            </>
          )}
        </button>
      </form>
    </div>
  );
}
