import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import BaseImage from './BaseImage';

interface LoadingScreenProps {
  config?: any;
  error?: boolean;
  onRetry?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ config, error, onRetry }) => {
  const logo = config?.find((c: any) => c.key === 'HEADER_LOGO')?.value;
  const title = config?.find((c: any) => c.key === 'HEADER_TITLE')?.value || 'Portfolio';

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Animated Rings - Hide on error */}
        {!error && (
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '1px solid white',
              zIndex: -1
            }}
          />
        )}

        {/* Logo/Icon Area */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {logo ? (
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', overflow: 'hidden' }}>
              <BaseImage 
                src={logo} 
                alt={title} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            </div>
          ) : (
            <div style={{ color: error ? '#FF4500' : 'white' }}>
              <LayoutGrid size={40} strokeWidth={1.5} />
            </div>
          )}
        </motion.div>
      </div>

      <div style={{ textAlign: 'center', padding: '0 2rem' }}>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            marginBottom: '1rem'
          }}
        >
          {error ? 'Connection Issue' : title}
        </motion.h2>

        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p style={{ 
              color: 'rgba(255,255,255,0.4)', 
              fontSize: '0.85rem', 
              marginBottom: '2rem',
              maxWidth: '300px',
              lineHeight: 1.5
            }}>
              We couldn't reach the portfolio data. Please check your connection or ensure the backend is running.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              style={{
                padding: '0.8rem 2rem',
                background: 'white',
                color: 'black',
                border: 'none',
                borderRadius: '100px',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer'
              }}
            >
              Retry Connection
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            style={{
              width: '160px',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              margin: '0 auto'
            }}
          >
            <motion.div 
              animate={{ 
                left: ['-100%', '100%'] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'absolute',
                width: '40%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
              }}
            />
          </motion.div>
        )}
      </div>

      <style>{`
        body {
          overflow: hidden !important;
        }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;
