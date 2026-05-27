import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { resolveAssetUrl } from '../utils/asset.utils';

interface FooterProps {
  config?: any;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const title = config?.HEADER_TITLE || 'SportBooking';
  const logo = config?.FOOTER_LOGO || config?.HEADER_LOGO;
  const description = config?.FOOTER_DESCRIPTION || 'Nền tảng đặt sân thể thao hàng đầu Việt Nam. Chúng tôi kết nối đam mê và cộng đồng thể thao.';
  const copyright = config?.FOOTER_COPYRIGHT || '© 2026 SportBooking. Nền tảng đặt sân thể thao chuyên nghiệp.';
  const email = config?.CONTACT_EMAIL;
  const phone = config?.CONTACT_PHONE;
  const address = config?.CONTACT_ADDRESS;

  return (
    <footer style={{ background: 'var(--surface-container-highest)', borderTop: '1px solid var(--outline-variant)' }}>
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '48px var(--margin-desktop)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--gutter)',
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div style={{ maxWidth: '320px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--on-surface)',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            {logo ? (
              <img 
                src={resolveAssetUrl(logo)} 
                alt={title} 
                style={{ height: '36px', objectFit: 'contain' }} 
              />
            ) : null}
            <span>{title}</span>
          </div>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '22px',
              color: 'var(--on-surface-variant)',
              marginBottom: '20px',
            }}
          >
            {description}
          </p>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                <Icon name="call" size={16} style={{ color: 'var(--primary)' }} />
                <span>{phone}</span>
              </div>
            )}
            {email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                <Icon name="mail" size={16} style={{ color: 'var(--primary)' }} />
                <span>{email}</span>
              </div>
            )}
            {address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                <Icon name="location_on" size={16} style={{ color: 'var(--primary)' }} />
                <span>{address}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#" className="footer-social-btn" aria-label="Facebook">
              <Icon name="public" size={20} />
            </a>
            <a href="#" className="footer-social-btn" aria-label="Share">
              <Icon name="share" size={20} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div>
            <h4 className="footer-col-title">Sản phẩm</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" className="footer-link">Về chúng tôi</Link>
              <Link to="/" className="footer-link">Tính năng</Link>
              <Link to="/" className="footer-link">Đối tác</Link>
            </nav>
          </div>
          <div>
            <h4 className="footer-col-title">Hỗ trợ</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" className="footer-link">Trung tâm hỗ trợ</Link>
              <Link to="/" className="footer-link">Liên hệ</Link>
              <Link to="/" className="footer-link">Quy trình hoàn tiền</Link>
            </nav>
          </div>
          <div>
            <h4 className="footer-col-title">Pháp lý</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" className="footer-link">Điều khoản sử dụng</Link>
              <Link to="/" className="footer-link">Chính sách bảo mật</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: '1px solid rgba(187, 202, 191, 0.3)',
          padding: '24px var(--margin-desktop)',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--on-surface-variant)' }}>
          {copyright}
        </p>
      </div>

      <style>{`
        .footer-col-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--on-surface);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }
        .footer-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--on-surface-variant);
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--primary);
        }
        .footer-social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--surface-container-low);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          transition: all 0.3s;
        }
        .footer-social-btn:hover {
          background: var(--primary);
          color: var(--on-primary);
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column !important;
          }
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }
        @media (max-width: 480px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
