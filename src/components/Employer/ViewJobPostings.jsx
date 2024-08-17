import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import JobCard from './JobCard';
import ApplicantsList from './ApplicantsList';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const observerTarget = useRef(null);
  const loadingAnnouncement = useRef(null);

  const fetchJobs = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newJobs = Array.from({ length: 10 }, (_, i) => ({
      id: jobs.length + i + 1,
      title: `Job Title ${jobs.length + i + 1}`,
      description: `This is the job description for Job ${jobs.length + i + 1}. It can be up to 16KB in length.`,
      requirements: `Requirements for Job ${jobs.length + i + 1}`,
      tags: ['React', 'JavaScript', 'Node.js'],
      companyName: `Company ${jobs.length + i + 1}`,
      contactInfo: `contact${jobs.length + i + 1}@company.com`,
      applicants: Math.floor(Math.random() * 50) + 1
    }));

    setJobs(prevJobs => [...prevJobs, ...newJobs]);
    setPage(prevPage => prevPage + 1);
    setIsLoading(false);
    if (page > 5) setHasMore(false);

    // Announce new jobs loaded
    if (loadingAnnouncement.current) {
      loadingAnnouncement.current.textContent = `${newJobs.length} new jobs loaded. Total jobs: ${jobs.length + newJobs.length}`;
    }
  }, [jobs.length, page, isLoading, hasMore]);

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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom id="job-listings-title">
        Job Listings
      </Typography>
      <div role="region" aria-live="polite" aria-atomic="true" ref={loadingAnnouncement} className="visually-hidden"></div>
      <ul aria-labelledby="job-listings-title" className="job-list">
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
        <Box display="flex" justifyContent="center" my={2} role="status" aria-live="polite">
          <CircularProgress aria-label="Loading more jobs" />
        </Box>
      )}
      {!isLoading && hasMore && (
        <div ref={observerTarget} style={{ height: '20px' }}></div>
      )}
      {!hasMore && (
        <Typography variant="body1" textAlign="center" my={2} role="status" aria-live="polite">
          No more jobs to load
        </Typography>
      )}
      <ApplicantsList 
        open={isDrawerOpen}
        jobId={selectedJobId}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Container>
  );
};

export default JobListing;