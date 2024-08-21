import React from 'react';
import { Container, Grid, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileSection from '../../components/Freelancer/ProfileSection';
import JobRecommendations from '../../components/Freelancer/JobsRecommendations';
import PendingActions from '../../components/Freelancer/PendingActions';
import RecentActivity from '../../components/Freelancer/RecentActivity';
import useUserData from '../../hooks/data/useUserData';
import './FreelancerDashboard.css';

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
      <Container maxWidth="lg" className="loading-container">
        <CircularProgress aria-label="Loading user data" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="error-container">
        <Alert severity="error" aria-live="assertive">{error}</Alert>
      </Container>
    );
  }

  return (
    <main>
      <Container maxWidth="lg" className="dashboard-container">
        <h1>
          <Typography variant="h4" gutterBottom>
            Welcome back, {userData?.name}!
          </Typography>
        </h1>
        <Grid container spacing={3} className="dashboard-grid">
          <Grid item xs={12} md={8}>
            <Paper elevation={3} className="dashboard-paper">
              <section aria-labelledby="profile-section-title">
                <h2 id="profile-section-title" className="visually-hidden">Profile Overview</h2>
                <ProfileSection 
                  profile={userData?.profile} 
                  onViewProfile={handleViewProfile}
                />
              </section>
            </Paper>
            <Paper elevation={3} className="dashboard-paper">
              <section aria-labelledby="job-recommendations-title">
                <h2 id="job-recommendations-title" className="visually-hidden">Job Recommendations</h2>
                <JobRecommendations 
                  jobs={userData?.recommendedJobs}
                  onViewJob={handleViewJob}
                  onViewAllJobs={handleViewAllJobs} 
                />
              </section>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="dashboard-paper">
              <section aria-labelledby="pending-actions-title">
                <h2 id="pending-actions-title" className="visually-hidden">Pending Actions</h2>
                <PendingActions actions={userData?.pendingActions} />
              </section>
            </Paper>
            <Paper elevation={3} className="dashboard-paper">
              <section aria-labelledby="recent-activity-title">
                <h2 id="recent-activity-title" className="visually-hidden">Recent Activity</h2>
                <RecentActivity activities={userData?.recentActivities} />
              </section>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default FreelancerDashboard;