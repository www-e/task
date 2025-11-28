'use client';
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton, Avatar, Badge, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { logoutUser } from '@/lib/features/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    handleMenuClose();
    router.push('/login');
  };

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

          {/* Avatar with Logout Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={handleMenuClick}>
              <Avatar 
                src={user?.avatar || "https://i.pravatar.cc/150?u=talia"} 
                alt={user?.name} 
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}