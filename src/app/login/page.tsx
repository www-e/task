'use client';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/lib/features/authSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';
import { AppDispatch } from '@/lib/store';
import { useEffect } from 'react';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    const result = await dispatch(loginUser());
    if (loginUser.fulfilled.match(result)) {
      router.push('/');
    }
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Prevent form resubmission on page refresh after login
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Cleanup any temporary login states if needed
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #153c5e 0%, #33b5a9 100%)'
      }}
    >
      <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4, maxWidth: 400 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#153c5e', mb: 2 }}>
          Coligo
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Welcome back! Please login to access your dashboard.
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
        <Button 
          variant="contained" 
          fullWidth 
          size="large"
          onClick={handleLogin}
          disabled={isLoading}
          sx={{ 
            bgcolor: '#33b5a9', 
            py: 1.5,
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#2aa089',
            }
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            'Login as Student'
          )}
        </Button>
      </Paper>
    </Box>
  );
}