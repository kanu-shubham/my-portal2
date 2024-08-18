// src/hooks/useJobs.js
import { useInfiniteQuery } from '@tanstack/react-query';

const JOBS_PER_PAGE = 20;

// This function simulates an API call with pagination
const fetchJobs = async ({ pageParam = 1, queryKey }) => {
  const [_, filters] = queryKey;
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const startIndex = (pageParam - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  
  const jobs = Array.from({ length: JOBS_PER_PAGE }, (_, i) => ({
    id: startIndex + i + 1,
    title: `Front-end Developer ${startIndex + i + 1}`,
    company: `Tech Company ${startIndex + i + 1}`,
    location: ['New York', 'San Francisco', 'Remote'][Math.floor(Math.random() * 3)],
    salary: (Math.floor(Math.random() * 50) + 50) * 1000,
    experience: Math.floor(Math.random() * 10) + 1,
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'].sort(() => 0.5 - Math.random()).slice(0, 3),
  }));

  // Apply filters
  const filteredJobs = jobs.filter(job => {
    if (filters.skills && filters.skills.length > 0) {
      if (!filters.skills.some(skill => job.skills.includes(skill))) {
        return false;
      }
    }
    if (filters.minSalary && job.salary < filters.minSalary) {
      return false;
    }
    if (filters.location && job.location !== filters.location) {
      return false;
    }
    return true;
  });

  return {
    jobs: filteredJobs,
    nextPage: pageParam + 1,
    hasMore: endIndex < 100, // Assume there are 100 total jobs for this example
  };
};

export const useJobs = (filters = {}) => {
  return useInfiniteQuery({
    queryKey: ['jobs', filters],
    queryFn: fetchJobs,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};