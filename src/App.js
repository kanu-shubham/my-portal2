import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './hooks/useAuth';
import AppContent from './AppContent';
import ReactQueryProvider from './context/ReactQueryProvider';

const App = () => {
  return (
    <ReactQueryProvider>
    <Router>
    <ThemeProvider>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Router>
  </ReactQueryProvider>
  );
};

export default App;