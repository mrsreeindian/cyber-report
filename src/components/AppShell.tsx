"use client";

import { useState, useEffect } from "react";
import { HeartHandshake, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  return (
    <div className={`app-container ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 99,
            display: 'block'
          }}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <a href="/" className="logo" style={{ marginBottom: 0 }}>
            <HeartHandshake size={24} color="var(--primary)" />
            Behind The Smiles
          </a>
          <button 
            className="sidebar-close-btn"
            onClick={() => setIsOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <a href="/" className="sidebar-link">
            <span style={{ fontSize: '1.05rem' }}>Home</span>
          </a>
          <a href="/report" className="sidebar-link">
            <span style={{ fontSize: '1.05rem' }}>Report</span>
          </a>
          <a href="/survey" className="sidebar-link">
            <span style={{ fontSize: '1.05rem' }}>Take Survey</span>
          </a>
          {/* Admin link hidden per user request */}
        </nav>
        
        <div className="sidebar-footer">
          <ThemeToggle />
          <a href="/report" className="btn btn-primary" style={{ width: '100%' }}>
            Make a Report
          </a>
        </div>
      </aside>
      
      <main className="main-content">
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)} 
            style={{ 
              position: 'fixed', 
              top: '1.5rem', 
              left: '1.5rem', 
              zIndex: 90, 
              background: 'var(--surface)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: 'var(--radius-sm)', 
              padding: '0.5rem', 
              cursor: 'pointer', 
              display: 'flex',
              backdropFilter: 'blur(12px)',
              boxShadow: 'var(--glass-shadow)'
            }}
          >
            <Menu size={24} color="var(--text-primary)" />
          </button>
        )}
        {children}
      </main>
    </div>
  );
}
