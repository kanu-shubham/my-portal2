import React, { useState } from 'react';
import { TextField, Button, Avatar, Autocomplete } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    skills: [],
    githubUsername: ''
  });

  const handleProfileChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSkillChange = (event, newValue) => {
    setProfile({ ...profile, skills: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
        value={profile.name}
        onChange={handleProfileChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="email"
        label="Email"
        value={profile.email}
        onChange={handleProfileChange}
      />
      <Autocomplete
        multiple
        id="skills"
        options={['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++']}
        value={profile.skills}
        onChange={handleSkillChange}
        renderInput={(params) => (
          <TextField {...params} label="Skills" margin="normal" />
        )}
      />
      <TextField
        fullWidth
        margin="normal"
        name="githubUsername"
        label="GitHub Username"
        value={profile.githubUsername}
        onChange={handleProfileChange}
      />
      <Button type="submit" variant="contained" color="primary" startIcon={<EditIcon />} sx={{ mt: 2 }}>
        Update Profile
      </Button>
    </form>
  );
};

export default UserProfile;