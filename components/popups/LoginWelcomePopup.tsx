"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TrendingUp, Wallet, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

interface LoginWelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  lastLogin?: string;
  stats?: {
    totalEnvelopes: number;
    totalSavings: number;
    goalProgress: number;
  };
}

const LoginWelcomePopup: React.FC<LoginWelcomePopupProps> = ({ 
  isOpen, 
  onClose, 
  userName = "Friend",
  lastLogin = "2 days ago",
  stats = {
    totalEnvelopes: 5,
    totalSavings: 12450,
    goalProgress: 68
  }
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 30
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 30,
      transition: {
        duration: 0.2
      }
    }
  } as const;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl z-[60] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green header gradient */}
            <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 p-6 sm:p-8 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>

              {/* Welcome content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                >
                  <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {getGreeting()}, {userName}! 👋
                </h2>
                <p className="text-green-50 text-sm sm:text-base">
                  Welcome back! Last seen {lastLogin}
                </p>
              </motion.div>
            </div>

            {/* Content section */}
            <div className="p-6 sm:p-8">
              {showContent && (
                <>
                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                      Your Financial Snapshot
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* Total Envelopes */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {stats.totalEnvelopes}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Active Envelopes
                        </p>
                      </motion.div>

                      {/* Total Savings */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                          ${stats.totalSavings.toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Total Saved
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Progress Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm sm:text-base font-medium text-gray-700">
                        Overall Goal Progress
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-green-600">
                        {stats.goalProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.goalProgress}%` }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{ width: '50%' }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                      Quick Actions
                    </h3>

                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-3 sm:p-4 bg-white border-2 border-gray-200 hover:border-green-300 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <Wallet className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          View All Envelopes
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-3 sm:p-4 bg-white border-2 border-gray-200 hover:border-green-300 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          View Recent Activity
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </motion.button>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                  >
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                      Continue to Dashboard
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Demo Component
export default function LoginWelcomeDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Login Welcome Popup Demo</h1>
        <p className="text-sm sm:text-base text-gray-600">Click the button to see what users see after login</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
        >
          Show Login Popup
        </motion.button>

        <LoginWelcomePopup 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          userName="Alex"
          lastLogin="3 hours ago"
          stats={{
            totalEnvelopes: 8,
            totalSavings: 24750,
            goalProgress: 73
          }}
        />
      </div>
    </div>
  );
}

