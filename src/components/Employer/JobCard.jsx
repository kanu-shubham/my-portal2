import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';

const JobCard = ({ job, onApplicantClick, employerView }) => {
  if (!job) {
    return null; // or return a placeholder component
  }

  const {
    id,
    title = 'Untitled Job',
    companyName = 'Unknown Company',
    description = 'No description available',
    requirements = 'No requirements specified',
    tags = [],
    contactInfo = 'No contact information provided',
    applicants = 0
  } = job;

  const truncatedDescription = description.length > 200 
    ? `${description.slice(0, 200)}...` 
    : description;

  return (
    <Card 
      sx={{ mb: 2 }} 
      component="article" 
      aria-labelledby={`job-title-${id}`}
    >
      <CardContent>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          id={`job-title-${id}`}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <span className="sr-only">Company:</span> {companyName}
        </Typography>
        <Typography variant="body1" paragraph>
          {truncatedDescription}
          {description.length > 200 && (
            <span className="sr-only">Description truncated, full description available upon request</span>
          )}
        </Typography>
        <Typography variant="body2" component="div" paragraph>
          <h3 className="sr-only">Job Requirements</h3>
          <strong aria-hidden="true">Requirements:</strong> {requirements}
        </Typography>
        <Box mb={2} role="group" aria-label={`Skills required for ${title}`}>
          <h3 className="sr-only">Required Skills</h3>
          {tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              sx={{ mr: 1, mb: 1 }} 
              component="li"
            />
          ))}
        </Box>
        <Typography variant="body2" component="div" paragraph>
          <h3 className="sr-only">Contact Information</h3>
          <strong aria-hidden="true">Contact:</strong> {contactInfo}
        </Typography>
        {employerView && (
          <Button 
            variant="outlined" 
            onClick={() => onApplicantClick(id)}
            aria-label={`View ${applicants} applicants for ${title}`}
          >
            {applicants} Applicant{applicants !== 1 ? 's' : ''}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;