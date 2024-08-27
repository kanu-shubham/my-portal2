import { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_APPLICANTS = 2000;
const PAGE_SIZE = 20;

const useGetApplicants = (jobId) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(0);

  // Generate mock data
  const generateMockApplicants = (start, end) => {
    return Array.from({ length: Math.min(end - start, TOTAL_APPLICANTS - start) }, (_, i) => ({
      id: start + i + 1,
      name: `Applicant ${start + i + 1}`,
      email: `applicant${start + i + 1}@example.com`,
      matchingPercentage: Math.floor(Math.random() * 101)
    }));
  };

  const fetchApplicants = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const start = page.current * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const newApplicants = generateMockApplicants(start, end);
        setApplicants(prev => [...prev, ...newApplicants]);
        setHasMore(end < TOTAL_APPLICANTS);
        page.current += 1;
      } catch (err) {
        setError('An error occurred while fetching applicants.');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [loading, hasMore]);

  useEffect(() => {
    setApplicants([]);
    setError(null);
    page.current = 0;
    setHasMore(true);
    fetchApplicants();
  }, [jobId]);

  return { applicants, loading, error, hasMore, fetchApplicants };
};

export default useGetApplicants;