import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fetchUserData } from '../../services/userService';
import useUserData from './useUserData';

// Mock the userService
jest.mock('../../services/userService');

// Test component that uses the hook
function TestComponent() {
  const { userData, loading, error } = useUserData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (userData) return <div>User: {userData.name}</div>;
  return null;
}

describe('useUserData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user data successfully', async () => {
    const mockUserData = { id: 1, name: 'John Doe' };
    fetchUserData.mockResolvedValueOnce(mockUserData);

    render(<TestComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('User: John Doe')).toBeInTheDocument();
    });

    expect(fetchUserData).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching user data fails', async () => {
    const mockError = new Error('API Error');
    fetchUserData.mockRejectedValueOnce(mockError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<TestComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user data. Please try again.')).toBeInTheDocument();
    });

    expect(fetchUserData).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch user data:', mockError);

    consoleSpy.mockRestore();
  });

  it('should only fetch user data once', async () => {
    const mockUserData = { id: 1, name: 'John Doe' };
    fetchUserData.mockResolvedValueOnce(mockUserData);

    const { rerender } = render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('User: John Doe')).toBeInTheDocument();
    });

    rerender(<TestComponent />);

    expect(fetchUserData).toHaveBeenCalledTimes(1);
  });
});