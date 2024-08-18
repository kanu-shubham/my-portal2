import React, { useState, useEffect } from 'react';
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

const UserProfile = ({onClose}) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
     
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id,
        name: `Applicant ${id}`,
        email: `applicant${id}@example.com`,
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        projects: [
          { name: 'E-commerce Platform', description: 'Built a full-stack e-commerce platform' },
          { name: 'Task Management App', description: 'Developed a React-based task management application' }
        ],
        experience: '5 years of software development experience',
        education: 'Bachelor of Science in Computer Science'
      };
      setUser(mockUser);
      setLoading(false);
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress aria-label="Loading user profile" />
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
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" gutterBottom aria-label="User email">
          {user.email}
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
          Skills
        </Typography>
        <Grid container spacing={1} aria-label="User skills">
          {user.skills.map((skill, index) => (
            <Grid item key={index}>
              <Chip label={skill} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
          Projects
        </Typography>
        <List aria-label="User projects">
          {user.projects.map((project, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={project.name} 
                secondary={project.description}
                primaryTypographyProps={{ variant: 'h6' }}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
          Experience
        </Typography>
        <Typography variant="body1" paragraph>
          {user.experience}
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
          Education
        </Typography>
        <Typography variant="body1" paragraph>
          {user.education}
        </Typography>

        <Button 
          variant="contained" 
          onClick={onClose} 
          sx={{ mt: 3 }}
          aria-label="Go back to page"
        >
          Close
        </Button>
      </Paper>
    </Container>
  );
};

export default UserProfile;