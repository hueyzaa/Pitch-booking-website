import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { useAuth } from '../context/AuthContext';
const navItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Tìm sân', path: '/san-the-thao' },
  { label: 'Hướng dẫn', path: '/huong-dan' },
];
import { resolveAssetUrl } from '../utils/asset.utils';

interface HeaderProps {
  config?: any;
}

const Header: React.FC<HeaderProps> = ({ config }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]);
  };

  const title = config?.HEADER_TITLE || 'SportBooking';
  const logo = config?.HEADER_LOGO;

  return (
    <>
      <header
        id="main-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
          background: 'var(--surface-bright)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '80px',
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            padding: '0 var(--margin-desktop)',
            width: '100%',
          }}
        >
          {/* Logo & Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--primary)',
                letterSpacing: '-0.02em',
                lineHeight: '32px',
              }}
            >
              {logo ? (
                <img 
                  src={resolveAssetUrl(logo)} 
                  alt={title} 
                  style={{ height: '40px', objectFit: 'contain' }} 
                />
              ) : null}
              <span>{title}</span>
            </Link>

            <nav className="desktop-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Auth Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="desktop-auth">
              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Link 
                    to="/tai-khoan" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      color: 'var(--primary)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'var(--surface-container-low)'
                    }}
                  >
                    <Icon name="account_circle" size={20} />
                    <span>Chào, {user?.ten || user?.ho_va_ten || user?.tai_khoan} 🌟</span>
                  </Link>
                  <button 
                    onClick={logout} 
                    className="btn-logout-header"
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'var(--error)', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      fontSize: '14px',
                      fontWeight: 500,
                      padding: '8px 12px',
                      borderRadius: '8px',
                    }}
                  >
                    <Icon name="logout" size={18} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/dang-nhap" className="btn-login">
                    Đăng nhập
                  </Link>
                  <Link to="/dang-ky" className="btn btn-primary btn-pill" style={{ padding: '10px 24px', fontSize: '14px' }}>
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActive(item.path) ? 'mobile-nav-link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid var(--outline-variant)', margin: '12px 0', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/tai-khoan" 
                    className="mobile-nav-link" 
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Icon name="account_circle" size={20} />
                    <span>Chào, {user?.ten || user?.ho_va_ten || user?.tai_khoan}</span>
                  </Link>
                  <button 
                    onClick={logout} 
                    className="btn btn-primary btn-pill" 
                    style={{ 
                      background: 'var(--error)', 
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: 'none',
                      padding: '12px'
                    }}
                  >
                    <Icon name="logout" size={18} />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <Link to="/dang-nhap" className="btn btn-secondary" style={{ flex: 1, borderRadius: '9999px' }}>
                    Đăng nhập
                  </Link>
                  <Link to="/dang-ky" className="btn btn-primary btn-pill" style={{ flex: 1 }}>
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .desktop-nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--on-surface-variant);
          transition: all 0.2s ease;
          padding-bottom: 4px;
          letter-spacing: 0.01em;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .nav-link--active {
          color: var(--primary);
          font-weight: 700;
          border-bottom: 2px solid var(--primary);
        }
        .btn-login {
          font-size: 14px;
          font-weight: 500;
          color: var(--on-surface-variant);
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .btn-login:hover {
          background: var(--surface-container);
        }
        .btn-logout-header {
          transition: all 0.2s;
        }
        .btn-logout-header:hover {
          background: var(--error-container) !important;
          color: var(--on-error-container) !important;
        }
        .desktop-auth {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--on-surface-variant);
          cursor: pointer;
          padding: 8px;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: var(--surface-container-lowest);
          border-bottom: 1px solid var(--outline-variant);
          z-index: 49;
          box-shadow: var(--shadow-lg);
          animation: slideDown 0.3s ease;
        }
        .mobile-nav-link {
          display: block;
          padding: 14px 16px;
          font-size: 16px;
          font-weight: 500;
          color: var(--on-surface-variant);
          border-radius: 12px;
          transition: all 0.2s;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link--active {
          background: var(--surface-container-low);
          color: var(--primary);
        }
        .mobile-nav-link--active {
          font-weight: 700;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .desktop-auth { display: none; }
          .mobile-menu-btn { display: block; }
          .mobile-menu { display: block; }
        }
      `}</style>
    </>
  );
};

export default Header;
