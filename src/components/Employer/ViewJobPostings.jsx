import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import JobCard from './JobCard';
import ApplicantsList from './ApplicantsList';
import useGetJobListings from '../../hooks/data/useGetJobListings';

const ViewJobPostings = ({ handleAppClick }) => {
  const { jobs, isLoading, hasMore, fetchJobs, loadingAnnouncement } = useGetJobListings();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchJobs();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchJobs, hasMore]);

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
      <ul 
        aria-labelledby="job-listings-title" 
        className="job-list"
      >
        {jobs.map(job => (
          <li key={job.id}>
            <JobCard 
              job={job} 
              onApplicantClick={handleApplicantClick}
            />
          </li>
        ))}
      </ul>
      {isLoading && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress aria-label="Loading more jobs" />
        </Box>
      )}
      {!isLoading && hasMore && (
        <div ref={observerTarget} style={{ height: '20px' }} aria-hidden="true"></div>
      )}
      {!hasMore && (
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