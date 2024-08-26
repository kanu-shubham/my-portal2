import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, Divider, Box } from '@mui/material';
import './JobsRecommendations.css';

const JobRecommendations = ({ jobs, onViewJob, onViewAllJobs }) => {
  return (
    <div className="job-recommendations">
      <Box className="header">
        <Typography variant="h6">
          Recommended Jobs
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={onViewAllJobs}
          className="view-all-button"
        >
          View All Jobs
        </Button>
      </Box>
      <List>
        {jobs?.map((job, index) => (
          <React.Fragment key={job.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={job.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {job.company}
                    </Typography>
                    {` — ${job.location}`}
                  </>
                }
              />
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => onViewJob(job.id)}
                className="view-job-button"
              >
                View Job
              </Button>
            </ListItem>
            {index < jobs?.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default JobRecommendations;