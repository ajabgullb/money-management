import React from 'react'
import { Dashboard, ProtectedRoute } from '@/components/index'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </div>
  )
}

export default page
