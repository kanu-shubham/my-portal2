import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './components/common/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import UserProfile from './components/Employer/UserProfile';
import { useAuth } from './hooks/useAuth';
import JobListings from './components/Freelancer/JobListings';
import FreelancerProfile from './components/Freelancer/FreelancerProfile';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    if (allowedRoles && !allowedRoles.includes(user.userType)) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
  
  const AppRoutes = () => {
    return (
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
  
        {/* Protected routes for all authenticated users */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              {/* <Profile /> */}
            </ProtectedRoute>
          } 
        />
  
        {/* Protected routes for freelancers */}
        <Route 
          path="/freelancer-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['freelancer']}>
              <FreelancerDashboard />
            </ProtectedRoute>
          } 
        />
  
        {/* Protected routes for employers */}
        <Route 
          path="/employer-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/post-job" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
               {/* <PostJob /> */}
            </ProtectedRoute>
          } 
        />

      <Route 
          path="/job-listings" 
          element={
            <ProtectedRoute allowedRoles={['freelancer']}>
               <JobListings />
            </ProtectedRoute>
          } 
        />

       <Route 
          path="/user-profile" 
          element={
            <ProtectedRoute allowedRoles={['freelancer']}>
               <FreelancerProfile />
            </ProtectedRoute>
          } 
        />  
     
       <Route 
          path="/user-profile/:id" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
               <UserProfile/>
            </ProtectedRoute>
          } 
        />
  
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  };  

export default AppRoutes;