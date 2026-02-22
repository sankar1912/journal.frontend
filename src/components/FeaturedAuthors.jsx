'use client';

import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Updated dataset with 6 authors (Indian style names)
const authorsData = [
  {
    name: 'Dr. A. P. Sharma',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    affiliation: 'Indian Institute of Science (IISc) Bangalore',
    contributions: [
      { label: 'Research Field', value: 'Quantum Computing', icon: WorkIcon },
      { label: 'Published Papers', value: '28 IEEE Journals', icon: StarIcon },
      { label: 'H-index', value: '35', icon: EmojiEventsIcon },
      { label: 'Country', value: 'India', icon: PublicIcon },
    ],
  },
  {
    name: 'Dr. Ritu Verma',
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    affiliation: 'Indian Institute of Technology (IIT) Bombay',
    contributions: [
      { label: 'Research Field', value: 'Machine Learning', icon: WorkIcon },
      { label: 'Published Papers', value: '22 IEEE Journals', icon: StarIcon },
      { label: 'H-index', value: '30', icon: EmojiEventsIcon },
      { label: 'Country', value: 'India', icon: PublicIcon },
    ],
  },
  {
    name: 'Dr. Sanjay Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    affiliation: 'IIT Madras',
    contributions: [
      { label: 'Research Field', value: 'Data Science', icon: WorkIcon },
      { label: 'Published Papers', value: '19 IEEE Journals', icon: StarIcon },
      { label: 'H-index', value: '28', icon: EmojiEventsIcon },
      { label: 'Country', value: 'India', icon: PublicIcon },
    ],
  },
  {
    name: 'Dr. Neha Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    affiliation: 'Indian Statistical Institute (ISI) Kolkata',
    contributions: [
      { label: 'Research Field', value: 'Bioinformatics', icon: WorkIcon },
      { label: 'Published Papers', value: '24 IEEE Journals', icon: StarIcon },
      { label: 'H-index', value: '32', icon: EmojiEventsIcon },
      { label: 'Country', value: 'India', icon: PublicIcon },
    ],
  },
  {
    name: 'Dr. Rajesh Mehta',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    affiliation: 'Delhi Technological University (DTU)',
    contributions: [
      { label: 'Research Field', value: 'Cyber Security', icon: WorkIcon },
      { label: 'Published Papers', value: '20 IEEE Journals', icon: StarIcon },
      { label: 'H-index', value: '27', icon: EmojiEventsIcon },
      { label: 'Country', value: 'India', icon: PublicIcon },
    ],
  },
  {
    name: 'Dr. Priya Iyer',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    affiliation: 'Anna University, Chennai',
    contributions: [
      { label: 'Research Field', value: 'VLSI Design', icon: WorkIcon },
      { label: 'Published Papers', value: '18 IEEE Journals', icon: StarIcon },
      { label: 'H-index', value: '25', icon: EmojiEventsIcon },
      { label: 'Country', value: 'India', icon: PublicIcon },
    ],
  },
];

function FeaturedAuthors() {
  return (
    <Box width="100%" py={4} px={6}>
      <Divider sx={{ mb: 4 }} />
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
        Featured <span style={{ color: "#1976d2" }}>Authors</span>
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        {authorsData.map((author, index) => (
          <Grid item size={{xs:12, sm:6, md:4}} key={index}>
            <Paper elevation={4} sx={{ borderRadius: '20px', padding: 3, height: '100%' }}>
              <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                <Avatar src={author.avatar} alt={author.name} sx={{ width: 100, height: 100, mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">{author.name}</Typography>
                <Typography color="text.secondary" textAlign="center">{author.affiliation}</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <List>
                {author.contributions.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem>
                      <ListItemIcon>
                        <item.icon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography fontWeight="bold">{item.label}</Typography>}
                        secondary={<Typography color="text.secondary">{item.value}</Typography>}
                      />
                    </ListItem>
                    {idx < author.contributions.length - 1 && <Divider variant="inset" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FeaturedAuthors;
