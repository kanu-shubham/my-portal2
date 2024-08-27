import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton, Box, LinearProgress, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useGetApplicants from '../../../hooks/data/useGetApplicants';
import './ApplicantsList.css';

const ApplicantItem = React.memo(({ applicant, onSelect }) => (
  <ListItem 
    button 
    onClick={() => onSelect(applicant.id)}
    aria-label={`Select ${applicant.name}`}
  >
    <ListItemText 
      primary={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span className="applicant-name">{applicant.name}</span>
          <Typography variant="body2" className="matching-percentage">
            {applicant.matchingPercentage}% match
          </Typography>
        </Box>
      }
      secondary={
        <Box>
          <span className="applicant-email">{applicant.email}</span>
          <LinearProgress 
            variant="determinate" 
            value={applicant.matchingPercentage} 
            className="matching-progress"
            aria-label={`Skills match: ${applicant.matchingPercentage}%`}
          />
        </Box>
      }
      primaryTypographyProps={{ "aria-label": "Applicant name and matching percentage" }}
      secondaryTypographyProps={{ "aria-label": "Applicant email and skills match visualization" }}
    />
  </ListItem>
));

const ApplicantsList = React.memo(({ open, jobId, onClose, onSelect }) => {
  const closeButtonRef = useRef(null);
  const { applicants, loading, error, hasMore, fetchApplicants } = useGetApplicants(jobId);
  const observer = useRef();
  const lastApplicantRef = useRef();

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      fetchApplicants();
    }
  }, [hasMore, fetchApplicants]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    observer.current = new IntersectionObserver(handleObserver, option);
    if (lastApplicantRef.current) observer.current.observe(lastApplicantRef.current);
    
    return () => {
      if (observer.current) observer.current.disconnect();
    }
  }, [handleObserver]);

  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  const handleSelect = useCallback((applicantId) => {
    onSelect(applicantId);
  }, [onSelect]);

  const applicantsList = useMemo(() => (
    <List className="applicants-list" aria-label="List of applicants">
       {applicants.map((applicant, index) => (
        <ApplicantItem 
          key={applicant.id} 
          applicant={applicant} 
          onSelect={handleSelect}
        />
      ))}
      <div ref={lastApplicantRef} className="sentinel" />
    </List>
  ), [applicants, handleSelect]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        className="applicants-drawer"
        role="region"
        aria-label="Job applicants list"
      >
        <Box className="applicants-header">
          <Typography variant="h6" component="h2" className="applicants-title" id="applicants-drawer-title">
            Applicants
          </Typography>
          <IconButton 
            onClick={onClose} 
            aria-label="Close applicants list"
            ref={closeButtonRef}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {error && (
          <Box textAlign="center" py={2} className="error-message" role="alert">
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        {applicants.length === 0 && !loading && !error ? (
          <Box textAlign="center" py={2} className="no-applicants-message" role="status">
            <Typography>No applicants found.</Typography>
          </Box>
        ) : (
          applicantsList
        )}
        {loading && (
          <Box textAlign="center" py={2} className="loading-indicator" role="status" aria-live="polite">
            <CircularProgress size={24} />
            <Typography>Loading applicants...</Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
});

export default ApplicantsList;