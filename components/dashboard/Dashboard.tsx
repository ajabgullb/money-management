import React from 'react'
import Sidebar from './Sidebar'
import DashboardContent from './DashboardContent'

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <DashboardContent />
    </div>
  )
}

export default Dashboard
