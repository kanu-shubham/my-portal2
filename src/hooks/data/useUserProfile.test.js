import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useUserProfile from './useUserProfile';

// Mock the global setTimeout function
jest.useFakeTimers();

// Test component that uses the hook
function TestComponent({ applicantId }) {
  const { user, loading, error } = useUserProfile(applicantId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <ul>
        {user.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

describe('useUserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    render(<TestComponent applicantId={1} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should fetch and display user profile successfully', async () => {
    render(<TestComponent applicantId={1} />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText('Applicant 1')).toBeInTheDocument();
    });

    expect(screen.getByText('applicant1@example.com')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('should refetch when applicant ID changes', async () => {
    const { rerender } = render(<TestComponent applicantId={1} />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText('Applicant 1')).toBeInTheDocument();
    });

    rerender(<TestComponent applicantId={2} />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText('Applicant 2')).toBeInTheDocument();
    });
  });

});