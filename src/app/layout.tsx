import type { Metadata } from 'next';
import './globals.css';
import { HeartHandshake } from 'lucide-react';
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
          <aside className="sidebar">
            <a href="/" className="logo">
              <HeartHandshake size={24} color="var(--primary)" />
              Behind The Smiles
            </a>
            
            <nav className="sidebar-nav">
              <a href="/" className="sidebar-link">
                <span style={{ fontSize: '1.05rem' }}>Home</span>
              </a>
              <a href="/report" className="sidebar-link">
                <span style={{ fontSize: '1.05rem' }}>Submit Report</span>
              </a>
              <a href="/admin" className="sidebar-link">
                <span style={{ fontSize: '1.05rem' }}>Admin</span>
              </a>
            </nav>
            
            <div className="sidebar-footer">
              <ThemeToggle />
              <a href="/report" className="btn btn-primary" style={{ width: '100%' }}>
                Make a Report
              </a>
            </div>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
