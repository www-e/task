'use client';

import { Box, Grid, CircularProgress, Typography } from '@mui/material'; // Standard Import
import DashboardLayout from '@/components/Layout/DashboardLayout';
import HeroSection from '@/components/Dashboard/HeroSection';
import Announcements from '@/components/Dashboard/Announcements';
import Quizzes from '@/components/Dashboard/Quizzes';
import requireAuth from '@/components/HOC/requireAuth';
import { useGetDashboardDataQuery } from '@/lib/features/apiSlice';

function Dashboard() {
  const { data, isLoading, error } = useGetDashboardDataQuery();

  // 1. Loading State
  if (isLoading) {
    return (
      <DashboardLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress size={60} sx={{ color: '#33b5a9' }} />
        </Box>
      </DashboardLayout>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <DashboardLayout>
        <Typography color="error" variant="h6" align="center" sx={{ mt: 10 }}>
          Failed to load dashboard data. Is the backend running?
        </Typography>
      </DashboardLayout>
    );
  }

  // 3. Success State (MUI v7 Grid API)
  return (
    <DashboardLayout>
      <HeroSection />

      {/* Container still needs 'container' and 'spacing' */}
      <Grid container spacing={4}>
        
        {/* Left Column: Announcements */}
        {/* API Change: No 'item'. Use 'size' object for breakpoints */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Announcements data={data?.announcements || []} />
        </Grid>

        {/* Right Column: Quizzes/Due */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Quizzes data={data?.quizzes || []} />
        </Grid>
        
      </Grid>
    </DashboardLayout>
  );
}

export default requireAuth(Dashboard);