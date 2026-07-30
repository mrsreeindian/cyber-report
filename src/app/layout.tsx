import type { Metadata } from 'next';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import { HeartHandshake } from 'lucide-react';

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
          <header className="header" style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 3rem' }}>
            <a href="/" className="logo" style={{ position: 'relative', left: '0', transform: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <HeartHandshake size={24} color="var(--primary)" />
              Behind The Smiles
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <ThemeToggle />
              <a href="/report" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
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
