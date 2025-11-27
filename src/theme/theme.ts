'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#33b5a9', // Coligo Teal (Buttons, Active States)
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#153c5e', // Sidebar Navy Blue
    },
    background: {
      default: '#f5f7fa', // Light Dashboard Background
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Keep buttons sentence case like image
          borderRadius: '4px',
        },
      },
    },
  },
});

export default theme;