'use client';
import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Box, CircularProgress } from '@mui/material';

// Use Generics to preserve the prop types of the wrapped component
export default function requireAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };
}