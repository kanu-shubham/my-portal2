import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewJobPostings from './ViewJobPostings';

// Mock the hooks and context
jest.mock('../../../context/JobContext', () => ({
  useJobContext: () => ({
    jobs: [
      { id: 1, title: 'Job 1', description: 'Description 1' },
      { id: 2, title: 'Job 2', description: 'Description 2' },
    ]
  })
}));

jest.mock('../../../hooks/data/useGetJobListings', () => ({
  __esModule: true,
  default: () => ({
    isLoading: false,
    hasMore: true,
    fetchJobs: jest.fn(),
    loadingAnnouncement: { current: null },
  })
}));

// Mock the child components
jest.mock('./JobCard', () => {
  return function MockJobCard({ job, onApplicantClick }) {
    return (
      <div data-testid={`job-card-${job.id}`}>
        {job.title}
        {onApplicantClick && (
          <button onClick={() => onApplicantClick(job.id)}>View Applicants</button>
        )}
      </div>
    );
  };
});

jest.mock('../Applicants/ApplicantsList', () => {
  return function MockApplicantsList({ open, onClose }) {
    return open ? <div data-testid="applicants-list">Applicants List <button onClick={onClose}>Close</button></div> : null;
  };
});

describe('ViewJobPostings', () => {
  const mockHandleAppClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct title for employer view', () => {
    render(<ViewJobPostings employerView={true} handleAppClick={mockHandleAppClick} />);
    expect(screen.getByText('Your Job Postings')).toBeInTheDocument();
  });

  it('renders the correct title for job seeker view', () => {
    render(<ViewJobPostings employerView={false} handleAppClick={mockHandleAppClick} />);
    expect(screen.getByText('Available Jobs')).toBeInTheDocument();
  });

  it('renders job cards for each job', () => {
    render(<ViewJobPostings employerView={true} handleAppClick={mockHandleAppClick} />);
    expect(screen.getByTestId('job-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('job-card-2')).toBeInTheDocument();
  });

  it('opens ApplicantsList when View Applicants is clicked in employer view', async () => {
    render(<ViewJobPostings employerView={true} handleAppClick={mockHandleAppClick} />);
    
    fireEvent.click(screen.getAllByText('View Applicants')[0]);

    await waitFor(() => {
      expect(screen.getByTestId('applicants-list')).toBeInTheDocument();
    });
  });

  it('does not render ApplicantsList for job seeker view', () => {
    render(<ViewJobPostings employerView={false} handleAppClick={mockHandleAppClick} />);
    expect(screen.queryByText('View Applicants')).not.toBeInTheDocument();
  });

  // Add more tests as needed...
});