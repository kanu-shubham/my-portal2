import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { ColorModeProvider } from './context/ThemeContext';
import { AuthProvider } from './hooks/useAuth';
import theme from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </ColorModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);