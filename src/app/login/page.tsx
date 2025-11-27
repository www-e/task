'use client';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '@/lib/features/authSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    dispatch(login());
    router.push('/');
  };

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
        
        <Button 
          variant="contained" 
          fullWidth 
          size="large"
          onClick={handleLogin}
          sx={{ 
            bgcolor: '#33b5a9', 
            py: 1.5,
            fontWeight: 'bold'
          }}
        >
          Login as Student
        </Button>
      </Paper>
    </Box>
  );
}