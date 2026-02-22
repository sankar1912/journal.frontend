"use client";

import Signin from "@/components/Signin";
import { useAppNavigate } from "@/hooks/useAppNavigate";
import { getAuthState } from "@/redux/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Skeleton, Paper, Typography } from "@mui/material";

function Authenticate({ children }) {
  const { auth, loading } = useSelector(getAuthState);
  const router = useRouter();
  const pathname = usePathname();
  const navigate = useAppNavigate();

  useEffect(() => {
    if (auth && (pathname === "/signin" || pathname === "/signup")) {
      navigate();
    }
  }, [auth, pathname, router, navigate]);

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, borderRadius: 3 }}>
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton variant="text" width="60%" sx={{ mt: 2 }} />
              <Skeleton variant="text" width="40%" />
            </Paper>
          </Grid>
          <Grid item size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                <Skeleton width="50%" />
              </Typography>
              <Skeleton
                variant="rectangular"
                height={150}
                sx={{ mb: 2, borderRadius: 2 }}
              />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="70%" />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!auth) {
    return <Signin />;
  }

  return <>{children}</>;
}

export default Authenticate;
