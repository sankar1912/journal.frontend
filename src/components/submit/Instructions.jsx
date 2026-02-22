'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';

const steps = [
  {
    label: 'Personal Details',
    description:
      'Complete your profile: full name, email, phone number, affiliation, ORCID ID, and Google Scholar link. This is required before submitting your manuscript.',
  },
  {
    label: 'Manuscript Information',
    description:
      'Enter the manuscript title, abstract (150–300 words), keywords, and select the type (e.g., original research, review). Make it concise and clear.',
  },
  {
    label: 'Author Information',
    description:
      'Add co-authors with full name, email, affiliation, and ORCID. Specify the corresponding author and ensure correct order and details.',
  },
  {
    label: 'Upload Manuscript',
    description:
      'Upload all required files: manuscript (PDF), figures, tables, and any supplementary files. Use descriptive names like "Smith_et_al_Manuscript.pdf". Total size should be ≤ 10 MB.',
  },
];

export default function Instructions({ open, onClose }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Dialog
      open={open}
      onClose={activeStep === steps.length ? onClose : undefined}
      disableEscapeKeyDown={activeStep !== steps.length}
      aria-labelledby="instructions-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="instructions-dialog-title">
        Manuscript Submission Guide
      </DialogTitle>
      <DialogContent dividers>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          <Typography>{steps[activeStep]?.description}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : activeStep === steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Finish
          </Button>
        ) : (
          <Button variant="contained" onClick={() => { handleReset(); onClose(); }}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
