import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from './Icon';
import PitchCard, { PitchData } from './PitchCard';
import { getPitches } from '../api/api';

const FeaturedPitches: React.FC = () => {
  const [pitches, setPitches] = useState<PitchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await getPitches({ limit: 3 });
        if (response && Array.isArray(response.data)) {
          setPitches(response.data);
        } else if (Array.isArray(response)) {
          setPitches(response.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to fetch featured pitches:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section style={{ padding: '80px 0', maxWidth: 'var(--container-max)', margin: '0 auto', paddingLeft: 'var(--margin-desktop)', paddingRight: 'var(--margin-desktop)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 700, color: 'var(--on-surface)', letterSpacing: '-0.01em' }}
          >
            Sân nổi bật gần bạn
          </motion.h2>
          <p style={{ fontSize: '16px', color: 'var(--on-surface-variant)', marginTop: '8px' }}>
            Được đánh giá cao nhất bởi cộng đồng SportBooking
          </p>
        </div>
        <Link
          to="/san-the-thao"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontWeight: 700, fontSize: '14px' }}
        >
          Xem tất cả <Icon name="chevron_right" size={20} />
        </Link>
      </div>

      {/* Grid */}
      <div className="featured-grid">
        {loading ? (
          // Shimmer loading skeletons
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="skeleton-card" style={{ height: '380px', borderRadius: '12px', background: 'var(--surface-container-low)', overflow: 'hidden', position: 'relative' }}>
              <div className="shimmer" style={{ width: '100%', height: '224px', background: 'var(--surface-container)' }}></div>
              <div style={{ padding: '24px' }}>
                <div className="shimmer" style={{ width: '60%', height: '24px', borderRadius: '4px', background: 'var(--surface-container)', marginBottom: '16px' }}></div>
                <div className="shimmer" style={{ width: '80%', height: '16px', borderRadius: '4px', background: 'var(--surface-container)', marginBottom: '16px' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
                  <div className="shimmer" style={{ width: '40%', height: '24px', borderRadius: '4px', background: 'var(--surface-container)' }}></div>
                  <div className="shimmer" style={{ width: '30%', height: '36px', borderRadius: '8px', background: 'var(--surface-container)' }}></div>
                </div>
              </div>
            </div>
          ))
        ) : pitches.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--on-surface-variant)', fontSize: '16px' }}>
            Không có sân bóng nào nổi bật tại thời điểm này.
          </div>
        ) : (
          pitches.map((pitch, index) => (
            <motion.div
              key={pitch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <PitchCard pitch={pitch} variant="featured" />
            </motion.div>
          ))
        )}
      </div>

      <style>{`
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--gutter);
        }
        .shimmer {
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @media (max-width: 900px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedPitches;
