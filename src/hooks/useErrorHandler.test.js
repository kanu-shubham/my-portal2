import React from 'react';
import { render, act } from '@testing-library/react';
import useErrorHandler from './useErrorHandler';

// Test component that uses the hook
function TestComponent() {
  const { error, handleError, clearError } = useErrorHandler();
  return (
    <div>
      <div data-testid="error">{error ? error.message : 'No error'}</div>
      <button onClick={() => handleError(new Error('Test error'))}>Set Error</button>
      <button onClick={clearError}>Clear Error</button>
    </div>
  );
}

describe('useErrorHandler', () => {
  let originalConsoleError;

  beforeAll(() => {
    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  beforeEach(() => {
    console.error.mockClear();
  });

  it('should initialize with null error', () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('error')).toHaveTextContent('No error');
  });

  it('should set error when handleError is called', () => {
    const { getByTestId, getByText } = render(<TestComponent />);
    
    act(() => {
      getByText('Set Error').click();
    });

    expect(getByTestId('error')).toHaveTextContent('Test error');
    expect(console.error).toHaveBeenCalledWith('An error occurred:', expect.any(Error));
  });

  it('should clear error when clearError is called', () => {
    const { getByTestId, getByText } = render(<TestComponent />);
    
    act(() => {
      getByText('Set Error').click();
    });

    expect(getByTestId('error')).toHaveTextContent('Test error');

    act(() => {
      getByText('Clear Error').click();
    });

    expect(getByTestId('error')).toHaveTextContent('No error');
  });
});