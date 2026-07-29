'use client';

import { useState } from 'react';
import { ShieldCheck, LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, you would call an API here that hashes the password
    // and compares it against the database, then returns a secure HTTP-only cookie.
    
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulating a successful login redirect
      router.push('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="card animate-fade-in" style={{ maxWidth: '450px', marginTop: '10vh' }}>
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
          <input 
            type="password" 
            className="form-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            autoComplete="current-password"
          />
        </div>

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
