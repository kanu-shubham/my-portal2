import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Chip, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  CircularProgress
} from '@mui/material';
import useUserProfile from '../../../hooks/data/useUserProfile';

const UserProfile = ({ applicantId, onClose  }) => {
  const { user, loading, error } = useUserProfile(applicantId);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress aria-label="Loading user profile" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          User not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }} component="article" aria-labelledby="user-profile-title">
        <Typography variant="h4" component="h1" gutterBottom id="user-profile-title">
          {user.name}'s Profile
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: <span aria-label="User email">{user.email}</span>
        </Typography>

        <section aria-labelledby="skills-section">
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }} id="skills-section">
            Skills
          </Typography>
          <Grid container spacing={1} role="list" aria-label="User skills">
            {user.skills.map((skill, index) => (
              <Grid item key={index} role="listitem">
                <Chip label={skill} />
              </Grid>
            ))}
          </Grid>
        </section>

        <section aria-labelledby="projects-section">
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }} id="projects-section">
            Projects
          </Typography>
          <List aria-label="User projects">
            {user.projects.map((project, index) => (
              <ListItem key={index} component="article" aria-labelledby={`project-${index}`}>
                <ListItemText 
                  primary={project.name} 
                  secondary={project.description}
                  primaryTypographyProps={{ variant: 'h6', id: `project-${index}` }}
                />
              </ListItem>
            ))}
          </List>
        </section>

        <section aria-labelledby="experience-section">
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }} id="experience-section">
            Experience
          </Typography>
          <Typography variant="body1" paragraph>
            {user.experience}
          </Typography>
        </section>

        <section aria-labelledby="education-section">
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }} id="education-section">
            Education
          </Typography>
          <Typography variant="body1" paragraph>
            {user.education}
          </Typography>
        </section>

        <Button 
          variant="contained" 
          onClick={onClose} 
          sx={{ mt: 3 }}
          aria-label="Close user profile"
        >
          Close
        </Button>
      </Paper>
    </Container>
  );
};

export default UserProfile;