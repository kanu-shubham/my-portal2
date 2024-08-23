import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Chip, Box } from '@mui/material';
import { useGithubRepos } from '../../../hooks/data/useGithubRepos';
import GitHubRepos from '../GithubRepos/GitHubRepos';
import './FreelancerProfile.css';

const FreelancerProfile = ({ user, onUpdate }) => {
  const [githubUsername, setGithubUsername] = useState(user?.githubUsername || '');
  const { data: repos, isLoading, isError, error } = useGithubRepos(githubUsername);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      skills: user?.skills || [],
      githubUsername: user?.githubUsername || '',
    }
  });

  const onSubmit = (data) => {
    onUpdate({ ...data, repos });
  };

  const handleGithubUsernameBlur = (event, onChange) => {
    const newUsername = event.target.value.trim();
    setGithubUsername(newUsername);
    onChange(newUsername);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="freelancer-profile-form" aria-label="User Profile Form">
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
      <Box className="skills-container" role="region" aria-label="Selected Skills">
        {watch('skills').map((skill, index) => (
          <Chip key={index} label={skill} className="skill-chip" />
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
            onBlur={(event) => handleGithubUsernameBlur(event, field.onChange)}
          />
        )}
      />
       <GitHubRepos
        username={githubUsername}
        repos={repos}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Update Profile'}
      </Button>
    </form>
  );
};

export default FreelancerProfile;