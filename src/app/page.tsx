'use client';

import { Box, Grid, CircularProgress, Typography } from '@mui/material'; // Standard Import
import DashboardLayout from '@/components/Layout/DashboardLayout';
import HeroSection from '@/components/Dashboard/HeroSection';
import AnnouncementManager from '@/components/Dashboard/AnnouncementManager';
import QuizManager from '@/components/Dashboard/QuizManager';
import requireAuth from '@/components/HOC/requireAuth';
import { useGetDashboardDataQuery } from '@/lib/features/apiSlice';
import useAppTranslation from '@/hooks/useAppTranslation';

function Dashboard() {
  const { data, isLoading, error } = useGetDashboardDataQuery({
    // Add refetch options to improve performance
    refetchOnMountOrArgChange: false,  // Don't refetch on every mount
    refetchOnReconnect: false,         // Don't refetch on reconnection
    refetchOnFocus: false,             // Don't refetch when window gains focus
  });
  const { t } = useAppTranslation();

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
          {t('failedToLoadDashboard') || 'Failed to load dashboard data. Is the backend running?'}
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

        {/* Left Column: Announcements with CRUD */}
        {/* API Change: No 'item'. Use 'size' object for breakpoints */}
        <Grid size={{ xs: 12, md: 8 }}>
          <AnnouncementManager data={data?.announcements || []} isLoading={isLoading} />
        </Grid>

        {/* Right Column: Quizzes/Due with CRUD */}
        <Grid size={{ xs: 12, md: 4 }}>
          <QuizManager data={data?.quizzes || []} isLoading={isLoading} />
        </Grid>

      </Grid>
    </DashboardLayout>
  );
}

export default requireAuth(Dashboard);