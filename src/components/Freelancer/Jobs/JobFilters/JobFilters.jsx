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
import './JobFilters.css'; // Import the CSS file

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
    <Paper elevation={3} className="job-filters-paper">
      <Typography variant="h2" component="h2" gutterBottom className="filter-title">
        Filters
      </Typography>
      
      <Box className="filter-section">
        <Typography id="skills-label" gutterBottom>Skills</Typography>
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
            <TextField 
              {...params} 
              variant="outlined" 
              placeholder="Select skills" 
              aria-labelledby="skills-label"
            />
          )}
        />
      </Box>
      
      <Box className="filter-section">
        <Typography id="salary-label" gutterBottom>Minimum Salary (per year)</Typography>
        <Slider
          value={filters.minSalary}
          onChange={handleSalaryChange}
          valueLabelDisplay="auto"
          step={10000}
          marks
          min={0}
          max={200000}
          aria-labelledby="salary-label"
        />
      </Box>
      
      <Box className="filter-section">
        <Typography id="location-label" gutterBottom>Location</Typography>
        <Autocomplete
          id="location-filter"
          options={['New York', 'San Francisco', 'London', 'Berlin', 'Remote']}
          value={filters.location}
          onChange={handleLocationChange}
          renderInput={(params) => (
            <TextField 
              {...params} 
              variant="outlined" 
              placeholder="Select location" 
              aria-labelledby="location-label"
            />
          )}
        />
      </Box>
      
      <Button 
        variant="outlined" 
        onClick={clearFilters} 
        fullWidth
        aria-label="Clear all filters"
        className="clear-filters-button"
      >
        Clear All Filters
      </Button>
    </Paper>
  );
};

export default JobFilters;