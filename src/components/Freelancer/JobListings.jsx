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
import './JobListings.css'; // Import the CSS file

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
  };

  if (isError) {
    return (
      <Container className="error-container">
        <Alert severity="error" role="alert">{error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="job-listings-container">
      <Typography variant="h1" component="h1" gutterBottom className="page-title">
        Jobs Listings
      </Typography>
      
      <Grid container spacing={3} className="content-grid">
        <Grid item xs={12} md={3} className="filters-grid-item">
          <JobFilters filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} md={9} className="listings-grid-item">
          <Box 
            className="job-listings-box"
            role="region" 
            aria-label="Job listings"
          >
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
              <Box className="loading-indicator" role="status" aria-live="polite">
                <CircularProgress aria-label="Loading more jobs" />
              </Box>
            )}
            
            {!hasNextPage && data && (
              <Typography align="center" className="no-more-jobs" role="status" aria-live="polite">
                No more jobs to load.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobListings;