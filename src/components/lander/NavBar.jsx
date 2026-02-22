'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function Navbar() {
  const [mode, setMode] = useState('light');
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    palette: { mode },
    typography: {
      fontFamily: 'Inter, sans-serif',
      button: { textTransform: 'none' },
    },
  });

  const toggleColorMode = () =>
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const toggleDrawer = () => () => setOpen(state);

  const navItems = ['Journals', 'Articles', 'Community', 'Library'];

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ backdropFilter: 'blur(6px)' }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            JournalHub
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {navItems.map(item => (
              <Button key={item} color="inherit">
                {item}
              </Button>
            ))}

            <Button variant="outlined" color="inherit" sx={{ ml: 1 }}>
              Login
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { width: 260, p: 2 },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          JournalHub
        </Typography>

        <Divider />

        <List>
          {navItems.map(item => (
            <ListItem button key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Button variant="outlined" fullWidth>
          Login
        </Button>
      </Drawer>
    </ThemeProvider>
  );
}
