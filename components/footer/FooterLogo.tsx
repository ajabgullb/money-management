"use client"

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { startTransition } from 'react'

const FooterLogo = () => {
  const router = useRouter()

  const handleLogoClick = () => {
    startTransition(() => {
      router.push('/')
    })
  }

  return (
    <motion.button
      onClick={handleLogoClick}
      className="mb-4 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-green-600 rounded-lg p-1"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go to homepage"
    >
      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
        EnvoMag
      </h3>
    </motion.button>
  )
}

export default FooterLogo

