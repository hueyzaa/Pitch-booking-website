import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  LayoutGrid, 
  Facebook, 
  Instagram, 
  Youtube, 
  Link as LinkIcon 
} from 'lucide-react';
import BaseImage from './BaseImage';

interface FooterProps {
  config?: any;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const headerTitle = config?.find((c: any) => c.key === 'HEADER_TITLE')?.value || 'System';
  
  // Use Header Logo if Footer Logo is not specifically set
  const footerLogo = config?.find((c: any) => c.key === 'FOOTER_LOGO')?.value;
  const headerLogo = config?.find((c: any) => c.key === 'HEADER_LOGO')?.value;
  const logoUrl = footerLogo || headerLogo;

  const description = config?.find((c: any) => c.key === 'FOOTER_DESCRIPTION')?.value || 'Crafting elegant digital experiences with passion and precision.';
  const copyright = config?.find((c: any) => c.key === 'FOOTER_COPYRIGHT')?.value || `© ${new Date().getFullYear()} ${headerTitle}. All rights reserved.`;

  const socialLinks = [
    { id: 1, nen_tang: 'Github', url: 'https://github.com' },
    { id: 2, nen_tang: 'Linkedin', url: 'https://linkedin.com' },
    { id: 3, nen_tang: 'Twitter', url: 'https://twitter.com' }
  ];

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('github')) return <Github size={20} />;
    if (p.includes('linkedin')) return <Linkedin size={20} />;
    if (p.includes('twitter')) return <Twitter size={20} />;
    if (p.includes('facebook')) return <Facebook size={20} />;
    if (p.includes('instagram')) return <Instagram size={20} />;
    if (p.includes('youtube')) return <Youtube size={20} />;
    return <LinkIcon size={20} />;
  };

  return (
    <footer style={{
      padding: '6rem 4rem 3rem',
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      width: '100%',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(300px, 1fr)',
        gap: '4rem',
        alignItems: 'start',
        marginBottom: '5rem',
      }} className="footer-grid">
        {/* Left Side: Brand & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            marginBottom: '1.5rem',
            cursor: 'pointer'
          }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {logoUrl ? (
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden' }}>
                <BaseImage 
                  src={logoUrl} 
                  alt={headerTitle} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              </div>
            ) : (
              <div style={{ color: 'white' }}>
                <LayoutGrid size={22} strokeWidth={2.5} />
              </div>
            )}
            <span style={{ 
              fontSize: '1.15rem', 
              fontWeight: 750, 
              color: 'white',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}>
              {headerTitle}
            </span>
          </div>
          <p style={{
            color: 'rgba(255, 255, 255, 0.4)',
            lineHeight: 1.6,
            maxWidth: '420px',
            fontSize: '0.95rem',
            fontWeight: 400,
          }}>
            {description}
          </p>
        </div>

        {/* Right Side: Links & Social */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '2rem',
          width: '100%'
        }}>
          <div>
            <h4 style={{ 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              color: 'rgba(255,255,255,0.3)', 
              marginBottom: '1.5rem', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="#" className="footer-link">Home</a>
            </div>
          </div>

          <div>
            <h4 style={{ 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              color: 'rgba(255,255,255,0.3)', 
              marginBottom: '1.5rem', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>Social</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socialLinks.length > 0 ? (
                socialLinks.map((link: any) => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer-link"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                  >
                    <span style={{ opacity: 0.6 }}>{getSocialIcon(link.nen_tang)}</span>
                    {link.nen_tang}
                  </a>
                ))
              ) : (
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>No links configured</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        paddingTop: '3rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        color: 'rgba(255, 255, 255, 0.2)',
        fontSize: '0.8rem',
        fontWeight: 500,
      }}>
        <div>{copyright}</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span style={{ cursor: 'pointer' }} className="footer-bottom-link">Privacy Policy</span>
          <span style={{ cursor: 'pointer' }} className="footer-bottom-link">Terms of Service</span>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-size: 0.95rem;
          font-weight: 500;
        }
        .footer-link:hover {
          color: white;
          transform: translateX(3px);
        }
        .footer-bottom-link:hover {
          color: rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
