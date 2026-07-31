import { Shield, Lock, EyeOff, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', padding: '6rem 0 4rem 0', display: 'flex', justifyContent: 'center' }}>
        <div className="hero-section animate-fade-in" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem' }}>
          
          <div className="hero-badge delay-100 animate-fade-in" style={{ opacity: 0, marginBottom: '2rem', letterSpacing: '0.15em', fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
            A Safe Space for Your Truth
          </div>
          
          <h1 className="hero-title delay-200 animate-fade-in" style={{ opacity: 0, fontSize: '4.5rem', lineHeight: '1.1', letterSpacing: '-0.04em', maxWidth: '800px' }}>
            Speak freely.<br/>We're listening.
          </h1>
          
          <div className="delay-300 animate-fade-in" style={{ opacity: 0, marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <p className="hero-subtitle" style={{ margin: 0, fontSize: '1.25rem', maxWidth: '700px', textAlign: 'center', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              It takes courage to step forward. This platform was built by people who care, specifically to protect you. No tracking. No footprints. Just your voice.
            </p>
          </div>

          <div className="delay-400 animate-fade-in" style={{ opacity: 0, marginTop: '3.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
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
          <h3 className="feature-title">Privacy First</h3>
          <p className="feature-desc">We don't collect your IP address or track what device you're using. Any photos you share are scrubbed of hidden location data before they even leave your screen.</p>
        </div>
        
        <div className="feature-card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '3rem 2.5rem' }}>
          <div className="feature-icon" style={{ margin: '0 0 1.75rem 0' }}>
            <Lock size={28} />
          </div>
          <h3 className="feature-title">Secure Storage</h3>
          <p className="feature-desc">Your report is turned into unreadable code the moment it hits our servers. It's locked safely in our database, and only our dedicated response team has the key to read it.</p>
        </div>
        
        <div className="feature-card" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '3rem 2.5rem' }}>
          <div className="feature-icon" style={{ margin: '0 0 1.75rem 0' }}>
            <HeartHandshake size={28} />
          </div>
          <h3 className="feature-title">A Safe Harbor</h3>
          <p className="feature-desc">We believe compassion is more important than code. This platform was built from the ground up to make sure you have a secure, judgment-free place to share your truth.</p>
        </div>
      </div>
    </>
  );
}
