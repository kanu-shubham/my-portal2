import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

const Navigation = () => {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Freelancer Platform
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            {user.type === 'freelancer' && (
              <Button color="inherit" component={Link} to="/jobs">Find Jobs</Button>
            )}
            {user.type === 'employer' && (
              <Button color="inherit" component={Link} to="/post-job">Post Job</Button>
            )}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button>
        )}
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;