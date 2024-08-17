import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Unauthorized = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
        <Typography component="h1" variant="h4" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Sorry, you don't have permission to access this page. If you believe this is an error, please contact support.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;