import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import FreelancerDashboard from './FreelancerDashboard';
import useUserData from '../../hooks/data/useUserData';

// Mock the custom hooks and child components
jest.mock('../../hooks/data/useUserData');
jest.mock('../../components/Freelancer/FreelancerProfile/ProfileSection', () => () => <div data-testid="profile-section">Profile Section</div>);
jest.mock('../../components/Freelancer/JobRecommendations/JobsRecommendations', () => () => <div data-testid="job-recommendations">Job Recommendations</div>);
jest.mock('../../components/Freelancer/PendingActions', () => () => <div data-testid="pending-actions">Pending Actions</div>);
jest.mock('../../components/Freelancer/RecentActivity/RecentActivity', () => () => <div data-testid="recent-activity">Recent Activity</div>);

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FreelancerDashboard', () => {
  const mockUserData = {
    name: 'John Doe',
    profile: {},
    recommendedJobs: [],
    pendingActions: [],
    recentActivities: []
  };

  beforeEach(() => {
    useUserData.mockReturnValue({ userData: mockUserData, loading: false, error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    useUserData.mockReturnValue({ userData: null, loading: true, error: null });
    render(<BrowserRouter><FreelancerDashboard /></BrowserRouter>);
    expect(screen.getByLabelText('Loading user data')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useUserData.mockReturnValue({ userData: null, loading: false, error: 'Error fetching data' });
    render(<BrowserRouter><FreelancerDashboard /></BrowserRouter>);
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  test('renders dashboard with user data', () => {
    render(<BrowserRouter><FreelancerDashboard /></BrowserRouter>);
    
    expect(screen.getByText(`Welcome back, ${mockUserData.name}!`)).toBeInTheDocument();
    expect(screen.getByTestId('profile-section')).toBeInTheDocument();
    expect(screen.getByTestId('job-recommendations')).toBeInTheDocument();
    expect(screen.getByTestId('pending-actions')).toBeInTheDocument();
    expect(screen.getByTestId('recent-activity')).toBeInTheDocument();
  });

  test('navigates to user profile when viewing profile', async () => {
    render(<BrowserRouter><FreelancerDashboard /></BrowserRouter>);
    
    const profileSection = screen.getByTestId('profile-section');
    await userEvent.click(profileSection);

    expect(mockNavigate).toHaveBeenCalledWith('/user-profile');
  });

  test('navigates to job details when viewing a job', async () => {
    render(<BrowserRouter><FreelancerDashboard /></BrowserRouter>);
    
    const jobRecommendations = screen.getByTestId('job-recommendations');
    await userEvent.click(jobRecommendations);

    // Assuming the first job has an id of 1
    expect(mockNavigate).toHaveBeenCalledWith('/job/1');
  });

  test('navigates to all jobs when viewing all jobs', async () => {
    render(<BrowserRouter><FreelancerDashboard /></BrowserRouter>);
    
    const jobRecommendations = screen.getByTestId('job-recommendations');
    await userEvent.click(jobRecommendations);

    expect(mockNavigate).toHaveBeenCalledWith('/job-listings');
  });

  test('renders correct headings for accessibility', () => {
    render(<BrowserRouter><FreelancerDashboard /></BrowserRouter>);
    
    expect(screen.getByText('Profile Overview')).toBeInTheDocument();
    expect(screen.getByText('Job Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Pending Actions')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });
});