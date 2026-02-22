"use client";

import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Oops! The page you are looking for doesn’t exist or has been moved.
      </Typography>

      <Button
        component={Link}
        href="/"
        variant="contained"
        color="primary"
        sx={{ borderRadius: 3 }}
      >
        Go Home
      </Button>
    </Box>
  );
}
