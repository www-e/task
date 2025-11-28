'use client';

import DashboardLayout from '@/components/Layout/DashboardLayout';
import QuizManager from '@/components/Dashboard/QuizManager';
import requireAuth from '@/components/HOC/requireAuth';
import { useGetDashboardDataQuery } from '@/lib/features/apiSlice';
import { Box, Typography } from '@mui/material';
import useAppTranslation from '@/hooks/useAppTranslation';

function QuizzesPage() {
  const { data, isLoading } = useGetDashboardDataQuery();
  const { t } = useAppTranslation();

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#153c5e', mb: 1 }}>
          {t('quizzesManagement') || 'Quizzes & Assignments Management'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('createEditQuizzes') || 'Create, edit, and manage all quizzes and assignments from this dedicated page.'}
        </Typography>
      </Box>

      <QuizManager
        data={data?.quizzes || []}
        isLoading={isLoading}
      />
    </DashboardLayout>
  );
}

export default requireAuth(QuizzesPage);