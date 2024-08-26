import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JobRecommendations from './JobsRecommendations';

describe('JobRecommendations', () => {
  const mockJobs = [
    { id: 1, title: 'Software Engineer', company: 'Tech Co', location: 'San Francisco, CA' },
    { id: 2, title: 'Data Scientist', company: 'Data Corp', location: 'New York, NY' },
  ];

  const mockOnViewJob = jest.fn();
  const mockOnViewAllJobs = jest.fn();

  beforeEach(() => {
    render(
      <JobRecommendations 
        jobs={mockJobs} 
        onViewJob={mockOnViewJob} 
        onViewAllJobs={mockOnViewAllJobs}
      />
    );
  });

  test('renders the component title', () => {
    expect(screen.getByText('Recommended Jobs')).toBeInTheDocument();
  });

  test('renders the correct number of job listings', () => {
    const jobListings = screen.getAllByRole('listitem');
    expect(jobListings).toHaveLength(mockJobs.length);
  });

  test('displays job details correctly', () => {
    mockJobs.forEach(job => {
      expect(screen.getByText(job.title)).toBeInTheDocument();
      expect(screen.getByText(job.company)).toBeInTheDocument();
      expect(screen.getByText(job.location, { exact: false })).toBeInTheDocument();
    });
  });

  test('calls onViewJob with correct job id when "View Job" is clicked', () => {
    const viewJobButtons = screen.getAllByText('View Job');
    fireEvent.click(viewJobButtons[0]);
    expect(mockOnViewJob).toHaveBeenCalledWith(mockJobs[0].id);
  });

  test('calls onViewAllJobs when "View All Jobs" is clicked', () => {
    const viewAllJobsButton = screen.getByText('View All Jobs');
    fireEvent.click(viewAllJobsButton);
    expect(mockOnViewAllJobs).toHaveBeenCalled();
  });

  test('renders dividers between job listings', () => {
    const dividers = screen.getAllByRole('separator');
    expect(dividers).toHaveLength(mockJobs.length - 1);
  });
});