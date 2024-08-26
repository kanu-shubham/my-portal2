import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplicantsList from './ApplicantsList';

// Mock the Material-UI Drawer component
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Drawer: ({ children, open }) => open ? <div>{children}</div> : null,
}));

describe('ApplicantsList', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();
  const mockJobId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component when open is true', () => {
    render(<ApplicantsList open={true} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    expect(screen.getByRole('region', { name: /job applicants list/i })).toBeInTheDocument();
  });

  it('does not render the component when open is false', () => {
    render(<ApplicantsList open={false} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    expect(screen.queryByRole('region', { name: /job applicants list/i })).not.toBeInTheDocument();
  });

  it('renders the correct number of applicants', async () => {
    render(<ApplicantsList open={true} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(5); // 5 applicant items
    });
  });

  it('displays applicant information correctly', async () => {
    render(<ApplicantsList open={true} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    await waitFor(() => {
      expect(screen.getByText(/applicant 1/i)).toBeInTheDocument();
      expect(screen.getByText(/applicant1@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/%\s*match/i)).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', () => {
    render(<ApplicantsList open={true} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByLabelText(/close applicants drawer/i));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onSelect with correct applicant id when an applicant is clicked', async () => {
    render(<ApplicantsList open={true} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    await waitFor(() => {
      fireEvent.click(screen.getByText(/applicant 1/i));
    });
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  it('renders the skills match progress bar', async () => {
    render(<ApplicantsList open={true} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    await waitFor(() => {
      expect(screen.getAllByRole('progressbar')).toHaveLength(5); // 5 progress bars for 5 applicants
    });
  });

  it('focuses on the close button when opened', async () => {
    render(<ApplicantsList open={true} jobId={mockJobId} onClose={mockOnClose} onSelect={mockOnSelect} />);
    await waitFor(() => {
      expect(screen.getByLabelText(/close applicants drawer/i)).toHaveFocus();
    });
  });
});