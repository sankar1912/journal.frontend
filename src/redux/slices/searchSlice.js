const { createSlice } = require("@reduxjs/toolkit");
const { setSearch } = require("./manuscriptsSlice");

const initialState = {
  loading: false,
  manuscripts: [],
  limit: 10,
  page: 1,
  total: 1,
  hasMore: true,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchRequest: (state, action) => {
      state.loading = true;
    },
    setSearchSuccess: (state, action) => {
      const { manuscripts: newManuscripts, total, hasMore } = action.payload;

      // Combine existing manuscripts with new ones
      const combined = [...state.manuscripts, ...newManuscripts];

      // Remove duplicates based on _id using Map
      const uniqueManuscripts = Array.from(
        new Map(combined.map((m) => [m._id, m])).values()
      );

      state.manuscripts = uniqueManuscripts;
      state.loading = false;
      state.total = total;
      state.hasMore = uniqueManuscripts.length < total;
    },
    setSearchFailure: (state, action) => {
      state.loading = false;
      state.manuscripts = [];
    },
  },
});

export const getSearchState = (state) => state.search;
export const { setSearchRequest, setSearchSuccess, setSearchFailure } =
  searchSlice.actions;
export default searchSlice.reducer;
