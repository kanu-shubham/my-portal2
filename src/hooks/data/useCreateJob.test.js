import React from 'react';
import { render, act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateJob } from './useCreateJob';
import { useJobContext } from '../../context/JobContext';

jest.mock('../../context/JobContext', () => ({
  useJobContext: jest.fn(),
}));

describe('useCreateJob', () => {
  let queryClient;
  let addJobMock;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
    jest.useFakeTimers();
    addJobMock = jest.fn();
    useJobContext.mockReturnValue({ addJob: addJobMock });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('should create a new job', async () => {
    const { result } = renderHook(() => useCreateJob(), { wrapper });
    const jobData = { title: 'Test Job', description: 'Test Description' };

    act(() => {
      result.current.mutate(jobData);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(true));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(expect.objectContaining({
      ...jobData,
      id: expect.any(Number),
      applicants: 6
    }));

    expect(addJobMock).toHaveBeenCalledWith(expect.objectContaining({
      ...jobData,
      id: expect.any(Number),
      applicants: 6
    }));
  });

  it('should handle mutation errors', async () => {
    const errorMessage = 'Failed to add job';
    addJobMock.mockImplementation(() => { throw new Error(errorMessage); });

    const { result } = renderHook(() => useCreateJob(), { wrapper });
    const jobData = { title: 'Test Job', description: 'Test Description' };

    act(() => {
      result.current.mutate(jobData);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(new Error(errorMessage));
  });

  it('should reset mutation state after successful job creation', async () => {
    const { result } = renderHook(() => useCreateJob(), { wrapper });
    const jobData = { title: 'Test Job', description: 'Test Description' };

    act(() => {
      result.current.mutate(jobData);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    act(() => {
      result.current.reset();
    });

    expect(result.current.isSuccess).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});