"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getManuscriptsState } from "@/redux/slices/manuscriptsSlice";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import CircleIcon from "@mui/icons-material/Circle";
import { Skeleton } from "@mui/material";

const MotionPaper = motion(Paper);

const TopManuscripts = () => {
  const { manuscripts, loading } = useSelector(getManuscriptsState);
  const theme = useTheme();
  const { top = [] } = manuscripts;
  const SkeletonCard = () => {
    return (
      <Paper
        elevation={7}
        sx={{
          borderRadius: 3,
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Skeleton variant="text" width="80%" height={28} />
        <Skeleton variant="text" width="40%" height={20} />
        <Divider sx={{ my: 2 }} />
        <Skeleton variant="rectangular" height={80} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={60}
              height={24}
              sx={{ borderRadius: "16px" }}
            />
          ))}
        </Box>
        <Box display="flex" alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ ml: 2 }}>
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="text" width={80} height={16} />
          </Box>
        </Box>
      </Paper>
    );
  };

  const renderAuthors = (manuscript) => {
    const first = manuscript?.authors?.firstAuthors || [];
    const corresponding = manuscript?.authors?.correspondingAuthors || [];
    const combined = [...first, ...corresponding];
    const unique = Array.from(
      new Map(combined.map((a) => [a.name, a])).values()
    );
    const display = unique.slice(0, 4).map((a, i) => (
      <span key={i}>
        {a.name}
        {i < Math.min(3, unique.length - 1) ? ", " : ""}
      </span>
    ));
    if (unique.length > 4) display.push(<span key="et-al">et al.</span>);
    return display.length ? display : "Unknown Author";
  };

  useEffect(() => {
    console.log(top);
  }, [loading]);

  if (loading) {
    return (
      <Paper
        sx={{
          mt: 10,
          px: 4,
          py: 6,
          width: "98%",
          borderRadius: "20px",
        }}
        elevation={7}
      >
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Top Manuscripts by Journal
        </Typography>

        <Grid container spacing={4}>
          {Array.from({ length: 2 }).map((_, jIndex) => (
            <Grid item xs={12} md={6} key={jIndex}>
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 3,
                  p: 3,
                  mb: 3,
                  minHeight: "100%",
                }}
              >
                <Box display="flex" alignItems="center">
                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={120}
                    sx={{ mr: 2, borderRadius: 2 }}
                  />
                  <Box>
                    <Skeleton variant="text" width={140} height={28} />
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={180} height={16} />
                  </Box>
                </Box>
              </Paper>

              <Grid container spacing={2}>
                {Array.from({ length: 2 }).map((_, mIndex) => (
                  <Grid item xs={12} md={6} key={mIndex}>
                    <SkeletonCard />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        mt: 10,
        px: 4,
        py: 6,
        width: "98%",
        borderRadius: "20px",
        backgroundColor: theme.palette.background.default,
      }}
      elevation={7}
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Top Manuscripts by Journal
      </Typography>

      <Grid container spacing={4}>
        {top.map((journalObj, jIndex) => {
          const journal = journalObj.journal;
          const manuscripts = journalObj.manuscripts;

          return (
            <Grid item size={{ xs: 12, md: 6 }} key={jIndex}>
              <Box>
                <Paper
                  elevation={6}
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    backgroundColor: theme.palette.primary.light,
                    mb: 3,
                    minHeight: "100%",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={journal?.coverImage}
                      alt="cover"
                      sx={{
                        height: "auto",
                        width: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "2px solid white",
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {journal?.name}
                      </Typography>
                      <Typography variant="body2" color="white">
                        ISSN: {journal?.issn}
                      </Typography>
                      <Typography variant="caption" color="white">
                        {journal?.importantNotes || ""}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Grid container spacing={2}>
                  {manuscripts.map((manuscript, mIndex) => (
                    <Grid item size={{ xs: 12, md: 6 }} key={mIndex}>
                      <MotionPaper
                        elevation={7}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                          borderRadius: 3,
                          p: 3,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          backgroundColor: theme.palette.background.paper,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {manuscript.manuscriptTitle}
                        </Typography>
                        <Typography variant="caption" gutterBottom>
                          Posted on:{" "}
                          {manuscript.createdAt
                            ? new Date(manuscript.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Not available"}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            textAlign: "justify",
                            flexGrow: 1,
                            mb: 2,
                            overflow: "hidden",
                          }}
                        >
                          {manuscript.abstract?.slice(0, 200)}...
                        </Typography>

                        {/* Research Areas */}
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          {manuscript.researchAreas?.map((area, i) => (
                            <Chip
                              key={i}
                              label={area}
                              color="primary"
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.75rem" }}
                            />
                          ))}
                        </Box>

                        {/* Author Info */}
                        <Box display="flex" alignItems="center">
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent="+"
                          >
                            <Avatar
                              src={
                                manuscript.authors?.firstAuthors?.[0]
                                  ?.profileImage ||
                                manuscript.authors?.correspondingAuthors?.[0]
                                  ?.profileImage ||
                                ""
                              }
                              sx={{ width: 40, height: 40, mr: 2 }}
                            />
                          </Badge>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="medium">
                              {renderAuthors(manuscript)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(
                                manuscript.createdAt
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </Typography>
                          </Box>
                        </Box>
                      </MotionPaper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default TopManuscripts;
