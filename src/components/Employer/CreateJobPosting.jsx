import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateJob } from '../../hooks/data/useCreateJob';
import ConditionalRender  from '../../components/common/ConditionalRender';
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
  Autocomplete,
  CircularProgress
} from '@mui/material';

const CreateJobPosting = ({ onJobCreated, onClose }) => {
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [tags, setTags] = useState([]);
  const createJobMutation = useCreateJob();

  const onSubmit = (data) => {
    const jobData = { 
      ...data, 
      tags,
      id: Date.now(), // Generate a temporary ID
      applicants: 0 // Initialize applicants count
    };
    createJobMutation.mutate(jobData, {
      onSuccess: (createdJob) => {
        onJobCreated(createdJob);
        reset();
        setTags([]);
        setTimeout(() => {
          onClose();
        }, 2000);
      },
      onError: (error) => {
        console.error('Error creating job:', error);
        // Handle error (e.g., show an error message to the user)
      },
    });
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
                disabled={createJobMutation.isLoading}
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
                disabled={createJobMutation.isLoading}
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
                disabled={createJobMutation.isLoading}
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
                disabled={createJobMutation.isLoading}
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
                disabled={createJobMutation.isLoading}
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
                disabled={createJobMutation.isLoading}
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

        <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createJobMutation.isLoading}
              fullWidth
              aria-describedby="submit-job-posting"
            >
              <ConditionalRender when={createJobMutation.isLoading} fallback="Post Job">
                <CircularProgress size={24} color="inherit" />
              </ConditionalRender>
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              disabled={createJobMutation.isLoading}
              onClick={onClose}
              fullWidth
              aria-describedby="close-job-posting"
            >
              Close
            </Button>
          </Box>
        <FormHelperText id="submit-job-posting">
          Submit the job posting form
        </FormHelperText>
        <FormHelperText id="close-job-posting">
          Close the job posting form without submitting
        </FormHelperText>
      </form>
    </Paper>
  );
};

export default CreateJobPosting;