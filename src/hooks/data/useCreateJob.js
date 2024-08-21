import { useMutation } from '@tanstack/react-query';
import { useJobContext } from '../../context/JobContext';

export const useCreateJob = () => {
  const { addJob } = useJobContext();

  return useMutation({
    mutationFn: async (jobData) => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a fake ID for the new job
      const newJob = {
        ...jobData,
        id: Date.now(),
        applicants: 6
      };

      // Add the new job to the context
      addJob(newJob);

      return newJob;
    },
  });
};