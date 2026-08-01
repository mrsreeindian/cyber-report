import { Shield, Lock, EyeOff, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
export default function Home() {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', padding: '6rem 0 4rem', display: 'flex', justifyContent: 'flex-start' }}>
        <div className="hero-section animate-fade-in" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', width: '100%', padding: '0 2rem' }}>
          
          <div className="hero-badge delay-100 animate-fade-in" style={{ opacity: 0, marginBottom: '2.5rem', letterSpacing: '0.15em', fontSize: '0.75rem', padding: '0.6rem 1.5rem', display: 'inline-block' }}>
            A Safe Space for Your Truth
          </div>
          
          <h1 className="hero-title delay-200 animate-fade-in" style={{ opacity: 0, maxWidth: '900px' }}>
            Speak freely.<br/>
            <span style={{ color: 'var(--primary)', fontStyle: 'italic', fontWeight: 400 }}>We're listening.</span>
          </h1>
          
          <div className="delay-300 animate-fade-in" style={{ opacity: 0, marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-start', paddingLeft: '2rem', borderLeft: '2px solid var(--primary)' }}>
            <p className="hero-subtitle" style={{ margin: 0, fontSize: '1.05rem' }}>
              It takes courage to step forward. This platform was built by people who care, specifically to protect you. No tracking. No footprints. Just your voice.
            </p>
          </div>

          <div className="delay-400 animate-fade-in" style={{ opacity: 0, marginTop: '4rem', display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <Link href="/report" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
              Submit Anonymous Report
            </Link>
            <div className="human-quote" style={{ margin: 0, fontSize: '1.5rem', transform: 'rotate(-4deg) translateY(-8px)', opacity: 0.8 }}>
              "We've got your back."
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          
          {/* Card 1 */}
          <div className="feature-card delay-100 animate-fade-in" style={{ opacity: 0, transform: 'translateY(20px)', padding: '3.5rem 3rem' }}>
            <div className="feature-icon" style={{ margin: '0 0 2rem 0', background: 'transparent', padding: 0, color: 'var(--primary)' }}>
              <EyeOff size={36} strokeWidth={1.5} />
            </div>
            <h3 className="feature-title" style={{ fontSize: '1.75rem', fontFamily: 'Playfair Display, serif' }}>Privacy First</h3>
            <p className="feature-desc" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>We don't collect your IP address or track what device you're using. Any photos you share are scrubbed of hidden location data before they even leave your screen.</p>
          </div>
          
          {/* Card 2 - Staggered Down */}
          <div className="feature-card delay-200 animate-fade-in" style={{ opacity: 0, transform: 'translateY(40px)', padding: '3.5rem 3rem' }}>
            <div className="feature-icon" style={{ margin: '0 0 2rem 0', background: 'transparent', padding: 0, color: 'var(--primary)' }}>
              <Lock size={36} strokeWidth={1.5} />
            </div>
            <h3 className="feature-title" style={{ fontSize: '1.75rem', fontFamily: 'Playfair Display, serif' }}>Secure Storage</h3>
            <p className="feature-desc" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>Your report is turned into unreadable code the moment it hits our servers. It's locked safely in our database, and only our dedicated response team has the key to read it.</p>
          </div>
          
          {/* Card 3 - Staggered Up */}
          <div className="feature-card delay-300 animate-fade-in" style={{ opacity: 0, transform: 'translateY(0px)', padding: '3.5rem 3rem' }}>
            <div className="feature-icon" style={{ margin: '0 0 2rem 0', background: 'transparent', padding: 0, color: 'var(--primary)' }}>
              <HeartHandshake size={36} strokeWidth={1.5} />
            </div>
            <h3 className="feature-title" style={{ fontSize: '1.75rem', fontFamily: 'Playfair Display, serif' }}>A Safe Harbor</h3>
            <p className="feature-desc" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>We believe compassion is more important than code. This platform was built from the ground up to make sure you have a secure, judgment-free place to share your truth.</p>
          </div>

        </div>
      </div>
    </>
  );
}
