import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';

const GitHubRepos = ({ username }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      if (username) {
        try {
          const response = await axios.get(`https://api.github.com/users/${username}/repos`);
          setRepos(response.data);
        } catch (error) {
          console.error('Error fetching GitHub repos:', error);
        }
      }
    };

    fetchRepos();
  }, [username]);

  return (
    <List>
      {repos.map((repo) => (
        <ListItem key={repo.id}>
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary={repo.name} secondary={repo.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default GitHubRepos;