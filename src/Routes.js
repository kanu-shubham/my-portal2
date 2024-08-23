import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Lazy load components
const NotFound = lazy(() => import('./components/common/NotFound'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const FreelancerDashboard = lazy(() => import('./pages/Freelancer/FreelancerDashboard'));
const EmployerDashboard = lazy(() => import('./pages/Employer/EmployerDashboard'));
const UserProfile = lazy(() => import('./components/Employer/EmployerProfile/UserProfile'));
const JobListings = lazy(() => import('./components/Freelancer/Jobs/JobListings/JobListings'));
const FreelancerProfile = lazy(() => import('./components/Freelancer/FreelancerProfile/FreelancerProfile'));

// Loading component
const Loading = () => <div>Loading...</div>;

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
    <Suspense fallback={<Loading />}>
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
              <UserProfile />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;