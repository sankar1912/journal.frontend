"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "@/redux/slices/authSlice";
import { getAuthorDetailsByEmail, signUp } from "@/redux/actions/authActions";
import { setMessage } from "@/redux/slices/notificationSlice";
import { motion } from "framer-motion";

export default function AuthorInfo({
  selectedJournal,
  manusscriptInfo,
  setManuscriptInfo,
}) {
  const dispatch = useDispatch();
  const { searchedAuthor, loading, auth } = useSelector(getAuthState);

  const [email, setEmail] = useState("");
  const [firstAuthors, setFirstAuthors] = useState(auth ? [auth] : []);
  const [correspondingAuthors, setCorrespondingAuthors] = useState([]);
  const [manualMode, setManualMode] = useState(false);
  const [manualAuthor, setManualAuthor] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const draftKey = `draft_${selectedJournal._id}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);

      if (parsedDraft.authors) {
        const existingFirstAuthors = parsedDraft.authors.firstAuthors || [];
        const authAlreadyAdded = existingFirstAuthors.some(
          (a) => a.email === auth.email
        );
        const updatedFirstAuthors = authAlreadyAdded
          ? existingFirstAuthors
          : [auth, ...existingFirstAuthors];

        setFirstAuthors(updatedFirstAuthors);
        setCorrespondingAuthors(parsedDraft.authors.correspondingAuthors || []);
      }
    }
  }, [selectedJournal._id, auth]);

  const handleVerify = () => {
    if (email.trim()) {
      dispatch(getAuthorDetailsByEmail(email.trim()));
    }
  };

  const handleAddAuthor = (type) => {
    if (!searchedAuthor) return;

    const isInFirst = firstAuthors.some(
      (a) => a.email === searchedAuthor.email
    );
    const isInCorresponding = correspondingAuthors.some(
      (a) => a.email === searchedAuthor.email
    );

    if (isInFirst || isInCorresponding) {
      dispatch(setMessage("This author is already added to another group."));
      return;
    }

    if (type === "first") {
      setFirstAuthors([...firstAuthors, searchedAuthor]);
      dispatch(setMessage("Author added to First Authors."));
    } else if (type === "corresponding") {
      setCorrespondingAuthors([...correspondingAuthors, searchedAuthor]);
      dispatch(setMessage("Author added to Corresponding Authors."));
      dispatch(getAuthorDetailsByEmail(""));
    }
  };

  const handleRemoveAuthor = (type, email) => {
    if (type === "first") {
      if (email === auth.email) {
        dispatch(setMessage("You cannot remove yourself as First Author."));
        return;
      }
      setFirstAuthors(firstAuthors.filter((author) => author.email !== email));
    } else if (type === "corresponding") {
      setCorrespondingAuthors(
        correspondingAuthors.filter((author) => author.email !== email)
      );
    }
  };

  const handleSaveDraft = () => {
    const draftKey = `draft_${selectedJournal._id}`;
    const savedDraft = localStorage.getItem(draftKey);
    let draft = savedDraft ? JSON.parse(savedDraft) : {};

    draft.authors = {
      firstAuthors,
      correspondingAuthors,
    };

    localStorage.setItem(draftKey, JSON.stringify(draft));
    dispatch(setMessage("Draft saved successfully."));
  };

  const handleProceed = () => {
    if (firstAuthors.length < 1 || correspondingAuthors.length < 1) {
      dispatch(
        setMessage(
          "Please select at least one First Author and one Corresponding Author."
        )
      );
      return;
    }
    handleSaveDraft();
    dispatch(setMessage("Thanks. Proceeding to next step."));
    setManuscriptInfo(true);
  };

  const signupLink = `${window.location.origin}/signup`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(signupLink);
    dispatch(setMessage("Signup link copied! Share with your colleagues."));
  };

  const handleManualSubmit = () => {
    if (!manualAuthor.name || !manualAuthor.email) {
      dispatch(setMessage("Name and email are required."));
      return;
    }

    const newAuthor = {
      ...manualAuthor,
      profileImage: "/default-author.jpg",
      orcid: null,
      bio: "",
    };
    setManualMode(false);
    dispatch(
      signUp(newAuthor, {
        message:
          "You're added as an author. We recommend verifying your email and resetting your password.",
      })
    );
    dispatch(getAuthorDetailsByEmail(manualAuthor.email));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, mx: "auto", width: "90%" }}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Invite and Verify Authors
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            label="Enter Author Email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1 }} />,
            }}
          />
          <Button
            variant="contained"
            sx={{ borderRadius: 3, px: 4 }}
            onClick={handleVerify}
            startIcon={<SearchIcon />}
          >
            Verify
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : searchedAuthor ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              p: 3,
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              mb: 4,
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item size={{ xs: 12, md: 4 }}>
                <CardMedia
                  component="img"
                  image={searchedAuthor?.profileImage || "/default-author.jpg"}
                  alt={searchedAuthor?.name}
                  sx={{ width: "100%", borderRadius: 4, height: "auto" }}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 8 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Name: {searchedAuthor.name}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <EmailIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Email: {searchedAuthor.email}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <BadgeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    ORC ID: {searchedAuthor.orcid || "Not Provided"}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {searchedAuthor.bio || "No biography available."}
                  </Typography>

                  <Box display="flex" gap={2} mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => handleAddAuthor("first")}
                    >
                      Add as First Author
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleAddAuthor("corresponding")}
                    >
                      Add as Corresponding Author
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </motion.div>
      ) : manualMode ? (
        <Paper elevation={6} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add Author Manually
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={manualAuthor.name}
              onChange={(e) =>
                setManualAuthor({ ...manualAuthor, name: e.target.value })
              }
              required
            />
            <TextField
              label="Email"
              value={manualAuthor.email}
              onChange={(e) =>
                setManualAuthor({ ...manualAuthor, email: e.target.value })
              }
              required
            />
            <TextField
              label="Phone"
              value={manualAuthor.phone}
              onChange={(e) =>
                setManualAuthor({ ...manualAuthor, phone: e.target.value })
              }
            />
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={() => setManualMode(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleManualSubmit}>
                Continue
              </Button>
            </Box>
          </Stack>
        </Paper>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={4}
          textAlign="center"
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Invite your colleagues to join as authors!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Ask your co-authors to sign up and then you can add them here.
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Typography variant="body2" color="primary">
              Copy Link
            </Typography>
            <Tooltip title="Copy Link">
              <IconButton onClick={handleCopyLink}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            OR
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 2, borderRadius: 3 }}
            onClick={() => setManualMode(true)}
          >
            Add Manually
          </Button>
        </Box>
      )}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          p: 2,
          mt: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          TBy add authors manually, please ensure your co-authors use a
          <b> valid email address</b> and complete their email verification.
          Verified profiles add <b>trust, authenticity, and credibility</b> to
          your work — encourage your team to verify today!
        </Typography>
      </Paper>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          First Authors (Minimum 1 Required)
        </Typography>
        {firstAuthors.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No First Authors Selected
          </Typography>
        ) : (
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {firstAuthors.map((author, index) => (
              <Chip
                key={index}
                label={author.name}
                onDelete={() => handleRemoveAuthor("first", author.email)}
                color={author.email === auth.email ? "success" : "primary"}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Stack>
        )}
      </Paper>

      <Paper elevation={4} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Corresponding Authors (Minimum 1 Required)
        </Typography>
        {correspondingAuthors.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No Corresponding Authors Selected
          </Typography>
        ) : (
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {correspondingAuthors.map((author, index) => (
              <Chip
                key={index}
                label={author.name}
                onDelete={() =>
                  handleRemoveAuthor("corresponding", author.email)
                }
                color="secondary"
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Stack>
        )}
      </Paper>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 3 }}
          onClick={handleSaveDraft}
        >
          Save as Draft
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 3 }}
          onClick={handleProceed}
        >
          Proceed to Next Step
        </Button>
      </Box>
    </Box>
  );
}
