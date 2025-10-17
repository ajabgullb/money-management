"use client"

import React, { useState, useCallback } from 'react'
import DashboardContent from './DashboardContent'
import Sidebar from './Sidebar'

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <div className="w-full flex h-screen bg-gray-50">
      {/* Sidebar Container - Hidden on mobile, visible on md+ */}
      <div 
        className={`
          hidden md:flex fixed left-0 top-0 h-full z-30 
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'w-20' : 'w-68'}
          shadow-lg
        `}
      >
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-label="Close sidebar"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full z-50 md:hidden
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar 
          isCollapsed={false}
          onToggle={closeMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={closeMobileMenu}
        />
      </div>

      {/* Main Content Container */}
      <div 
        className={`
          w-full flex-1 min-h-screen overflow-y-auto
          transition-all duration-300 ease-in-out
          md:ml-20 ${!isSidebarCollapsed ? 'md:ml-68' : ''}
        `}
      >
        {/* Mobile Header with Menu Button */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
          <button
            onClick={toggleMobileMenu}
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