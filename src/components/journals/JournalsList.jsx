"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Modal,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getJournalState } from "@/redux/slices/journalSlice";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { getJournal } from "@/redux/actions/journalActions";
import { useRouter } from "next/navigation";
import { useAppNavigate } from "@/hooks/useAppNavigate";

function JournalsList() {
  const { journals } = useSelector(getJournalState);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredJournals = journals.filter((journal) =>
    journal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchQuery("");
  };
  const navigate = useAppNavigate();
  useEffect(() => {
    dispatch(getJournal());
  }, [dispatch]);

  return (
    <>
      <Paper
        onClick={handleOpen}
        sx={{
          height: 40,
          width: 200,
          p: "4px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          borderRadius: "25px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            width: 250,
          },
        }}
      >
        <SearchIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Typography variant="body2" color="textSecondary">
          Search Journal...
        </Typography>
      </Paper>

      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          sx={{
            position: "absolute",
            top: { xs: "10px", md: "10%" },
            left: { xs: "30px", md: "25%" },
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : "800px",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "16px",
            p: 4,
            outline: "none",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              What are you looking for?
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Paper
            sx={{
              p: "4px 12px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "60px",
              borderRadius: "25px",
              mb: 3,
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <SearchIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <TextField
              fullWidth
              variant="standard"
              placeholder="Type to Search Journals"
              InputProps={{ disableUnderline: true }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Paper>

          <Box sx={{ display: "flex", flexDirection: { xs: "column" } }}>
            {filteredJournals.length > 0 ? (
              <Grid
                container
                spacing={2}
                sx={{
                  maxHeight: "calc(60vh)",
                  overflowY: "auto",
                  alignItems: "center",
                }}
              >
                {filteredJournals.map((journal, index) => (
                  <Grid
                    item
                    size={{ xs: 12, sm: 6 }}
                    key={journal._id}
                    minWidth="100%"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Paper
                        elevation={4}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          borderRadius: "16px",
                          overflow: "hidden",
                          cursor: "pointer",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() => {
                          navigate(`/journal/${journal._id}`);
                          setOpen(false);
                        }}
                      >
                        <Box
                          component="img"
                          src={journal.coverImage}
                          alt={journal?.name}
                          sx={{
                            width: isMobile ? "100%" : 140,
                            objectFit: "cover",
                            borderRadius: 3,
                          }}
                        />
                        <Box sx={{ p: 2, flex: 1 }}>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="primary.dark"
                          >
                            {journal.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={0.5}
                          >
                            Editor-in-Chief:{" "}
                            <strong>{journal.editorInChief}</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ISSN: <strong>{journal.issn}</strong>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={1}
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {journal.about}
                          </Typography>
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography
                variant="body2"
                textAlign="center"
                color="textSecondary"
              >
                No Journals Found
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default JournalsList;
