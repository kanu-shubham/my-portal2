import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import useUserProfile from '../../../hooks/data/useUserProfile';

// Mock the useUserProfile hook
jest.mock('../../../hooks/data/useUserProfile');

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
}));

describe('UserProfile', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    skills: ['React', 'JavaScript', 'Node.js'],
    projects: [
      { name: 'Project 1', description: 'Description 1' },
      { name: 'Project 2', description: 'Description 2' },
    ],
    experience: '5 years of web development',
    education: 'Bachelor in Computer Science',
  };

  const mockOnClose = jest.fn();

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/user/123']}>
        <Routes>
          <Route path="/user/:id" element={<UserProfile onClose={mockOnClose} />} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    useUserProfile.mockReturnValue({ loading: true, error: null, user: null });
    renderComponent();
    expect(screen.getByLabelText('Loading user profile')).toBeInTheDocument();
  });

  it('renders error state', () => {
    useUserProfile.mockReturnValue({ loading: false, error: 'Failed to fetch user', user: null });
    renderComponent();
    expect(screen.getByText('Error: Failed to fetch user')).toBeInTheDocument();
  });

  it('renders user not found state', () => {
    useUserProfile.mockReturnValue({ loading: false, error: null, user: null });
    renderComponent();
    expect(screen.getByText('User not found')).toBeInTheDocument();
  });

  it('renders user profile correctly', async () => {
    useUserProfile.mockReturnValue({ loading: false, error: null, user: mockUser });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(`${mockUser.name}'s Profile`)).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      mockUser.skills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
      expect(screen.getByText('Projects')).toBeInTheDocument();
      mockUser.projects.forEach(project => {
        expect(screen.getByText(project.name)).toBeInTheDocument();
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
      expect(screen.getByText('Experience')).toBeInTheDocument();
      expect(screen.getByText(mockUser.experience)).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
      expect(screen.getByText(mockUser.education)).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    useUserProfile.mockReturnValue({ loading: false, error: null, user: mockUser });
    renderComponent();

    const closeButton = await screen.findByRole('button', { name: 'Close user profile' });
    closeButton.click();

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});