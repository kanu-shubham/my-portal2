import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const JobCard = ({ job, onQuickApply }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {job.company}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{job.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <WorkIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{job.experience} years</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">${job.salary}/hour</Typography>
        </Box>
        <Box mb={2}>
          {job.skills.map((skill, index) => (
            <Chip key={index} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button variant="outlined" color="primary">
            View Details
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => onQuickApply(job.id)}
          >
            Quick Apply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;