import React, { useState, useRef, useCallback } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert,
  Box
} from '@mui/material';
import { useJobs } from '../../hooks/data/useJobs';
import JobFilters from './JobFilters';
import JobCard from './JobCard';

const JobListings = () => {
  const [filters, setFilters] = useState({ skills: [], minSalary: 0, location: null });
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useJobs(filters);

  const observer = useRef();
  const lastJobElementRef = useCallback(node => {
    if (isLoading || isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleQuickApply = (jobId) => {
    console.log(`Applied to job ${jobId}`);
    // Implement quick apply logic here
  };

  if (isError) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Job Postings</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <JobFilters filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} md={9}>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.jobs.map((job, index) => (
                <Box ref={page.jobs.length === index + 1 ? lastJobElementRef : null} key={job.id}>
                  <JobCard job={job} onQuickApply={handleQuickApply} />
                </Box>
              ))}
            </React.Fragment>
          ))}
          
          {(isLoading || isFetchingNextPage) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
          
          {!hasNextPage && data && (
            <Typography align="center" sx={{ mt: 4 }}>
              No more jobs to load.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobListings;