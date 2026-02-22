'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';



export default function JournalSketch({
  scrollYProgress,
  style,
}) {
  // Control drawing with scroll
  const draw = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  return (
    <motion.svg
      width="320"
      height="420"
      viewBox="0 0 320 420"
      fill="none"
      style={{
        position: 'absolute',
        opacity,
        ...style,
      }}
    >
      {/* Page outline */}
      <motion.rect
        x="20"
        y="20"
        width="280"
        height="380"
        rx="18"
        stroke="black"
        strokeWidth="2"
        style={{ pathLength: draw }}
      />

      {/* Writing lines */}
      {[80, 120, 160, 200, 240].map((y, i) => (
        <motion.line
          key={i}
          x1="50"
          x2="270"
          y1={y}
          y2={y}
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{
            pathLength: draw,
            opacity,
          }}
        />
      ))}

      {/* Handwritten underline */}
      <motion.path
        d="M70 290 C120 310, 200 310, 250 295"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: draw }}
      />
    </motion.svg>
  );
}
