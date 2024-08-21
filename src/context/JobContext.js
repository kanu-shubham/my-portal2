import React, { createContext, useState, useContext } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  const addJobs = (newJobs) => {
    setJobs(prevJobs => [...newJobs, ...prevJobs]);
  };

  return (
    <JobContext.Provider value={{ jobs, setJobs, addJob, addJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);