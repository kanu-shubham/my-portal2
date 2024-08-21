import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container, Typography, Grid, Paper, Box, Button, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateJobPosting from '../../components/Employer/CreateJobPosting';
import ViewJobPostings from '../../components/Employer/ViewJobPostings';
import UserProfile from '../../components/Employer/UserProfile';
import './EmployerDashboard.css';
import { JobProvider } from '../../context/JobContext';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleCreateJobClick = () => {
    setIsCreateJobModalOpen(true);
  };

  const handleCloseCreateJobModal = () => {
    setIsCreateJobModalOpen(false);
  };

  const handleJobCreated = (newJob) => {
    setIsCreateJobModalOpen(false);
    // TODO: Add logic to update job listings
  };

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      skills: ['React', 'Node.js', 'Python'],
      experience: '5 years of software development',
      education: 'BS in Computer Science'
    });
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedApplicant(null);
  };

  return (
    <main>
      <JobProvider>
      <Container maxWidth="lg" className="dashboard-container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="dashboard-paper">
              <Box className="dashboard-header">
                <Typography component="h1" variant="h4" color="primary">
                  Employer Dashboard
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
            {selectedApplicant && (
              <UserProfile user={selectedApplicant} onClose={handleCloseProfileModal} />
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
      </JobProvider>
    </main>
  );
};

export default EmployerDashboard;