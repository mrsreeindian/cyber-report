import { Shield, Lock, EyeOff, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import NetworkCanvas from '@/components/NetworkCanvas';

export default function Home() {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', padding: '6rem 0 8rem 0', display: 'flex', justifyContent: 'center' }}>
        <NetworkCanvas />
        <div className="hero-section animate-fade-in" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', padding: '0 2rem' }}>
          
          <div className="hero-badge delay-100 animate-fade-in" style={{ opacity: 0, alignSelf: 'flex-start', marginBottom: '2rem', letterSpacing: '0.15em', fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
            A Safe Space for Your Truth
          </div>
          
          <h1 className="hero-title delay-200 animate-fade-in" style={{ opacity: 0, fontSize: '5.5rem', lineHeight: '1.05', letterSpacing: '-0.05em', maxWidth: '800px' }}>
            Speak freely.<br/>We're listening.
          </h1>
          
          <div className="delay-300 animate-fade-in" style={{ opacity: 0, marginTop: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center', borderLeft: '4px solid var(--primary)', paddingLeft: '1.75rem', marginLeft: '0.5rem' }}>
            <p className="hero-subtitle" style={{ margin: 0, fontSize: '1.35rem', maxWidth: '600px', textAlign: 'left', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              It takes courage to step forward. This platform was built by people who care, specifically to protect you. No tracking. No footprints. Just your voice.
            </p>
          </div>

          <div className="delay-400 animate-fade-in" style={{ opacity: 0, marginTop: '3.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/report" className="btn btn-primary" style={{ padding: '1.1rem 2.75rem', fontSize: '1.15rem' }}>
              Submit Anonymous Report
            </Link>
            <div className="human-quote" style={{ margin: 0, fontSize: '2.25rem', transform: 'rotate(-4deg) translateY(-8px)' }}>
              "We've got your back."
            </div>
          </div>
        </div>
      </div>

      <div className="feature-grid" style={{ position: 'relative', zIndex: 1, marginTop: '2rem', padding: '0 2rem', maxWidth: '1100px' }}>
        <div className="feature-card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '3rem 2.5rem' }}>
          <div className="feature-icon" style={{ margin: '0 0 1.75rem 0' }}>
            <EyeOff size={28} />
          </div>
          <h3 className="feature-title">Completely Invisible</h3>
          <p className="feature-desc">We strip away all IP addresses, device signatures, and file metadata before anything is saved. To our servers, you are simply a ghost.</p>
        </div>
        
        <div className="feature-card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '3rem 2.5rem' }}>
          <div className="feature-icon" style={{ margin: '0 0 1.75rem 0' }}>
            <Lock size={28} />
          </div>
          <h3 className="feature-title">Locked Tight</h3>
          <p className="feature-desc">We scramble your words the second you hit send. It's locked away so securely that nobody—not even the people who built this site—can peek at your story.</p>
        </div>
        
        <div className="feature-card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '3rem 2.5rem' }}>
          <div className="feature-icon" style={{ margin: '0 0 1.75rem 0' }}>
            <HeartHandshake size={28} />
          </div>
          <h3 className="feature-title">Built with Empathy</h3>
          <p className="feature-desc">Technology is just a tool; compassion is our foundation. Every line of code here was written to ensure you have a safe harbor.</p>
        </div>
      </div>
    </>
  );
}
