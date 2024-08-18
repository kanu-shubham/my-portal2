import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Box,
  Grid
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const JobCard = ({ job, onQuickApply }) => {
  return (
    <Card elevation={3} sx={{ mb: 3, '&:hover': { boxShadow: 6 } }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {job.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="subtitle1">
              {job.company}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOnIcon fontSize="small" sx={{ mr: 1 }} aria-hidden="true" />
              <Typography variant="body2">{job.location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <WorkIcon fontSize="small" sx={{ mr: 1 }} aria-hidden="true" />
              <Typography variant="body2">{job.experience} years</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} aria-hidden="true" />
              <Typography variant="body2">${job.salary}/year</Typography>
            </Box>
            <Box mb={2}>
              {job.skills.map((skill) => (
                <Chip 
                  key={skill} 
                  label={skill} 
                  size="small" 
                  sx={{ mr: 0.5, mb: 0.5 }} 
                  aria-label={`Required skill: ${skill}`}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => onQuickApply(job.id)}
                sx={{ flex: 1, mr: 1 }}
                aria-label={`Quick apply for ${job.title} at ${job.company}`}
              >
                Quick Apply
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ flex: 1, ml: 1 }}
                aria-label={`View details for ${job.title} at ${job.company}`}
              >
                View Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobCard;