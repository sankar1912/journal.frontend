'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Effect() {
  const circles = [
    { top: '10%', left: '20%', size: 150, color: '#FF6B6B' },
    { top: '50%', left: '80%', size: 200, color: '#4ECDC4' },
    { top: '70%', left: '30%', size: 180, color: '#FFD93D' },
    { top: '30%', left: '60%', size: 120, color: '#1A535C' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 8 + index * 2,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: circle.top,
            left: circle.left,
            width: circle.size,
            height: circle.size,
            backgroundColor: circle.color,
            borderRadius: '50%',
            filter: 'blur(60px)',
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}
