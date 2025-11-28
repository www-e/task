'use client';

import DashboardLayout from '@/components/Layout/DashboardLayout';
import AnnouncementManager from '@/components/Dashboard/AnnouncementManager';
import requireAuth from '@/components/HOC/requireAuth';
import { useGetDashboardDataQuery } from '@/lib/features/apiSlice';
import { Box, Typography } from '@mui/material';

function AnnouncementsPage() {
  const { data, isLoading, error } = useGetDashboardDataQuery();

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#153c5e', mb: 1 }}>
          Announcements Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create, edit, and manage all announcements from this dedicated page.
        </Typography>
      </Box>

      <AnnouncementManager 
        data={data?.announcements || []} 
        isLoading={isLoading} 
      />
    </DashboardLayout>
  );
}

export default requireAuth(AnnouncementsPage);