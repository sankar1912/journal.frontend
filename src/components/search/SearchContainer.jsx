"use client";
import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import SearchOptions from "./SearchOptions";

import { useDispatch } from "react-redux";
import SearchResults from "./SearchResults";

function SearchContainer() {
  const [searchFilters, setSearchFilters] = useState({
    name: [],
    keywords: [],
    journals: [],
    duration: [],
  });
  const dispatch = useDispatch();

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Search Articles and Journals
      </Typography>
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <SearchOptions
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 8 }}>
          <SearchResults
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchContainer;
