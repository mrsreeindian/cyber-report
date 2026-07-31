import type { Metadata } from 'next';
import './globals.css';
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
          <header className="header">
            <a href="/" className="logo">
              <HeartHandshake size={24} color="var(--primary)" />
              Behind The Smiles
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <a href="/report" className="btn btn-primary">
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
