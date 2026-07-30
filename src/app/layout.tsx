import type { Metadata } from 'next';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Behind The Smiles',
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
    <html lang="en" className="dark">
      <body>
        <div className="app-container">
          <header className="header">
            <div className="logo">
              <div className="logo-dot"></div>
              Behind The Smiles
            </div>
            <nav style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeToggle />
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
