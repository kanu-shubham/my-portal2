import { useInfiniteQuery } from '@tanstack/react-query';

const JOBS_PER_PAGE = 20;

// This function simulates an API call with pagination
const fetchJobs = async ({ pageParam = 1, queryKey }) => {
  const [_, filters, appliedJobs] = queryKey;

  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const startIndex = (pageParam - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  
  const jobs = Array.from({ length: JOBS_PER_PAGE }, (_, i) => {
    const daysAgo = Math.floor(Math.random() * 30); // Random number of days ago (up to 30)
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - daysAgo);

    return {
      id: startIndex + i + 1,
      title: `Front-end Developer ${startIndex + i + 1}`,
      company: `Tech Company ${startIndex + i + 1}`,
      location: ['New York', 'San Francisco', 'Remote'][Math.floor(Math.random() * 3)],
      salary: (Math.floor(Math.random() * 50) + 50) * 1000,
      experience: Math.floor(Math.random() * 10) + 1,
      skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'].sort(() => 0.5 - Math.random()).slice(0, 3),
      postedDate: postedDate
    };
  });

  // Apply filters
  const filteredJobs = jobs?.filter(job => {
    // Filter out applied jobs
    if (appliedJobs.includes(job.id)) {
      return false;
    }

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
    hasMore: endIndex < 10000, // Assume there are 100 total jobs for this example
  };
};

export const useJobs = (filters = {}, appliedJobs = []) => {
  return useInfiniteQuery({
    queryKey: ['jobs', filters, appliedJobs],
    queryFn: fetchJobs,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
};