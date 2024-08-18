import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchGithubRepos = async (username) => {
  if (!username) throw new Error('Username is required');
  const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
  return data;
};

export const useGithubRepos = (username) => {
  return useQuery({
    queryKey: ['githubRepos', username],
    queryFn: () => fetchGithubRepos(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    onError: (error) => {
      console.error('Error fetching GitHub repos:', error);
    },
  });
};