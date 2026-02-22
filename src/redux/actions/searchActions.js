import axios from "axios";
import { setSearchRequest, setSearchSuccess } from "../slices/searchSlice";
import { setMessage } from "../slices/notificationSlice";

export const fetchManuscripts =
  ({ searchFilters, page = 1, limit = 10, append = false }) =>
  async (dispatch, getState) => {
    const {
      name = [],
      journals = [],
      keywords = [],
      duration = [],
    } = searchFilters || {};
    dispatch(setSearchRequest());

    try {
      const queryParams = new URLSearchParams();
      name.forEach((n) => queryParams.append("name", n));
      keywords.forEach((k) => queryParams.append("keyword", k));
      journals.forEach((j) => queryParams.append("journal", j));
      duration.forEach((d) => queryParams.append("duration", d));
      queryParams.append("page", page);
      queryParams.append("limit", limit);

      const { data } = await axios.get(
        `/api/v1/manuscript/search?${queryParams.toString()}`
      );

      let newManuscripts = data.manuscripts || [];

      dispatch(
        setSearchSuccess({
          manuscripts: newManuscripts,
          total: data.total,
        })
      );

      if (data.message) dispatch(setMessage(data.message));
    } catch (error) {
      console.error(error);
      dispatch(setMessage("Error occurred while fetching manuscripts"));
    }
  };
