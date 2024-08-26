import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';

// Mock console.error to avoid cluttering test output
console.error = jest.fn();

// Create a component that throws an error
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal component</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    console.error.mockClear();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test child')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText(/We're sorry for the inconvenience/)).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
  });

  it('logs error to console in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
    expect(screen.getByText('Error Details:')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('does not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Error Details:')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('calls window.location.reload when refresh button is clicked', () => {
    const mockReload = jest.fn();
    delete window.location;
    window.location = { reload: mockReload };

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Refresh Page'));
    expect(mockReload).toHaveBeenCalled();
  });

  it('updates state when an error occurs', () => {
    const errorBoundary = new ErrorBoundary({});
    const error = new Error('Test error');
    const errorInfo = { componentStack: 'Test stack' };

    errorBoundary.componentDidCatch(error, errorInfo);

    expect(errorBoundary.state.hasError).toBe(true);
    expect(errorBoundary.state.error).toBe(error);
    expect(errorBoundary.state.errorInfo).toBe(errorInfo);
  });

  it('returns correct state from getDerivedStateFromError', () => {
    const error = new Error('Test error');
    const result = ErrorBoundary.getDerivedStateFromError(error);

    expect(result).toEqual({ hasError: true });
  });
});