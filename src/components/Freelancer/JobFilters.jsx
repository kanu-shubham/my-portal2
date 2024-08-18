import React from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Autocomplete, 
  Chip,
  Slider,
  Box,
  Button
} from '@mui/material';

const JobFilters = ({ filters, setFilters }) => {
  const handleSkillChange = (event, newValue) => {
    setFilters(prev => ({ ...prev, skills: newValue }));
  };

  const handleSalaryChange = (event, newValue) => {
    setFilters(prev => ({ ...prev, minSalary: newValue }));
  };

  const handleLocationChange = (event, newValue) => {
    setFilters(prev => ({ ...prev, location: newValue }));
  };

  const clearFilters = () => {
    setFilters({ skills: [], minSalary: 0, location: null });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      
      <Box mb={2}>
        <Typography gutterBottom>Skills</Typography>
        <Autocomplete
          multiple
          id="skills-filter"
          options={['JavaScript', 'React', 'Node.js', 'Python', 'Java']}
          value={filters.skills}
          onChange={handleSkillChange}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Select skills" />
          )}
        />
      </Box>
      
      <Box mb={2}>
        <Typography gutterBottom>Minimum Salary (per year)</Typography>
        <Slider
          value={filters.minSalary}
          onChange={handleSalaryChange}
          valueLabelDisplay="auto"
          step={10000}
          marks
          min={0}
          max={200000}
        />
      </Box>
      
      <Box mb={2}>
        <Typography gutterBottom>Location</Typography>
        <Autocomplete
          id="location-filter"
          options={['New York', 'San Francisco', 'London', 'Berlin', 'Remote']}
          value={filters.location}
          onChange={handleLocationChange}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Select location" />
          )}
        />
      </Box>
      
      <Button variant="outlined" onClick={clearFilters} fullWidth>
        Clear All Filters
      </Button>
    </Paper>
  );
};

export default JobFilters;