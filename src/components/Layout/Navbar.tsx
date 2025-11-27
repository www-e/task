'use client';
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton, Avatar, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        width: { md: `calc(100% - 250px)` }, // Push right by sidebar width
        ml: { md: '250px' },
        bgcolor: '#f5f7fa', // Transparent/Light BG
        color: '#333',
        py: 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Welcome Message */}
        <Typography variant="h5" fontWeight="bold" sx={{ color: '#153c5e' }}>
          Welcome {user?.name || 'Student'},
        </Typography>

        {/* Right Section: Search + Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          
          {/* Search Bar */}
          <Box sx={{ 
            position: 'relative', 
            bgcolor: '#fff', 
            borderRadius: 5, 
            px: 2, 
            py: 0.5,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            <SearchIcon sx={{ color: '#999', mr: 1 }} />
            <InputBase placeholder="Search..." sx={{ width: 200 }} />
          </Box>

          {/* Icons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton>
              <Badge badgeContent={2} color="primary">
                <NotificationsIcon sx={{ color: '#33b5a9' }} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <EmailIcon sx={{ color: '#33b5a9' }} />
              </Badge>
            </IconButton>
          </Box>

          {/* Avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar 
              src={user?.avatar} 
              alt={user?.name} 
              sx={{ width: 40, height: 40 }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}