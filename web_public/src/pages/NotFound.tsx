import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const NotFound: React.FC = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center',
      background: 'var(--background)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 style={{
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--surface-container-high)',
          letterSpacing: '-0.05em',
        }}>
          404
        </h1>

        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'var(--on-surface)',
          marginTop: '-1rem',
          marginBottom: '1.5rem',
          fontWeight: 700,
        }}>
          Không tìm thấy trang
        </h2>

        <p style={{
          color: 'var(--on-surface-variant)',
          maxWidth: '400px',
          margin: '0 auto 3rem',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}>
          Trang bạn đang tìm kiếm đã được di chuyển, xóa hoặc không tồn tại.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-pill btn-lg"
          >
            <Icon name="arrow_back" size={20} />
            Về trang chủ
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
