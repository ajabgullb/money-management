"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation';
import { 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight, 
  Play,
  CheckCircle,
  DollarSign,
  Target,
  Calendar
} from 'lucide-react'

const Hero = () => {
  const [activeEnvelope, setActiveEnvelope] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const router = useRouter()

  const envelopes = [
    { name: 'Groceries', amount: 450, budget: 600, color: 'from-green-400 to-emerald-500', icon: '🛒' },
    { name: 'Entertainment', amount: 120, budget: 200, color: 'from-purple-400 to-violet-500', icon: '🎬' },
    { name: 'Savings', amount: 800, budget: 1000, color: 'from-blue-400 to-cyan-500', icon: '💰' },
    { name: 'Gas', amount: 75, budget: 150, color: 'from-orange-400 to-red-500', icon: '⛽' },
  ]

  const features = [
    { icon: PiggyBank, title: 'Smart Envelopes', desc: 'Create custom spending categories' },
    { icon: TrendingUp, title: 'Real-time Tracking', desc: 'Monitor your spending instantly' },
    { icon: Shield, title: 'Secure Wallet', desc: 'Bank-level security protection' },
    { icon: Target, title: 'Goal Setting', desc: 'Set and achieve financial targets' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating) {
        setActiveEnvelope((prev) => (prev + 1) % envelopes.length)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAnimating, envelopes.length])

  const handleGetStarted = () => {
    router.push("/auth/login")
  }

  const handleWatchDemo = () => {
    window.open('https://www.youtube.com/@ajabgullb', '_blank', 'noopener,noreferrer')
  }

  return (
    <section id='home' className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Zap size={16} />
              <span>Smart Envelope Budgeting</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                  Take Control of Your
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Finances
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Create custom digital envelopes, allocate your income, and watch your spending habits transform. The modern way to budget with purpose.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Get Started Free</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={20} />
                </span>
              </button>

              <button
                onClick={handleWatchDemo}
                className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span className="flex items-center justify-center space-x-2 cursor-pointer">
                  <Play size={20} />
                  <span>See How It Works</span>
                </span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-8 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$2M+</div>
                <div className="text-sm text-gray-600">Money Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Phone Mockup */}
            <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm">
                  <span className="font-medium">EnvoMag</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 bg-white/80 rounded-sm"></div>
                    <span className="text-xs">100%</span>
                  </div>
                </div>

                {/* App Content */}
                <div className="p-6 space-y-6">
                  {/* Balance Card */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-emerald-100 text-sm">Total Balance</p>
                        <p className="text-3xl font-bold">$2,845.00</p>
                      </div>
                      <Wallet className="text-emerald-200" size={24} />
                    </div>
                    <div className="flex justify-between text-sm text-emerald-100">
                      <span>Allocated: $1,950</span>
                      <span>Available: $895</span>
                    </div>
                  </motion.div>

                  {/* Envelopes */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Your Envelopes</h3>
                      <button 
                        onClick={() => setIsAnimating(!isAnimating)}
                        className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
                      >
                        {isAnimating ? 'Pause' : 'Play'}
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <AnimatePresence>
                        {envelopes.map((envelope, index) => (
                          <motion.div
                            key={envelope.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              scale: activeEnvelope === index ? 1.02 : 1,
                            }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`bg-gradient-to-r ${envelope.color} rounded-xl p-4 text-white relative overflow-hidden cursor-pointer ${
                              activeEnvelope === index ? 'ring-2 ring-white shadow-lg' : ''
                            }`}
                            onClick={() => {
                              setActiveEnvelope(index)
                              setIsAnimating(false)
                            }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{envelope.icon}</span>
                                <span className="font-medium">{envelope.name}</span>
                              </div>
                              <span className="text-sm opacity-80">
                                ${envelope.amount}/${envelope.budget}
                              </span>
                            </div>
                            
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <motion.div
                                className="bg-white rounded-full h-2"
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: `${(envelope.amount / envelope.budget) * 100}%` 
                                }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            
                            {activeEnvelope === index && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-2 right-2"
                              >
                                <CheckCircle size={16} />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="grid grid-cols-3 gap-3"
                  >
                    <button className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-center hover:bg-emerald-100 transition-colors">
                      <DollarSign size={20} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">Add Money</span>
                    </button>
                    <button className="bg-teal-50 text-teal-600 p-3 rounded-xl text-center hover:bg-teal-100 transition-colors">
                      <Target size={20} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">Set Goal</span>
                    </button>
                    <button className="bg-cyan-50 text-cyan-600 p-3 rounded-xl text-center hover:bg-cyan-100 transition-colors">
                      <Calendar size={20} className="mx-auto mb-1" />
                      <span className="text-xs font-medium">Schedule</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating feature cards */}
            <div className="absolute -left-8 top-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="bg-white rounded-lg shadow-lg p-3 max-w-xs"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <Shield className="text-emerald-600" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bank-Level Security</p>
                    <p className="text-xs text-gray-500">Your data is protected</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute -right-8 top-40">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white rounded-lg shadow-lg p-3 max-w-xs"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <TrendingUp className="text-teal-600" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Real-time Insights</p>
                    <p className="text-xs text-gray-500">Track spending live</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          id='why'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 pt-16 border-t border-gray-200"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EnvoMag?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built for modern budgeters who want control, clarity, and growth in their financial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <IconComponent className="text-emerald-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

