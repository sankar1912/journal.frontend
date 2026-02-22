'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Avatar,
  Stack,
  Button,
  TextField,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import BookIcon from '@mui/icons-material/Book';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import { uploadManuscript } from '@/redux/actions/authActions';
import { useDispatch } from 'react-redux';

const GlassCard = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.4)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
}));

export default function FinalReview({ selectedJournal, reviewInfo }) {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const draftKey = `draft_${selectedJournal?._id}`;
    const savedDraft = localStorage.getItem(draftKey);
    console.log(savedDraft)
    if (savedDraft) {
      setReviewData(JSON.parse(savedDraft));
    }
  }, [reviewInfo]);

  if (!reviewData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h6">Loading your submission details...</Typography>
      </Box>
    );
  }
  const { authors, uploads, abstract, ...metaData } = reviewData;

  const labelMap = {
    typeOfManuscript: 'Type of Manuscript',
    type: 'Type',
    manuscriptTitle: 'Manuscript Title',
    ethicalApproval: 'Ethical Approval',
    keywords: 'Keywords',
    fund: 'Funding Available',
     researchAreas: 'Research Areas',
  };
  const dispatch =useDispatch()
  const handleSubmit =()=>{
    dispatch(uploadManuscript(reviewData, selectedJournal._id))
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, mx: 'auto', width: '90%' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard elevation={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <BookIcon sx={{ mr: 1 }} /> Final Submission Review
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <BookIcon sx={{ mr: 1 }} /> Journal: <strong>{selectedJournal.name}</strong>
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            <DescriptionIcon sx={{ mr: 1 }} /> Journal ID: {selectedJournal._id}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Metadata Display */}
          <Grid container spacing={3}>
            {Object.entries(metaData).map(([key, value]) => (
              key !== 'authors' && key !== 'uploads' && key !== 'abstract' && (
                <Grid item size={{xs:12, md:6}} key={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {key === 'researchAreas' ? (
                      <>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          {labelMap[key]}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {value.map((area, idx) => (
                            <Chip key={idx} label={area} color="primary" />
                          ))}
                        </Stack>
                      </>
                    ) : (
                      <TextField
                        fullWidth
                        label={labelMap[key] || key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        value={Array.isArray(value) ? value.join(', ') : value}
                        variant="outlined"
                        disabled
                      />
                    )}
                  </motion.div>
                </Grid>
              )
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            <SubjectIcon sx={{ mr: 1 }} /> Abstract
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextField
              fullWidth
              multiline
              minRows={8}
              variant="outlined"
              disabled
              value={abstract}
              sx={{ mt: 2, textAlign: 'justify' }}
            />
          </motion.div>

          <Divider sx={{ my: 4 }} />

          {/* First Authors */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            <PeopleIcon sx={{ mr: 1 }} /> First Authors
          </Typography>

          <Grid container spacing={3}>
            {authors?.firstAuthors.map((author, index) => (
              <Grid item size={{xs:12, md:6}} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                >
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center' }}>
                    <Avatar src={author.profileImage} sx={{ width: 70, height: 70, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{author.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} /> {author.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {author.researchAreas?.join(', ') || 'No research areas'}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Corresponding Authors */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            <PeopleIcon sx={{ mr: 1 }} /> Corresponding Authors
          </Typography>

          <Grid container spacing={3}>
            {authors?.correspondingAuthors.map((author, index) => (
              <Grid item size={{xs:12, md:6}} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                >
                  <Paper elevation={3} sx={{ p: 2, borderRadius: 3, display: 'flex', alignItems: 'center' }}>
                    <Avatar src={author.profileImage} sx={{ width: 70, height: 70, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{author.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} /> {author.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {author.researchAreas?.join(', ') || 'No research areas'}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Uploaded Files */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            <CloudUploadIcon sx={{ mr: 1 }} /> Uploaded Files
          </Typography>

          {uploads ? (
            <Stack spacing={2} mt={2}>
              {uploads.coverLetter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Button
                    variant="outlined"
                    href={uploads.coverLetter}
                    target="_blank"
                    sx={{ borderRadius: 3 }}
                  >
                    View Cover Letter
                  </Button>
                </motion.div>
              )}
              {uploads.manuscript && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Button
                    variant="outlined"
                    href={uploads.manuscript}
                    target="_blank"
                    sx={{ borderRadius: 3 }}
                  >
                    View Manuscript
                  </Button>
                </motion.div>
              )}
              {uploads.supplementary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Button
                    variant="outlined"
                    href={uploads.supplementary}
                    target="_blank"
                    sx={{ borderRadius: 3 }}
                  >
                    View Supplementary Files
                  </Button>
                </motion.div>
              )}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary" mt={2}>
              No files uploaded.
            </Typography>
          )}

          <Divider sx={{ my: 4 }} />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Manuscript
          </Button>
        </GlassCard>
      </motion.div>
    </Box>
  );
}
