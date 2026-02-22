'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { motion, AnimatePresence, useTransform, useScroll } from 'framer-motion';

const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);

const authors = [
  {
    id: 1,
    name: 'Dr. A. P. Sharma',
    avatar: 'https://images.pexels.com/photos/35564247/pexels-photo-35564247.jpeg',
    affiliation: 'IISc Bangalore',
    field: 'Quantum Computing',
    papers: '28 IEEE Journals',
    hIndex: 35,
    country: 'India',
  },
  {
    id: 2,
    name: 'Dr. B. K. Patel',
    avatar: 'https://images.pexels.com/photos/35564247/pexels-photo-35564247.jpeg',
    affiliation: 'MIT',
    field: 'Artificial Intelligence',
    papers: '42 IEEE Journals',
    hIndex: 40,
    country: 'USA',
  },
  {
    id: 3,
    name: 'Dr. C. L. Wong',
    avatar: 'https://images.pexels.com/photos/35564247/pexels-photo-35564247.jpeg',
    affiliation: 'Stanford University',
    field: 'Machine Learning',
    papers: '36 IEEE Journals',
    hIndex: 38,
    country: 'USA',
  },
  {
    id: 4,
    name: 'Dr. D. R. Mehta',
    avatar: 'https://images.pexels.com/photos/35564247/pexels-photo-35564247.jpeg',
    affiliation: 'Oxford University',
    field: 'Robotics',
    papers: '30 IEEE Journals',
    hIndex: 33,
    country: 'UK',
  },
  {
    id: 5,
    name: 'Dr. E. F. Kim',
    avatar: 'https://images.pexels.com/photos/35564247/pexels-photo-35564247.jpeg',
    affiliation: 'KAIST',
    field: 'Nanotechnology',
    papers: '25 IEEE Journals',
    hIndex: 31,
    country: 'South Korea',
  },
  {
    id: 6,
    name: 'Dr. F. G. Lopez',
    avatar: 'https://images.pexels.com/photos/35564247/pexels-photo-35564247.jpeg',
    affiliation: 'ETH Zurich',
    field: 'Cybersecurity',
    papers: '29 IEEE Journals',
    hIndex: 34,
    country: 'Switzerland',
  },
];

export default function ResearcherCard() {
  const ref = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  return (
    <Box ref={ref} sx={{ height: '200vh', position: 'relative', zIndex: 10 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'center',
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
            fontSize: 30,
          }}
        >
          Featured <br />
          <span style={{ fontWeight: 700, fontSize: 50 }}>Researchers</span>
        </MotionTypography>

        {/* Authors */}
        {authors.map((author, index) => (
          <motion.div
            key={author.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                width: '100%',
                maxWidth: 400,
                height: 20,
              }}
              onClick={() => setHoveredId(author.id)}
              onMouseLeave={() => setHoveredId(null)}
              onBlur={() => setHoveredId(null)}
              tabIndex={0}
            >
              {/* Capsule */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: hoveredId === author.id ? 'flex-start' : 'center',
                  gap: 1.5,
                  px: 1.5,
                  py: hoveredId === author.id ? 4 : 2.25,
                  borderRadius: '50px',
                  border: '2px solid black',
                  backgroundColor:
                    hoveredId === author.id ? 'primary.main' : '#fff',
                  color:
                    hoveredId === author.id ? '#fff' : 'text.primary',
                  boxShadow:
                    hoveredId === author.id
                      ? '0 4px 12px rgba(0,0,0,0.1)'
                      : 'none',
                  transform:
                    hoveredId === author.id ? 'translateY(-40px)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <Avatar
                  src={author.avatar}
                  alt={author.name}
                  sx={{ width: 36, height: 36, border: '1px solid' }}
                />
                <Typography fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>
                  {author.name}
                </Typography>
              </Box>

              {/* Popup */}
              <AnimatePresence>
                {hoveredId === author.id && (
                  <MotionPaper
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    elevation={6}
                    sx={{
                      position: 'absolute',
                      top: '110%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 260,
                      bgcolor: 'background.paper',
                      p: 2.5,
                      borderRadius: 2,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                      zIndex: 10,
                    }}
                  >
                    <Typography fontWeight={700} gutterBottom>
                      {author.affiliation}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Field:</strong> {author.field}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Papers:</strong> {author.papers}
                    </Typography>
                    <Typography variant="body2">
                      <strong>H-index:</strong> {author.hIndex}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Country:</strong> {author.country}
                    </Typography>
                  </MotionPaper>
                )}
              </AnimatePresence>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
