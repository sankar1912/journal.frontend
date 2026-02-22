"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "@/redux/actions/authActions";
import { useAppNavigate } from "@/hooks/useAppNavigate";

export default function Signin() {
  const theme = useTheme();
  const router = useRouter();
  const navigate = useAppNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const userData = {
        email,
        password,
      };
      dispatch(signin(userData));
      //setTimeout(()=>{router.push('/')},2000)
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: 2,
        height: "80%",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 4, md: 6 },
          borderRadius: 6,
          backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          maxWidth: "80%",
          width: "100%",
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          width="100%"
          gap={6}
        >
          <Box flex={1} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="h2"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                fontSize: { xs: "3rem", md: "4rem" },
                fontFamily: "Dancing Script, cursive",
              }}
            >
              JournalHub
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 2,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                maxWidth: 400,
                color: theme.palette.mode === "dark" ? "#ccccccff" : "black",
              }}
            >
              Connect with your thoughts and preserve your memories beautifully.
            </Typography>
          </Box>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1 }}
          >
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0)",
                backdropFilter: "blur(5px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email or Phone Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "black" : "white",
                    borderRadius: 2,
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "black" : "white",
                    borderRadius: 2,
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  Log In
                </Button>
                <Link
                  href="#"
                  variant="body2"
                  textAlign="center"
                  underline="hover"
                  color="#1976d2"
                >
                  Forgotten password?
                </Link>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Box width="100%" borderTop="1px solid #ddd" />
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 2,
                    mt: 2,
                    "&:hover": { backgroundColor: "#1976d2", color: "white" },
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Create New Account
                </Button>
              </Box>
            </Paper>

            <Typography variant="body2" textAlign="center" mt={4}>
              By continuing, you agree to our{" "}
              <Link
                href="#"
                underline="hover"
                fontWeight="bold"
                color="text.primary"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                underline="hover"
                fontWeight="bold"
                color="text.primary"
              >
                Privacy Policy
              </Link>
              .
            </Typography>
          </motion.div>
        </Box>
      </Paper>
    </Box>
  );
}
