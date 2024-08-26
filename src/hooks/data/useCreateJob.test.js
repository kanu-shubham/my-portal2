import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateJob } from './useCreateJob';
import { useJobContext } from '../../context/JobContext';

// Mock the JobContext
jest.mock('../../context/JobContext', () => ({
  useJobContext: jest.fn(),
}));

// Test component that uses the hook
function TestComponent() {
  const createJobMutation = useCreateJob();
  
  const handleCreateJob = () => {
    createJobMutation.mutate({ title: 'Software Engineer', company: 'TechCorp' });
  };

  return (
    <div>
      <button onClick={handleCreateJob}>Create Job</button>
      {createJobMutation.isLoading && <div>Loading...</div>}
      {createJobMutation.isSuccess && <div>Job created successfully</div>}
      {createJobMutation.isError && <div>Error: {createJobMutation.error.message}</div>}
    </div>
  );
}

describe('useCreateJob', () => {
  let queryClient;
  let addJobMock;

  beforeEach(() => {
    queryClient = new QueryClient();
    addJobMock = jest.fn();
    useJobContext.mockReturnValue({ addJob: addJobMock });

    // Mock Date.now() to return a consistent value
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new job and add it to the context', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    userEvent.click(screen.getByText('Create Job'));

    await waitFor(() => {
      expect(screen.getByText('Job created successfully')).toBeInTheDocument();
    });

    expect(addJobMock).toHaveBeenCalledWith({
      title: 'Software Engineer',
      company: 'TechCorp',
      id: 1234567890,
      applicants: 6,
    });
  });

  it('should handle errors', async () => {
    // Mock a failure in addJob
    addJobMock.mockImplementation(() => {
      throw new Error('Failed to add job');
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    userEvent.click(screen.getByText('Create Job'));

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to add job')).toBeInTheDocument();
    });
  });
});