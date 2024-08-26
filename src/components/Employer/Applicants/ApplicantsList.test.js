import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ApplicantsList from './ApplicantsList';

describe('ApplicantsList', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders closed drawer when open prop is false', () => {
    render(<ApplicantsList open={false} jobId={1} onClose={mockOnClose} onSelect={mockOnSelect} />);
    expect(screen.queryByRole('region', { name: /job applicants list/i })).not.toBeInTheDocument();
  });

  test('renders open drawer with applicants when open prop is true', async () => {
    render(<ApplicantsList open={true} jobId={1} onClose={mockOnClose} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByRole('region', { name: /job applicants list/i })).toBeInTheDocument();
    });

    expect(screen.getByText('Applicants')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(6); // 5 applicants + 1 close button
  });

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ApplicantsList open={true} jobId={1} onClose={mockOnClose} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close applicants drawer/i })).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /close applicants drawer/i });
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onSelect with correct applicant id when an applicant is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<ApplicantsList open={true} jobId={1} onClose={mockOnClose} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(6);
    });

    const applicantButtons = screen.getAllByRole('button').slice(1); // Exclude close button
    await user.click(applicantButtons[0]);
    
    expect(mockOnSelect).toHaveBeenCalledWith(1); // Assuming the first applicant has id 1
  });

  test('renders LinearProgress with correct aria-label', async () => {
    render(<ApplicantsList open={true} jobId={1} onClose={mockOnClose} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      const progressBars = screen.getAllByRole('progressbar');
      expect(progressBars).toHaveLength(5);
      progressBars.forEach(bar => {
        expect(bar).toHaveAttribute('aria-label', expect.stringMatching(/Skills match: \d+%/));
      });
    });
  });
});