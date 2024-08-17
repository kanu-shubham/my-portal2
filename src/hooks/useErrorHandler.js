import { useState, useCallback } from 'react';

const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    console.error('An error occurred:', error);
    setError(error);
    // You can add additional error handling logic here, such as:
    // - Sending error to a logging service
    // - Displaying a notification to the user
    // - Redirecting to an error page
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};

export default useErrorHandler;