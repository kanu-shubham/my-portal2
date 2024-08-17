import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Chip, Autocomplete } from '@mui/material';

// Mock data generation function (you can move this to a separate utility file)
const generateMockJobs = (count) => {
  // ... (same as before)
};

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skillFilter, setSkillFilter] = useState([]);
  const [minSalary, setMinSalary] = useState('');

  useEffect(() => {
    const mockJobs = generateMockJobs(10000);
    setJobs(mockJobs);
    setFilteredJobs(mockJobs.slice(0, 100));
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => 
      (skillFilter.length === 0 || skillFilter.every(skill => job.skills.includes(skill))) &&
      (minSalary === '' || job.salaryPerHour >= parseInt(minSalary))
    );
    setFilteredJobs(filtered.slice(0, 100));
  }, [skillFilter, minSalary, jobs]);

  const handleQuickApply = (jobId) => {
    console.log(`Quick applied to job ${jobId}`);
    // Here you would typically send an API request to apply for the job
  };

  return (
    <>
      <Autocomplete
        multiple
        id="job-skills-filter"
        options={['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++']}
        value={skillFilter}
        onChange={(event, newValue) => setSkillFilter(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Filter by Skills" margin="normal" />
        )}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Minimum Salary per Hour"
        type="number"
        value={minSalary}
        onChange={(e) => setMinSalary(e.target.value)}
      />
      <List>
        {filteredJobs.map((job) => (
          <ListItem key={job.id} alignItems="flex-start">
            <ListItemText
              primary={job.title}
              secondary={
                <>
                  <span>{job.company}</span>
                  {` — ${job.description}`}
                  <br />
                  {job.skills.map((skill) => (
                    <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5 }} />
                  ))}
                  <br />
                  {`Salary: $${job.salaryPerHour}/hour`}
                </>
              }
            />
            <Button variant="contained" color="primary" onClick={() => handleQuickApply(job.id)}>
              Quick Apply
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default JobListings;