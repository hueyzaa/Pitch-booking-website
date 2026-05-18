import React from 'react';
import { motion } from 'framer-motion';

const BackgroundGradient: React.FC = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#000000',
    }}>
      {/* Smoky Background Blobs */}
      <motion.div 
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 40, 0],
          rotate: [0, 45, -45, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '5%',
          left: '15%',
          width: '65vw',
          height: '65vw',
          background: 'radial-gradient(circle, rgba(50, 50, 255, 0.05) 0%, transparent 75%)',
          filter: 'blur(120px)',
        }} 
      />
      
      <motion.div 
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 40, -40, 0],
          rotate: [0, -45, 45, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '55vw',
          height: '55vw',
          background: 'radial-gradient(circle, rgba(255, 100, 50, 0.03) 0%, transparent 75%)',
          filter: 'blur(140px)',
        }} 
      />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
      }} />
    </div>
  );
};

export default BackgroundGradient;

