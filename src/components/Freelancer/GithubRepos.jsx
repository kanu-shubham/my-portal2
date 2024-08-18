import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const GitHubRepos = ({ username }) => {
  const { isLoading, isError, data: repos, error } = useGithubRepos(username);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

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