"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, ArrowLeft, Wallet, DollarSign, PiggyBank, AlertTriangle, Bug, Zap } from 'lucide-react';

const ErrorPage = () => {
  const [isWalletShaking, setIsWalletShaking] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const shakeAnimation = {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5
    }
  };

  const funnyErrorMessages = [
    "Oops! Your money got scared and ran away! 😱",
    "Houston, we have a problem... with your budget! 🚀",
    "Error 500: Our piggy bank crashed! 🐷💥",
    "The money printer broke... literally! 🖨️💸",
    "Someone divided by zero in the budget calculator! 🤯",
    "Your wallet.exe has stopped working! 💻",
    "Plot twist: Even the error page has a budget! 📊"
  ];

  const [errorMessage] = useState(funnyErrorMessages[Math.floor(Math.random() * funnyErrorMessages.length)]);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
    setIsWalletShaking(true);
    setTimeout(() => setIsWalletShaking(false), 500);
    // Simulate retry logic
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 text-red-200 opacity-20"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Bug size={80} />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-20 text-orange-200 opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <AlertTriangle size={100} />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-10 text-red-100 opacity-30"
        animate={floatingAnimation}
      >
        <Zap size={60} />
      </motion.div>

      {/* Glitch Effect Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-300 opacity-10"
          animate={{ 
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3
          }}
          style={{
            top: `${20 + i * 25}%`,
            left: `${10 + i * 30}%`
          }}
        >
          <AlertTriangle size={40} />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        {/* Error Icon with Animation */}
        <motion.div
          className="relative mb-8 flex justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div
            className="relative"
            animate={isWalletShaking ? shakeAnimation : {}}
          >
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl relative"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(239, 68, 68, 0.4)",
                  "0 0 0 20px rgba(239, 68, 68, 0)",
                  "0 0 0 0 rgba(239, 68, 68, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-white" />
              
              {/* Lightning bolts */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Zap className="w-8 h-8 text-yellow-500" fill="currentColor" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4"
                animate={{ rotate: [0, -20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
              >
                <Zap className="w-8 h-8 text-yellow-500" fill="currentColor" />
              </motion.div>
            </motion.div>

            {/* Error Code */}
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border-2 border-red-200"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-red-600 font-bold text-lg">500</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 mt-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Something Went Wrong
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            {errorMessage}
          </p>
        </motion.div>

        {/* Fun Animated Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-8 inline-flex items-start gap-3 mx-auto max-w-md"
        >
          <motion.div
            animate={{ 
              rotate: [0, -15, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
          >
            <Bug className="w-6 h-6 text-red-600 flex-shrink-0" />
          </motion.div>
          <div className="text-left">
            <p className="text-red-800 font-semibold mb-1">
              Technical Difficulties Detected
            </p>
            <p className="text-red-600 text-sm">
              Don't worry, your money is safe! We're just having a little technical hiccup. 🤖
            </p>
          </div>
        </motion.div>

        {/* Retry Counter */}
        {retryCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-sm text-gray-500"
          >
            Retry attempt: {retryCount} 🔄
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center gap-3 w-full sm:w-auto"
            onClick={handleRetry}
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center gap-3 w-full sm:w-auto"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-xl font-medium border-2 border-gray-200 transition-all flex items-center gap-2 mx-auto"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </motion.button>

        {/* Error Details Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Wallet className="w-5 h-5 text-green-600" />
            What can you do?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Refresh</h4>
              <p className="text-sm text-gray-600">Try reloading the page</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Go Home</h4>
              <p className="text-sm text-gray-600">Return to dashboard</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Report</h4>
              <p className="text-sm text-gray-600">Contact support team</p>
            </div>
          </div>
        </motion.div>

        {/* Fun Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-sm text-gray-400 italic"
        >
          💡 Error code joke: Why do programmers prefer dark mode? <br />
          Because light attracts bugs! 🐛
        </motion.p>
      </motion.div>

      {/* Floating Bug Animations */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-300 opacity-20"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: -50,
            rotate: Math.random() * 360 
          }}
          animate={{ 
            y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            rotate: Math.random() * 720
          }}
          transition={{ 
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          <Bug size={25} />
        </motion.div>
      ))}
    </div>
  );
};

export default ErrorPage;