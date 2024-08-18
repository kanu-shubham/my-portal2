import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia,
    Box,
    Autocomplete,
    Paper
  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
  
    const handleSearch = () => {
      console.log('Searching for:', jobTitle, 'in', location);
      // Implement actual search functionality here
    };

    const featuredCompanies = [
      { name: 'TechCorp', logo: '/path-to-logo1.png' },
      { name: 'InnoSoft', logo: '/path-to-logo2.png' },
      { name: 'DataDynamics', logo: '/path-to-logo3.png' },
      { name: 'CloudNine', logo: '/path-to-logo4.png' },
    ];

    const topCategories = [
      'Software Development',
      'Data Science',
      'Digital Marketing',
      'Project Management',
      'UI/UX Design',
      'Customer Service',
      'Sales',
      'Human Resources',
    ];

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box 
          component="section" 
          sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}
          aria-labelledby="hero-title"
        >
          <Container maxWidth="lg">
            <Typography variant="h1" id="hero-title" gutterBottom>
              Find Your Dream Job
            </Typography>
            <Typography variant="h5" paragraph>
              Search from millions of job opportunities across top companies
            </Typography>
            <Paper
              component="form"
              sx={{ p: 2, display: 'flex', alignItems: 'center', mt: 4 }}
              onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            >
              <Autocomplete
                freeSolo
                options={['Software Engineer', 'Data Analyst', 'Product Manager']}
                renderInput={(params) => <TextField {...params} label="Job Title, Skills, or Company" variant="outlined" fullWidth />}
                sx={{ flexGrow: 1, mr: 2 }}
                onChange={(event, newValue) => {
                  setJobTitle(newValue);
                }}
                aria-label="Job Title, Skills, or Company"
              />
              <Autocomplete
                freeSolo
                options={['New York', 'San Francisco', 'London', 'Berlin']}
                renderInput={(params) => <TextField {...params} label="Location" variant="outlined" fullWidth />}
                sx={{ flexGrow: 1, mr: 2 }}
                onChange={(event, newValue) => {
                  setLocation(newValue);
                }}
                aria-label="Location"
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                type="submit"
                aria-label="Search for jobs"
              >
                Search
              </Button>
            </Paper>
          </Container>
        </Box>
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
          <Grid container spacing={4} sx={{ mt: 4 }} aria-label="Key features of Freelancer Platform">
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h3" component="h2">
                    For Freelancers
                  </Typography>
                  <Typography>
                    Find exciting projects and showcase your skills
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h3" component="h2">
                    For Employers
                  </Typography>
                  <Typography>
                    Post jobs and hire talented freelancers
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h3" component="h2">
                    How It Works
                  </Typography>
                  <Typography>
                    Learn about our platform and get started
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Box component="section" aria-labelledby="featured-companies-title">
          <Container maxWidth="lg" sx={{ my: 8 }}>
            <Typography variant="h2" id="featured-companies-title" gutterBottom>
              Featured Companies
            </Typography>
            <Grid container spacing={4}>
              {featuredCompanies.map((company, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={company.logo}
                      alt={`${company.name} logo`}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {company.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box component="section" sx={{ bgcolor: 'grey.100', py: 8 }} aria-labelledby="top-categories-title">
          <Container maxWidth="lg">
            <Typography variant="h2" id="top-categories-title" gutterBottom>
              Top Job Categories
            </Typography>
            <Grid container spacing={2}>
              {topCategories.map((category, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Button variant="outlined" fullWidth aria-label={`View jobs in ${category}`}>
                    {category}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    );
};

export default Home;