import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is stored in localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password, userType) => {
    try {
      const response = await mockLoginAPI(email, password, userType);
      
      const loggedInUser = {
        email,
        userType,
        password
      };

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      return loggedInUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isFreelancer: user?.userType === 'freelancer',
    isEmployer: user?.userType === 'employer',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Mock login
const mockLoginAPI = (email, password, userType) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password && userType) {
        resolve({ success: true });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};