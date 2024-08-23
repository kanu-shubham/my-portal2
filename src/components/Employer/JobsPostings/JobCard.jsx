import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Chip, Button, Box } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import './JobCard.css';

const JobCard = React.memo(({ job = {}, onApplicantClick, employerView }) => {
  const {
    id = '',
    title = 'Untitled Job',
    companyName = 'Unknown Company',
    description = 'No description available',
    requirements = 'No requirements specified',
    tags = [],
    contactInfo = 'No contact information provided',
    applicants = 0,
    postedAt = new Date() // Default to current date if not provided
  } = job;

  const truncatedDescription = useMemo(() => {
    return description.length > 200 
      ? `${description.slice(0, 200)}...` 
      : description;
  }, [description]);

  const skillChips = useMemo(() => {
    return tags.map((tag) => (
      <Chip 
        key={tag} 
        label={tag} 
        className="skill-chip"
        component="li"
      />
    ));
  }, [tags]);

  const applicantButtonLabel = useMemo(() => {
    return `View ${applicants} applicant${applicants !== 1 ? 's' : ''} for ${title}`;
  }, [applicants, title]);

  const formattedPostedTime = useMemo(() => {
    return formatDistanceToNow(new Date(postedAt), { addSuffix: true });
  }, [postedAt]);

  if (!job || Object.keys(job).length === 0) {
    return null; // or return a placeholder component
  }

  return (
    <Card 
      className="job-card"
      component="article" 
      aria-labelledby={`job-title-${id}`}
    >
      <CardContent>
        <Typography 
          variant="h3" 
          component="h2" 
          className="job-title"
          id={`job-title-${id}`}
        >
          {title}
        </Typography>
        <Typography variant="body2" className="company-name">
          <span className="sr-only">Company:</span> {companyName}
        </Typography>
        <Typography variant="body2" className="posted-time">
          <span className="sr-only">Posted:</span> {formattedPostedTime}
        </Typography>
        <Typography variant="body1" className="job-description">
          {truncatedDescription}
          {description.length > 200 && (
            <span className="sr-only">Description truncated, full description available upon request</span>
          )}
        </Typography>
        <Typography variant="body2" component="div" className="job-requirements">
          <h3 className="sr-only">Job Requirements</h3>
          <strong aria-hidden="true">Requirements:</strong> {requirements}
        </Typography>
        <Box className="skills-container" role="group" aria-label={`Skills required for ${title}`}>
          <h3 className="sr-only">Required Skills</h3>
          {skillChips}
        </Box>
        <Typography variant="body2" component="div" className="contact-info">
          <h3 className="sr-only">Contact Information</h3>
          <strong aria-hidden="true">Contact:</strong> {contactInfo}
        </Typography>
        {employerView && (
          <Button 
            variant="outlined" 
            onClick={() => onApplicantClick(id)}
            aria-label={applicantButtonLabel}
            className="applicants-button"
          >
            {applicants} Applicant{applicants !== 1 ? 's' : ''}
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

export default JobCard;