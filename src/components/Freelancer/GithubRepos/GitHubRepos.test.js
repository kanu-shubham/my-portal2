import React from 'react';
import { render, screen } from '@testing-library/react';
import GitHubRepos from './GitHubRepos';

describe('GitHubRepos', () => {
  const mockRepos = [
    { id: 1, name: 'repo1', html_url: 'https://github.com/user/repo1', description: 'Description 1' },
    { id: 2, name: 'repo2', html_url: 'https://github.com/user/repo2' },
  ];

  test('renders loading state', () => {
    render(<GitHubRepos isLoading={true} />);
    expect(screen.getByLabelText('Loading GitHub repositories')).toBeInTheDocument();
  });

  test('renders error state', () => {
    const errorMessage = 'Failed to fetch';
    render(<GitHubRepos isError={true} error={{ message: errorMessage }} />);
    expect(screen.getByText(`Error loading repositories: ${errorMessage}`)).toBeInTheDocument();
  });

  test('renders empty state', () => {
    render(<GitHubRepos username="testuser" repos={[]} />);
    expect(screen.getByText('No repositories found for testuser.')).toBeInTheDocument();
  });

  test('renders list of repositories', () => {
    render(<GitHubRepos username="testuser" repos={mockRepos} />);
    expect(screen.getByText('GitHub Repositories:')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub Repositories for testuser')).toBeInTheDocument();
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });
});