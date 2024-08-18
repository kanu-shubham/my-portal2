import { useState, useEffect } from 'react';
import { fetchUserData } from '../../services/userService';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data. Please try again.');
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return { userData, loading, error };
};

export default useUserData;