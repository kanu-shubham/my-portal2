import { useState, useEffect } from 'react';

const useUserProfile = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = {
          id,
          name: `Applicant ${id}`,
          email: `applicant${id}@example.com`,
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          projects: [
            { name: 'E-commerce Platform', description: 'Built a full-stack e-commerce platform' },
            { name: 'Task Management App', description: 'Developed a React-based task management application' }
          ],
          experience: '5 years of software development experience',
          education: 'Bachelor of Science in Computer Science'
        };
        setUser(mockUser);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  return { user, loading, error };
};

export default useUserProfile;