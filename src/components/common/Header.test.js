import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from './Header';
import { useAuth } from '../../hooks/useAuth';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth');

describe('Header', () => {
  const mockLogout = jest.fn();

  const renderHeader = (authState) => {
    useAuth.mockReturnValue(authState);
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  test('renders the logo with correct link', () => {
    renderHeader({ isAuthenticated: false });
    const logo = screen.getByText('Quick Hire');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders "Find Jobs" button', () => {
    renderHeader({ isAuthenticated: false });
    const findJobsButton = screen.getByText('Find Jobs');
    expect(findJobsButton).toBeInTheDocument();
    expect(findJobsButton).toHaveAttribute('href', '/jobs');
  });

  test('renders login and signup buttons when not authenticated', () => {
    renderHeader({ isAuthenticated: false });
    expect(screen.getByText('Login')).toHaveAttribute('href', '/login');
    expect(screen.getByText('Sign Up')).toHaveAttribute('href', '/signup');
  });

  test('renders dashboard and logout buttons when authenticated as freelancer', () => {
    renderHeader({ 
      isAuthenticated: true, 
      user: { userType: 'freelancer' },
      logout: mockLogout
    });
    expect(screen.getByText('Dashboard')).toHaveAttribute('href', '/freelancer-dashboard');
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders dashboard and logout buttons when authenticated as employer', () => {
    renderHeader({ 
      isAuthenticated: true, 
      user: { userType: 'employer' },
      logout: mockLogout
    });
    expect(screen.getByText('Dashboard')).toHaveAttribute('href', '/employer-dashboard');
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls logout function when logout button is clicked', () => {
    renderHeader({ 
      isAuthenticated: true, 
      user: { userType: 'freelancer' },
      logout: mockLogout
    });
    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });

  test('does not render login and signup buttons when authenticated', () => {
    renderHeader({ 
      isAuthenticated: true, 
      user: { userType: 'freelancer' },
      logout: mockLogout
    });
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  test('does not render dashboard and logout buttons when not authenticated', () => {
    renderHeader({ isAuthenticated: false });
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});