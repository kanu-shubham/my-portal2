import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Link } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const GitHubRepos = ({ username }) => {
  const { isLoading, isError, data: repos, error } = useGithubRepos(username);

  if (isLoading) return <Typography role="status" aria-live="polite">Loading repositories...</Typography>;
  if (isError) return <Typography role="alert">Error: {error.message}</Typography>;

  if (!repos || repos.length === 0) {
    return (
      <Typography variant="body1" role="status" aria-live="polite">
        No repositories found for {username}.
      </Typography>
    );
  }

  return (
    <nav aria-label={`${username}'s GitHub repositories`}>
      <List>
        {repos.map((repo) => (
          <ListItem key={repo.id} component="article">
            <ListItemIcon>
              <GitHubIcon aria-hidden="true" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${repo.name} (opens in a new tab)`}
                >
                  {repo.name}
                </Link>
              }
              secondary={repo.description}
              secondaryTypographyProps={{ "aria-label": `Description: ${repo.description || "No description provided"}` }}
            />
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default GitHubRepos;