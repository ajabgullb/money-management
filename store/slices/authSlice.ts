import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authStatus: false,
    userData: null,
  },
  reducers: {
    login: (state, action) => {
      state.authStatus = action.payload.authStatus
      state.userData = action.payload.userData
    },
    logout: (state) => {
      state.authStatus = false
      state.userData = null
    },
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer