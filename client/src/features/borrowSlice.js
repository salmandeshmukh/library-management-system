import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../services/api";

export const borrowBook = createAsyncThunk(
  "borrow/borrowBook",

  async (bookId, thunkAPI) => {
    try {
      const response = await API.post("/borrow", { bookId });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchBorrowedBooks = createAsyncThunk(
  "borrow/fetchBorrowedBooks",

  async (_, thunkAPI) => {
    try {
      const response = await API.get("/borrow/my-books");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const returnBook = createAsyncThunk(
  "borrow/returnBook",

  async (borrowId, thunkAPI) => {
    try {
      const response = await API.put("/borrow/return", { borrowId });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const requestReturnBook =
  createAsyncThunk(

    'borrow/requestReturnBook',

    async (borrowId, thunkAPI) => {

      try {

        const response =
          await API.put(
            `/borrow/request-return/${borrowId}`
          )

        return response.data

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        )
      }
    }
  )

const borrowSlice = createSlice({
  name: "borrow",

  initialState: {
    borrowedBooks: [],
    loading: false,
    success: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(borrowBook.pending, (state) => {
        state.loading = true;

        state.success = false;

        state.error = null;
      })

      .addCase(borrowBook.fulfilled, (state) => {
        state.loading = false;

        state.success = true;
      })

      .addCase(borrowBook.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(fetchBorrowedBooks.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBorrowedBooks.fulfilled, (state, action) => {
        state.loading = false;

        state.borrowedBooks = action.payload;
      })

      .addCase(fetchBorrowedBooks.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(returnBook.pending, (state) => {
        state.loading = true;
      })

      .addCase(returnBook.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(returnBook.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default borrowSlice.reducer;
