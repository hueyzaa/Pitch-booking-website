import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useConfig } from '../context/ConfigContext';
import { resolveAssetUrl } from '../utils/asset.utils';

const DEFAULT_HERO_BACKGROUND = 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&h=900&fit=crop';

const Hero: React.FC = () => {
  const { config } = useConfig();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const badge = config?.HOME_HERO_BADGE || 'Đặt Sân Thể Thao';
  const mainTitle = config?.HOME_HERO_TITLE_MAIN || 'Đam mê';
  const accentTitle = config?.HOME_HERO_TITLE_ACCENT || 'dẫn lối,';
  const titleSuffix = config?.HOME_HERO_TITLE_SUFFIX || 'đặt sân dễ dàng';
  const desc = config?.HOME_HERO_DESC || 'Khám phá và đặt ngay những sân thể thao chất lượng nhất quanh bạn chỉ với vài lần chạm. Tiết kiệm thời gian, bùng nổ đam mê.';
  const heroImg = config?.HOME_HERO_IMG ? resolveAssetUrl(config.HOME_HERO_IMG) : DEFAULT_HERO_BACKGROUND;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/san-the-thao?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/san-the-thao');
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        paddingBottom: '128px',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={heroImg}
          alt="SportBooking Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,108,73,0.9) 0%, rgba(11,28,48,0.85) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '0 var(--margin-desktop)',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '672px' }}>
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              <span style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--primary-container)', borderRadius: '50%' }}></span>
              {badge}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: 1.2,
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
            }}
          >
            {mainTitle} <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--primary-fixed-dim)' }}>{accentTitle}</span><br />
            {titleSuffix}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '18px',
              lineHeight: '28px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '40px',
              maxWidth: '560px',
            }}
          >
            {desc}
          </motion.p>

          {/* Unified Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-search"
          >
            <div className="hero-search__field">
              <Icon name="search" size={24} style={{ color: 'var(--outline)' }} />
              <div style={{ flex: 1 }}>
                <label className="hero-search__label">Tìm sân</label>
                <input
                  className="hero-search__input"
                  placeholder="Nhập tên sân, địa chỉ hoặc khu vực cần tìm kiếm..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              className="hero-search__btn"
              type="submit"
            >
              <Icon name="search" size={22} />
              <span>Tìm kiếm</span>
            </button>
          </motion.form>
        </div>
      </div>

      <style>{`
        .hero-search {
          background: var(--surface-container-lowest);
          padding: 8px;
          border-radius: 16px;
          box-shadow: var(--shadow-xl);
          display: flex;
          gap: 8px;
          align-items: stretch;
        }
        .hero-search__field {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 12px 20px;
          background: var(--surface-container-low);
          border-radius: 12px;
          gap: 12px;
        }
        .hero-search__label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          color: var(--outline);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2px;
        }
        .hero-search__input {
          width: 100%;
          background: transparent;
          border: none;
          font-family: var(--font-main);
          font-size: 16px;
          font-weight: 500;
          color: var(--on-surface);
          outline: none;
          padding: 0;
        }
        .hero-search__input::placeholder {
          color: var(--outline);
          opacity: 0.7;
        }
        .hero-search__btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 32px;
          background: var(--primary-container);
          color: var(--on-primary-container);
          border: none;
          border-radius: 12px;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .hero-search__btn:hover {
          opacity: 0.9;
        }
        @media (max-width: 600px) {
          .hero-search {
            flex-direction: column;
          }
          .hero-search__btn {
            padding: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
