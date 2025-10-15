import React from 'react'

const loading = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Simple round loader */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mb-4"></div>
    </div>
  )
}

export default loading

