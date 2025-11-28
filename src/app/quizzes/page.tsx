'use client';

import DashboardLayout from '@/components/Layout/DashboardLayout';
import QuizManager from '@/components/Dashboard/QuizManager';
import requireAuth from '@/components/HOC/requireAuth';
import { useGetDashboardDataQuery } from '@/lib/features/apiSlice';
import { Box, Typography } from '@mui/material';

function QuizzesPage() {
  const { data, isLoading, error } = useGetDashboardDataQuery();

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#153c5e', mb: 1 }}>
          Quizzes & Assignments Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create, edit, and manage all quizzes and assignments from this dedicated page.
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