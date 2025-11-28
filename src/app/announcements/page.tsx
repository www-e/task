'use client';

import DashboardLayout from '@/components/Layout/DashboardLayout';
import AnnouncementManager from '@/components/Dashboard/AnnouncementManager';
import requireAuth from '@/components/HOC/requireAuth';
import { useGetDashboardDataQuery } from '@/lib/features/apiSlice';
import { Box, Typography } from '@mui/material';
import useAppTranslation from '@/hooks/useAppTranslation';

function AnnouncementsPage() {
  const { data, isLoading } = useGetDashboardDataQuery();
  const { t } = useAppTranslation();

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#153c5e', mb: 1 }}>
          {t('announcementsManagement') || 'Announcements Management'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('createEditAnnouncements') || 'Create, edit, and manage all announcements from this dedicated page.'}
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