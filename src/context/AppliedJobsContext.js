import React, { createContext, useState, useContext } from 'react';

const AppliedJobsContext = createContext();

export const useAppliedJobs = () => {
  const context = useContext(AppliedJobsContext);
  if (context === undefined) {
    throw new Error('useAppliedJobs must be used within an AppliedJobsProvider');
  }
  return context;
};

export const AppliedJobsProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const addAppliedJob = (jobId) => {
    setAppliedJobs(prev => [...prev, jobId]);
  };

  const removeAppliedJob = (jobId) => {
    setAppliedJobs(prev => prev.filter(id => id !== jobId));
  };

  const value = { appliedJobs, addAppliedJob, removeAppliedJob };

  return (
    <AppliedJobsContext.Provider value={value}>
      {children}
    </AppliedJobsContext.Provider>
  );
};