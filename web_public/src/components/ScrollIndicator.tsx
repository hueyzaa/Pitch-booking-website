import React from 'react';
import { motion } from 'framer-motion';
import { Mouse } from 'lucide-react';

const ScrollIndicator: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '0.9rem',
      fontWeight: 500,
    }}>
      <span>Scroll down</span>
      
      <div style={{
        flex: 1,
        height: '1px',
        background: 'rgba(255, 255, 255, 0.1)',
        minWidth: '100px',
      }} />

      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: 'white', opacity: 0.8 }}
      >
        <Mouse size={24} strokeWidth={1.5} />
      </motion.div>

      <div style={{
        flex: 1,
        height: '1px',
        background: 'rgba(255, 255, 255, 0.1)',
        minWidth: '100px',
      }} />

      <span>to see projects</span>
    </div>
  );
};

export default ScrollIndicator;
