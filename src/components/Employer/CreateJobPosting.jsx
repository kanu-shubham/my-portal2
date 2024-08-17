import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Chip,
  Autocomplete
} from '@mui/material';

const CreateJobPosting = ({ onJobCreated }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [tags, setTags] = useState([]);

  const onSubmit = (data) => {
    const jobData = { ...data, tags };
    onJobCreated(jobData);
    reset();
    setTags([]);
  };

  const handleTagsChange = (event, newTags) => {
    setTags(newTags);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography component="h2" variant="h5" mb={2} id="create-job-posting-title">
        Post a New Job
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="create-job-posting-title">
    
        
      <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
          <Controller
            name="jobTitle"
            control={control}
            defaultValue=""
            rules={{ required: 'Job title is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                id="jobTitle"
                fullWidth
                error={!!errors.jobTitle}
                aria-describedby="jobTitle-error"
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': !!errors.jobTitle
                }}
              />
            )}
          />
          {errors.jobTitle && (
            <FormHelperText id="jobTitle-error" error>
              {errors.jobTitle.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="jobDescription">Job Description</FormLabel>
          <Controller
            name="jobDescription"
            control={control}
            defaultValue=""
            rules={{ 
              required: 'Job description is required',
              maxLength: {
                value: 16384,
                message: 'Job description must not exceed 16KB'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="jobDescription"
                multiline
                rows={4}
                fullWidth
                error={!!errors.jobDescription}
                aria-describedby="jobDescription-error"
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': !!errors.jobDescription
                }}
              />
            )}
          />
          {errors.jobDescription && (
            <FormHelperText id="jobDescription-error" error>
              {errors.jobDescription.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="jobRequirements">Job Requirements</FormLabel>
          <Controller
            name="jobRequirements"
            control={control}
            defaultValue=""
            rules={{ required: 'Job requirements are required' }}
            render={({ field }) => (
              <TextField
                {...field}
                id="jobRequirements"
                multiline
                rows={4}
                fullWidth
                error={!!errors.jobRequirements}
                aria-describedby="jobRequirements-error"
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': !!errors.jobRequirements
                }}
              />
            )}
          />
          {errors.jobRequirements && (
            <FormHelperText id="jobRequirements-error" error>
              {errors.jobRequirements.message}
            </FormHelperText>
          )}
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="tags">Job Tags</FormLabel>
          <Autocomplete
            multiple
            id="tags"
            options={[]}
            freeSolo
            value={tags}
            onChange={handleTagsChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Enter tags and press Enter"
                helperText="Enter relevant tags for the job (e.g., 'React', 'JavaScript', 'Remote')"
                inputProps={{
                  ...params.inputProps,
                  'aria-describedby': 'tags-helper-text'
                }}
              />
            )}
          />
          <FormHelperText id="tags-helper-text">
            Enter tags to categorize the job. Press Enter after each tag.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="companyName">Company Name</FormLabel>
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            rules={{ required: 'Company name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                id="companyName"
                fullWidth
                error={!!errors.companyName}
                aria-describedby="companyName-error"
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': !!errors.companyName
                }}
              />
            )}
          />
          {errors.companyName && (
            <FormHelperText id="companyName-error" error>
              {errors.companyName.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="contactInfo">Contact Info</FormLabel>
          <Controller
            name="contactInfo"
            control={control}
            defaultValue=""
            rules={{ required: 'Contact info is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                id="contactInfo"
                fullWidth
                error={!!errors.contactInfo}
                aria-describedby="contactInfo-error"
                inputProps={{
                  'aria-required': 'true',
                  'aria-invalid': !!errors.contactInfo
                }}
              />
            )}
          />
          {errors.contactInfo && (
            <FormHelperText id="contactInfo-error" error>
              {errors.contactInfo.message}
            </FormHelperText>
          )}
        </FormControl>

        <Box mt={3}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            aria-describedby="submit-job-posting"
          >
            Post Job
          </Button>
          <FormHelperText id="submit-job-posting">
            Submit the job posting form
          </FormHelperText>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateJobPosting;