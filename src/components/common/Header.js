import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Authentication state changed:', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    console.log('Logout clicked');
    logout();
  };

  console.log('Rendering Header. isAuthenticated:', isAuthenticated, 'user:', user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Quick Hire
          </RouterLink>
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/jobs">
            Find Jobs
          </Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to={user.userType === 'freelancer' ? '/freelancer-dashboard' : '/employer-dashboard'}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;