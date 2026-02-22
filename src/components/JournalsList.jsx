"use client";

import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { getJournalState } from "@/redux/slices/journalSlice";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Tooltip,
  Avatar,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import SearchIcon from "@mui/icons-material/Search";
import { useAppNavigate } from "@/hooks/useAppNavigate";

function JournalsList() {
  const { journals } = useSelector(getJournalState);
  const theme = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  // Filter journals based on search query
  const filteredJournals = useMemo(() => {
    if (!searchQuery.trim()) return journals;
    const lowerQuery = searchQuery.toLowerCase();
    return journals.filter(
      (journal) =>
        journal.name.toLowerCase().includes(lowerQuery) ||
        journal.issn?.toLowerCase().includes(lowerQuery) ||
        journal.editorInChief?.toLowerCase().includes(lowerQuery) ||
        journal.scope.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }, [journals, searchQuery]);
  const navigate = useAppNavigate();
  return (
    <Box
      padding={4}
      minHeight="80vh"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Explore Journals
      </Typography>

      {/* 🔍 Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search journals..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{
          maxWidth: 600,
          mt: 2,
          borderRadius: "50px",
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {filteredJournals.length === 0 ? (
        <Typography variant="h6" align="center" mt={10}>
          No journals found.
        </Typography>
      ) : (
        <Stack spacing={4} mt={6} width="100%">
          {filteredJournals.map((journal, index) => (
            <motion.div
              key={journal._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/journal/${journal._id}`)}
              style={{ width: "100%" }}
            >
              <Card
                sx={{
                  borderRadius: "30px",
                  backdropFilter: "blur(10px)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  sx={{ width: "100%" }}
                >
                  {/* Journal Cover */}
                  <CardMedia
                    component="img"
                    image={journal.coverImage}
                    alt={journal.name}
                    sx={{
                      minHeight: 80,
                      width: { xs: "100%", md: 300 },
                      height: { xs: "100%", md: "100%" },
                      objectFit: "contain",
                      flexShrink: 0,
                    }}
                  />

                  {/* Journal Content */}
                  <CardContent sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={1}
                    >
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <BookIcon />
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        {journal.name}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={1}
                    >
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <ConfirmationNumberIcon />
                      </Avatar>
                      <Typography variant="body2">
                        <strong>ISSN:</strong> {journal.issn}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={1}
                    >
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <AssignmentIndIcon />
                      </Avatar>
                      <Typography variant="body2">
                        <strong>Editor:</strong> {journal.editorInChief}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" mt={1} mb={1} noWrap>
                      {journal.about}
                    </Typography>

                    {/* Scope Tags */}
                    <Stack direction="row" spacing={1} flexWrap="wrap" mx={2}>
                      {journal?.scope?.map((tag, idx) => (
                        <Tooltip key={idx} title={tag} arrow placement="top">
                          <Chip
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText,
                              borderRadius: "10px",
                              cursor: "pointer",
                              "&:hover": {
                                bgcolor: theme.palette.primary.main,
                              },
                            }}
                          />
                        </Tooltip>
                      ))}
                      {journal.scope.length > 4 && (
                        <Chip
                          label={`+${journal.scope.length - 4} more`}
                          size="small"
                          variant="outlined"
                          sx={{ color: "white", borderColor: "white" }}
                        />
                      )}
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default JournalsList;
