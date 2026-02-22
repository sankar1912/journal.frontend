'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Send,
  PrivacyTip,
  Gavel,
  SupportAgent,
  ContactSupport,
  Info,
  Shield,
  Help,
  Settings,
  Build,
  ReportProblem,
  AccountCircle,
  Email,
  Language,
  Phone,
  Policy,
} from '@mui/icons-material';

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enquiry Submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const linkItems = [
    { label: 'Privacy Policy', icon: <PrivacyTip fontSize="small" />, href: '/privacy-policy' },
    { label: 'Terms & Conditions', icon: <Gavel fontSize="small" />, href: '/terms-conditions' },
    { label: 'Technical Support', icon: <SupportAgent fontSize="small" />, href: '/support' },
    { label: 'Contact Us', icon: <ContactSupport fontSize="small" />, href: '/contact' },
    { label: 'About Us', icon: <Info fontSize="small" />, href: '/about' },
    { label: 'Security', icon: <Shield fontSize="small" />, href: '/security' },
    { label: 'FAQs', icon: <Help fontSize="small" />, href: '/faqs' },
    { label: 'Settings', icon: <Settings fontSize="small" />, href: '/settings' },
    { label: 'Developer Tools', icon: <Build fontSize="small" />, href: '/developer-tools' },
    { label: 'Report Issue', icon: <ReportProblem fontSize="small" />, href: '/report' },
    { label: 'User Account', icon: <AccountCircle fontSize="small" />, href: '/account' },
    { label: 'Email Us', icon: <Email fontSize="small" />, href: '/email' },
    { label: 'Language Support', icon: <Language fontSize="small" />, href: '/language' },
    { label: 'Call Us', icon: <Phone fontSize="small" />, href: '/call' },
    { label: 'Policy Updates', icon: <Policy fontSize="small" />, href: '/policy-updates' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        mt: 8,
        py: 6,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        bottom:0,
        color:"white"
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        gap={4}
        mb={6}
      >
        <Box flex={1}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Send us a Message
          </Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              name="name"
              required
              variant="filled"
              value={formData.name}
              onChange={handleChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '30px',
                input: { padding: '12px' },
              }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              variant="filled"
              value={formData.email}
              onChange={handleChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '30px',
                input: { padding: '12px' },
              }}
            />
            <TextField
              label="Message"
              name="message"
              required
              multiline
              minRows={4}
              variant="filled"
              value={formData.message}
              onChange={handleChange}
              sx={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                textarea: { padding: '12px' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              endIcon={<Send />}
              sx={{
                mt: 2,
                borderRadius: '50px',
                px: 4,
                backgroundColor: '#fff',
                color: theme.palette.primary.main,
                '&:hover': { backgroundColor: '#ddd' },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>

        {/* Center: Important Links */}
        <Box flex={1} display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Useful Links
          </Typography>
          <Box display="grid" gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'} gap={1}>
            {linkItems.map((item) => (
              <Box
                key={item.label}
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline', color: '#ddd' },
                }}
              >
                {item.icon}
                <MuiLink href={item.href} underline="none" color="inherit">
                  {item.label}
                </MuiLink>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right: Social Media Icons */}
        <Box flex={1} display="flex" flexDirection="column" alignItems={isMobile ? 'flex-start' : 'flex-end'}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Follow Us
          </Typography>
          <Box display="flex" gap={2}>
            <IconButton sx={{ backgroundColor: '#fff', color: theme.palette.primary.main, '&:hover': { backgroundColor: '#ddd' } }} href="https://facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton sx={{ backgroundColor: '#fff', color: theme.palette.primary.main, '&:hover': { backgroundColor: '#ddd' } }} href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton sx={{ backgroundColor: '#fff', color: theme.palette.primary.main, '&:hover': { backgroundColor: '#ddd' } }} href="https://instagram.com" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton sx={{ backgroundColor: '#fff', color: theme.palette.primary.main, '&:hover': { backgroundColor: '#ddd' } }} href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#bbb', mb: 2 }} />

      {/* Bottom Section */}
      <Typography variant="body2" align="center" color="grey.300">
        © {new Date().getFullYear()} Journal Management App. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
