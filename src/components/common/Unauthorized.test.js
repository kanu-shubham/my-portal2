import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Unauthorized from './Unauthorized';

// Mock the MUI components
jest.mock('@mui/material', () => ({
    Container: ({ children }) => <div data-testid="mui-container">{children}</div>,
    Typography: ({ children }) => <div data-testid="mui-typography">{children}</div>,
    Button: ({ children }) => <button data-testid="mui-button">{children}</button>,
    Box: ({ children }) => <div data-testid="mui-box">{children}</div>,
  }));

// Mock Material-UI icon
jest.mock('@mui/icons-material/ErrorOutline', () => () => <div data-testid="error-icon" />);

describe('Unauthorized Component', () => {
  it('displays the correct title', () => {
    render(
      <Router>
        <Unauthorized />
      </Router>
    );
    expect(screen.getByText('Unauthorized Access')).toBeInTheDocument();
  });

  it('displays the error message', () => {
    render(
      <Router>
        <Unauthorized />
      </Router>
    );
    expect(screen.getByText(/Sorry, you don't have permission to access this page/i)).toBeInTheDocument();
  });

  it('renders the error icon', () => {
    render(
      <Router>
        <Unauthorized />
      </Router>
    );
    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
  });
});