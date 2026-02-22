'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, useTheme, Paper, Avatar, IconButton, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { signUp } from '@/redux/actions/authActions';

import { PhotoCamera } from '@mui/icons-material';
import useCloudinaryImage from '@/hooks/useCloudinaryImage';


export default function Signup() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { uploadImages, uploading } = useCloudinaryImage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    if (selectedImage) {
      const uploadedUrl = await uploadImages(selectedImage, 'profile');
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        console.error('Image upload failed.');
        return;
      }
    }

    const finalFormData = { ...formData, profileImage: imageUrl };

    dispatch(signUp(finalFormData));
    console.log('Form Submitted:', finalFormData);
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 4, md: 6 },
          borderRadius: 6,
          backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          maxWidth: '1100px',
          width: '100%',
        }}
      >
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" width="100%" gap={6}>
          <Box flex={1} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography
              variant="h2"
              sx={{
                color: '#1976d2',
                fontWeight: 'bold',
                fontSize: { xs: '3rem', md: '4rem' },
                fontFamily: 'Dancing Script, cursive',
              }}
            >
              JournalHub
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.primary',
                mt: 2,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                maxWidth: 400,
              }}
            >
              Create your account and start preserving your thoughts today.
            </Typography>
          </Box>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ flex: 1 }}>
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'dark' ? '#ffffff00' : 'white',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2} alignItems="center">
                  <input
                    accept="image/*"
                    type="file"
                    id="profile-image"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile-image">
                    <IconButton component="span">
                      <Avatar
                        src={previewUrl || '/default-avatar.png'} // Provide a default avatar if needed
                        sx={{ width: 100, height: 100 }}
                      />
                      <PhotoCamera sx={{ position: 'absolute', bottom: 0, right: 0, color: 'white' }} />
                    </IconButton>
                  </label>
                  {uploading && <CircularProgress size={24} />}

                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white', borderRadius: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white', borderRadius: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white', borderRadius: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white', borderRadius: 2 }}
                    required
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={uploading}
                    sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold', borderRadius: 2, '&:hover': { backgroundColor: '#1565c0' } }}
                  >
                    {uploading ? 'Uploading...' : 'Create Account'}
                  </Button>
                </Box>
              </form>
            </Paper>

            <Typography variant="body2" textAlign="center" mt={4}>
              By creating an account, you agree to our{' '}
              <Link href="#" underline="hover" fontWeight="bold" color="text.primary">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="#" underline="hover" fontWeight="bold" color="text.primary">
                Privacy Policy
              </Link>
              .
            </Typography>

            <Typography variant="body2" textAlign="center" mt={2}>
              Already have an account?{' '}
              <Link href="/signin" underline="hover" fontWeight="bold" color="text.primary">
                Log In
              </Link>
            </Typography>
          </motion.div>
        </Box>
      </Paper>
    </Box>
  );
}
