"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Wallet, DollarSign, PiggyBank, AlertCircle } from 'lucide-react';

export const FloatingMoney = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // ✅ Only run on client after the window is available
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  // Don’t render until window size is known (prevents SSR errors)
  if (windowSize.width === 0) return null;

  return (
    <>
      {/* 💸 Floating Money Animations */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-300 opacity-20"
          initial={{ 
            x: Math.random() * windowSize.width, 
            y: -50,
            rotate: Math.random() * 360 
          }}
          animate={{ 
            y: windowSize.height + 50,
            rotate: Math.random() * 360 + 360
          }}
          transition={{ 
            duration: Math.random() * 5 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          <DollarSign size={30} />
        </motion.div>
      ))}
    </>
  );
}

const NotFoundPage = () => {
  const [isWalletFlipped, setIsWalletFlipped] = useState(false);
  const [message, setMessage] = useState("")

  const floatingAnimation: any = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] // cubic-bezier values for easeInOut
    }
  };

  const rotateAnimation: any = {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] // cubic-bezier values for easeInOut
    }
  };

  useEffect(() => {
    const funnyMessages = [
      "Oops! Your money went on vacation... without you! 🏖️",
      "This page is as empty as your wallet on payday eve! 💸",
      "404: Budget not found. Have you checked under the couch? 🛋️",
      "Looks like this page spent all its money and disappeared! 💨",
      "Even our best accountant can't find this page! 🤓"
    ];
    
    setMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 text-green-200 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: [0, 0, 1, 1] }}
      >
        <DollarSign size={80} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 text-emerald-200 opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: [0, 0, 1, 1] }}
      >
        <PiggyBank size={100} />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-10 text-green-100 opacity-30"
        animate={floatingAnimation}
      >
        <Wallet size={60} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        {/* 404 Number with Animation */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.5, 
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
        >
          <motion.div
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"
            animate={rotateAnimation}
          >
            404
          </motion.div>
          
          {/* Animated Wallet Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsWalletFlipped(!isWalletFlipped)}
            animate={{
              rotateY: isWalletFlipped ? 180 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Wallet className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            {message}
          </p>
        </motion.div>

        {/* Fun Animated Alert */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-8 inline-flex items-center gap-3 mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </motion.div>
          <p className="text-yellow-800 font-medium">
            Don't worry, your budget is safe... probably! 😅
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center gap-3 w-full sm:w-auto cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 rounded-xl font-semibold text-lg border-2 border-gray-200 transition-all flex items-center gap-3 w-full sm:w-auto cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Fun Interactive Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Search className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Looking for something?
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Try checking these popular pages:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Dashboard', 'Envelopes', 'Transactions', 'Analytics', 'Goals'].map((page, index) => (
              <motion.button
                key={page}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.1, backgroundColor: '#10b981' }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-100 hover:bg-green-600 text-green-700 hover:text-white rounded-lg font-medium transition-all cursor-pointer"
                onClick={() => window.location.href = `/${page.toLowerCase()}`}
              >
                {page}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Easter Egg - Click the wallet hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-sm text-gray-400 italic"
        >
          💡 Psst... Try clicking the wallet icon above!
        </motion.div>
      </motion.div>

      {/* Floating Money Animations */}
      <FloatingMoney />
    </div>
  );
};

export default NotFoundPage;

