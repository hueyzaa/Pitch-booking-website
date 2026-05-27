import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
import { apiInstance } from '../api/core.api';
import { resolveAssetUrl } from '../utils/asset.utils';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res: any = await apiInstance.get('/danh-gia/public/latest?limit=6');
        setTestimonials(Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []));
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
      }
    };
    fetchReviews();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, testimonials.length - 1)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  if (testimonials.length === 0) return null;

  return (
    <section style={{ padding: '96px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--margin-desktop)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.01em' }}
            >
              Đánh giá từ người dùng
            </motion.h2>
            <p style={{ fontSize: '16px', color: 'var(--on-surface-variant)', marginTop: '8px' }}>
              Hàng ngàn người chơi đã tin tưởng và hài lòng với dịch vụ của chúng tôi.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }} className="testimonial-nav-btns">
            <button className="testimonial-nav-btn" onClick={handlePrev} aria-label="Previous">
              <Icon name="west" size={20} />
            </button>
            <button className="testimonial-nav-btn" onClick={handleNext} aria-label="Next">
              <Icon name="east" size={20} />
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="testimonial-grid">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`testimonial-card ${index === currentIndex ? 'testimonial-card--active' : ''}`}
            >
              {/* Quote Icon */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', color: 'rgba(0,108,73,0.15)' }}>
                <Icon name="format_quote" size={64} />
              </div>

              {/* User */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <img
                  src={t.anh_dai_dien ? resolveAssetUrl(t.anh_dai_dien) : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'}
                  alt={t.ten_khach_hang}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--on-surface)' }}>{t.ten_khach_hang}</h5>
                  <p style={{ fontSize: '12px', color: 'var(--outline)' }}>{t.ten_san || 'Thành viên SportBooking'}</p>
                </div>
              </div>

              {/* Quote */}
              <p style={{ fontSize: '16px', color: 'var(--on-surface-variant)', lineHeight: '24px', fontStyle: 'italic' }}>
                "{t.noi_dung}"
              </p>

              {/* Stars */}
              <div className="star-rating" style={{ marginTop: '24px' }}>
                {Array.from({ length: t.so_sao || 5 }).map((_, i) => (
                  <Icon key={i} name="star" filled size={20} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--gutter);
        }
        .testimonial-card {
          position: relative;
          background: var(--surface-container-lowest);
          padding: 32px;
          border-radius: 16px;
          border: 1px solid var(--outline-variant);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }
        .testimonial-card:hover {
          box-shadow: var(--shadow-md);
        }
        .testimonial-nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--outline-variant);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--on-surface-variant);
          transition: all 0.2s;
        }
        .testimonial-nav-btn:hover {
          background: var(--surface-container);
        }
        @media (max-width: 900px) {
          .testimonial-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .testimonial-grid {
            grid-template-columns: 1fr;
          }
          .testimonial-nav-btns {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
