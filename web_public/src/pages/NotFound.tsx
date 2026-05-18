import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 style={{
          fontSize: 'clamp(8rem, 20vw, 15rem)',
          fontWeight: 900,
          lineHeight: 1,
          margin: 0,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
          letterSpacing: '-0.05em',
        }}>
          404
        </h1>
        
        <h2 className="text-editorial" style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: 'white',
          marginTop: '-2rem',
          marginBottom: '2rem',
        }}>
          Lost in Space
        </h2>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.4)',
          maxWidth: '450px',
          margin: '0 auto 4rem',
          fontSize: '1.1rem',
          lineHeight: 1.6,
        }}>
          The page you are looking for has been moved, removed, or never existed in this dimension.
        </p>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.2rem 2.5rem',
              background: 'white',
              color: 'black',
              borderRadius: '100px',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <ArrowLeft size={20} />
            Keep Exploring
          </motion.div>
        </Link>
      </motion.div>

      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        zIndex: -1,
        filter: 'blur(100px)',
      }} />
    </div>
  );
};

export default NotFound;
