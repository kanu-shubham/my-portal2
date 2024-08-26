import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGithubRepos } from './useGithubRepos';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));

// Test component that uses the hook
function TestComponent({ username }) {
  const { data, isLoading, isError, error } = useGithubRepos(username);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <ul>
      {data.map(repo => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  );
}

describe('useGithubRepos', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const renderWithClient = (ui) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  it('should fetch repos successfully', async () => {
    const mockRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];
    require('axios').get.mockResolvedValueOnce({ data: mockRepos });

    renderWithClient(<TestComponent username="testuser" />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
      expect(screen.getByText('repo2')).toBeInTheDocument();
    });

    expect(require('axios').get).toHaveBeenCalledWith('https://api.github.com/users/testuser/repos');
  });

  it('should handle error when username is not provided', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithClient(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('No data')).toBeInTheDocument();
    });

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should not fetch when username is falsy', () => {
    renderWithClient(<TestComponent username="" />);

    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(require('axios').get).not.toHaveBeenCalled();
  });
});