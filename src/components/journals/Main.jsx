"use client"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getJournalById } from "@/redux/actions/journalActions"
import { getJournalState } from "@/redux/slices/journalSlice"
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  Tabs,
  Tab,
  Skeleton,
  Divider,
  Chip,
  useTheme,
  Button,
  Grid,
  useMediaQuery,
} from "@mui/material"
import { motion } from "framer-motion"
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import {
  Archive,
  Book,
  BookOnline,
  Edit,
  Google,
  ManageAccounts,
  NewReleases,
  Phone,
  Publish,
  Route,
  Search,
} from "@mui/icons-material"
import { getAuthState } from "@/redux/slices/authSlice"
import Guide from "./Guide"
import SubmitRedirect from "./SubmitRedirect"
import { useRouter } from "next/navigation"
import SubmissionRedirect from "./SubmissionRedirect"
import JournalArticlesList from "./JournalArticlesList"
import { useAppNavigate } from "@/hooks/useAppNavigate"

// Dummy data for demonstration, you can replace with your actual API data
const editorialMembers = [
  {
    name: "Dr. A. P. Sharma",
    position: "Editor-in-Chief",
    email: "ap.sharma@example.com",
    affiliation: "Department of Biology, XYZ University, India",
    researchAreas: ["Biomaterials", "Tissue Engineering"],
    image: "https://picsum.photos/seed/editor1/100",
  },
]

const positions = [
  ...new Set(editorialMembers.map((member) => member.position)),
]

function JournalDetails({ id }) {
  const { selectedJournal, loading } = useSelector(getJournalState)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [tabIndex, setTabIndex] = useState(0)
  const { auth } = useSelector(getAuthState)
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const isEditorialMember =
    selectedJournal?.editorialBoard?.editorInChief?.some(
      (member) => member._id === auth._id
    ) ||
    selectedJournal?.editorialBoard?.associateEditors?.some(
      (member) => member._id === auth._id
    ) ||
    selectedJournal?.editorialBoard?.reviewers?.some(
      (member) => member._id === auth._id
    )
  const navigate = useAppNavigate()
  useEffect(() => {
    dispatch(getJournalById(id))
  }, [id])

  const handleTabChange = (_, newIndex) => setTabIndex(newIndex)
  const TabList = [
    { name: "Articles", icon: <BookOnline /> },
    { name: "Editorial Board", icon: <Search /> },
    { name: "Indexing", icon: <Google /> },
    { name: "Guide for Authors", icon: <Route /> },
    { name: "Archives", icon: <Archive /> },
    { name: "Publication", icon: <NewReleases /> },
    { name: "Publish", icon: <Publish /> },
    isEditorialMember && { name: "Manage", icon: <ManageAccounts /> },
  ]
  return (
    <Box
      sx={{
        p: 4,
        backdropFilter: "10px",
        backgroundColor: "transparent",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        mb={4}
      >
        Journal: {selectedJournal.name}
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            mx: "auto",
            borderRadius: "20px",
            backgroundColor: theme.palette.background.default,
          }}
          elevation={7}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item size={{ xs: 12, md: 4 }}>
              {loading ? (
                <Skeleton variant="rectangular" height={160} width={160} />
              ) : (
                <Box
                  component="img"
                  src={selectedJournal?.coverImage}
                  alt="cover"
                  sx={{
                    width: { xs: "100%", sm: 200, md: 220 }, // Full width on mobile, fixed width on larger screens
                    maxWidth: "100%", // Prevents overflow
                    height: "auto", // Maintains aspect ratio
                    objectFit: "cover",
                    borderRadius: 3,
                    border: "2px solid white",
                  }}
                />
              )}
            </Grid>

            <Grid item size={{ xs: 12, md: 8 }}>
              <Grid container spacing={2}>
                {loading ? (
                  <>
                    <Grid item size={{ xs: 12 }}>
                      <Skeleton width="60%" />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                      <Skeleton width="50%" />
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                      <Skeleton width="70%" />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item size={{ xs: 12 }}>
                      <Typography
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Book color="primary" />{" "}
                        <strong>{selectedJournal.name}</strong>
                      </Typography>
                    </Grid>

                    <Grid item size={{ xs: 12 }}>
                      <Typography
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <ConfirmationNumberIcon color="primary" /> ISSN:{" "}
                        {selectedJournal.issn}
                      </Typography>
                    </Grid>

                    <Grid item size={{ xs: 12 }}>
                      <Typography
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AssignmentIndIcon color="primary" /> Editor in Chief:{" "}
                        {
                          selectedJournal?.editorialBoard?.editorInChief[0]
                            ?.name
                        }
                      </Typography>
                    </Grid>

                    <Grid item size={{ xs: 12 }}>
                      <Typography
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AlternateEmailIcon color="primary" />{" "}
                        {selectedJournal?.contact?.email || "user@gmail.com"}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12 }}>
                      <Typography
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Phone color="primary" />{" "}
                        {selectedJournal?.contact?.phone || "user@gmail.com"}
                      </Typography>
                    </Grid>

                    {!loading && selectedJournal?.scope?.length > 0 && (
                      <Grid item size={{ xs: 12 }}>
                        <Box mt={3}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            fontWeight="bold"
                            color="primary"
                          >
                            Scope
                          </Typography>

                          <Grid container spacing={1}>
                            {selectedJournal?.scope?.map((item, idx) => (
                              <Grid item key={idx}>
                                <Chip
                                  label={item}
                                  variant="filled"
                                  color="primary"
                                />
                              </Grid>
                            ))}
                          </Grid>

                          <Button
                            variant="outlined"
                            sx={{ mt: 3, mb: 3, borderRadius: 6 }}
                            onClick={() =>
                              navigate(`/journal/${selectedJournal._id}/submit`)
                            }
                          >
                            Submit manuscript
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      <Grid container sx={{ minHeight: "70vh" }}>
        {/* Sidebar - Tabs */}
        <Grid
          item
          size={{ xs: 12, md: 3 }}
          sx={{
            borderRight: {
              md: `1px solid ${theme.palette.divider}`,
              xs: "none",
            },
            position: { md: "sticky", xs: "static" },
            top: 80,
            alignSelf: { md: "flex-start", xs: "auto" },
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            p: 2,
            height: { md: "fit-content", xs: "auto" },
          }}
        >
          <Tabs
            orientation={isMobile ? "horizontal" : "vertical"}
            variant="scrollable"
            value={tabIndex}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{ width: "100%", textAlign: "left" }}
          >
            {TabList.map((label, idx) => (
              <Tab
                icon={label?.icon}
                iconPosition="start"
                key={idx}
                label={label?.name}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  width: "100%",
                  gap: 1.5,
                  "&:hover": {
                    borderRadius: "20px",
                    backgroundColor: "#1976d2",
                    color: "white",
                  },
                }}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item size={{ xs: 12, md: 9 }}>
          <Box >
            {tabIndex === 0 &&
              (loading ? (
                <Skeleton height={150} />
              ) : (
                <>
                  <JournalArticlesList />
                  <Divider sx={{ mt: 3 }} />
                </>
              ))}

            {tabIndex === 1 && (
              <Box>
                {selectedJournal?.editorialBoard?.editorInChief.some(
                  (member) => member._id === auth._id
                ) && (
                    <Box
                      mt={2}
                      mb={2}
                      p={2}
                      sx={{ borderRadius: 2, boxShadow: 1 }}
                    >
                      <Typography variant="h6">Editorial Option</Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="h6" color="primary">
                          Manage Editorial Members
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          endIcon={<Edit />}
                          onClick={() =>
                            navigate(`/journal/${selectedJournal?._id}/manage`)
                          }
                        >
                          Edit Members
                        </Button>
                      </Stack>
                    </Box>
                  )}

                {/* Display positions */}
                {[
                  {
                    title: "Editor-in-Chief",
                    members:
                      selectedJournal.editorialBoard?.editorInChief || [],
                  },
                  {
                    title: "Associate Editors",
                    members:
                      selectedJournal.editorialBoard?.associateEditors || [],
                  },
                  {
                    title: "Reviewers",
                    members: selectedJournal.editorialBoard?.reviewers || [],
                  },
                ].map((section, idx) => (
                  <Box key={idx} mb={4}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      mb={2}
                      color="primary"
                    >
                      {section.title}
                    </Typography>

                    {section.members.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No members in this position.
                      </Typography>
                    ) : (
                      section.members.map((member, index) => (
                        <Box key={index} mb={3}>
                          <Box display="flex" gap={2} alignItems="center">
                            <Avatar
                              src={
                                member.profileImage ||
                                `https://i.pravatar.cc/150?img=${index + 10}`
                              }
                              sx={{ width: 64, height: 64, borderRadius: 2 }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                              >
                                {member.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Occupation: {member.occupation}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Email: {member.email}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={0.5}
                              >
                                Bio: {member.bio}
                              </Typography>
                              <Typography variant="body2" mt={1}>
                                <strong>Research areas:</strong>{" "}
                                {member.researchAreas?.join("; ")}
                              </Typography>
                            </Box>
                          </Box>
                          <Divider sx={{ my: 2 }} />
                        </Box>
                      ))
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {tabIndex === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Indexing Information
                </Typography>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>Google Scholar</li>
                  <li>ResearchGate</li>
                </ul>
              </Box>
            )}

            {tabIndex === 3 && <Guide />}

            {tabIndex === 6 && <SubmitRedirect journal={selectedJournal} />}
            {tabIndex === 7 && (
              <SubmissionRedirect journal={selectedJournal} />
            )}
          </Box>
        </Grid>
      </Grid>

    </Box>
  )
}

export default JournalDetails
