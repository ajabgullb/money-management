import { createSlice } from "@reduxjs/toolkit"

export type Tabs = "overview" | "envelopes" | "transactions" | "analytics" | "budgets" | "goals"

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    activeTab: "envelopes" as Tabs,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload.activeTab
    },
  },
})

export const { setActiveTab } = dashboardSlice.actions
export default dashboardSlice.reducer
