import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navigation from './Navigation';
import { useAuth } from '../../hooks/useAuth';
import { useColorMode } from '../../context/ThemeContext';
import { useTheme } from '@mui/material/styles';

// Mock the hooks
jest.mock('../../hooks/useAuth');
jest.mock('../../context/ThemeContext');
jest.mock('@mui/material/styles', () => ({
  useTheme: jest.fn()
}));

describe('Navigation', () => {
  const mockToggleColorMode = jest.fn();
  const mockLogout = jest.fn();

  const renderNavigation = (authState, themeMode = 'light') => {
    useAuth.mockReturnValue(authState);
    useColorMode.mockReturnValue({ toggleColorMode: mockToggleColorMode });
    useTheme.mockReturnValue({ palette: { mode: themeMode } });

    return render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  };

  test('renders the app title', () => {
    renderNavigation({ isAuthenticated: false });
    expect(screen.getByText('Freelancer Platform')).toBeInTheDocument();
  });

  test('renders Home button', () => {
    renderNavigation({ isAuthenticated: false });
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
  });

  test('renders Login button when not authenticated', () => {
    renderNavigation({ isAuthenticated: false });
    expect(screen.getByText('Login')).toHaveAttribute('href', '/login');
  });

  test('renders Dashboard and Logout buttons when authenticated', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'freelancer' }, logout: mockLogout });
    expect(screen.getByText('Dashboard')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders Find Jobs button for freelancers', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'freelancer' }, logout: mockLogout });
    expect(screen.getByText('Find Jobs')).toHaveAttribute('href', '/jobs');
  });

  test('renders Post Job button for employers', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'employer' }, logout: mockLogout });
    expect(screen.getByText('Post Job')).toHaveAttribute('href', '/post-job');
  });

  test('calls logout function when Logout button is clicked', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'freelancer' }, logout: mockLogout });
    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });

  test('toggles color mode when theme button is clicked', () => {
    renderNavigation({ isAuthenticated: false });
    fireEvent.click(screen.getByRole('button', { name: /toggle color mode/i }));
    expect(mockToggleColorMode).toHaveBeenCalled();
  });

  test('renders correct icon for light mode', () => {
    renderNavigation({ isAuthenticated: false }, 'light');
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });

  test('renders correct icon for dark mode', () => {
    renderNavigation({ isAuthenticated: false }, 'dark');
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });

  test('does not render Login button when authenticated', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'freelancer' }, logout: mockLogout });
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  test('does not render Find Jobs button for employers', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'employer' }, logout: mockLogout });
    expect(screen.queryByText('Find Jobs')).not.toBeInTheDocument();
  });

  test('does not render Post Job button for freelancers', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'freelancer' }, logout: mockLogout });
    expect(screen.queryByText('Post Job')).not.toBeInTheDocument();
  });
});