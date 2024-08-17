import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Container, Typography, Grid, Paper, Box, Button, Modal,  useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateJobPosting from '../components/Employer/CreateJobPosting';
import ViewJobPostings from '../components/Employer/ViewJobPostings';
import UserProfile from '../components/Employer/UserProfile';


const EmployerDashboard = () => {
  const { user } = useAuth();
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCreateJobClick = () => {
    setIsCreateJobModalOpen(true);
  };

  const handleCloseCreateJobModal = () => {
    setIsCreateJobModalOpen(false);
  };

  const handleJobCreated = (newJob) => {
    setIsCreateJobModalOpen(false);
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography component="h1" variant="h4" color="primary">
                Employer Dashboard
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleCreateJobClick}
              >
                Create New Job
              </Button>
            </Box>
           
            <ViewJobPostings handleAppClick={handleApplicantClick}/>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        aria-labelledby="user-profile-modal"
      >
        <Box  sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : '600px',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
        }}>
          {selectedApplicant && <UserProfile user={selectedApplicant} />}
        </Box>
      </Modal>

      <Modal
        open={isCreateJobModalOpen}
        onClose={handleCloseCreateJobModal}
        aria-labelledby="create-job-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90%' : '600px',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
        }}>
          <CreateJobPosting onJobCreated={handleJobCreated} onCancel={handleCloseCreateJobModal} />
        </Box>
      </Modal>
      </Container>
  );
};

export default EmployerDashboard;