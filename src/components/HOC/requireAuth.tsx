'use client';
import React, { useEffect, ComponentType } from 'react';
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
      let isMounted = true; // Prevent state updates on unmounted components

      // Verify authentication on mount
      const checkAuth = async () => {
        try {
          const result = await dispatch(verifyAuth());
          // Only redirect if component is still mounted and auth failed
          if (isMounted && !result.payload) {
            router.push('/login');
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          if (isMounted) {
            router.push('/login');
          }
        }
      };

      if (!isAuthenticated) {
        checkAuth();
      }

      // Cleanup function
      return () => {
        isMounted = false;
      };
    }, [dispatch, router, isAuthenticated]);

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