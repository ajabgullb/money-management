"use client"

import React, { useMemo } from 'react'
import { Overview, Accounts, Transactions, Analytics, Budgets, Goals } from "./index"
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const DashboardContent = () => {
  const activeTab = useSelector((state: any) => state.dashboard?.activeTab)
  console.log(activeTab)

  const renderActiveTab = useMemo(() => {
    switch (activeTab) {
      case "overview": return <Overview />
      case "accounts": return <Accounts />
      case "transactions": return <Transactions />
      case "analytics": return <Analytics />
      case "budgets": return <Budgets />
      case "goals": return <Goals />
      default: return <Overview />
    }
  }, [activeTab])

  return (
    <div className="flex-1 p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveTab}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default DashboardContent
