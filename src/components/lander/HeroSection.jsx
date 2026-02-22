'use client';

import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import JournalSketch from './JournalSketch';
import BotanicalJournalSketch from './BotanicalJournalSketch';
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

// --- New Capsule Data ---
const JOURNAL_TERMS = [
  'Reflections', 'Gratitude', 'Mindfulness', 
  'Intentions', 'Flow', 'Discovery', 'Clarity'
];



export default function HeroSection({
  title,
  subtitle,
  imagePrimary,
  imageSecondary,
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Headline animation
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  // Subtitle & Capsules animation (Revealed together)
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.5], [40, 0]);

  // Images
  const primaryScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const secondaryOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const secondaryY = useTransform(scrollYProgress, [0.4, 0.7], [40, 0]);

  return (
    <Box ref={ref} sx={{ height: '200vh' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          ml: '20px',
          width: '96%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '25px',
        }}
      >
          <BotanicalJournalSketch
  scrollYProgress={scrollYProgress}
  style={{
    right: '-80px',
    top: '8%',
    opacity: 0.1,
    zIndex: 0,
  }}
/>

        {/* Scroll-drawn journal sketch */}
<JournalSketch
  scrollYProgress={scrollYProgress}
  style={{
    right: '6%',
    top: '18%',
    zIndex: 0,
    opacity: 0.2,
  }}
/>


        {/* Main Content Wrapper */}
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 900, px: 2 }}>
          
          {/* 1. Title (Fades out) */}
          <MotionTypography
            variant="h1"
            style={{ opacity: titleOpacity, y: titleY }}
            sx={{
              textAlign: 'center',
              fontFamily: 'var(--font-outfit)',
              fontWeight: 700,
              color: 'black',
              fontSize: { xs: '2.8rem', md: '4.5rem' },
            }}
          >
            <span style={{ fontSize: "25%", fontWeight: 300, display: 'block' }}>
              Share your mindful journey of exploration
            </span>
            {title}
          </MotionTypography>

          {/* 2. Subtitle & Capsules (Fades in) */}
          <MotionBox
            style={{ opacity: contentOpacity, y: contentY }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Typography
              sx={{
                textAlign: 'justify',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 500,
                color: 'black',
                fontSize: { xs: '0.8rem', md: '1.25rem' },
                px:{ xs: 5, md: 18 },
                py:0
              }}
            >
              {subtitle}
            </Typography>

            {/* Capsules Grid */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                px:{xs:1,md:16},
                justifyContent: 'justify',
              }}
            >
              {JOURNAL_TERMS.map((term, i) => (
                <MotionBox
                  key={term}
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: 'black',color:'white' }}
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: '50px',
                    border: '1.5px solid rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                    {term.toUpperCase()}
                  </Typography>
                </MotionBox>
              ))}
            </Box>
            <br></br>
            <br />
           
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
}