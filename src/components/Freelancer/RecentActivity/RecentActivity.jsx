import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Typography, Paper, CircularProgress } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import './RecentActivity.css'; // Import the CSS file

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockActivities = [
          { type: 'application', description: 'Applied for Frontend Developer position', date: '2023-07-20' },
          { type: 'profile', description: 'Updated your profile', date: '2023-07-18' },
          { type: 'message', description: 'Received a message from TechCorp', date: '2023-07-15' },
        ];
        setActivities(mockActivities);
      } catch (err) {
        setError('Failed to fetch recent activities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'application':
        return <WorkIcon />;
      case 'profile':
        return <PersonIcon />;
      case 'message':
        return <MailIcon />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Paper elevation={3} className="loading-container">
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} className="error-container">
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className="activity-container">
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>
      {activities.length > 0 ? (
        <List aria-label="recent activities">
          {activities.map((activity, index) => (
            <ListItem key={index}>
              <ListItemIcon>{getIcon(activity.type)}</ListItemIcon>
              <ListItemText
                primary={activity.description}
                secondary={activity.date}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No recent activities.</Typography>
      )}
    </Paper>
  );
};

export default RecentActivity;