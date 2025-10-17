"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, Bell, CheckCircle, Clock, Zap } from 'lucide-react';

interface ComingSoonProps {
  featureName?: string;
  description?: string;
  expectedDate?: string;
  showNotifyButton?: boolean;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  featureName = "Exciting New Feature",
  description = "We're working on something amazing! Stay tuned for updates.",
  expectedDate = "Coming Soon",
  showNotifyButton = true
}) => {
  const [isNotified, setIsNotified] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random floating icons
    const icons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setFloatingIcons(icons);
  }, []);

  const handleNotify = () => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsNotified(true);
      setEmail('');
      setTimeout(() => setShowEmailInput(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }as const;

  return (
    <div className="w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden py-12 sm:py-16 md:py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-green-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Floating Icons */}
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: icon.delay
            }}
          >
            {icon.id % 3 === 0 ? (
              <Sparkles className="w-6 h-6 text-green-400" />
            ) : icon.id % 3 === 1 ? (
              <Zap className="w-6 h-6 text-emerald-400" />
            ) : (
              <Rocket className="w-5 h-5 text-teal-400" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
          <div className="p-8 sm:p-12 md:p-16">
            {/* Icon Section */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl rotate-12">
                  <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-white -rotate-12" />
                </div>
                
                {/* Sparkle effects around icon */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: i === 0 ? '-10px' : i === 1 ? '50%' : 'auto',
                      bottom: i === 2 ? '-10px' : 'auto',
                      left: i === 0 ? '-10px' : i === 1 ? '-15px' : 'auto',
                      right: i === 0 ? 'auto' : i === 1 ? 'auto' : '-10px'
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.7
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="text-center mb-6">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-4 h-4" />
                {expectedDate}
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {featureName}
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              {[
                { icon: Zap, text: "Lightning Fast" },
                { icon: Sparkles, text: "Beautiful UI" },
                { icon: CheckCircle, text: "Easy to Use" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Notification Section */}
            {showNotifyButton && (
              <motion.div variants={itemVariants} className="max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  {!isNotified ? (
                    <motion.div
                      key="notify-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {!showEmailInput ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowEmailInput(true)}
                          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          <Bell className="w-5 h-5" />
                          Notify Me When It's Ready
                        </motion.button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col sm:flex-row gap-3"
                        >
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleNotify()}
                            className="flex-1 px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                          />
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleNotify}
                              className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                              Subscribe
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowEmailInput(false)}
                              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all"
                            >
                              Cancel
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-3 p-6 bg-green-50 rounded-xl border-2 border-green-200"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </motion.div>
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900 mb-1">You're All Set!</h3>
                        <p className="text-sm text-gray-600">We'll notify you as soon as it's ready.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Progress Indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-8 border-t border-gray-100"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full" />
                </motion.div>
                <span>Currently in development</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Text
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-gray-600 mt-6"
        >
          Have questions? <span className="text-green-600 font-medium cursor-pointer hover:underline">Contact us</span>
        </motion.p> */}
      </motion.div>
    </div>
  );
};

export default ComingSoon

// Demo Component
export function ComingSoonDemo() {
  return (
    <ComingSoon
      featureName="Advanced Budget Analytics"
      description="Get powerful insights into your spending patterns with AI-powered analytics. Visualize your financial journey and make smarter decisions with personalized recommendations."
      expectedDate="Coming Q2 2025"
      showNotifyButton={true}
    />
  );
}

