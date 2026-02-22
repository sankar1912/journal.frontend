'use client';

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  useTheme,
} from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Event as EventIcon,
} from "@mui/icons-material";

const events = [
  {
    title: "International Cancer Conference",
    date: "2025-06-20",
    location: "New York, USA",
  },
  {
    title: "Biomedical Engineering Symposium",
    date: "2025-07-05",
    location: "Berlin, Germany",
  },
  {
    title: "Global Infectious Diseases Summit",
    date: "2025-07-18",
    location: "Tokyo, Japan",
  },
  {
    title: "Traditional Medicine Expo",
    date: "2025-08-02",
    location: "Chennai, India",
  },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarEvents = () => {
  const [today, setToday] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const now = new Date();
    setToday(now);
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  if (!today || !currentDate) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Typography variant="h6">Loading Calendar...</Typography>
      </Box>
    );
  }

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
          week.push(null);
        } else {
          week.push(dayCounter++);
        }
      }
      calendar.push(week);
    }
    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <Box width="90%" mx="auto">
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        color={theme.palette.primary.main}
        mb={1}
      >
        Calendar Events
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 2fr" }}
        sx={{ borderRadius: "40px" }}
        gap={4}
        p={4}
      >
        {/* Calendar Section */}
        <Card className="rounded-2xl shadow-lg p-4">
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Button onClick={handlePrevMonth}>
                <ArrowBackIosNew />
              </Button>
              <Typography variant="h6">
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </Typography>
              <Button onClick={handleNextMonth}>
                <ArrowForwardIos />
              </Button>
            </Box>

            <Grid container spacing={1} justifyContent="center">
              {daysOfWeek.map((day) => (
                <Grid item xs={12 / 7} key={day}>
                  <Typography
                    variant="subtitle2"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {calendar.map((week, weekIndex) => (
              <Grid
                container
                spacing={1}
                justifyContent="center"
                key={weekIndex}
                mt={1}
              >
                {week.map((day, dayIndex) => (
                  <Grid item xs={12 / 7} key={dayIndex}>
                    {day ? (
                      <Box
                        border={
                          day === today.getDate() &&
                          currentDate.getMonth() === today.getMonth() &&
                          currentDate.getFullYear() === today.getFullYear()
                            ? `2px solid ${theme.palette.primary.main}`
                            : "1px solid #ccc"
                        }
                        borderRadius="50%"
                        width="30px"
                        height="30px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          cursor: "pointer",
                          transition: "0.3s",
                          "&:hover": { bgcolor: "#f5f5f5" },
                        }}
                      >
                        <Typography variant="body2">{day}</Typography>
                      </Box>
                    ) : (
                      <Box width="30px" height="30px"></Box>
                    )}
                  </Grid>
                ))}
              </Grid>
            ))}
          </CardContent>
        </Card>

        {/* Events Section */}
        <Card className="rounded-2xl shadow-lg p-4">
          <CardContent>
            <Typography variant="h6" mb={2}>
              Upcoming Conferences & Journals
            </Typography>
            {events.map((event, index) => (
              <Box key={index} mb={2}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color={theme.palette.primary.main}
                >
                  {event.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                  <EventIcon fontSize="small" />
                  <Typography variant="body2">{event.date}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {event.location}
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt={1}>
                  <Chip label="Upcoming" color="success" size="small" />
                </Box>
                {index < events.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CalendarEvents;
