import { useEffect } from 'react';
import useErrorHandler from '../hooks/useErrorHandler';

export const useGlobalErrorHandler = () => {
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const globalErrorHandler = (event) => {
      event.preventDefault();
      handleError(event.error);
    };

    const unhandledRejectionHandler = (event) => {
      event.preventDefault();
      handleError(event.reason);
    };

    window.addEventListener('error', globalErrorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    return () => {
      window.removeEventListener('error', globalErrorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, [handleError]);
};

export const ErrorDisplay = ({ error, clearError }) => {
  if (!error) return null;

  return (
    <div role="alert">
      <p>An error occurred: {error.message}</p>
      <button onClick={clearError}>Dismiss</button>
    </div>
  );
};