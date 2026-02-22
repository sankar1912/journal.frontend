'use client';

import { useRef } from 'react';
import { Box } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SketchPlanes() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  /**
   * Scroll ranges
   * 0 → 0.5 : Plane 1 drawing
   * 0.5 → 1 : Plane 2 drawing
   */
  const plane1Progress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const plane2Progress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const plane1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);
  const plane2Opacity = useTransform(scrollYProgress, [0.5, 0.8], [0.2, 1]);

  return (
    <Box
      ref={ref}
      sx={{
        height: '200vh',
        position: 'relative',
        background: '#f7f7f7',
      }}
    >
      {/* Sticky Drawing Canvas */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          fill="none"
        >
          {/* ================= PLANE 1 ================= */}
          <motion.g
            style={{ opacity: plane1Opacity }}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Organic curve */}
            <motion.path
              d="M100 300 C 200 100, 400 100, 500 300"
              stroke="#6C63FF"
              strokeWidth="6"
              pathLength={plane1Progress}
            />

            {/* Soft blob */}
            <motion.path
              d="M200 400 C 150 350, 200 250, 300 260 C 380 270, 420 360, 350 420 C 280 480, 220 460, 200 400"
              stroke="#FF6584"
              strokeWidth="5"
              fill="none"
              pathLength={plane1Progress}
            />
          </motion.g>

          {/* ================= PLANE 2 ================= */}
          <motion.g
            style={{ opacity: plane2Opacity }}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Flowing wave */}
            <motion.path
              d="M150 200 C 300 50, 500 80, 650 200"
              stroke="#00BFA6"
              strokeWidth="6"
              pathLength={plane2Progress}
            />

            {/* Abstract loop */}
            <motion.path
              d="M450 350 C 500 250, 650 260, 620 360 C 590 460, 450 480, 420 380 C 390 300, 420 260, 450 350"
              stroke="#FFC75F"
              strokeWidth="5"
              fill="none"
              pathLength={plane2Progress}
            />
          </motion.g>
        </motion.svg>
      </Box>
    </Box>
  );
}
