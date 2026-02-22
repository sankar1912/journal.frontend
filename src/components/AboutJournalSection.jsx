'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, useTheme, Button, useMediaQuery, Divider } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import BookIcon from '@mui/icons-material/Book';
import InfoIcon from '@mui/icons-material/Info';

function AboutJournalSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fullContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt, lorem nec placerat laoreet, velit lorem euismod nisi, non cursus lorem nunc at est. Phasellus in metus eu nulla placerat sagittis. Integer id orci tincidunt, porta augue sit amet, commodo neque. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce varius maximus ligula, vitae sollicitudin sapien congue at. Curabitur nec justo id elit suscipit accumsan. Integer malesuada, sapien sed efficitur gravida, magna lectus bibendum elit, vel cursus diam arcu a neque. Suspendisse potenti. Integer tincidunt blandit arcu nec vestibulum. Curabitur pretium lorem vitae lorem tincidunt vehicula. Sed condimentum risus in orci facilisis, nec tincidunt justo sodales. Quisque feugiat augue nec purus varius sagittis. Fusce dignissim magna vel luctus sollicitudin. Suspendisse sagittis justo nec ante malesuada luctus.`;

  const words = fullContent.split(' ');
  const wordLimit = 200;

  const [showMore, setShowMore] = useState(false);

  const displayContent = isMobile && !showMore ? words.slice(0, wordLimit).join(' ') + '...' : fullContent;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="stretch"
      p={4}
      gap={4}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: '20px',
          overflow: 'hidden',
          width: { xs: '100%', md: '40%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'url("/journalbook.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '50%',
            padding: 1,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          <BookIcon color="primary" fontSize="large" />
        </Box>
      </Paper>

      <Paper
        elevation={6}
        sx={{
          borderRadius: '20px',
          width: { xs: '100%', md: '50%' },
          p: 4,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <InfoIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h4" fontWeight="bold">
            About us
          </Typography>
        </Box>
        <Divider/>
        <AnimatePresence>
          <motion.div
            key={showMore ? 'full-content' : 'short-content'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="body1" color="text.secondary" lineHeight={1.8} sx={{ textAlign: 'justify' }}>
              {displayContent}
            </Typography>
          </motion.div>
        </AnimatePresence>

        {isMobile && (
          <Box mt={2}>
            <Button variant="text" onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less' : 'Show More'}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default AboutJournalSection;
