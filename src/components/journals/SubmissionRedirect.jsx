"use client";

import { getAuthState } from "@/redux/slices/authSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Button, Box, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppNavigate } from "@/hooks/useAppNavigate";

function SubmissionRedirect({ journal }) {
  const { auth } = useSelector(getAuthState);
  const router = useRouter();
  const navigate = useAppNavigate();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        {auth ? (
          <>
            <Typography variant="h5" gutterBottom>
              Click below to porceed
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/journal/${journal._id}/submissions`)}
              sx={{ mt: 2 }}
            >
              Continue to Submit
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Please login to submit your work.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/signin")}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default SubmissionRedirect;
