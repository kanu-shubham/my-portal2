import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField, Chip, Box } from '@mui/material';
import { useAuth } from '../../../../hooks/useAuth'; // Adjust the import path as needed

// Predefined list of common skills
const commonSkills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'HTML', 'CSS',
  'TypeScript', 'Angular', 'Vue.js', 'Django', 'Flask', 'Spring Boot', 'Docker',
  'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'Agile', 'Scrum', 'DevOps'
];

const SkillsAutocomplete = ({ control, watch }) => {
  const { user } = useAuth();
  const [skillSuggestions, setSkillSuggestions] = useState(commonSkills);

  useEffect(() => {
    // Combine user's existing skills with common skills for suggestions
    if (user && user.skills) {
      setSkillSuggestions([...new Set([...user.skills, ...commonSkills])]);
    }
  }, [user]);

  return (
    <>
      <Controller
        name="skills"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            options={skillSuggestions}
            freeSolo
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Skills"
                placeholder="Add skills"
                helperText="Select or type to add new skills"
              />
            )}
          />
        )}
      />
      <Box className="skills-container" role="region" aria-label="Selected Skills" mt={2}>
        {watch('skills').map((skill, index) => (
          <Chip key={index} label={skill} className="skill-chip" />
        ))}
      </Box>
    </>
  );
};

export default SkillsAutocomplete;