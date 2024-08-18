import React, { useRef, useCallback } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, Chip, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useJobs } from '../../hooks/data/useJobs';

const JobListing = () => {
  const { jobs, loading, hasMore, fetchJobs, applyFilters } = useJobs();
  const { control, handleSubmit } = useForm();
  const observer = useRef();

  const lastJobElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchJobs();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchJobs]);

  const onSubmit = (data) => {
    applyFilters(data);
  };

  const handleQuickApply = (jobId) => {
    // In a real app, you'd send an API request to apply for the job
    console.log(`Applied to job ${jobId}`);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Job Filter Form">
        <Controller
          name="skills"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Filter by Skills"
              fullWidth
              margin="normal"
              helperText="Enter skills separated by commas"
            />
          )}
        />
        <Controller
          name="minSalary"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Minimum Salary per Hour"
              type="number"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
          Filter Jobs
        </Button>
      </form>

      <Box role="list" aria-label="Job Listings">
        {jobs.map((job, index) => (
          <Card key={job.id} sx={{ mb: 2 }} ref={jobs.length === index + 1 ? lastJobElementRef : null}>
            <CardContent>
              <Typography variant="h6">{job.title}</Typography>
              <Typography variant="subtitle1">{job.company}</Typography>
              <Typography variant="body1">Salary: ${job.salary}/hour</Typography>
              <Box mt={1} mb={1}>
                {job.skills.map((skill, index) => (
                  <Chip key={index} label={skill} sx={{ mr: 1 }} />
                ))}
              </Box>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleQuickApply(job.id)}
                aria-label={`Quick Apply for ${job.title} at ${job.company}`}
              >
                Quick Apply
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      {loading && <CircularProgress aria-label="Loading more jobs" />}
      {!hasMore && <Typography aria-live="polite">No more jobs to load</Typography>}
    </Box>
  );
};

export default JobListing;