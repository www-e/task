'use client';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // If not logged in, don't show the dashboard layout (handled by HOC later, 
  // but good for UI consistency)
  if (!isAuthenticated) {
    return <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>{children}</Box>;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 4, 
          mt: 8, // Space for Navbar
          ml: { md: '250px' }, // Space for Sidebar
          width: { md: `calc(100% - 250px)` }
        }}
      >
        <Navbar />
        {children}
      </Box>
    </Box>
  );
}