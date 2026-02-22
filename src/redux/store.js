import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import journalsReducer from "./slices/journalSlice";
import notificationReducer from "./slices/notificationSlice";
import manuscriptsReducer from "./slices/manuscriptsSlice";
import searchReducer from "./slices/searchSlice";
import appReducer from "./slices/appInfoSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    journal: journalsReducer,
    notification: notificationReducer,
    manuscripts: manuscriptsReducer,
    search: searchReducer,
  },
});
