'use client';
import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { Box, CircularProgress } from '@mui/material';
import { verifyAuth } from '@/lib/features/authSlice';

// Use Generics to preserve the prop types of the wrapped component
export default function requireAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
      // Verify authentication on mount
      const checkAuth = async () => {
        try {
          await dispatch(verifyAuth());
        } catch (error) {
          console.error('Auth verification failed:', error);
          router.push('/login');
        }
      };

      checkAuth();
    }, [dispatch, router]);

    useEffect(() => {
      // Redirect if not authenticated and not loading
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, isLoading, router]);

    // Show loading while checking authentication
    if (!isAuthenticated || isLoading) {
      return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };
}