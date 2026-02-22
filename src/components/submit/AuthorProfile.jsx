'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthState } from '@/redux/slices/authSlice';
import { modifyUser } from '@/redux/actions/authActions';
import useCloudinaryFile from '@/hooks/useCloudinaryFile';
import useCloudinaryImage from '@/hooks/useCloudinaryImage';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Chip,
  Divider,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { setMessage } from '@/redux/slices/notificationSlice';

export default function AuthorProfile({ authDetails, setAuthDetails }) {
  const { auth } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const { uploadFiles, uploading: fileUploading } = useCloudinaryFile();
  const { uploadImages, uploading: imageUploading } = useCloudinaryImage();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [editMode, setEditMode] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(auth?.profileImage || '/default-profile.png');

  const [formData, setFormData] = useState({
    _id: auth?._id,
    name: auth?.name || '',
    email: auth?.email || '',
    phone: auth?.phone || '',
    orcid: auth?.orcid || '',
    googleScholar: auth?.googleScholar || '',
    resume: auth?.resume || '',
    profileImage: auth?.profileImage || '',
    researchAreas: auth?.researchAreas || [],
  });

  const [newResearchArea, setNewResearchArea] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddResearchArea = (e) => {
    if (e.key === 'Enter' && newResearchArea.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        researchAreas: [...prevData.researchAreas, newResearchArea.trim()],
      }));
      setNewResearchArea('');
      e.preventDefault();
    }
  };

  const handleDeleteResearchArea = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      researchAreas: prevData.researchAreas.filter((_, i) => i !== index),
    }));
  };

  const handleResumeSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      dispatch(setMessage('Please upload a PDF file.'));
    }
  };

  const handleProfileImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfileImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      dispatch(setMessage('Please upload a valid image file.'));
    }
  };

  const handleSave = async () => {
    let updatedFormData = { ...formData };

    if (resumeFile) {
      const uploadedUrl = await uploadFiles(resumeFile, auth.email);
      if (uploadedUrl) {
        updatedFormData.resume = uploadedUrl;
      }
    }

    if (profileImageFile) {
      const uploadedImageUrl = await uploadImages(profileImageFile, auth.email);
      if (uploadedImageUrl) {
        updatedFormData.profileImage = uploadedImageUrl;
      }
    }

    dispatch(modifyUser(updatedFormData));
    setEditMode(false);
    setResumeFile(null);
    setProfileImageFile(null);
  };

  if (!auth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Typography variant="h6">Please log in to view profile.</Typography>
      </Box>
    );
  }

  useEffect(() => {
    if (auth.name !== "" && auth.email !== "" && auth.phone !== "" && auth?.researchAreas?.length > 0 && auth.orcid !== "") {
      setAuthDetails(true);
    } else {
      dispatch(setMessage("Please fill all the required fields to continue."));
    }
  }, [auth]);

  const renderField = (label, fieldKey) => {
    const isMissing = !auth[fieldKey];

    return (
      <Stack direction="row" justifyContent="left" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="body1" noWrap fontWeight="bold">{label} :</Typography>
        {editMode && isMissing ? (
          <TextField
            size="small"
            value={formData[fieldKey]}
            onChange={(e) => handleChange(fieldKey, e.target.value)}
            sx={{ ml: 2 }}
          />
        ) : (
          <Typography variant="body1" sx={{ ml: 2 }} noWrap>
            {formData[fieldKey] || '-'}
          </Typography>
        )}
      </Stack>
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      sx={{ padding: 4 }}
    >
      <Paper elevation={4} sx={{ borderRadius: 4, p: 4, width: '100%', position: 'relative' }}>
        <Box position="absolute" top={16} right={16}>
          {!editMode && (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          )}
        </Box>

        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item size={{xs:12, md:4}}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={previewImage}
                sx={{ width: 120, height: 120, border: '4px solid #1976d2' }}
              />
              {editMode && (
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ borderRadius: 3 }}
                >
                  Upload Image
                  <input type="file" accept="image/*" hidden onChange={handleProfileImageSelect} />
                </Button>
              )}
              <Typography variant="h5" fontWeight="bold">
                {auth.name || 'Author name'}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ borderRadius: 3 }}
              >
                Profile settings
              </Button>
            </Stack>
          </Grid>
          <Grid item size={{xs:12, md:8}}>
            <Stack spacing={2}>
              {renderField('Real name', 'name')}
              {renderField('Email', 'email')}
              {renderField('Phone', 'phone')}
              {renderField('ORCID', 'orcid')}

              <Stack direction="row" justifyContent="left" alignItems="center">
                <Typography variant="body1" fontWeight="bold">
                  Google Scholar profile page :
                </Typography>
                {editMode && !auth.googleScholar ? (
                  <TextField
                    size="small"
                    value={formData.googleScholar}
                    onChange={(e) => handleChange('googleScholar', e.target.value)}
                    sx={{ ml: 2 }}
                  />
                ) : formData.googleScholar ? (
                  <Chip label="Certified" color="warning" size="small" sx={{ ml: 2 }} />
                ) : (
                  <Typography variant="body1" sx={{ ml: 2 }}>-</Typography>
                )}
              </Stack>

              <Stack direction="row" justifyContent="left" alignItems="center">
                <Typography variant="body1" fontWeight="bold">
                  Resume :
                </Typography>

                {auth.resume ? (
                  <Button
                    variant="contained"
                    startIcon={<InsertDriveFileIcon />}
                    href={auth.resume}
                    target="_blank"
                    sx={{ borderRadius: 3, backgroundColor: '#4CAF50', ml: 2 }}
                  >
                    {formData.resume.split('/').pop().slice(0, 20)}...
                  </Button>
                ) : (
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    No Resume Uploaded
                  </Typography>
                )}

                {editMode && (
                  <Box ml={2}>
                    <Button variant="outlined" component="label" sx={{ borderRadius: 3 }}>
                      {resumeFile ? resumeFile.name : 'Upload PDF'}
                      <input type="file" accept="application/pdf" hidden onChange={handleResumeSelect} />
                    </Button>
                  </Box>
                )}

                {(fileUploading || imageUploading) && <CircularProgress size={20} sx={{ ml: 2 }} />}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Research areas
                </Typography>
                <Button variant="outlined" sx={{ borderRadius: 3 }}>
                  +Add Field
                </Button>
              </Stack>

              {editMode && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type and press Enter to add research area"
                  value={newResearchArea}
                  onChange={(e) => setNewResearchArea(e.target.value)}
                  onKeyDown={handleAddResearchArea}
                  sx={{ borderRadius: 3 }}
                />
              )}

              <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
                {formData.researchAreas.length > 0 ? (
                  formData.researchAreas.map((area, index) => (
                    <Chip
                      key={index}
                      label={area}
                      color="primary"
                      onDelete={editMode ? () => handleDeleteResearchArea(index) : undefined}
                    />
                  ))
                ) : (
                  <Typography variant="body1">No research areas added.</Typography>
                )}
              </Stack>

              {editMode && (
                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    sx={{ borderRadius: 3 }}
                    disabled={fileUploading || imageUploading}
                  >
                    {(fileUploading || imageUploading) ? 'Uploading...' : 'Save'}
                  </Button>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Button sx={{alignItems:"center"}} onClick={()=>{
            if (auth.name !== "" && auth.email !== "" && auth.phone !== "" && auth?.researchAreas?.length > 0 && auth.orcid !== "") {
      setAuthDetails(true);
    } else {
      dispatch(setMessage("Please fill all the required fields to continue."));
    }
        }} variant='contained'>Proceed</Button>
      </Paper>
    </Box>
  );
}
