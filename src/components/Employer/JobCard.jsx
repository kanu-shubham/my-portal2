import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';

const JobCard = ({ job, onApplicantClick }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {job.companyName}
        </Typography>
        <Typography variant="body1" paragraph>
          {job.description.slice(0, 200)}...
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Requirements:</strong> {job.requirements}
        </Typography>
        <Box mb={2}>
          {job.tags.map((tag, index) => (
            <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
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