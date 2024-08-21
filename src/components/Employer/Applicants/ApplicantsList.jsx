import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './ApplicantsList.css';

const ApplicantItem = React.memo(({ applicant, onSelect }) => (
  <ListItem button onClick={() => onSelect(applicant.id)}>
    <ListItemText 
      primary={<span className="applicant-name">{applicant.name}</span>}
      secondary={<span className="applicant-email">{applicant.email}</span>}
      primaryTypographyProps={{ "aria-label": "Applicant name" }}
      secondaryTypographyProps={{ "aria-label": "Applicant email" }}
    />
  </ListItem>
));

const ApplicantsList = React.memo(({ open, jobId, onClose, onSelect }) => {
  const [applicants, setApplicants] = useState([]);
  const closeButtonRef = useRef(null);

  const fetchApplicants = useCallback(() => {
    // Simulating API call to fetch applicants
    const mockApplicants = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Applicant ${i + 1}`,
      email: `applicant${i + 1}@example.com`
    }));
    setApplicants(mockApplicants);
  }, []);

  useEffect(() => {
    if (open && jobId) {
      fetchApplicants();
    }
  }, [open, jobId, fetchApplicants]);

  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

  const handleSelect = useCallback((applicantId) => {
    onSelect(applicantId);
  }, [onSelect]);

  const applicantsList = useMemo(() => (
    <List>
      {applicants.map((applicant) => (
        <ApplicantItem 
          key={applicant.id} 
          applicant={applicant} 
          onSelect={handleSelect}
        />
      ))}
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
          <Typography variant="h6" component="h2" className="applicants-title">
            Applicants
          </Typography>
          <IconButton 
            onClick={onClose} 
            aria-label="close applicants drawer"
            ref={closeButtonRef}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {applicantsList}
      </Box>
    </Drawer>
  );
});

export default ApplicantsList;