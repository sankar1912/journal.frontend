'use client';

import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionSvg = motion('svg');
const MotionPath = motion('path');

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  /* ---------------- TEXT ANIMATIONS ---------------- */

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.5], [40, 0]);
  const disappear = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);


  /* ---------------- PINK BACKGROUND SPREAD ---------------- */

  // radius grows from 0% to ~150%
  const spreadRadius = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
  // opacity fades in a bit (0.2 → 0.4)
  const spreadOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.4]);

  return (
    <Box ref={ref} sx={{ height: '200vh', position: 'relative'}}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Animated pink spreading background */}
        <MotionBox
          style={{
            opacity: spreadOpacity,
            backgroundSize: spreadRadius,
          }}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            borderRadius:'360px',
            pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(circle at center, rgba(255, 192, 203, 0.8), transparent 50%)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transition: 'background-size 0.2s ease-out',
          }}
        />

        {/* ================= JOURNAL SVG ================= */}
        <MotionSvg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: 0.35,
          }}
        >
          {/* Main ink stroke */}
          <MotionPath
            d="M 80 300 
           C 200 260, 300 340, 420 310
           S 620 280, 760 320
           S 900 300, 980 260"
            fill="none"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 14"
            style={{
              strokeWidth: useTransform(scrollYProgress, [0, 0.5], [1, 4]),
              strokeDashoffset: useTransform(scrollYProgress, [0, 1], [120, 0]),
            }}
          />

          {/* Subtle pressure echo */}
          <MotionPath
            d="M 80 320 
           C 200 280, 300 360, 420 330
           S 620 300, 760 340
           S 900 320, 980 280"
            fill="none"
            stroke="black"
            strokeOpacity={0.3}
            strokeLinecap="round"
            strokeDasharray="2 12"
            style={{
              strokeWidth: useTransform(scrollYProgress, [0, 0.5], [0.5, 2]),
              strokeDashoffset: useTransform(scrollYProgress, [0, 1], [80, 0]),
            }}
          />
        </MotionSvg>

        {/* ================= CONTENT ================= */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1900,
            px: 2,
            py: 15,
          }}
        >
          {/* Title */}
          <MotionTypography
            variant="h2"
            style={{ opacity: titleOpacity, y: titleY }}
            sx={{
              textAlign: 'center',
              fontFamily: 'var(--font-outfit)',
              fontWeight: 200,
              fontSize: 50,
            }}
          >
            About <br />
            <span style={{ fontWeight: 700, fontSize: 100 }}>US</span>
          </MotionTypography>

          {/* Text */}
          <MotionBox
            style={{ opacity: contentOpacity, y: contentY }}
            sx={{
              mt: 6,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            <Typography
              sx={{
                textAlign: 'justify',
                fontFamily: 'var(--font-outfit)',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Journaling is a mindful practice of capturing thoughts, emotions,
              and reflections — a quiet space where clarity forms and ideas
              unfold over time.
            </Typography>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}
