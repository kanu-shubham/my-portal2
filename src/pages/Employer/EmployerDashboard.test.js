import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EmployerDashboard from './EmployerDashboard';
import { JobProvider } from '../../context/JobContext';
import { useAuth } from '../../hooks/useAuth';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock child components
jest.mock('../../components/Employer/JobsPostings/ViewJobPostings', () => () => <div data-testid="view-job-postings">ViewJobPostings</div>);
jest.mock('../../components/Employer/NewJobPost/CreateJobPosting', () => ({ onJobCreated, onCancel, onClose }) => (
  <div data-testid="create-job-posting">
    CreateJobPosting
    <button onClick={() => onJobCreated({ id: 1, title: 'New Job' })}>Create Job</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
));
jest.mock('../../components/Employer/EmployerProfile/UserProfile', () => ({ user, onClose }) => (
  <div data-testid="user-profile">
    UserProfile for {user.name}
    <button onClick={onClose}>Close</button>
  </div>
));

describe('EmployerDashboard', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user: { id: 1, name: 'Test Employer' } });
  });

  test('renders employer dashboard', () => {
    render(
      <JobProvider>
        <EmployerDashboard />
      </JobProvider>
    );
    expect(screen.getByText('Employer Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Create New Job')).toBeInTheDocument();
    expect(screen.getByTestId('view-job-postings')).toBeInTheDocument();
  });

  test('opens create job modal when "Create New Job" button is clicked', async () => {
    render(
      <JobProvider>
        <EmployerDashboard />
      </JobProvider>
    );
    const createJobButton = screen.getByText('Create New Job');
    userEvent.click(createJobButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('create-job-posting')).toBeInTheDocument();
    });
  });

  test('closes create job modal when job is created', async () => {
    render(
      <JobProvider>
        <EmployerDashboard />
      </JobProvider>
    );
    const createJobButton = screen.getByText('Create New Job');
    userEvent.click(createJobButton);
    
    await waitFor(() => {
      const createJobModalButton = screen.getByText('Create Job');
      userEvent.click(createJobModalButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('create-job-posting')).not.toBeInTheDocument();
    });
  });

  test('opens applicant profile modal when an applicant is clicked', async () => {
    render(
      <JobProvider>
        <EmployerDashboard />
      </JobProvider>
    );
    const viewJobPostings = screen.getByTestId('view-job-postings');
    fireEvent.click(viewJobPostings); // Simulate clicking an applicant
    
    await waitFor(() => {
      expect(screen.getByText('UserProfile for John Doe')).toBeInTheDocument();
    });
  });

  test('closes applicant profile modal', async () => {
    render(
      <JobProvider>
        <EmployerDashboard />
      </JobProvider>
    );
    const viewJobPostings = screen.getByTestId('view-job-postings');
    fireEvent.click(viewJobPostings); // Simulate clicking an applicant
    
    await waitFor(() => {
      const closeButton = screen.getByText('Close');
      userEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByText('UserProfile for John Doe')).not.toBeInTheDocument();
    });
  });
});