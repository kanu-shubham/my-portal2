import React, { useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button, 
  Modal, 
  AppBar, 
  Toolbar, 
  IconButton 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CreateJobPosting from '../../components/Employer/NewJobPost/CreateJobPosting';
import ViewJobPostings from '../../components/Employer/JobsPostings/ViewJobPostings';
import UserProfile from '../../components/Employer/EmployerProfile/UserProfile';
import './EmployerDashboard.css';
import { JobProvider } from '../../context/JobContext';

const EmployerDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCreateJobClick = useCallback(() => {
    setIsCreateJobModalOpen(true);
  }, []);

  const handleCloseCreateJobModal = useCallback(() => {
    setIsCreateJobModalOpen(false);
  }, []);

  const handleJobCreated = useCallback((newJob) => {
    setIsCreateJobModalOpen(false);
    // TODO: Add logic to update job listings
  }, []);

  const handleApplicantClick = useCallback((applicantId) => {
    setSelectedApplicantId(applicantId);
    setIsProfileModalOpen(true);
  }, []);
;

  const handleCloseProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
    setSelectedApplicantId(null);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <JobProvider>
      <div className="employer-dashboard">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Employer Dashboard
            </Typography>
            <IconButton color="inherit" aria-label="show notifications">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" className="dashboard-container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="dashboard-paper">
                <Box className="dashboard-header">
                  <Typography component="h1" variant="h4" color="primary">
                    Welcome, {user.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleCreateJobClick}
                    aria-label="Create New Job"
                  >
                    Create New Job
                  </Button>
                </Box>
                <section aria-labelledby="job-postings-title">
                  <h2 id="job-postings-title" className="visually-hidden">Job Postings</h2>
                  <ViewJobPostings handleAppClick={handleApplicantClick} />
                </section>
              </Paper>
            </Grid>
          </Grid>

          <Modal
             open={isProfileModalOpen}
             onClose={handleCloseProfileModal}
            aria-labelledby="user-profile-modal"
          >
            <div className="modal-content" role="dialog" aria-modal="true">
            {selectedApplicantId && (
                <UserProfile 
                  applicantId={selectedApplicantId} 
                  onClose={handleCloseProfileModal} 
                />
              )}
            </div>
          </Modal>

          <Modal
            open={isCreateJobModalOpen}
            onClose={handleCloseCreateJobModal}
            aria-labelledby="create-job-modal"
          >
            <div className="modal-content" role="dialog" aria-modal="true">
              <CreateJobPosting 
                onJobCreated={handleJobCreated} 
                onCancel={handleCloseCreateJobModal} 
                onClose={handleCloseCreateJobModal} 
              />
            </div>
          </Modal>
        </Container>

        {/* Sidebar could be implemented here */}
        {isSidebarOpen && (
          <div className="sidebar">
            {/* Sidebar content */}
          </div>
        )}
      </div>
    </JobProvider>
  );
};

export default EmployerDashboard;