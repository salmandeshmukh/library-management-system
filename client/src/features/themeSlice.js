import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',

  initialState: {
    darkMode:
      JSON.parse(localStorage.getItem('darkMode')) ?? true,
  },

  reducers: {

    toggleTheme: (state) => {

      state.darkMode = !state.darkMode

      localStorage.setItem(
        'darkMode',
        JSON.stringify(state.darkMode)
      )
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer