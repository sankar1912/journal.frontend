'use client';

import React, { useState } from 'react';
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
  MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { setMessage } from '@/redux/slices/notificationSlice';
import { Google } from '@mui/icons-material';

export default function UserProfile() {
  const { auth } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const { uploadFiles, uploading: fileUploading } = useCloudinaryFile();
  const { uploadImages, uploading: imageUploading } = useCloudinaryImage();

  const degrees = ['B.E.', 'B.Tech', 'B.Sc', 'M.E.', 'M.Tech', 'M.Sc', 'Ph.D'];
  const occupations = ['Student', 'Professor', 'Researcher', 'Industry Professional', 'Postdoc'];

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
    profileImage: auth?.profileImage || '',
    researchAreas: auth?.researchAreas || [],
    bio: auth?.bio || '',
    degree: auth?.degree || '',
    occupation: auth?.occupation || ''
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

    if (profileImageFile) {
      const uploadedImageUrl = await uploadImages(profileImageFile, auth.email);
      if (uploadedImageUrl) {
        updatedFormData.profileImage = uploadedImageUrl;
      }
    }

    dispatch(modifyUser(updatedFormData));
    setEditMode(false);
    setProfileImageFile(null);
  };

  if (!auth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Typography variant="h6">Please log in to view profile.</Typography>
      </Box>
    );
  }

  const renderField = (label, fieldKey, IconComponent, isPrimary = false) => {
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconComponent color="primary" />
        <Typography variant="body1" fontWeight="bold" color={isPrimary ? 'primary' : 'textPrimary'}>
          {label}:
        </Typography>
        {editMode ? (
          <TextField
            size="small"
            variant="outlined"
            value={formData[fieldKey]}
            onChange={(e) => handleChange(fieldKey, e.target.value)}
            InputProps={{
              sx: {
                borderRadius: '50px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                px: 2,
                '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.2)' },
                '&:hover fieldset': { borderColor: 'rgba(25, 118, 210, 0.8)' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: '2px' },
              },
            }}
          />
        ) : (
          <Typography variant="body1">{formData[fieldKey] || '-'}</Typography>
        )}
      </Stack>
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="80vh"
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 5,
          padding: 4,
          width: '100%',
          maxWidth: '1000px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="primary">Your Profile</Typography>
          <Stack direction="row" spacing={1}>
            {!editMode ? (
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>
                Edit
              </Button>
            ) : (
              <IconButton onClick={() => setEditMode(false)} color="error">
                <CloseIcon />
              </IconButton>
            )}
          </Stack>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                src={previewImage}
                sx={{ width: 140, height: 140, border: '4px solid #1976d2' }}
              />
              {editMode && (
                <Button variant="outlined" component="label" sx={{ borderRadius: 3 }}>
                  Upload Image
                  <input type="file" accept="image/*" hidden onChange={handleProfileImageSelect} />
                </Button>
              )}
              <Typography variant="h5" fontWeight="bold" color="primary">{auth.name || 'Author Name'}</Typography>
              {fileUploading || imageUploading ? (
                <CircularProgress size={24} />
              ) : editMode && (
                <Button variant="contained" onClick={handleSave} sx={{ borderRadius: 3 }}>
                  Save
                </Button>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={3} >

              {renderField('Name', 'name', PersonIcon, true)}
              {renderField('Email', 'email', EmailIcon, true)}
              {renderField('Phone', 'phone', PhoneIcon)}
              {renderField('Google Scholar', 'googleScholar', Google)}
              {renderField('ORCID', 'orcid', BadgeIcon)}

              {/* Degree */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <SchoolIcon color="primary" />
                <Typography variant="body1" fontWeight="bold">Degree:</Typography>
                {editMode ? (
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    value={formData.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    InputProps={{
                      sx: {
                        borderRadius: '50px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        px: 2,
                        '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(25, 118, 210, 0.8)' },
                        '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: '2px' },
                      },
                    }}
                  >
                    {degrees.map((degree, index) => (
                      <MenuItem key={index} value={degree}>
                        {degree}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <Typography variant="body1">{formData.degree || '-'}</Typography>
                )}
              </Stack>

              {/* Occupation */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <WorkIcon color="primary" />
                <Typography variant="body1" fontWeight="bold">Occupation:</Typography>
                {editMode ? (
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    value={formData.occupation}
                    onChange={(e) => handleChange('occupation', e.target.value)}
                    InputProps={{
                      sx: {
                        borderRadius: '50px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        px: 2,
                        '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(25, 118, 210, 0.8)' },
                        '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: '2px' },
                      },
                    }}
                  >
                    {occupations.map((occupation, index) => (
                      <MenuItem key={index} value={occupation}>
                        {occupation}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <Typography variant="body1">{formData.occupation || '-'}</Typography>
                )}
              </Stack>

              {/* Bio Section */}
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <DescriptionIcon color="primary" />
                  <Typography variant="body1" fontWeight="bold">Bio:</Typography>
                </Stack>
                {editMode ? (
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    variant="outlined"
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      '& .MuiOutlinedInput-root': { borderRadius: 3 },
                    }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {formData.bio || 'No bio available.'}
                  </Typography>
                )}
              </Stack>

              {/* Research Areas */}
              <Box>
                <Typography variant="h6" fontWeight="bold" color="primary" mb={1}>Research Areas</Typography>
                {editMode && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type and press Enter to add research area"
                    value={newResearchArea}
                    onChange={(e) => setNewResearchArea(e.target.value)}
                    onKeyDown={handleAddResearchArea}
                    sx={{
                      borderRadius: '50px',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      mb: 2
                    }}
                  />
                )}

                <Stack direction="row" spacing={1} flexWrap="wrap">
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
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
