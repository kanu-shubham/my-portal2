import { useState, useCallback, useRef, useEffect } from 'react';

const useJobListings = () => {
  const [jobs, setJobs] = useState([]);
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
      if (page > 5) setHasMore(false);

      // Announce new jobs loaded
      if (loadingAnnouncement.current) {
        loadingAnnouncement.current.textContent = `${newJobs.length} new jobs loaded. Total jobs: ${jobs.length + newJobs.length}`;
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  }, [jobs.length, page, isLoading, hasMore]);

  // Add this useEffect to trigger initial fetch
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, isLoading, hasMore, fetchJobs, loadingAnnouncement };
};

export default useJobListings;