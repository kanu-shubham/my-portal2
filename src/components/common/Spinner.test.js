import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

// Mock the CircularProgress component without relying on Material-UI
jest.mock('@material-ui/core/CircularProgress', () => {
  return function MockCircularProgress(props) {
    return <div data-testid="mock-circular-progress" {...props} />;
  };
});

describe('Spinner Component', () => {
  it('renders with default props when visible', () => {
    const { getByTestId } = render(<Spinner />);
    const spinner = getByTestId('mock-circular-progress');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('color', 'secondary');
    expect(spinner).toHaveAttribute('size', '16');
    expect(spinner).toHaveAttribute('aria-label', 'Loading indicator');
  });

  it('applies custom props correctly', () => {
    const { getByTestId } = render(<Spinner size={24} color="primary" label="Custom loading" />);
    const spinner = getByTestId('mock-circular-progress');
    expect(spinner).toHaveAttribute('color', 'primary');
    expect(spinner).toHaveAttribute('size', '24');
    expect(spinner).toHaveAttribute('aria-label', 'Custom loading');
  });

  it('does not render when visible is false', () => {
    const { queryByTestId } = render(<Spinner visible={false} />);
    expect(queryByTestId('mock-circular-progress')).not.toBeInTheDocument();
  });

  it('renders when visible is true', () => {
    const { getByTestId } = render(<Spinner visible={true} />);
    expect(getByTestId('mock-circular-progress')).toBeInTheDocument();
  });
});