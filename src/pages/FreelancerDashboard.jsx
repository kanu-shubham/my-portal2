import React, { useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import UserProfile from '../components/Freelancer/UserProfile';
import JobListings from '../components/Freelancer/JobListings';

const FreelancerDashboard = () => {
  const [user, setUser] = useState(null);

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    // In a real app, you'd send this data to your backend
    console.log('Updated user profile:', updatedUser);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Your Profile
            </Typography>
            <UserProfile user={user} onUpdate={handleProfileUpdate} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Available Jobs
            </Typography>
            <JobListings />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreelancerDashboard;