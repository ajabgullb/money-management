import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import dashboardSlice from "./slices/dashboardSlice"
import envelopeSlice from "./slices/envelopeSlice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
    envelope: envelopeSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store