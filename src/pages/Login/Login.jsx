import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from 'notistack';
import {
  Container,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Box,
  Alert
} from '@mui/material';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      userType: 'freelancer'
    }
  });

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password, data.userType);
      enqueueSnackbar('Login failed. Please try again.', { variant: 'success' });
      if (user.userType === 'freelancer') {
        navigate('/freelancer-dashboard');
      } else if (user.userType === 'employer') {
        navigate('/employer-dashboard');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      enqueueSnackbar('Login failed. Please try again.', { variant: 'error' });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="login-container">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} className="login-form">
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="userType"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row className="user-type-radio">
                <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
                <FormControlLabel value="employer" control={<Radio />} label="Employer" />
              </RadioGroup>
            )}
          />
          {error && <Alert severity="error" className="error-alert">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-button"
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;