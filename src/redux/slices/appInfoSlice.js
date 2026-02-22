const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  name: "JournalHub",
  redirectUrl: "/",
  version: "1.0.0",
  apiBaseUrl: "https://api.journalhub.com",
  journals: [
    "International Journal of Large Language Models and Generative AI",
    "International Journal of Data Analytics and Data Science",
    "International Journal of People Analytics and Organizational Insights",
    "International Journal of Foundational and Responsible AI",
    "International Journal of AI Applications in Climate, HealthCare, AgirTech, Education",
    "International Journal of Intelligent Optimization and Multi-criteria Analytics",
    "International Journal of Behavioural Science and Predictive Analytics",
  ],
};

const appInfo = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRedirectUrl: (state, action) => {
      state.redirectUrl = action.payload === "/signout" ? "/" : action.payload;
    },
  },
});
export default appInfo.reducer;

export const getAppInfoState = (state) => state.app;
export const { setRedirectUrl } = appInfo.actions;
