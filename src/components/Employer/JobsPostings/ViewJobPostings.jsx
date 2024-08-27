import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import JobCard from './JobCard';
import ApplicantsList from '../Applicants/ApplicantsList';
import useJobListings from '../../../hooks/data/useGetJobListings';
import { useJobContext } from '../../../context/JobContext';
import './ViewJobPostings.css';

const JobList = React.memo(({ jobs, lastJobElementRef, onApplicantClick, employerView }) => (
  <ul aria-labelledby="job-listings-title" className="job-list">
    {jobs.map((job, index) => (
      <li key={job.id} ref={index === jobs.length - 1 ? lastJobElementRef : null} className="job-list-item">
        <JobCard 
          job={job} 
          onApplicantClick={onApplicantClick}
          employerView={employerView}
        />
      </li>
    ))}
  </ul>
));

const ViewJobPostings = React.memo(({ employerView = true, handleAppClick }) => {
  const { jobs } = useJobContext();
  const { isLoading, hasMore, fetchJobs, loadingAnnouncement } = useJobListings();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const observerTarget = useRef(null);

  const lastJobElementRef = useCallback(node => {
    if (isLoading || !hasMore) return;
    if (observerTarget.current) observerTarget.current.disconnect();
    observerTarget.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
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

  const handleApplicantClick = useCallback((jobId) => {
    setSelectedJobId(jobId);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const handleSelectApplicant = useCallback((applicantId) => {
    handleAppClick(applicantId);
    setIsDrawerOpen(false);
  }, [handleAppClick]);


  const title = useMemo(() => 
    employerView ? "Your Job Postings" : "Available Jobs",
  [employerView]);

  const noJobsMessage = useMemo(() => (
    <Typography variant="body1" className="no-jobs-message">
      No jobs available at the moment.
    </Typography>
  ), []);

  const loadingSpinner = useMemo(() => (
    <Box className="loading-spinner">
      <CircularProgress aria-label="Loading jobs" />
    </Box>
  ), []);

  const noMoreJobsMessage = useMemo(() => (
    <Typography 
      variant="body1" 
      className="no-more-jobs-message"
      role="status" 
      aria-live="polite"
    >
      No more jobs to load
    </Typography>
  ), []);

  return (
    <Container className="job-listings-container">
      <Typography variant="h5" component="h2" className="job-listings-title" id="job-listings-title">
        {title}
      </Typography>
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true" 
        ref={loadingAnnouncement} 
        className="visually-hidden"
      />
      {jobs.length > 0 ? (
        <JobList 
          jobs={jobs}
          lastJobElementRef={lastJobElementRef}
          onApplicantClick={handleApplicantClick}
          employerView={employerView}
        />
      ) : noJobsMessage}
      {isLoading && loadingSpinner}
      {!hasMore && jobs.length > 0 && noMoreJobsMessage}
      {employerView && (
        <ApplicantsList 
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        jobId={selectedJobId}
        onSelect={handleSelectApplicant}
        />
      )}
    </Container>
  );
});

export default ViewJobPostings;