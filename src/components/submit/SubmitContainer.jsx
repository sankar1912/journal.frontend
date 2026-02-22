"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJournalById } from "@/redux/actions/journalActions";
import { getJournalState } from "@/redux/slices/journalSlice";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Paper,
  styled,
  Skeleton,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

import AuthorProfile from "./AuthorProfile";
import ManuscriptInfo from "./ManuscriptInfo";
import Instructions from "./Instructions";
import AuthorInfo from "./AuthorInfo";
import ManuscriptUpload from "./ManuscriptUpload";
import FinalReview from "./FinalReview";
import { useAppNavigate } from "@/hooks/useAppNavigate";

// Custom Accordion Styles
const GlassAccordion = styled(Accordion)(({ theme }) => ({
  width: "90%",
  margin: "16px auto",
  borderRadius: theme.spacing(3),
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  border: "none",
  transition: "all 0.3s ease",
  "&:hover .MuiAccordionSummary-root": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  "&.Mui-expanded": {
    margin: "16px auto",
  },
  "&:before": { display: "none" },
}));

const GlassAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  transition: "0.3s ease all",
}));

export default function SubmitContainer({ id }) {
  const { selectedJournal, loading } = useSelector(getJournalState);
  const dispatch = useDispatch();
  const router = useRouter();

  const [expanded, setExpanded] = useState("panel1");
  const [authDetails, setAuthDetails] = useState(false);
  const [coAuthDetails, setCoAuthDetails] = useState(false);
  const [manuscriptInfo, setManuscriptInfo] = useState(false);
  const [reviewInfo, setReviewInfo] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    dispatch(getJournalById(id));
  }, [dispatch, id]);
  const navigate = useAppNavigate();
  useEffect(() => {
    if (!loading && !selectedJournal) {
      navigate();
    }
  }, [loading, selectedJournal, router]);

  if (loading)
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}
        >
          <Skeleton width="40%" height={40} sx={{ mx: "auto" }} />
        </Typography>

        {/* Simulated Accordions with Skeletons */}
        {[...Array(5)].map((_, i) => (
          <Paper
            key={i}
            sx={{
              mb: 3,
              p: 3,
              borderRadius: 3,
              boxShadow: "0 8px 16px rgba(0,0,0,0.05)",
            }}
          >
            {/* Accordion Summary */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="text" width="30%" height={28} sx={{ ml: 2 }} />
            </Box>

            {/* Accordion Content */}
            <Box sx={{ pl: 5 }}>
              <Skeleton
                variant="rectangular"
                height={80}
                sx={{ mb: 2, borderRadius: 2 }}
              />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="70%" />
            </Box>
          </Paper>
        ))}
      </Container>
    );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          color="primary"
          variant="h4"
          sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}
        >
          Submit Manuscript
        </Typography>
      </motion.div>

      <Instructions open={showModal} onClose={() => setShowModal(false)} />

      <GlassAccordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <GlassAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <PersonIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6">Author Profile</Typography>
        </GlassAccordionSummary>
        <AccordionDetails>
          <AuthorProfile
            authDetails={authDetails}
            setAuthDetails={() => {
              setAuthDetails(true);
              setExpanded("panel2");
            }}
          />
        </AccordionDetails>
      </GlassAccordion>

      <GlassAccordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        disabled={!authDetails}
      >
        <GlassAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <DescriptionIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6">Manuscript Information</Typography>
        </GlassAccordionSummary>
        <AccordionDetails>
          <ManuscriptInfo
            coAuthDetails={coAuthDetails}
            setCoAuthDetails={() => {
              setCoAuthDetails(true);
              setExpanded("panel3");
            }}
            selectedJournal={selectedJournal}
          />
        </AccordionDetails>
      </GlassAccordion>

      <GlassAccordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        disabled={!coAuthDetails}
      >
        <GlassAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <PeopleAltIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6">Author Information</Typography>
        </GlassAccordionSummary>
        <AccordionDetails>
          <AuthorInfo
            selectedJournal={selectedJournal}
            manuscriptInfo={manuscriptInfo}
            setManuscriptInfo={() => {
              setManuscriptInfo(true);
              setExpanded("panel4");
            }}
          />
        </AccordionDetails>
      </GlassAccordion>

      <GlassAccordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        disabled={!manuscriptInfo}
      >
        <GlassAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CloudUploadIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6">Manuscript Upload</Typography>
        </GlassAccordionSummary>
        <AccordionDetails>
          <ManuscriptUpload
            selectedJournal={selectedJournal}
            reviewInfo={reviewInfo}
            setReviewInfo={() => {
              setReviewInfo(true);
              setExpanded("panel5");
            }}
          />
        </AccordionDetails>
      </GlassAccordion>

      <GlassAccordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
        disabled={!reviewInfo}
      >
        <GlassAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CheckCircleIcon sx={{ mr: 1 }} color="primary" />
          <Typography variant="h6">Final Review</Typography>
        </GlassAccordionSummary>
        <AccordionDetails>
          <FinalReview
            selectedJournal={selectedJournal}
            reviewInfo={reviewInfo}
          />
        </AccordionDetails>
      </GlassAccordion>
    </Container>
  );
}
