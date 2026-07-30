import { Shield, Lock, EyeOff } from 'lucide-react';
import Link from 'next/link';
import NetworkCanvas from '@/components/NetworkCanvas';

export default function Home() {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', padding: '2rem 0' }}>
        <NetworkCanvas />
        <div className="hero-section animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge delay-100 animate-fade-in" style={{ opacity: 0 }}>
            End-to-End Encrypted • 100% Anonymous
          </div>
          
          <h1 className="hero-title delay-200 animate-fade-in" style={{ opacity: 0 }}>
            Speak up safely.<br/>We protect your identity.
          </h1>
          
          <p className="hero-subtitle delay-300 animate-fade-in" style={{ opacity: 0 }}>
            A highly secure, zero-knowledge platform designed for whistleblowers and those needing to report sensitive incidents without fear of exposure.
          </p>
          
          <div className="delay-300 animate-fade-in" style={{ opacity: 0, marginTop: '1rem' }}>
            <Link href="/report" className="btn btn-primary">
              Submit Anonymous Report
            </Link>
          </div>
        </div>
      </div>

      <div className="feature-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div className="feature-card">
          <div className="feature-icon">
            <EyeOff size={24} />
          </div>
          <h3 className="feature-title">Zero Metadata</h3>
          <p className="feature-desc">We strip all IP addresses, User-Agents, and file EXIF data. Your identity remains entirely unknown to us.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <Lock size={24} />
          </div>
          <h3 className="feature-title">Encrypted at Rest</h3>
          <p className="feature-desc">All report descriptions and sensitive fields are encrypted in our databases. We cannot read them without explicit access.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <Shield size={24} />
          </div>
          <h3 className="feature-title">Immutable Audit</h3>
          <p className="feature-desc">Our systems use strict Role-Based Access Control and maintain an immutable log of all administrative actions.</p>
        </div>
      </div>
    </>
  );
}
