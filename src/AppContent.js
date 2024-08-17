import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useGlobalErrorHandler, ErrorDisplay } from './utils/errorHandling';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AppRoutes from './Routes';

function AppContent() {
  const navigate = useNavigate();
  useGlobalErrorHandler();

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flexGrow: 1 }}>
          <ErrorDisplay />
          <AppRoutes navigate={navigate} />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default AppContent;