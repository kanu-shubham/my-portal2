import { useMutation } from '@tanstack/react-query';

export const useCreateJob = () => {
  return useMutation({
    mutationFn: async (jobData) => {
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
  });
};