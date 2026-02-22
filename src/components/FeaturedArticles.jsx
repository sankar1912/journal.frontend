'use client';

import React from 'react';
import { Box, Typography, Avatar, useMediaQuery, useTheme, Divider, Grid, Paper } from '@mui/material';

const articlesData = [
  {
    title: 'Advancements in AI-Powered Healthcare',
    image: 'https://picsum.photos/seed/aihealth/600/400',
    description: 'Breakthroughs in AI applications for medical diagnostics and patient care.',
    author: 'Dr. Emily Zhang',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    title: '5G and its Impact on IoT Devices',
    image: 'https://picsum.photos/seed/5gtech/600/400',
    description: 'How 5G networks are reshaping the future of IoT ecosystems.',
    author: 'Dr. Arjun Mehta',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    title: 'Blockchain Integration in Smart Cities',
    image: 'https://picsum.photos/seed/blockchaincity/600/400',
    description: 'Blockchain’s role in developing secure and transparent smart cities.',
    author: 'Dr. John Smith',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    title: 'Emerging Trends in Renewable Energy',
    image: 'https://picsum.photos/seed/renewable/600/400',
    description: 'Exploring the future of green energy and its sustainable impact.',
    author: 'Dr. Laura Bennett',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    title: 'Cybersecurity Challenges in 2025',
    image: 'https://picsum.photos/seed/cybersecurity/600/400',
    description: 'How organizations are preparing for the next wave of cyber threats.',
    author: 'Dr. Michael Tan',
    avatar: 'https://randomuser.me/api/portraits/men/70.jpg',
  },
];

function FeaturedArticles() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box width="100%" py={4} px={2}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Featured <span style={{ color: "#1976d2" }}>Articles</span>
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {articlesData.map((article, index) => (
          <Grid item size={{xs:12, sm:6, md:4}} key={index}>
            <Paper elevation={4} sx={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}>
              <Box component="img" src={article.image} alt={article.title} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <Box p={3}>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {article.description}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Avatar src={article.avatar} sx={{ mr: 2 }} />
                  <Typography variant="subtitle1" fontWeight="medium">
                    {article.author}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FeaturedArticles;
