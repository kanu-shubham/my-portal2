import { useState, useCallback, useRef, useEffect } from 'react';
import { useJobContext } from '../../context/JobContext';

const useJobListings = (pageSize = 10) => {
  const { jobs, setJobs } = useJobContext();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadingAnnouncement = useRef(null);

  const fetchJobs = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newJobs = Array.from({ length: pageSize }, (_, i) => ({
        id: startIndex + i + 1,
        title: `Job Title ${startIndex + i + 1}`,
        description: `This is the job description for Job ${startIndex + i + 1}. It can be up to 16KB in length.`,
        requirements: `Requirements for Job ${startIndex + i + 1}`,
        tags: ['React', 'JavaScript', 'Node.js'],
        companyName: `Company ${startIndex + i + 1}`,
        contactInfo: `contact${startIndex + i + 1}@company.com`,
        applicants: Math.floor(Math.random() * 50) + 1
      }));

      setJobs(prevJobs => [...prevJobs, ...newJobs]);
      setPage(prevPage => prevPage + 1);
      
      // For demonstration, let's set hasMore to false after 5 pages
      if (page >= 5) setHasMore(false);

      // Announce new jobs loaded
      if (loadingAnnouncement.current) {
        loadingAnnouncement.current.textContent = `${newJobs.length} new jobs loaded. Total jobs: ${jobs.length + newJobs.length}`;
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [jobs.length, page, isLoading, hasMore, pageSize, setJobs]);

  useEffect(() => {
    if (jobs.length === 0) {
      fetchJobs();
    }
  }, [fetchJobs, jobs.length]);

  return { jobs, isLoading, hasMore, fetchJobs, loadingAnnouncement };
};

export default useJobListings;