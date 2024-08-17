import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Container, Typography, Grid } from '@mui/material';
import CreateJobPosting from '../components/Employer/CreateJobPosting';
import ViewJobPostings from '../components/Employer/ViewJobPostings';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    // Fetch posted jobs
    // This is a mock implementation. Replace with actual API call.
    setPostedJobs([
      { id: 1, title: 'Frontend Developer', applicants: 5 },
      { id: 2, title: 'Backend Engineer', applicants: 3 },
    ]);
  }, []);

  const handleJobCreated = (newJob) => {
    setPostedJobs([...postedJobs, { ...newJob, id: Date.now(), applicants: 0 }]);
  };

  const handleViewApplicant = (applicantId) => {
    // Fetch applicant data
    // This is a mock implementation. Replace with actual API call.
    setSelectedApplicant({
      id: applicantId,
      name: 'John Doe',
      email: 'john@example.com',
      skills: ['React', 'Node.js', 'Python'],
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" variant="h4" mt={4} mb={2}>
        Employer Dashboard
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CreateJobPosting onJobCreated={handleJobCreated} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ViewJobPostings 
            postedJobs={postedJobs} 
            onViewApplicant={handleViewApplicant} 
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployerDashboard;