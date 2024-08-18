import { useState, useEffect, useCallback } from 'react';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchJobs = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // In a real app, you'd call your API here
      // This is a mock implementation
      const response = await new Promise(resolve => 
        setTimeout(() => resolve({
          data: Array.from({ length: 20 }, (_, i) => ({
            id: jobs.length + i + 1,
            title: `Job ${jobs.length + i + 1}`,
            company: `Company ${jobs.length + i + 1}`,
            salary: Math.floor(Math.random() * 50) + 50,
            skills: ['React', 'Node.js', 'JavaScript'].sort(() => 0.5 - Math.random()).slice(0, 2),
          }))
        }), 1000)
      );
      setJobs(prevJobs => [...prevJobs, ...response.data]);
      setPage(prevPage => prevPage + 1);
      setHasMore(response.data.length === 20);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [jobs.length, loading, hasMore]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const applyFilters = (newFilters) => {
    setJobs([]);
    setPage(1);
    setHasMore(true);
    setFilters(newFilters);
  };

  return { jobs, loading, hasMore, fetchJobs, applyFilters };
};