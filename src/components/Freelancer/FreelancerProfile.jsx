import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Chip, Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useGitHubRepos } from '../../hooks/data/useGitHubRepos';

const FreelancerProfile = ({ user, onUpdate }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      skills: user?.skills || [],
      githubUsername: user?.githubUsername || '',
    }
  });

  const githubUsername = watch('githubUsername');
  const { repos, loading, error } = useGitHubRepos(githubUsername);

  const onSubmit = (data) => {
    onUpdate({ ...data, repos });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="User Profile Form">
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Name"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            aria-invalid={!!error}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Email"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            aria-invalid={!!error}
          />
        )}
      />
      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Skills"
            fullWidth
            margin="normal"
            helperText="Enter skills separated by commas"
            onChange={(e) => {
              const skillsArray = e.target.value.split(',').map(skill => skill.trim());
              field.onChange(skillsArray);
            }}
            value={field.value.join(', ')}
          />
        )}
      />
      <Box mt={2} mb={2} role="region" aria-label="Selected Skills">
        {watch('skills').map((skill, index) => (
          <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
      <Controller
        name="githubUsername"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="GitHub Username"
            fullWidth
            margin="normal"
          />
        )}
      />
      {loading && <CircularProgress aria-label="Loading GitHub repositories" />}
      {error && <Alert severity="error">{error}</Alert>}
      {repos.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">GitHub Repositories:</Typography>
          <ul aria-label="GitHub Repositories">
            {repos.map(repo => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Update Profile
      </Button>
    </form>
  );
};

export default FreelancerProfile;