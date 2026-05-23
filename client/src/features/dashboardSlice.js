import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import API from '../services/api'

export const fetchDashboardStats =
  createAsyncThunk(
    'dashboard/fetchDashboardStats',

    async (_, thunkAPI) => {
      try {

        const response =
          await API.get('/dashboard')

        return response.data

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        )
      }
    }
  )

const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState: {
    stats: {},
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchDashboardStats.pending,
        (state) => {

          state.loading = true
        }
      )

      .addCase(
        fetchDashboardStats.fulfilled,
        (state, action) => {

          state.loading = false

          state.stats = action.payload
        }
      )

      .addCase(
        fetchDashboardStats.rejected,
        (state, action) => {

          state.loading = false

          state.error = action.payload
        }
      )
  },
})

export default dashboardSlice.reducer