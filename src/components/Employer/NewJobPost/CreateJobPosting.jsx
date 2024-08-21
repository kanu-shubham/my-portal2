import React, { useState, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateJob } from '../../../hooks/data/useCreateJob';
import ConditionalRender from '../../common/ConditionalRender';
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

const CreateJobPosting = React.memo(({ onJobCreated, onClose }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [tags, setTags] = useState([]);
  const createJobMutation = useCreateJob();

  const onSubmit = useCallback((data) => {
    const jobData = { 
      ...data, 
      tags,
      id: Date.now(),
      applicants: 0
    };
    createJobMutation.mutate(jobData, {
      onSuccess: (createdJob) => {
        onJobCreated(createdJob);
        reset();
        setTags([]);
        setTimeout(onClose, 2000);
      },
      onError: (error) => {
        console.error('Error creating job:', error);
      },
    });
  }, [tags, createJobMutation, onJobCreated, reset, onClose]);

  const handleTagsChange = useCallback((event, newTags) => {
    setTags(newTags);
  }, []);

  const isSubmitDisabled = useMemo(() => createJobMutation.isLoading, [createJobMutation.isLoading]);

  const renderTextField = useCallback((name, label, rules, multiline = false, rows = 1) => (
    <FormControl fullWidth margin="normal">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            id={name}
            multiline={multiline}
            rows={rows}
            fullWidth
            error={!!errors[name]}
            disabled={isSubmitDisabled}
            aria-describedby={`${name}-error`}
            inputProps={{
              'aria-required': 'true',
              'aria-invalid': !!errors[name]
            }}
          />
        )}
      />
      {errors[name] && (
        <FormHelperText id={`${name}-error`} error>
          {errors[name].message}
        </FormHelperText>
      )}
    </FormControl>
  ), [control, errors, isSubmitDisabled]);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography component="h2" variant="h5" mb={2} id="create-job-posting-title">
        Post a New Job
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby="create-job-posting-title">
        {renderTextField('jobTitle', 'Job Title', { required: 'Job title is required' })}
        {renderTextField('jobDescription', 'Job Description', { 
          required: 'Job description is required',
          maxLength: {
            value: 16384,
            message: 'Job description must not exceed 16KB'
          }
        }, true, 4)}
        {renderTextField('jobRequirements', 'Job Requirements', { required: 'Job requirements are required' }, true, 4)}
        {renderTextField('companyName', 'Company Name', { required: 'Company name is required' })}
        {renderTextField('contactInfo', 'Contact Info', { required: 'Contact info is required' })}

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
                <Chip key={option} variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Enter tags and press Enter"
                disabled={isSubmitDisabled}
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

        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitDisabled}
            fullWidth
            aria-describedby="submit-job-posting"
          >
            <ConditionalRender when={isSubmitDisabled} fallback="Post Job">
              <CircularProgress size={24} color="inherit" />
            </ConditionalRender>
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            disabled={isSubmitDisabled}
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
});

export default CreateJobPosting;