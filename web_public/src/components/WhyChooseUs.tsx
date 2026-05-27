import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';
const features = [
  {
    id: 1,
    icon: 'bolt',
    title: 'Thanh toán nhanh',
    description: 'Xác nhận đặt sân tức thì qua nhiều phương thức thanh toán linh hoạt.',
  },
  {
    id: 2,
    icon: 'sell',
    title: 'Giá tốt nhất',
    description: 'Cam kết mức giá cạnh tranh và thường xuyên có các mã giảm giá hấp dẫn.',
  },
  {
    id: 3,
    icon: 'verified',
    title: 'Chất lượng đảm bảo',
    description: 'Các sân thể thao đều được chúng tôi kiểm duyệt kỹ lưỡng về cơ sở vật chất.',
  },
  {
    id: 4,
    icon: 'support_agent',
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section style={{ padding: '96px 0', background: 'var(--surface-container-low)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--margin-desktop)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.01em' }}
          >
            Tại sao chọn SportBooking?
          </motion.h2>
          <p style={{ fontSize: '16px', color: 'var(--on-surface-variant)', marginTop: '12px' }}>
            Chúng tôi mang đến trải nghiệm đặt sân chuyên nghiệp và nhanh chóng nhất.
          </p>
        </div>

        {/* Features Grid */}
        <div className="why-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="why-card"
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(0,108,73,0.1)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <Icon name={feature.icon} size={32} />
              </div>
              <h4 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--on-surface)', marginBottom: '12px', lineHeight: '32px' }}>
                {feature.title}
              </h4>
              <p style={{ fontSize: '16px', color: 'var(--on-surface-variant)', lineHeight: '24px' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--gutter);
        }
        .why-card {
          text-align: center;
          padding: 32px;
          background: var(--surface-container-lowest);
          border-radius: 16px;
          border: 1px solid var(--outline-variant);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .why-card:hover {
          transform: translateY(-8px);
        }
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .why-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
