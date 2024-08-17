import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Message as MessageIcon, Work as WorkIcon, Edit as EditIcon } from '@mui/icons-material';

const RecentActivity = () => {
  const recentActivity = [
    { id: 1, type: 'message', content: 'New message from Client A', time: '2 hours ago' },
    { id: 2, type: 'job', content: 'Applied to Frontend Developer position', time: '1 day ago' },
    { id: 3, type: 'profile', content: 'Updated skill set', time: '3 days ago' }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageIcon />;
      case 'job':
        return <WorkIcon />;
      case 'profile':
        return <EditIcon />;
      default:
        return null;
    }
  };

  return (
    <List>
      {recentActivity.map((activity) => (
        <ListItem key={activity.id}>
          <ListItemIcon>
            {getIcon(activity.type)}
          </ListItemIcon>
          <ListItemText primary={activity.content} secondary={activity.time} />
        </ListItem>
      ))}
    </List>
  );
};

export default RecentActivity;