"use client";
import React from "react";
import {
  TextField,
  Typography,
  Autocomplete,
  Chip,
  Box,
  Stack,
  Divider,
  Paper,
  useTheme,
  Grid,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { getAppInfoState } from "@/redux/slices/appInfoSlice";

const startYear = 2024;
const currentYear = new Date().getFullYear();
const yearOptions = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => (startYear + i).toString()
);
const SearchOptions = ({ searchFilters, setSearchFilters }) => {
  const theme = useTheme();
  const { journals } = useSelector(getAppInfoState);
  const journalOptions = journals;
  const handleChipDelete = (type, value) => {
    if (type === "journals") {
      setSearchFilters((prev) => ({
        ...prev,
        journals: prev.journals.filter((j) => j !== value),
      }));
    } else if (type === "name" || type === "keywords") {
      setSearchFilters((prev) => ({
        ...prev,
        [type]: prev[type].filter((v) => v !== value),
      }));
    } else if (type === "duration") {
      setSearchFilters((prev) => ({
        ...prev,
        duration: ["", ""],
      }));
    }
  };

  const handleChange = (type, values) => {
    setSearchFilters((prev) => ({
      ...prev,
      [type]: values,
    }));
  };

  const handleYearChange = (index) => (e) => {
    const updated = [...searchFilters.duration];
    updated[index] = e.target.value;
    setSearchFilters((prev) => ({ ...prev, duration: updated }));
  };

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: "20px",
        p: 3,
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: `0 12px 30px ${theme.palette.primary.main}44`,
        },
        position: "sticky",
        top: "calc(70px)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
        Filter Options{" "}
        <span style={{ fontWeight: "lighter", color: "black", fontSize: 15 }}>
          (Type & Press Enter to Search)
        </span>
      </Typography>

      <Stack spacing={2}>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={searchFilters.name}
          onChange={(e, newValue) => handleChange("name", newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Search By Title" />
          )}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover": {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
              },
            },
          }}
        />

        {/* Keywords (Multiple) */}
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={searchFilters.keywords}
          onChange={(e, newValue) => handleChange("keywords", newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Enter a Keyword" />
          )}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover": {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
              },
            },
          }}
        />

        <Autocomplete
          multiple
          disableCloseOnSelect
          options={journalOptions}
          value={searchFilters.journals}
          onChange={(e, newValue) => {
            handleChange("journals", newValue);
            console.log(newValue);
          }}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField {...params} label="Select Journals" />
          )}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&:hover": {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
              },
            },
          }}
        />

        <Grid container spacing={2}>
          <Grid item size={{ xs: 6 }}>
            <TextField
              select
              SelectProps={{ native: true }}
              label="From Year"
              fullWidth
              value={searchFilters.duration[0] || ""}
              onChange={handleYearChange(0)}
              sx={{ borderRadius: "12px" }}
            >
              <option value=""></option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <TextField
              select
              SelectProps={{ native: true }}
              label="To Year"
              fullWidth
              value={searchFilters.duration[1] || ""}
              onChange={handleYearChange(1)}
              sx={{ borderRadius: "12px" }}
            >
              <option value=""></option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Stack>

      {(searchFilters.name.length ||
        searchFilters.keywords.length ||
        searchFilters.journals.length ||
        (searchFilters.duration[0] && searchFilters.duration[1])) && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle1" gutterBottom color="primary">
            Active Filters
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {searchFilters?.name?.map((n) => (
              <Chip
                key={n}
                label={`Name: ${n}`}
                onDelete={() => handleChipDelete("name", n)}
                color="primary"
                sx={{ borderRadius: "10px" }}
              />
            ))}
            {searchFilters.keywords.map((k) => (
              <Chip
                key={k}
                label={`Keyword: ${k}`}
                onDelete={() => handleChipDelete("keywords", k)}
                color="secondary"
                sx={{ borderRadius: "10px" }}
              />
            ))}
            {searchFilters.journals.map((j) => (
              <Chip
                key={j}
                label={j}
                onDelete={() => handleChipDelete("journals", j)}
                variant="outlined"
                sx={{
                  borderRadius: "10px",
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                }}
              />
            ))}
            {searchFilters.duration[0] && searchFilters.duration[1] && (
              <Chip
                label={`Duration: ${searchFilters.duration[0]} - ${searchFilters.duration[1]}`}
                onDelete={() => handleChipDelete("duration")}
                color="info"
                sx={{ borderRadius: "10px" }}
              />
            )}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default SearchOptions;
