import React from 'react';
import { Container, Grid, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '../components/Freelancer/ProfileSection';
import JobRecommendations from '../components/Freelancer/JobsRecommendations';
import PendingActions from '../components/Freelancer/PendingActions';
import RecentActivity from '../components/Freelancer/RecentActivity';
import useUserData from '../hooks/data/useUserData';

const FreelancerDashboard = () => {
  const { userData, loading, error } = useUserData();
  
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/user-profile');
  };

  const handleViewJob = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const handleViewAllJobs = () => {
    navigate('/job-listings');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {userData?.name}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <ProfileSection 
              profile={userData?.profile} 
              onViewProfile={handleViewProfile}
            />
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <JobRecommendations jobs={userData?.recommendedJobs}
              onViewJob={handleViewJob}
              onViewAllJobs={handleViewAllJobs} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <PendingActions actions={userData?.pendingActions} />
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <RecentActivity activities={userData?.recentActivities} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FreelancerDashboard;