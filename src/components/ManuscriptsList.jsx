"use client";

import { getManuscriptsState } from "@/redux/slices/manuscriptsSlice";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);
const MotionButton = motion(Box);

function ManuscriptsList() {
  const { manuscripts = {}, loading } = useSelector(getManuscriptsState);
  const { top = [], recent = [] } = manuscripts;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderAuthorNames = (article) => {
    const first = article?.authors?.firstAuthors || [];
    const corresponding = article?.authors?.correspondingAuthors || [];
    const allAuthors = [...first, ...corresponding];
    const uniqueAuthors = Array.from(
      new Map(allAuthors.map((a) => [a.name, a])).values()
    );
    if (uniqueAuthors.length === 0) return "Unknown Author";
    const displayAuthors = uniqueAuthors.slice(0, 4).map((author, i) => (
      <span key={i}>
        {author.name}
        {i < Math.min(3, uniqueAuthors.length - 1) ? ", " : ""}
      </span>
    ));
    if (uniqueAuthors.length > 4) {
      displayAuthors.push(<span key="et-al">et al.</span>);
    }
    return displayAuthors;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Paper
      sx={{
        px: 4,
        py: 6,
        width: "98%",
        borderRadius: "20px",
        backgroundColor: theme.palette.background.default,
      }}
      elevation={7}
    >
      <Typography
        variant="h4"
        align="center"
        color="primary"
        gutterBottom
        fontWeight="bold"
      >
        Recent Articles
      </Typography>
      <Grid container spacing={4}>
        {recent?.map((article, index) => (
          <Grid item size={{xs:12, sm:6, md:4}} key={index}>
            <MotionPaper
              elevation={4}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              sx={{
                borderRadius: "20px",
                cursor: "pointer",
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: theme.palette.primary.main }}
                >
                  {article.manuscriptTitle}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 2,
                    justifyContent: "left",
                  }}
                >
                  {article.researchAreas?.map((area, index) => (
                    <Chip
                      key={index}
                      label={area}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </Box>

                <Divider sx={{ mb: 2 }} />
                <Typography variant="caption" color="text.secondary">
                  Journal: {article.journal?.name || "Unknown Journal"}
                </Typography>
                <br />
                <Typography variant="caption" color="text.secondary">
                  Posted on:
                  {article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Not available"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "justify",
                    mb: 3,
                    minHeight: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {article.abstract?.slice(0, 200)}...
                </Typography>
              </Box>

              <Box mt="auto" display="flex" alignItems="center">
                <Avatar
                  src={article?.authors?.firstAuthors[0]?.profileImage || ""}
                  alt="Author"
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Authors:
                    <br />
                    {renderAuthorNames(article)}
                  </Typography>
                </Box>
              </Box>

              
            </MotionPaper>
          </Grid>
        ))}
        
      </Grid>
      <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                sx={{
                  mt: 3,
                  mx: "auto",
                  px: 3,
                  py: 1.2,
                  borderRadius: "30px",
                  background: "linear-gradient(135deg, #4facfe,rgb(163, 163, 255))",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  width: "fit-content",
                  fontSize: "0.95rem",
                }}
              >
                Submit Manuscript
              </MotionButton>
    </Paper>
  );
}

export default ManuscriptsList;
