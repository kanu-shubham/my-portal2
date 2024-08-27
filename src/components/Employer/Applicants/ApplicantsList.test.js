import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplicantsList from './ApplicantsList';
import useGetApplicants from '../../../hooks/data/useGetApplicants';

// Mock the custom hook
jest.mock('../../../hooks/data/useGetApplicants');

const mockApplicants = [
  { id: 1, name: 'John Doe', email: 'john@example.com', matchingPercentage: 80 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', matchingPercentage: 90 },
];

describe('ApplicantsList', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    useGetApplicants.mockReturnValue({
      applicants: mockApplicants,
      loading: false,
      error: null,
      hasMore: false,
      fetchApplicants: jest.fn(),
    });
  });

  it('renders the component with applicants', async () => {
    render(<ApplicantsList open={true} jobId="123" onClose={mockOnClose} onSelect={mockOnSelect} />);

    expect(screen.getByText('Applicants')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('shows loading indicator when loading', async () => {
    useGetApplicants.mockReturnValue({
      applicants: [],
      loading: true,
      error: null,
      hasMore: true,
      fetchApplicants: jest.fn(),
    });

    render(<ApplicantsList open={true} jobId="123" onClose={mockOnClose} onSelect={mockOnSelect} />);

    expect(screen.getByText('Loading applicants...')).toBeInTheDocument();
  });

  it('shows error message when there is an error', async () => {
    useGetApplicants.mockReturnValue({
      applicants: [],
      loading: false,
      error: 'Failed to fetch applicants',
      hasMore: false,
      fetchApplicants: jest.fn(),
    });

    render(<ApplicantsList open={true} jobId="123" onClose={mockOnClose} onSelect={mockOnSelect} />);

    expect(screen.getByText('Failed to fetch applicants')).toBeInTheDocument();
  });

  it('shows "No applicants found" message when there are no applicants', async () => {
    useGetApplicants.mockReturnValue({
      applicants: [],
      loading: false,
      error: null,
      hasMore: false,
      fetchApplicants: jest.fn(),
    });

    render(<ApplicantsList open={true} jobId="123" onClose={mockOnClose} onSelect={mockOnSelect} />);

    expect(screen.getByText('No applicants found.')).toBeInTheDocument();
  });

  it('calls onSelect when an applicant is clicked', async () => {
    render(<ApplicantsList open={true} jobId="123" onClose={mockOnClose} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText('John Doe'));
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  it('calls onClose when close button is clicked', async () => {
    render(<ApplicantsList open={true} jobId="123" onClose={mockOnClose} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByLabelText('Close applicants list'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('is accessible', async () => {
    const { container } = render(<ApplicantsList open={true} jobId="123" onClose={mockOnClose} onSelect={mockOnSelect} />);
    
    await waitFor(() => {
      expect(container).toHaveNoViolations();
    });
  });
});