import axios from "axios";
import { findSuccess, loginRequest, loginSuccess } from "../slices/authSlice";
import { setMessage } from "../slices/notificationSlice";
import { setSpecificJournal } from "../slices/journalSlice";

export const signUp = (userData, messageDoc="") => async (dispatch) => {
  //console.log("Sending:", userData);
  const { message } = messageDoc;
  try {
    const response = await fetch("/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        message,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(setMessage(errorData.message || "Failed to register"));
      throw new Error(errorData.message || "Failed to register");
    }
    const data = await response.json();
    dispatch(setMessage(data.message));
  } catch (err) {
    console.error("Error:", err.message);
    dispatch(setMessage(err.response.data.message || "Failed to register"));
  }
};

export const signin = (userData) => async (dispatch) => {
  dispatch(loginRequest);
  try {
   const res = await axios.post("/api/v1/user/login", userData, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data.user));
    dispatch(setMessage(res.data.message));
  } catch (err) {
    dispatch(setMessage(err.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch(loginRequest);
  const res = await axios.get("/api/v1/user/load", {
    withCredentials: true,
  });
  dispatch(loginSuccess(res.data.user));
  dispatch(setMessage("Welcome Back!!"));
};

export const verifyAccount = (token) => async (dispatch) => {
  dispatch(loginRequest);
  try{
    const res = await axios.get(`/api/v1/user/verify/${token}`, {
    withCredentials: true,
  });
  dispatch(loginSuccess(res.data.user));
  dispatch(setMessage(res.data.message));
  }catch(err){
    dispatch(setMessage(err.response.data.message))
  }
};

export const modifyUser = (userData) => async (dispatch) => {
  dispatch(loginRequest);
  const res = await axios.post("/api/v1/user/update", userData, {
    withCredentials: true,
  });
  dispatch(loginSuccess(res.data.user));
  dispatch(setMessage(res.data.message));
};

export const logOut = () => async (dispatch) => {
  dispatch(loginRequest);
  try{
    const res = await axios.get("/api/v1/user/logout", {
    withCredentials: true,
  });
  dispatch(loginSuccess({}));
  dispatch(setMessage(res.data.message));
  } catch (err) {
    dispatch(loginSuccess({}));
    dispatch(setMessage("Error occured"));
  }
};

export const getAuthorDetailsByEmail = (email) => async (dispatch) => {
  dispatch(loginRequest);
  try {
    const res = await axios.get(`/api/v1/user/findauthor?email=${email}`, {
      withCredentials: true,
    });
    dispatch(findSuccess(res.data.user));
    dispatch(setMessage(res.data.message));
  } catch (err) {
    dispatch(findSuccess(""));
    dispatch(setMessage("Author not found"));
  }
};

export const uploadManuscript =
  (manuscriptData, journalId) => async (dispatch) => {
    dispatch(loginRequest);
    try {
      const res = await axios.post(
        `/api/v1/${journalId}/manuscript/upload`,
        manuscriptData,
        {
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(res.data.user));
      dispatch(setSpecificJournal(res.data.journal));
      dispatch(setMessage(res.data.message));
      localStorage.removeItem(`draft_${journalId}`);
    } catch (err) {
      dispatch(
        setMessage(err.response.data.message || "Failed to upload manuscript")
      );
    }
  };
