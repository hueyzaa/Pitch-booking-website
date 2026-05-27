import React from 'react';
import { motion } from 'framer-motion';
import { resolveAssetUrl } from '../utils/asset.utils';

interface LoadingScreenProps {
  config?: any;
  error?: boolean;
  onRetry?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ config, error, onRetry }) => {
  const title = config?.HEADER_TITLE || 'SportBooking';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--primary)',
          letterSpacing: '-0.02em',
        }}
      >
        {config?.HEADER_LOGO ? (
          <img 
            src={resolveAssetUrl(config.HEADER_LOGO)} 
            alt={title} 
            style={{ height: '48px', objectFit: 'contain' }} 
          />
        ) : null}
        <span>{title}</span>
      </motion.div>

      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{
            color: 'var(--on-surface-variant)',
            fontSize: '14px',
            marginBottom: '24px',
            maxWidth: '300px',
            lineHeight: 1.5,
          }}>
            Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối hoặc thử lại.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="btn btn-primary btn-pill"
          >
            Thử lại
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Animated Ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '2px solid var(--primary-container)',
            }}
          />

          {/* Progress Bar */}
          <div style={{
            width: '160px',
            height: '2px',
            background: 'var(--outline-variant)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '8px',
          }}>
            <motion.div
              animate={{ left: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'relative',
                width: '40%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
              }}
            />
          </div>
        </>
      )}

      <style>{`
        body { overflow: hidden !important; }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;
