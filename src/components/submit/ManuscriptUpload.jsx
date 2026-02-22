'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { styled } from '@mui/material/styles';
import useCloudinaryFile from '@/hooks/useCloudinaryFile';
import { useDispatch } from 'react-redux';
import { setMessage } from '@/redux/slices/notificationSlice';

const GlassCard = styled(Paper)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.4)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
}));

export default function ManuscriptUpload({ selectedJournal, reviewInfo, setReviewInfo }) {
  const dispatch = useDispatch();
  const { uploadFiles, uploading } = useCloudinaryFile();

  const [coverLetter, setCoverLetter] = useState(null);
  const [manuscript, setManuscript] = useState(null);
  const [supplementary, setSupplementary] = useState(null);

  // Load draft on component mount
  useEffect(() => {
    const draftKey = `draft_${selectedJournal._id}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      if (draft.uploads) {
        if (draft.uploads.coverLetter) {
          setCoverLetter({ name: draft.uploads.coverLetter.split('/').pop(), url: draft.uploads.coverLetter });
        }
        if (draft.uploads.manuscript) {
          setManuscript({ name: draft.uploads.manuscript.split('/').pop(), url: draft.uploads.manuscript });
        }
        if (draft.uploads.supplementary) {
          setSupplementary({ name: draft.uploads.supplementary.split('/').pop(), url: draft.uploads.supplementary });
        }
      }
    }
  }, [selectedJournal._id]);

  const handleFileChange = (e, setter) => {
    if (e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const handleSaveDraft = async () => {
    const draftKey = `draft_${selectedJournal._id}`;
    const savedDraft = localStorage.getItem(draftKey);
    let draft = savedDraft ? JSON.parse(savedDraft) : {};

    try {
      dispatch(setMessage('Uploading files, please wait...'));

      const coverLetterUrl = coverLetter && coverLetter instanceof File ? await uploadFiles(coverLetter, 'journalhub/cover_letters') : coverLetter?.url;
      const manuscriptUrl = manuscript && manuscript instanceof File ? await uploadFiles(manuscript, 'journalhub/manuscripts') : manuscript?.url;
      const supplementaryUrl = supplementary && supplementary instanceof File ? await uploadFiles(supplementary, 'journalhub/supplementary_files') : supplementary?.url;
      setCoverLetter(coverLetterUrl);
      setManuscript(manuscriptUrl);
      setSupplementary(supplementaryUrl);
      draft.uploads = {
        ...(draft.uploads || {}),
        ...(coverLetterUrl && { coverLetter: coverLetterUrl }),
        ...(manuscriptUrl && { manuscript: manuscriptUrl }),
        ...(supplementaryUrl && { supplementary: supplementaryUrl }),
      };

      localStorage.setItem(draftKey, JSON.stringify(draft));
      dispatch(setMessage('Draft saved successfully.'));
    } catch (error) {
      console.error('Error saving draft:', error);
      dispatch(setMessage('Error uploading files. Please try again.'));
    }
  };

  const handleSubmit = () => {
    if (!manuscript || (manuscript instanceof File)) {
      dispatch(setMessage('Please upload and save your manuscript before submitting.'));
    } else {
      dispatch(setMessage('Thank you!! Review your manuscript submission.'));
      setReviewInfo(true);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, mx: 'auto', width: '90%' }}>
      <GlassCard elevation={6}>
        <Typography variant="h5" fontWeight="bold" color='primary' gutterBottom>
          Manuscript Upload Form
        </Typography>
        <Typography variant="body1" gutterBottom>
          Selected Journal Name: <strong>{selectedJournal.name}</strong>
        </Typography>

        {/* Cover Letter Upload */}
        <Box mt={4}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" fontWeight="bold">
              Upload Cover Letter
            </Typography>
            <Tooltip
              title={
                <span>
                  Cover letter should briefly acknowledge submission and refer to similar cover letters from other journals for the format.
                </span>
              }
              arrow
            >
              <IconButton size="small">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ mt: 2, borderRadius: 3 }}
            disabled={uploading}
          >
            {coverLetter ? coverLetter.name : 'Upload Cover Letter'}
            <input type="file" hidden onChange={(e) => handleFileChange(e, setCoverLetter)} />
          </Button>
        </Box>

        {/* Manuscript Upload */}
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Upload Manuscript (PDF)
          </Typography>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ mt: 2, borderRadius: 3 }}
            disabled={uploading}
          >
            {manuscript ? manuscript.name : 'Upload Manuscript PDF'}
            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, setManuscript)}
            />
          </Button>
        </Box>

        {/* Supplementary Files Upload */}
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Upload Supplementary Files (Optional)
          </Typography>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{ mt: 2, borderRadius: 3 }}
            disabled={uploading}
          >
            {supplementary ? supplementary.name : 'Upload Supplementary Files'}
            <input type="file" hidden onChange={(e) => handleFileChange(e, setSupplementary)} />
          </Button>
        </Box>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: 3 }}
            onClick={handleSaveDraft}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Save as Draft'}
          </Button>

          <Button
            variant="contained"
            sx={{ borderRadius: 3 }}
            onClick={handleSubmit}
            disabled={uploading}
          >
            Submit Manuscript
          </Button>
        </Box>
      </GlassCard>
    </Box>
  );
}
