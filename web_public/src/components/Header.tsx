import React from 'react';
import { LayoutGrid } from 'lucide-react';
import BaseImage from './BaseImage';

interface HeaderProps {
  config?: any;
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  const logo = config?.find((c: any) => c.key === 'HEADER_LOGO')?.value;
  const title = config?.find((c: any) => c.key === 'HEADER_TITLE')?.value || 'Portfolite';

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
      padding: '1.5rem 4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      {/* Logo & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {logo ? (
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden' }}>
            <BaseImage 
              src={logo} 
              alt={title} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
        ) : (
          <div style={{ color: 'white' }}>
            <LayoutGrid size={24} strokeWidth={2.5} />
          </div>
        )}
        <span style={{ 
          fontSize: '1.1rem', 
          fontWeight: 700, 
          color: 'white',
          letterSpacing: '-0.02em'
        }}>
          {title}
        </span>
      </div>

      {/* Right Side: Navigation */}
      <nav style={{ 
        display: 'flex', 
        gap: '2.5rem', 
        alignItems: 'center',
      }}>
        <a href="/" className="nav-link">Home</a>
      </nav>

      <style>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        .nav-link:hover {
          color: white;
        }
      `}</style>
    </header>
  );
};


export default Header;


