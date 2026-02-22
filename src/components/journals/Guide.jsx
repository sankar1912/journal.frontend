'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Paper,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

export default function Guide() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('/submission_system_content.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const handleChange = panel => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper
        elevation={5}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" height={300} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            {data.map((item, idx) =>
              item.type === 'heading' ? (
                <Box key={idx} sx={{ width: '90%', textAlign: 'left', mb: 2 }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      borderBottom: '2px solid primary.main',
                      display: 'inline-block',
                      pb: 0.5,
                      textAlign: 'left',
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ) : (
                <Accordion
                  key={idx}
                  expanded={expanded === idx}
                  onChange={handleChange(idx)}
                  sx={{
                    width: '80%',
              
                    
                    borderRadius: 3,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    '&:before': { display: 'none' },
                    transition: 'transform 0.3s ease',
                    transform:
                      expanded === idx ? 'scale(1)' : 'scale(1.01)',

                    '&:hover .MuiAccordionSummary-root': {
                          backgroundColor: theme => theme.palette.primary.main,
                          color: "white" ,
                      '& .MuiTypography-root': {
                        
                        color: 'primary',
                      },
                      '& .MuiAccordionSummary-expandIconWrapper svg': {
                        color: '#fff',
                      },
                    },
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: '1rem', 
                        fontFamily: 'Arial, sans-serif',
                        lineHeight:1.5
                      }}
                    >
                      {item.title}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                
                      borderRadius: 2,
                      p: 2, // added padding for better spacing
                      fontFamily: 'Arial, sans-serif',
                    }}
                  >
                    <Typography
                      variant="body1" // larger content size
                      whiteSpace="pre-line"
                     
                      sx={{
                        px: 1,
                        textAlign: 'justify',
                        lineHeight: 1.8, // better readability
                        fontSize: '1rem',
                        fontFamily: 'Arial, sans-serif',
                      }}
                    >
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </Box>
        )}
      </Paper>
    </motion.div>
  );
}
