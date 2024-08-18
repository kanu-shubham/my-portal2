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
    <Card elevation={3} sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" component="h2" gutterBottom>
              {job.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
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
              <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">${job.salary}/year</Typography>
            </Box>
            <Box mb={2}>
              {job.skills.map((skill) => (
                <Chip key={skill} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => onQuickApply(job.id)}
              fullWidth
              sx={{ mb: 1 }}
            >
              Quick Apply
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth
            >
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobCard;