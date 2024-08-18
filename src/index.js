import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { AuthProvider } from './hooks/useAuth';

ReactDOM.render(
  <React.StrictMode>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);