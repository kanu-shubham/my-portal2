import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from './NotFound';

// Mock Material-UI components
jest.mock('@mui/material', () => ({
  Container: ({ children }) => <div data-testid="container">{children}</div>,
  Typography: ({ children, variant }) => <div data-testid={`typography-${variant}`}>{children}</div>,
  Button: ({ children }) => <button>{children}</button>,
  Box: ({ children }) => <div data-testid="box">{children}</div>,
}));

// Mock Material-UI icon
jest.mock('@mui/icons-material/SentimentVeryDissatisfied', () => () => <div data-testid="sad-face-icon" />);

describe('NotFound Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('displays the error message', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(screen.getByText(/Oops! The page you're looking for doesn't exist/i)).toBeInTheDocument();
  });

  it('renders the sad face icon', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(screen.getByTestId('sad-face-icon')).toBeInTheDocument();
  });
});