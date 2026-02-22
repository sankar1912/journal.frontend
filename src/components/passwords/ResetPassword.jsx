"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useAppNavigate } from "@/hooks/useAppNavigate";

function ResetPassword() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const router = useRouter();
  const navigate = useAppNavigate();
  useEffect(() => {
    console.log(id);
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setAlert({ type: "error", message: "Passwords do not match." });
    }

    try {
      const res = await axios.post(`/api/v1/user/password/reset/${id}`, {
        password,
      });
      setAlert({ type: "success", message: res.data.message });
      setTimeout(() => navigate("/signin"), 2500);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to reset password.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: "480px",
        margin: "auto",
        marginTop: "80px",
        padding: "2.5rem",
        backgroundColor: "#fdfdfd",
        borderRadius: "16px",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Reset Password
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Please enter your new password below to complete your password reset
        request.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {alert.message && (
        <Alert severity={alert.type} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 1, textTransform: "none" }}
          >
            Set New Password
          </Button>
        </Stack>
      </form>

      <Typography
        variant="caption"
        display="block"
        textAlign="center"
        color="text.secondary"
        mt={3}
      >
        Make sure your new password is strong and easy to remember.
      </Typography>
    </motion.div>
  );
}

export default ResetPassword;
