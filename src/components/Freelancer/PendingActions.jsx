import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const PendingActions = ({ actions }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Pending Actions
      </Typography>
      <List>
        {actions?.map((action, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <NotificationsActiveIcon color="warning" />
            </ListItemIcon>
            <ListItemText primary={action.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PendingActions;