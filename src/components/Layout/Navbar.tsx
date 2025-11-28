'use client';
import { AppBar, Toolbar, Typography, Box, InputBase, IconButton, Avatar, Badge, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { logoutUser } from '@/lib/features/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAppTranslation from '@/hooks/useAppTranslation';

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isLangMenuOpen = Boolean(langAnchorEl);
  const { t, changeLanguage, currentLanguage } = useAppTranslation();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenuClose = () => {
    setLangAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    handleMenuClose();
    router.push('/login');
  };

  const handleChangeLanguage = (lng: string) => {
    changeLanguage(lng);
    handleLangMenuClose();
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
          {t('welcome') || 'Welcome'} {user?.name || t('student') || 'Student'},
        </Typography>

        {/* Right Section: Search + Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          {/* Language Selector */}
          <IconButton
            onClick={handleLangMenuClick}
            sx={{ color: '#33b5a9' }}
          >
            <LanguageIcon />
          </IconButton>

          {/* Language Menu */}
          <Menu
            anchorEl={langAnchorEl}
            open={isLangMenuOpen}
            onClose={handleLangMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              selected={currentLanguage === 'en'}
              onClick={() => handleChangeLanguage('en')}
            >
              <ListItemIcon>
                <span>🇺🇸</span>
              </ListItemIcon>
              <ListItemText>English</ListItemText>
            </MenuItem>
            <MenuItem
              selected={currentLanguage === 'ar'}
              onClick={() => handleChangeLanguage('ar')}
            >
              <ListItemIcon>
                <span>🇸🇦</span>
              </ListItemIcon>
              <ListItemText>العربية</ListItemText>
            </MenuItem>
          </Menu>

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
            <InputBase placeholder={t('search') || "Search..."} sx={{ width: 200 }} />
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
                {t('logout') || 'Logout'}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}