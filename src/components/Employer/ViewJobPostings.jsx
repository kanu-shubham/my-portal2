import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import JobCard from './JobCard';
import ApplicantsList from './ApplicantsList';
import useGetJobListings from '../../hooks/data/useGetJobListings';

const ViewJobPostings = ({ handleAppClick }) => {
  const { jobs, isLoading, hasMore, fetchJobs, loadingAnnouncement } = useGetJobListings();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const observerTarget = useRef(null);

  const lastJobElementRef = useCallback(node => {
    if (isLoading) return;
    if (observerTarget.current) observerTarget.current.disconnect();
    observerTarget.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchJobs();
      }
    }, { threshold: 1.0 });
    if (node) observerTarget.current.observe(node);
  }, [isLoading, hasMore, fetchJobs]);

  useEffect(() => {
    return () => {
      if (observerTarget.current) {
        observerTarget.current.disconnect();
      }
    };
  }, []);

  const handleApplicantClick = (jobId) => {
    setSelectedJobId(jobId);
    setIsDrawerOpen(true);
  };

  const onSelectApplicant = (applicant) => {
    handleAppClick(applicant);
    setIsDrawerOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom id="job-listings-title">
        Job Listings
      </Typography>
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        ref={loadingAnnouncement} 
        className="visually-hidden"
      ></div>
      {jobs.length > 0 ? (
        <ul 
          aria-labelledby="job-listings-title" 
          className="job-list"
        >
          {jobs.map((job, index) => (
            <li key={job.id} ref={index === jobs.length - 1 ? lastJobElementRef : null}>
              <JobCard 
                job={job} 
                onApplicantClick={handleApplicantClick}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body1" textAlign="center" my={2}>
          No jobs available at the moment.
        </Typography>
      )}
      {isLoading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress aria-label="Loading jobs" />
        </Box>
      )}
      {!hasMore && jobs.length > 0 && (
        <Typography 
          variant="body1" 
          textAlign="center" 
          my={2} 
          role="status" 
          aria-live="polite"
        >
          No more jobs to load
        </Typography>
      )}
      <ApplicantsList 
        open={isDrawerOpen}
        onSelect={onSelectApplicant}
        jobId={selectedJobId}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Container>
  );
};

export default ViewJobPostings;