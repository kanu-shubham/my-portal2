import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navigation from './Navigation';
import { useAuth } from '../../hooks/useAuth';
import { useColorMode } from '../../context/ThemeContext';

// Mock the hooks
jest.mock('../../hooks/useAuth');
jest.mock('../../context/ThemeContext', () => ({
  useColorMode: jest.fn(),
}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  AppBar: ({ children }) => <div data-testid="AppBar">{children}</div>,
  Toolbar: ({ children }) => <div data-testid="Toolbar">{children}</div>,
  Typography: ({ children }) => <div data-testid="Typography">{children}</div>,
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  IconButton: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock('@mui/icons-material/Brightness4', () => () => <div data-testid="Brightness4Icon" />);
jest.mock('@mui/icons-material/Brightness7', () => () => <div data-testid="Brightness7Icon" />);

// Mock MUI styles
jest.mock('@mui/material/styles', () => ({
  createTheme: jest.fn(() => ({})),
  ThemeProvider: ({ children }) => <div data-testid="ThemeProvider">{children}</div>,
  useTheme: jest.fn(() => ({ palette: { mode: 'light' } })),
}));

describe('Navigation', () => {
  const mockToggleColorMode = jest.fn();
  const mockLogout = jest.fn();

  const renderNavigation = (authState, themeMode = 'light') => {
    useAuth.mockReturnValue(authState);
    useColorMode.mockReturnValue({ toggleColorMode: mockToggleColorMode, mode: themeMode });
    jest.requireMock('@mui/material/styles').useTheme.mockReturnValue({ palette: { mode: themeMode } });

    return render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the app title', () => {
    renderNavigation({ isAuthenticated: false });
    expect(screen.getByText('Freelancer Platform')).toBeInTheDocument();
  });

  test('calls logout function when Logout button is clicked', () => {
    renderNavigation({ isAuthenticated: true, user: { type: 'freelancer' }, logout: mockLogout });
    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });
  
  test('renders correct icon for light mode', () => {
    renderNavigation({ isAuthenticated: false }, 'light');
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });

  test('renders correct icon for dark mode', () => {
    renderNavigation({ isAuthenticated: false }, 'dark');
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });
});