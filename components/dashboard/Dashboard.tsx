"use client"

import React, { useState, useCallback } from 'react'
import DashboardContent from './DashboardContent'
import Sidebar from './Sidebar'

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState<boolean>(false)

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev)
  }, [])

  return (
    <div className="w-full flex h-screen bg-gray-50">
      {/* Sidebar Container */}
      <div 
        className={`
          fixed left-0 top-0 h-full z-30 
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'w-16' : 'w-64'}
          shadow-lg
        `}
      >
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar}
        />
      </div>

      {/* Mobile Overlay */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Main Content Container */}
      <div 
        className={`
          flex-1 min-h-screen overflow-y-auto
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'ml-16' : 'ml-0 lg:ml-64'}
        `}
      >
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="w-full">
          <DashboardContent />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
