'use client';

import { IconButton, Tooltip } from '@mui/material';
import { useThemeMode } from '../theme/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {  Brightness4Outlined, Sunny, WbSunnyOutlined } from '@mui/icons-material';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
      <IconButton
        onClick={toggleTheme}
        color="primary"
        size="large"
      >
        {mode === 'light' ? <Brightness4Outlined sx={{color:"info"}}/> : <WbSunnyOutlined />}
      </IconButton>
    </Tooltip>
  );
}
