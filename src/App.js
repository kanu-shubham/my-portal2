import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './hooks/useAuth';
import AppContent from './AppContent';
import theme from './styles/theme';

const App = () => {
  return (
    <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Router>
  );
};

export default App;