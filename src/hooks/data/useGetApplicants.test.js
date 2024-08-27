import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGetApplicants from './useGetApplicants';

// Mock timer functions
jest.useFakeTimers();

// Wrapper component to test the hook
function TestComponent({ jobId }) {
  const { applicants, loading, error, hasMore, fetchApplicants } = useGetApplicants(jobId);

  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="error">{error || 'No Error'}</div>
      <div data-testid="hasMore">{hasMore ? 'Has More' : 'No More'}</div>
      <div data-testid="applicantCount">{applicants.length}</div>
      <button onClick={fetchApplicants}>Fetch More</button>
      <ul>
        {applicants.map(applicant => (
          <li key={applicant.id}>{applicant.name}</li>
        ))}
      </ul>
    </div>
  );
}

describe('useGetApplicants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty applicants and correct initial states', async () => {
    render(<TestComponent jobId="job123" />);

    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');
    expect(screen.getByTestId('error')).toHaveTextContent('No Error');
    expect(screen.getByTestId('hasMore')).toHaveTextContent('Has More');
    expect(screen.getByTestId('applicantCount')).toHaveTextContent('0');
  });

  it('should fetch initial applicants', async () => {
    render(<TestComponent jobId="job123" />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    expect(screen.getByTestId('applicantCount')).toHaveTextContent('20');
    expect(screen.getByTestId('hasMore')).toHaveTextContent('Has More');
    expect(screen.getByTestId('error')).toHaveTextContent('No Error');
  });

  it('should fetch more applicants when fetchApplicants is called', async () => {
    render(<TestComponent jobId="job123" />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    });

    act(() => {
      screen.getByText('Fetch More').click();
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId('applicantCount')).toHaveTextContent('40');
    });

    expect(screen.getByTestId('hasMore')).toHaveTextContent('Has More');
    expect(screen.getByTestId('error')).toHaveTextContent('No Error');
  });

  it('should set hasMore to false when all applicants are fetched', async () => {
    render(<TestComponent jobId="job123" />);

    for (let i = 0; i < Math.ceil(2000 / 20); i++) {
      act(() => {
        screen.getByText('Fetch More').click();
        jest.runAllTimers();
      });
    }

    await waitFor(() => {
      expect(screen.getByTestId('applicantCount')).toHaveTextContent('2000');
    });

    expect(screen.getByTestId('hasMore')).toHaveTextContent('No More');
    expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    expect(screen.getByTestId('error')).toHaveTextContent('No Error');
  });

  it('should reset applicants when jobId changes', async () => {
    const { rerender } = render(<TestComponent jobId="job123" />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId('applicantCount')).toHaveTextContent('20');
    });

    rerender(<TestComponent jobId="job456" />);

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByTestId('applicantCount')).toHaveTextContent('20');
    });

    expect(screen.getByText('Applicant 1')).toBeInTheDocument();
    expect(screen.getByTestId('loading')).toHaveTextContent('Not Loading');
    expect(screen.getByTestId('hasMore')).toHaveTextContent('Has More');
    expect(screen.getByTestId('error')).toHaveTextContent('No Error');
  });
});