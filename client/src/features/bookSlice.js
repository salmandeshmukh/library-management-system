import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import API from "../services/api";

export const addBook = createAsyncThunk(
  "books/addBook",

  async (bookData, thunkAPI) => {
    try {
      const response = await API.post(
        "/books",

        bookData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",

  async (filters = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.category) {
        params.append("category", filters.category);
      }

      if (filters.language) {
        params.append("language", filters.language);
      }

      if (filters.availability) {
        params.append("availability", filters.availability);
      }

      const response = await API.get(`/books?${params.toString()}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",

  async (bookId, thunkAPI) => {
    try {
      const response = await API.delete(`/books/${bookId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const bookSlice = createSlice({
  name: "books",

  initialState: {
    books: [],
    loading: false,
    error: null,
    success: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(addBook.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.success = false;
      })

      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.books.push(action.payload.book);
      })

      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;

        state.books = action.payload;
      })

      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(
        deleteBook.pending,

        (state) => {
          state.loading = true;
        },
      )

      .addCase(
        deleteBook.fulfilled,

        (state) => {
          state.loading = false;
        },
      )

      .addCase(
        deleteBook.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      );
  },
});

export default bookSlice.reducer;
