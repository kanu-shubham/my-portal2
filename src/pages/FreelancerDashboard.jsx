import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import UserProfile from '../components/Freelancer/UserProfile';
import RecentActivity from '../components/Freelancer/RecentActivity';
import JobListings from '../components/Freelancer/JobListings';
import { useAuth } from '../hooks/useAuth'; // Adjust the import path as needed

const FreelancerDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* User Profile with GitHub Repos */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>User Profile</Typography>
            <UserProfile user={user} />
          </Paper>
        </Grid>

        {/* Job Listings */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Job Listings</Typography>
            <JobListings />
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <RecentActivity />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreelancerDashboard;