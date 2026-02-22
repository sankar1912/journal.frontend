"use client";
import {
  getNotificationState,
  setMessage,
} from "@/redux/slices/notificationSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { loadUser } from "@/redux/actions/authActions";
import { loadManuscripts } from "@/redux/actions/manuscriptsAction";
import RedirectUrl from "./RedirectUrl";

function App() {
  const { message } = useSelector(getNotificationState);
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (message && message !== "") {
      setOpen(false);
      setTimeout(() => {
        setCurrentMessage(message);
        setOpen(true);
        dispatch(setMessage(""));
      }, 100);
    }
  }, [message]);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadManuscripts());
  }, []);
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
        {currentMessage}
      </Alert>
    </Snackbar>
  );
}

export default App;
