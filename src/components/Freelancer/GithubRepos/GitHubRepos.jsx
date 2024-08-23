import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import './GitHubRepos.css';

const GitHubRepos = ({ username, repos, isLoading, isError, error }) => {
  if (isLoading) {
    return <CircularProgress className="github-repos-loading" aria-label="Loading GitHub repositories" />;
  }

  if (isError) {
    return (
      <Alert severity="error" className="github-repos-error">
        Error loading repositories: {error.message}
      </Alert>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <Typography variant="body2" className="github-repos-empty">
        No repositories found for {username}.
      </Typography>
    );
  }

  return (
    <Box className="github-repos" aria-live="polite">
      <Typography variant="subtitle1" className="github-repos-title">GitHub Repositories:</Typography>
      <ul className="github-repos-list" aria-label={`GitHub Repositories for ${username}`}>
        {repos.map(repo => (
          <li key={repo.id} className="github-repos-item">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="github-repos-link">
              {repo.name}
            </a>
            {repo.description && (
              <Typography variant="body2" className="github-repos-description">
                {repo.description}
              </Typography>
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default GitHubRepos;