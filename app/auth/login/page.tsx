"use client"

import Login from "@/components/auth/Login"
import { motion } from "framer-motion"
import Link from "next/link"
import { Zap } from "lucide-react"

const LoginPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4 mt-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center my-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">EnvoMag</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-2xl font-semibold text-gray-900 mb-2"
          >
            Welcome back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-600"
          >
            Sign in to your EnvoMag account to continue managing your finances
          </motion.p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Login />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/auth/register" className="font-medium text-green-500 hover:text-green-600 transition-colors">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage

