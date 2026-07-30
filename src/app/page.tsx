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
            You're not alone.<br/>We're here to listen.
          </h1>
          
          <p className="hero-subtitle delay-300 animate-fade-in" style={{ opacity: 0 }}>
            We know it takes courage to speak up. This is a safe, zero-knowledge space for you to share your story without fear. We will protect your identity every step of the way.
          </p>

          <div className="human-quote delay-400 animate-fade-in" style={{ opacity: 0 }}>
            "Your secret is safe with us."
          </div>
          
          <div className="delay-500 animate-fade-in" style={{ opacity: 0, marginTop: '1.5rem' }}>
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
          <h3 className="feature-title">No Tracking, Ever</h3>
          <p className="feature-desc">We strip away all IP addresses, device info, and file metadata. To us, you're just a voice that deserves to be heard.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <Lock size={24} />
          </div>
          <h3 className="feature-title">Vault-Level Security</h3>
          <p className="feature-desc">Everything you share is locked down with encryption. Nobody can read your story without explicit authorization.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            <Shield size={24} />
          </div>
          <h3 className="feature-title">Honest & Transparent</h3>
          <p className="feature-desc">We hold ourselves accountable. Every administrative action is permanently logged so nothing is ever swept under the rug.</p>
        </div>
      </div>
    </>
  );
}
