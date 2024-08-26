import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewJobPostings from './ViewJobPostings';
import { JobProvider, useJobContext } from '../../../context/JobContext';
import useJobListings from '../../../hooks/data/useGetJobListings';

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock the hooks and child components
jest.mock('../../../hooks/data/useGetJobListings');
jest.mock('../../../context/JobContext', () => ({
  JobProvider: ({ children }) => <div>{children}</div>,
  useJobContext: jest.fn(),
}));
jest.mock('./JobCard', () => ({ job, onApplicantClick }) => (
  <div data-testid={`job-card-${job.id}`}>
    {job.title}
    <button onClick={() => onApplicantClick(job.id)}>View Applicants</button>
  </div>
));
jest.mock('../Applicants/ApplicantsList', () => ({ open, onClose }) => (
  open ? <div data-testid="applicants-list">Applicants List <button onClick={onClose}>Close</button></div> : null
));

const mockJobs = [
  { id: 1, title: 'Software Engineer' },
  { id: 2, title: 'Product Manager' },
];

const renderWithJobProvider = (ui, { jobs = mockJobs, ...providerProps } = {}) => {
  useJobContext.mockReturnValue({ jobs, ...providerProps });
  return render(
    <JobProvider>
      {ui}
    </JobProvider>
  );
};

describe('ViewJobPostings', () => {
  beforeEach(() => {
    useJobListings.mockReturnValue({
      isLoading: false,
      hasMore: true,
      fetchJobs: jest.fn(),
      loadingAnnouncement: { current: document.createElement('div') },
    });
  });

  it('renders job listings for employers', async () => {
    renderWithJobProvider(<ViewJobPostings employerView={true} />);

    await waitFor(() => {
      expect(screen.getByText('Your Job Postings')).toBeInTheDocument();
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Product Manager')).toBeInTheDocument();
    });
  });

  it('renders job listings for job seekers', async () => {
    renderWithJobProvider(<ViewJobPostings employerView={false} />);

    await waitFor(() => {
      expect(screen.getByText('Available Jobs')).toBeInTheDocument();
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Product Manager')).toBeInTheDocument();
    });
  });

  it('displays a message when no jobs are available', async () => {
    renderWithJobProvider(<ViewJobPostings />, { jobs: [] });

    await waitFor(() => {
      expect(screen.getByText('No jobs available at the moment.')).toBeInTheDocument();
    });
  });

  it('opens applicant list when "View Applicants" is clicked (employer view)', async () => {
    renderWithJobProvider(<ViewJobPostings employerView={true} />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View Applicants')[0]);
    });

    await waitFor(() => {
      expect(screen.getByTestId('applicants-list')).toBeInTheDocument();
    });
  });

  it('closes applicant list when "Close" is clicked', async () => {
    renderWithJobProvider(<ViewJobPostings employerView={true} />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View Applicants')[0]);
    });

    await waitFor(() => {
      expect(screen.getByTestId('applicants-list')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.queryByTestId('applicants-list')).not.toBeInTheDocument();
    });
  });

  it('fetches more jobs when scrolling to the bottom', async () => {
    const mockFetchJobs = jest.fn();
    useJobListings.mockReturnValue({
      isLoading: false,
      hasMore: true,
      fetchJobs: mockFetchJobs,
      loadingAnnouncement: { current: document.createElement('div') },
    });

    renderWithJobProvider(<ViewJobPostings />);

    // Simulate intersecting with the last job element
    const mockCallback = useJobListings().fetchJobs;
    mockCallback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(mockFetchJobs).toHaveBeenCalled();
    });
  });

  it('displays loading spinner when fetching jobs', async () => {
    useJobListings.mockReturnValue({
      isLoading: true,
      hasMore: true,
      fetchJobs: jest.fn(),
      loadingAnnouncement: { current: document.createElement('div') },
    });

    renderWithJobProvider(<ViewJobPostings />);

    await waitFor(() => {
      expect(screen.getByLabelText('Loading jobs')).toBeInTheDocument();
    });
  });

  it('displays "No more jobs to load" message when all jobs are loaded', async () => {
    useJobListings.mockReturnValue({
      isLoading: false,
      hasMore: false,
      fetchJobs: jest.fn(),
      loadingAnnouncement: { current: document.createElement('div') },
    });

    renderWithJobProvider(<ViewJobPostings />);

    await waitFor(() => {
      expect(screen.getByText('No more jobs to load')).toBeInTheDocument();
    });
  });
});