'use client';
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Courses
import SchoolIcon from '@mui/icons-material/School'; // Gradebook
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Performance
import CampaignIcon from '@mui/icons-material/Campaign'; // Announcement
import QuizIcon from '@mui/icons-material/Quiz'; // Quiz
import { usePathname } from 'next/navigation';
import useAppTranslation from '@/hooks/useAppTranslation';

const MENU_ITEMS = [
  { key: 'dashboard', icon: <DashboardIcon />, path: '/' },
  { key: 'schedule', icon: <CalendarMonthIcon />, path: '/schedule' },
  { key: 'courses', icon: <MenuBookIcon />, path: '/courses' },
  { key: 'gradebook', icon: <SchoolIcon />, path: '/gradebook' },
  { key: 'performance', icon: <TrendingUpIcon />, path: '/performance' },
  { key: 'announcements', icon: <CampaignIcon />, path: '/announcements' },
  { key: 'quizzes', icon: <QuizIcon />, path: '/quizzes' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const { t } = useAppTranslation();

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        background: 'linear-gradient(180deg, #0a2842 0%, #153c5e 25%, #1e4d76 50%, #2a5f8a 75%, #153c5e 100%)', // Enhanced Multi-stop Navy Gradient
        color: '#fff',
        position: 'fixed',
        left: 0,
        top: 0,
        display: { xs: 'none', md: 'block' }, // Hide on mobile (simplified)
        zIndex: 1200,
        boxShadow: '4px 0 10px rgba(0,0,0,0.15)',
      }}
    >
      {/* Brand Logo */}
      <Box sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: 1 }}>
          Coligo
        </Typography>
      </Box>

      {/* Navigation List */}
      <List sx={{ px: 2 }}>
        {MENU_ITEMS.map((item) => {
          // Logic: Active if path matches, or strictly for Dashboard '/'
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.key} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={isActive}
                sx={{
                  borderRadius: 1,
                  color: '#fff', // Default Text Color
                  '&.Mui-selected, &:hover': {
                    backgroundColor: '#ffffff', // Hover/Active BG: White (as required)
                    color: '#ffffff', // Hover/Active Text: White (as required per spec)
                    '& .MuiListItemIcon-root': {
                      color: '#ffffff', // Hover/Active Icon: White (as required per spec)
                    },
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#fff', // Default Icon Color
                    minWidth: 40,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={t(item.key) || item.key}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}