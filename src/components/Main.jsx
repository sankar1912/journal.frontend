"use client";

import React from "react";
import { Box, Typography, useTheme, Container } from "@mui/material";
import { motion } from "framer-motion";
import { BookOutlined } from "@mui/icons-material";
import "@fontsource/dancing-script";
import { useRouter } from "next/navigation";

// Sections
import AboutJournalSection from "./AboutJournalSection";
import FeaturedAuthors from "./FeaturedAuthors";
import OurJournalsData from "./OurJournalsData";
import ManuscriptsList from "./ManuscriptsList";
import TopManuscripts from "./TopManuscripts";

const MotionBox = motion(Box);

function SectionWrapper({ children, bg, id }) {
  const theme = useTheme();
  return (
    <Box
      id={id}
      component="section"
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        background: bg || theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: 500, md: 600 },
        background: theme.palette.primary.main,
        borderBottomLeftRadius: { xs: "80% 20%", md: "50% 10%" },
        borderBottomRightRadius: { xs: "80% 20%", md: "50% 10%" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 0 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          {/* Logo Circle */}
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: theme.palette.common.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 4,
            }}
          >
            <BookOutlined
              sx={{ color: theme.palette.primary.main, fontSize: 70 }}
            />
          </Box>

          {/* Motion Text */}
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "open sans, cursive",
                color: theme.palette.common.white,
                mb: 2,
              }}
            >
              JournalHub
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                lineHeight: 1.8,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              A peaceful and focused space to capture your thoughts, ideas, and
              reflections. Write your story, track your growth, and revisit your
              cherished memories.
            </Typography>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}

function Main() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <HeroSection />
      <SectionWrapper id="about">
        <AboutJournalSection />
      </SectionWrapper>
      <SectionWrapper id="journals" bg="background.paper">
        <OurJournalsData />
      </SectionWrapper>
      <SectionWrapper id="authors">
        <FeaturedAuthors />
      </SectionWrapper>
      <SectionWrapper id="manuscripts" bg="background.paper">
        <ManuscriptsList />
      </SectionWrapper>
      <SectionWrapper id="top-manuscripts">
        <TopManuscripts />
      </SectionWrapper>
    </Box>
  );
}

export default Main;
