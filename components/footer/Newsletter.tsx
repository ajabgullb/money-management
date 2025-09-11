"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In real app, make API call here
      // const response = await fetch('/api/newsletter', { ... })
      
      setStatus('success')
      setMessage('Thank you for subscribing!')
      setEmail('')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
      <p className="text-green-100 text-sm mb-4">
        Get the latest updates and insights delivered to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading'}
            className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-colors duration-200 disabled:opacity-50"
            required
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={status === 'loading' || !email}
          className="w-full bg-white text-green-600 hover:bg-green-50 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
          whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subscribing...
            </span>
          ) : (
            'Subscribe'
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`mt-3 text-sm ${
              status === 'success' ? 'text-green-100' : 'text-red-200'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Newsletter

