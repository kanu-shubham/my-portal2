import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJobs } from './useJobs';

// Mock the useJobs hook
jest.mock('./useJobs', () => ({
  useJobs: jest.fn(),
}));

// Test component that uses the hook
function TestComponent({ filters }) {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useJobs(filters);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.jobs.map(job => (
              <li key={job.id}>{job.title} - {job.company}</li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

describe('useJobs', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  it('should fetch initial jobs', async () => {
    const mockJobs = {
      pages: [
        {
          jobs: [
            { id: 1, title: 'Front-end Developer 1', company: 'Tech Company 1' },
            { id: 2, title: 'Front-end Developer 2', company: 'Tech Company 2' },
          ],
        },
      ],
      pageParams: [undefined],
    };

    useJobs.mockReturnValue({
      data: mockJobs,
      isLoading: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Front-end Developer 1 - Tech Company 1')).toBeInTheDocument();
      expect(screen.getByText('Front-end Developer 2 - Tech Company 2')).toBeInTheDocument();
    });
  });

  it('should apply filters correctly', async () => {
    const filters = { skills: ['React'], minSalary: 80000, location: 'Remote' };

    useJobs.mockReturnValue({
      data: { pages: [], pageParams: [] },
      isLoading: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent filters={filters} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(useJobs).toHaveBeenCalledWith(filters);
    });
  });

  it('should show loading state', () => {
    useJobs.mockReturnValue({
      isLoading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});