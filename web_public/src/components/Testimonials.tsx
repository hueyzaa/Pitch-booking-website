import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
const testimonials = [
  {
    id: 1,
    name: 'Minh Tuấn',
    role: 'Đội trưởng FC Lão Tướng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    quote: '"Từ ngày có SportBooking, mình không còn phải gọi điện từng nơi để hỏi sân nữa. App rất mượt, tìm sân nhanh và thanh toán cực kỳ tiện lợi."',
    rating: 5,
  },
  {
    id: 2,
    name: 'Linh Chi',
    role: 'Người chơi Cầu lông',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    quote: '"Giao diện trực quan, dễ dùng. Thích nhất là tính năng xem được giờ trống của sân theo thời gian thực. Sẽ tiếp tục ủng hộ SportBooking lâu dài!"',
    rating: 5,
  },
  {
    id: 3,
    name: 'Quốc Bảo',
    role: 'Thành viên Tennis Club',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    quote: '"Dịch vụ chăm sóc khách hàng cực kỳ tốt. Có lần mình cần hủy sân đột xuất, các bạn nhân viên đã hỗ trợ rất nhiệt tình và hoàn tiền nhanh chóng."',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

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
                  src={t.avatar}
                  alt={t.name}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--on-surface)' }}>{t.name}</h5>
                  <p style={{ fontSize: '12px', color: 'var(--outline)' }}>{t.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p style={{ fontSize: '16px', color: 'var(--on-surface-variant)', lineHeight: '24px', fontStyle: 'italic' }}>
                {t.quote}
              </p>

              {/* Stars */}
              <div className="star-rating" style={{ marginTop: '24px' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
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
