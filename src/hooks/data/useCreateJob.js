import { useQuery } from '@tanstack/react-query';

export const useCreateJob = (jobData) => {
    return useQuery(
      ['createJob', jobData],
      async () => {
        if (!jobData) return null;
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData),
        });
        if (!response.ok) {
          throw new Error('Failed to create job');
        }
        return response.json();
      },
      {
        enabled: !!jobData,
        retry: false,
      }
    );
  };