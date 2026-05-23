import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../services/api";

export const createRequest = createAsyncThunk(
  "borrowRequest/createRequest",

  async (bookId, thunkAPI) => {
    try {
      const response = await API.post("/borrow-requests", { bookId });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchMyRequests = createAsyncThunk(
  "borrowRequests/fetchMyRequests",

  async (_, thunkAPI) => {
    try {
      const response = await API.get("/borrow-requests/my-requests");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchRequests = createAsyncThunk(
  "borrowRequest/fetchRequests",

  async (_, thunkAPI) => {
    try {
      const response = await API.get("/borrow-requests");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const approveRequest = createAsyncThunk(
  "borrowRequest/approveRequest",

  async (id, thunkAPI) => {
    try {
      const response = await API.put(`/borrow-requests/approve/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const rejectRequest = createAsyncThunk(
  "borrowRequest/rejectRequest",

  async (id, thunkAPI) => {
    try {
      const response = await API.put(`/borrow-requests/reject/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const borrowRequestSlice = createSlice({
  name: "borrowRequest",

  initialState: {
    requests: [],
    myRequests: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;

        state.requests = action.payload;
      })

      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(
        fetchMyRequests.fulfilled,

        (state, action) => {
          state.myRequests = action.payload;
        },
      );
  },
});

export default borrowRequestSlice.reducer;
