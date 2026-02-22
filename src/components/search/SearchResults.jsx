"use client";
import { fetchManuscripts } from "@/redux/actions/searchActions";
import { getSearchState } from "@/redux/slices/searchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { Skeleton } from "@mui/material";

const MotionCard = motion(Card);

function SearchResults({ searchFilters, setSearchFilters }) {
  const dispatch = useDispatch();
  let {
    manuscripts,
    loading,
    hasMore = true,
    total,
  } = useSelector(getSearchState);
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    dispatch(fetchManuscripts({ searchFilters, page: 1, limit }));
    setPage(1);
  }, [searchFilters]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    dispatch(
      fetchManuscripts({ searchFilters, page: nextPage, limit, append: true })
    );
    setPage(nextPage);
  };

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 4,
        boxShadow: 3,
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" mb={3} color="primary" fontWeight="bold">
        Search Results
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(3)].map((_, i) => (
            <Grid
              item
              size={{ xs: 12 }}
              key={i}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  width: "95%",
                  borderRadius: "20px",
                  p: 3,
                  boxShadow: 3,
                }}
              >
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton
                  variant="rectangular"
                  height={60}
                  sx={{ borderRadius: 2, my: 2 }}
                />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
                <Skeleton
                  variant="rectangular"
                  height={35}
                  width={120}
                  sx={{ borderRadius: "10px", mt: 2 }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : manuscripts.length === 0 ? (
        <Typography textAlign="center">No result found.</Typography>
      ) : (
        <InfiniteScroll
          dataLength={manuscripts.length - 2}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Grid container spacing={3} sx={{ width: "100%" }}>
              {[...Array(3)].map((_, i) => (
                <Grid
                  item
                  size={{ xs: 12 }}
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Card
                    sx={{
                      borderRadius: "20px",
                      p: 3,
                      boxShadow: 3,
                      width: "100%", // ensure the card takes full width
                      maxWidth: "95%",
                    }}
                  >
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Skeleton
                      variant="rectangular"
                      height={60}
                      sx={{ borderRadius: 2, my: 2 }}
                    />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="70%" height={20} />
                    <Skeleton
                      variant="rectangular"
                      height={35}
                      width={120}
                      sx={{ borderRadius: "10px", mt: 2 }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          }
          scrollableTarget="scrollableDiv"
        >
          <Grid container spacing={3} sx={{ pb: 4, pt: 4 }}>
            {manuscripts.map((manuscript) => (
              <Grid
                item
                size={{ xs: 12 }}
                key={manuscript._id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MotionCard
                  elevation={6}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  sx={{
                    borderRadius: "20px",
                    cursor: "pointer",
                    overflow: "hidden",
                    backdropFilter: "blur(12px)",
                    width: "calc(95%)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Title */}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      color="primary"
                    >
                      {manuscript.manuscriptTitle}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Journal: {manuscript.journal?.name || "Unknown Journal"}{" "}
                        {manuscript.year && `• ${manuscript.year}`}
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        position: "relative",
                        maxHeight: 70,
                        overflow: "hidden",
                        mb: 2,
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "40%",
                        },
                      }}
                    >
                      Abstract:
                      <Typography variant="body2" color="text.secondary">
                        {manuscript?.abstract?.slice(0, 300) ||
                          "No abstract available."}
                        ....
                      </Typography>
                    </Box>
                    <CardActions>
                      <Typography
                        variant="body"
                        fontWeight="bold"
                        gutterBottom
                        color="primary"
                      >
                        ResearchAreas:
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        {manuscript?.researchAreas?.map((keyword, idx) => (
                          <Chip key={idx} label={keyword} size="large" />
                        ))}
                      </Stack>
                    </CardActions>
                    <Divider sx={{ my: 2 }} />
                    Authors:
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      {manuscript?.authors?.firstAuthors?.length > 0 && (
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          {manuscript.authors.firstAuthors.map(
                            (author, idx) => (
                              <Chip
                                key={idx}
                                avatar={
                                  author.profileImage ? (
                                    <Avatar
                                      src={author.profileImage}
                                      alt={author.name}
                                    />
                                  ) : (
                                    <Avatar>{author.name || "?"}</Avatar>
                                  )
                                }
                                label={author.name}
                                size="large"
                                sx={{ mb: 1 }}
                              />
                            )
                          )}
                          {manuscript.authors.correspondingAuthors.map(
                            (author, idx) => (
                              <Chip
                                key={idx}
                                avatar={
                                  author.profileImage ? (
                                    <Avatar
                                      src={author.profileImage}
                                      alt={author.name}
                                    />
                                  ) : (
                                    <Avatar>{author.name || "?"}</Avatar>
                                  )
                                }
                                label={author.name}
                                size="large"
                                sx={{ mb: 1 }}
                              />
                            )
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 3, pb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Posted on:{" "}
                      {manuscript?.createdAt
                        ? new Date(manuscript.createdAt).toLocaleString()
                        : "N/A"}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ borderRadius: "10px", textTransform: "none" }}
                    >
                      View Full Manuscript
                    </Button>
                  </CardActions>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </Box>
  );
}

export default SearchResults;
