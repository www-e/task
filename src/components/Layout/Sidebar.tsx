'use client';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Courses
import SchoolIcon from '@mui/icons-material/School'; // Gradebook
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Performance
import CampaignIcon from '@mui/icons-material/Campaign'; // Announcement
import { usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Schedule', icon: <CalendarMonthIcon />, path: '/schedule' },
  { text: 'Courses', icon: <MenuBookIcon />, path: '/courses' },
  { text: 'Gradebook', icon: <SchoolIcon />, path: '/gradebook' },
  { text: 'Performance', icon: <TrendingUpIcon />, path: '/performance' },
  { text: 'Announcement', icon: <CampaignIcon />, path: '/announcement' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        background: 'linear-gradient(180deg, #153c5e 0%, #1e4d76 100%)', // Navy Gradient
        color: '#fff',
        position: 'fixed',
        left: 0,
        top: 0,
        display: { xs: 'none', md: 'block' }, // Hide on mobile (simplified)
        zIndex: 1200,
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
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={isActive}
                sx={{
                  borderRadius: 1,
                  color: '#fff', // Default Text Color
                  '&.Mui-selected, &:hover': {
                    backgroundColor: '#ffffff', // Hover/Active BG: White
                    color: '#33b5a9', // Hover/Active Text: Teal
                    '& .MuiListItemIcon-root': {
                      color: '#33b5a9', // Hover/Active Icon: Teal
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
                  primary={item.text} 
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