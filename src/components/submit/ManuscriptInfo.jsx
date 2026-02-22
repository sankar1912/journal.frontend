'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Paper,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setMessage } from '@/redux/slices/notificationSlice';

export default function ManuscriptInfo({ selectedJournal, coAuthDetails, setCoAuthDetails }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    typeOfManuscript: '',
    type: '',
    researchAreaInput: '',
    researchAreas: [],
    manuscriptTitle: '',
    ethicalApproval: '',
    abstract: '',
    keywords: '',
    fund: '',
    journal:selectedJournal._id
  });

  const [errors, setErrors] = useState({});
  const formRefs = {
    manuscriptTitle: useRef(null),
    typeOfManuscript: useRef(null),
    type: useRef(null),
    researchAreas: useRef(null),
    ethicalApproval: useRef(null),
    abstract: useRef(null),
  };

  useEffect(() => {
    const draftKey = `draft_${selectedJournal._id}`;
    const savedDraft = localStorage.getItem(draftKey);

    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      setFormData(parsedDraft);
      dispatch(setMessage('Information loaded from Draft'));
    }
  }, [selectedJournal._id, dispatch]);

  const manuscriptTypes = [
    'ARTICLE', 'REVIEW', 'CASE REPORT', 'RESEARCH PROPOSAL', 'NEWS',
    'COMMENT', 'CORRECTION', 'HYPOTHESIS', 'PREFACE', 'EDITORIAL',
    'REPORT', 'LETTER', 'EMPIRICAL FORMULA', 'EXPERT CONSENSUS',
    'LETTER TO EDITOR', 'QUESTIONNAIRE INVESTIGATION', 'CASE SERIES',
    'RETRACTION', 'MINI REVIEW', 'OTHERS',
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false }); // Clear error on change
  };

  const handleResearchAreaKeyPress = (e) => {
    if (e.key === 'Enter' && formData.researchAreaInput.trim()) {
      e.preventDefault();
      if (!formData.researchAreas.includes(formData.researchAreaInput.trim())) {
        setFormData({
          ...formData,
          researchAreas: [...formData.researchAreas, formData.researchAreaInput.trim()],
          researchAreaInput: '',
        });
        setErrors({ ...errors, researchAreas: false }); // Clear error if adding area
      }
    }
  };

  const handleDeleteResearchArea = (areaToDelete) => {
    setFormData({
      ...formData,
      researchAreas: formData.researchAreas.filter((area) => area !== areaToDelete),
    });
  };

  const handleSaveDraft = () => {
    const draftKey = `draft_${selectedJournal._id}`;
    localStorage.setItem(draftKey, JSON.stringify(formData));
    dispatch(setMessage('Draft saved successfully.'));
  };

  const handleProceed = () => {
    const newErrors = {};

    if (!formData.manuscriptTitle.trim()) newErrors.manuscriptTitle = true;
    if (!formData.typeOfManuscript.trim()) newErrors.typeOfManuscript = true;
    if (!formData.type.trim()) newErrors.type = true;
    if (formData.researchAreas.length === 0) newErrors.researchAreas = true;
    if (!formData.ethicalApproval.trim()) newErrors.ethicalApproval = true;

    const abstractWordCount = formData.abstract.trim().split(/\s+/).length;
    if (formData.abstract.trim() === '' || abstractWordCount < 200) newErrors.abstract = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      formRefs[firstErrorField]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      dispatch(setMessage('Please complete all required fields correctly.'));
      return;
    }
    handleSaveDraft();
    setCoAuthDetails(true); 
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, mx: 'auto', width: "90%" }}>
      <Typography variant='h3' color='primary' textAlign="center">Manuscript Information</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {selectedJournal.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email Address:</strong> {selectedJournal.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Website:</strong> {selectedJournal.website}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Editor-in-Chief:</strong> {selectedJournal.editorInChief}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Aim:</strong> {selectedJournal.aim}
        </Typography>
      </Paper>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Manuscript Information
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Manuscript Title
        </Typography>
        <TextField
          fullWidth
          label="Manuscript Title *"
          placeholder="Please enter title"
          value={formData.manuscriptTitle}
          onChange={(e) => handleChange('manuscriptTitle', e.target.value)}
          required
          error={!!errors.manuscriptTitle}
          inputRef={formRefs.manuscriptTitle}
        />

        {/* Type of Manuscript */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Type of Manuscript
        </Typography>
        <TextField
          select
          fullWidth
          label="Select Manuscript Type *"
          value={formData.typeOfManuscript}
          onChange={(e) => handleChange('typeOfManuscript', e.target.value)}
          required
          error={!!errors.typeOfManuscript}
          inputRef={formRefs.typeOfManuscript}
        >
          {manuscriptTypes.map((type, index) => (
            <MenuItem key={index} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        {/* Scope */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Scope
        </Typography>
        <TextField
          select
          fullWidth
          label="Type *"
          placeholder="Please select type"
          value={formData.type}
          onChange={(e) => handleChange('type', e.target.value)}
          required
          error={!!errors.type}
          inputRef={formRefs.type}
        >
          {selectedJournal?.scope?.map((scopeItem, index) => (
            <MenuItem key={index} value={scopeItem}>
              {scopeItem}
            </MenuItem>
          ))}
        </TextField>

        {/* Research Areas */}
        <Box ref={formRefs.researchAreas} sx={{ border: errors.researchAreas ? '1px solid red' : 'none', borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Research Areas *
          </Typography>
          <TextField
            fullWidth
            label="Enter research area and press Enter"
            placeholder="Example: Machine Learning"
            value={formData.researchAreaInput}
            onChange={(e) => handleChange('researchAreaInput', e.target.value)}
            onKeyPress={handleResearchAreaKeyPress}
          />
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.researchAreas.map((area, index) => (
              <Chip
                key={index}
                label={area}
                onDelete={() => handleDeleteResearchArea(area)}
                color="primary"
                sx={{ borderRadius: '8px' }}
              />
            ))}
          </Box>
        </Box>

        {/* Ethical Approval */}
        <Box ref={formRefs.ethicalApproval} sx={{ border: errors.ethicalApproval ? '1px solid red' : 'none', borderRadius: 1, p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Whether ethical approval was obtained? *
          </Typography>
          <RadioGroup
            row
            value={formData.ethicalApproval}
            onChange={(e) => handleChange('ethicalApproval', e.target.value)}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {/* Abstract */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Abstract * (Minimum 200 words)"
          placeholder="Please enter the abstract"
          value={formData.abstract}
          onChange={(e) => handleChange('abstract', e.target.value)}
          required
          error={!!errors.abstract}
          inputRef={formRefs.abstract}
        />

        {/* Keywords */}
        <TextField
          fullWidth
          label="Key words"
          placeholder="Enter keywords separated by commas"
          value={formData.keywords}
          onChange={(e) => handleChange('keywords', e.target.value)}
        />

        {/* Fund */}
        <TextField
          fullWidth
          label="Fund"
          placeholder="Please provide funding information if applicable"
          value={formData.fund}
          onChange={(e) => handleChange('fund', e.target.value)}
        />
        <Typography variant="body1" gutterBottom>
          Article Processing Charge: $0.00
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" sx={{ borderRadius: 3 }} onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button variant="contained" sx={{ borderRadius: 3 }} onClick={handleProceed}>
            Save and Proceed to the Next Step
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
