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
  };

  if (isError) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" role="alert">{error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '2.5rem', mb: 3 }}>
        Jobs Listings
      </Typography>
      
      <Grid container spacing={3} sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid item xs={12} md={3} sx={{ height: '100%' }}>
          <JobFilters filters={filters} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} md={9} sx={{ height: '100%', overflow: 'hidden' }}>
          <Box 
            sx={{ height: '100%', overflowY: 'auto', pr: 2 }} 
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
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} role="status" aria-live="polite">
                <CircularProgress aria-label="Loading more jobs" />
              </Box>
            )}
            
            {!hasNextPage && data && (
              <Typography align="center" sx={{ mt: 4 }} role="status" aria-live="polite">
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