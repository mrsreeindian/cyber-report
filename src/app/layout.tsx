import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Secure Reporting Platform',
  description: 'An anonymous and secure platform for reporting incidents.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header className="header">
            <div className="logo">
              <div className="logo-dot"></div>
              WhisperSecure
            </div>
            <nav>
              <a href="/report" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                Make a Report
              </a>
            </nav>
          </header>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
