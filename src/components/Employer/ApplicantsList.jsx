import React, { useState, useEffect, useRef } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ApplicantsList = ({ open, jobId, onClose, onSelect }) => {
  const [applicants, setApplicants] = useState([]);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (open && jobId) {
      // Mock API call
      const mockApplicants = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Applicant ${i + 1}`,
        email: `applicant${i + 1}@example.com`
      }));
      setApplicants(mockApplicants);
    }
  }, [open, jobId]);

  useEffect(() => {
    if (open && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [open]);

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
        sx={{ width: 250 }}
        role="region"
        aria-label="Job applicants list"
      >
        <Box display="flex" alignItems="center" p={2}>
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
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
        <List>
          {applicants.map((applicant) => (
            <ListItem key={applicant.id} button onClick={()=>onSelect(applicant.id)}>
              <ListItemText 
                primary={applicant.name} 
                secondary={applicant.email}
                primaryTypographyProps={{ "aria-label": "Applicant name" }}
                secondaryTypographyProps={{ "aria-label": "Applicant email" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default ApplicantsList;