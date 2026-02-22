"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAppNavigate } from "@/hooks/useAppNavigate";

export default function Unauthorized() {
  const router = useRouter();
  const navigate = useAppNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        <Typography variant="h3" color="error.main" gutterBottom>
          403
        </Typography>
        <Typography variant="h5" gutterBottom>
          Unauthorized
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You don&apos;t have permission to access this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
