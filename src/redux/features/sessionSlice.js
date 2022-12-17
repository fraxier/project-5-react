import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    loggedIn: false
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true
    },
    logout: (state) => {
      state.loggedIn = false
    }
  }
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer