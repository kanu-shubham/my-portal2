import React from 'react';
import { Typography, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Button, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PersonIcon from '@mui/icons-material/Person';

const ProfileSection = ({ profile, onViewProfile }) => {
  const completionPercentage = profile?.completionPercentage || 0;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          Profile Completion
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonIcon />}
          onClick={onViewProfile}
        >
          View User Profile
        </Button>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={completionPercentage} 
        sx={{ mb: 2, height: 10, borderRadius: 5 }}
      />
      <Typography variant="body2" gutterBottom>
        {completionPercentage}% Complete
      </Typography>
      <List>
        {profile?.completionItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              {item.completed ? <CheckCircleOutlineIcon color="success" /> : <ErrorOutlineIcon color="error" />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProfileSection;