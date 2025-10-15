"use client"

import React from 'react'
import { Register } from '@/components/index'

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* EnvoMag Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-500 mb-2">EnvoMag</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <Register />

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-green-500 hover:text-green-600 font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page

