import React from 'react';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  return (
    <section style={{ padding: '80px 0', background: 'var(--primary)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--margin-desktop)', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '32px',
            lineHeight: '40px',
            fontWeight: 700,
            color: 'var(--on-primary)',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}
        >
          Sẵn sàng ra sân ngay hôm nay?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '24px',
            maxWidth: '640px',
            margin: '0 auto 40px',
          }}
        >
          Tham gia cùng hơn 100,000+ vận động viên đang sử dụng SportBooking để tìm kiếm niềm vui trong mỗi trận đấu.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
        >
          <button className="cta-btn-white">
            Bắt đầu ngay
          </button>
          <button className="cta-btn-accent">
            Tải ứng dụng
          </button>
        </motion.div>
      </div>

      <style>{`
        .cta-btn-white {
          padding: 16px 40px;
          background: var(--surface-container-lowest);
          color: var(--primary);
          border: none;
          border-radius: 9999px;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          transition: all 0.3s;
        }
        .cta-btn-white:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
        .cta-btn-white:active {
          transform: scale(0.97);
        }
        .cta-btn-accent {
          padding: 16px 40px;
          background: var(--primary-fixed-dim);
          color: var(--on-primary-fixed);
          border: none;
          border-radius: 9999px;
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          transition: all 0.3s;
        }
        .cta-btn-accent:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
        .cta-btn-accent:active {
          transform: scale(0.97);
        }
      `}</style>
    </section>
  );
};

export default CTASection;
