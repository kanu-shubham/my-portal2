import { useState } from 'react';

const useApplyJob = () => {
  const [isApplying, setIsApplying] = useState(false);

  const applyToJob = async (jobId) => {
    setIsApplying(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Applied to job ${jobId}`);
      return true;
    } catch (error) {
      console.error('Error applying to job:', error);
      return false;
    } finally {
      setIsApplying(false);
    }
  };

  return { applyToJob, isApplying };
};

export default useApplyJob;