import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';

const JobCard = ({ job, onApplicantClick }) => {
  return (
    <Card 
      sx={{ mb: 2 }} 
      component="article" 
      aria-labelledby={`job-title-${job.id}`}
    >
      <CardContent>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          id={`job-title-${job.id}`}
        >
          {job.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Company: {job.companyName}
        </Typography>
        <Typography variant="body1" paragraph>
          {job.description.slice(0, 200)}...
          <span className="sr-only">Description truncated, click to view full job details</span>
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Requirements:</strong> {job.requirements}
        </Typography>
        <Box mb={2} role="group" aria-label="Job tags">
          {job.tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              sx={{ mr: 1, mb: 1 }} 
              component="li"
            />
          ))}
        </Box>
        <Typography variant="body2" paragraph>
          <strong>Contact:</strong> {job.contactInfo}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => onApplicantClick(job.id)}
          aria-label={`View ${job.applicants} applicants for ${job.title}`}
        >
          {job.applicants} Applicants
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;