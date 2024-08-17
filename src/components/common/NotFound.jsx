import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
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
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
        <Typography component="h1" variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;