import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, Divider, Box } from '@mui/material';

const JobRecommendations = ({ jobs, onViewJob, onViewAllJobs }) => {
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          Recommended Jobs
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={onViewAllJobs}
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
              <Button variant="outlined" size="small" onClick={() => onViewJob(job.id)}>
                View Job
              </Button>
            </ListItem>
            {index < jobs.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default JobRecommendations;