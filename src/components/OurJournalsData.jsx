"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CodeIcon from "@mui/icons-material/Code";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import TimelineIcon from "@mui/icons-material/Timeline";
import { getJournalState } from "@/redux/slices/journalSlice";
import { getJournal } from "@/redux/actions/journalActions";
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";
import { useAppNavigate } from "@/hooks/useAppNavigate";

function OurJournalsData() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { journals, loading } = useSelector(getJournalState);
  const router = useRouter();
  const navigate = useAppNavigate();
  const JournalSkeletonCard = () => {
    return (
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          padding: 2,
          height: "100%",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100%"
        >
          {/* Cover Image */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={{ mb: 2, borderRadius: "12px" }}
          />

          {/* Title */}
          <Skeleton variant="text" width="70%" height={28} sx={{ mb: 2 }} />

          <Divider sx={{ width: "80%", mb: 2 }} />

          {/* Details */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Box key={i} display="flex" alignItems="center" width="100%" mb={1}>
              <Skeleton
                variant="circular"
                width={28}
                height={28}
                sx={{ mr: 2 }}
              />
              <Box>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={80} height={16} />
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  useEffect(() => {
    dispatch(getJournal());
  }, [dispatch]);

  if (loading) {
    return (
      <Box width="100%" minHeight="100vh" py={4} px={2}>
        <Divider sx={{ height: "10px", color: "black", mb: 2 }} />
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          color="primary"
          textAlign="center"
        >
          Available Journals
        </Typography>

        <Grid container spacing={4}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={12} md={4} key={index}>
              <JournalSkeletonCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (journals.length === 0) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">No Journals Available</Typography>
      </Box>
    );
  }

  const renderCardContent = (journal) => {
    const details = isMobile
      ? [
          {
            label: "ISSN",
            value: journal.issn || "N/A",
            icon: <CodeIcon color="primary" />,
          },
          {
            label: "Publisher",
            value: journal.publisher || "Example Publisher",
            icon: <LocalLibraryIcon color="primary" />,
          },
        ]
      : [
          {
            label: "Volume",
            value: journal.volume || "N/A",
            icon: <LayersIcon color="primary" />,
          },
          {
            label: "Issue",
            value: journal.issue || "N/A",
            icon: <AssignmentIcon color="primary" />,
          },
          {
            label: "ISSN",
            value: journal.issn || "N/A",
            icon: <CodeIcon color="primary" />,
          },
          {
            label: "Publisher",
            value: journal.publisher || "Example Publisher",
            icon: <LocalLibraryIcon color="primary" />,
          },
          {
            label: "Impact Factor",
            value: journal.impactFactor || "N/A",
            icon: <TimelineIcon color="primary" />,
          },
        ];

    return (
      <Paper
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          padding: 2,
          height: "100%",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/journal/${journal._id}`)}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100%"
        >
          <Box
            component="img"
            src={journal.coverImage}
            alt={journal.name}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              mb: 2,
              borderRadius: "12px",
            }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            color="primary"
            sx={{ cursor: "pointer", textAlign: "center" }}
          >
            {journal.name}
          </Typography>

          <Divider sx={{ width: "80%", mb: 2 }} />

          {details.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              width="100%"
              mb={1}
            >
              <ListItemIcon sx={{ minWidth: "36px" }}>{item.icon}</ListItemIcon>
              <Box>
                <Typography fontWeight="bold" color="textPrimary">
                  {item.label}
                </Typography>
                <Typography color="textSecondary">{item.value}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  return (
    <Box width="100%" minHeight="100vh" py={4} px={2}>
      <Divider sx={{ height: "10px", color: "black", mb: 2 }} />
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        color="primary"
        textAlign="center"
      >
        Available Journals
      </Typography>

      <Grid container spacing={4}>
        {journals.map((journal) => (
          <Grid size={{ xs: 12, sm: 12, md: 4 }} key={journal._id}>
            {renderCardContent(journal)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default OurJournalsData;
