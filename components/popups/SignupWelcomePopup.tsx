"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Wallet, TrendingUp, Target, ChevronRight, Check } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ 
  isOpen, 
  onClose, 
  userName = "Friend" 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const features = [
    {
      icon: Wallet,
      title: "Create Envelopes",
      description: "Organize your money into digital envelopes for different goals",
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Target,
      title: "Set Goals",
      description: "Track progress toward your savings targets with visual insights",
      color: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Watch Progress",
      description: "See your financial goals come to life with real-time tracking",
      color: "bg-teal-100",
      iconColor: "text-teal-600"
    }
  ];

  const steps = [
    {
      title: `Welcome, ${userName}! 🎉`,
      subtitle: "We're thrilled to have you here",
      content: (
        <div className="text-center space-y-4 sm:space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-xl"
          >
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Your Financial Journey Starts Now
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Get ready to take control of your money like never before. 
              Let's make managing finances simple, visual, and rewarding.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      title: "Here's What You Can Do",
      subtitle: "Powerful features at your fingertips",
      content: (
        <div className="space-y-3 sm:space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-green-200 transition-all cursor-pointer"
            >
              <div className={`${feature.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "Ready to Get Started?",
      subtitle: "Your first envelope is just a click away",
      content: (
        <div className="text-center space-y-4 sm:space-y-6">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl"
          >
            <Wallet className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </motion.div>
          
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Create Your First Envelope
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
              Start organizing your finances by creating an envelope for 
              your most important savings goal. Whether it's an emergency fund, 
              vacation, or dream purchase - we've got you covered!
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-50 text-green-700 rounded-lg text-xs sm:text-sm font-medium"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Pro tip: Start with an emergency fund
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  } as const;

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleSkip}
          />

          {/* Confetti Effect */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-[60]">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10px',
                    backgroundColor: ['#22c55e', '#10b981', '#14b8a6', '#fff'][Math.floor(Math.random() * 4)]
                  }}
                  animate={{
                    y: [0, window.innerHeight + 20],
                    x: [0, (Math.random() - 0.5) * 200],
                    rotate: [0, Math.random() * 360],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-full max-w-lg sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-[60]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 cursor-pointer" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-12">
              {/* Progress indicators */}
              <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep 
                        ? 'w-8 bg-green-600' 
                        : index < currentStep 
                        ? 'w-1.5 bg-green-400' 
                        : 'w-1.5 bg-gray-200'
                    }`}
                    layoutId={`progress-${index}`}
                  />
                ))}
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      {steps[currentStep].subtitle}
                    </p>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    {steps[currentStep].content}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <button
                  onClick={handleSkip}
                  className="text-sm sm:text-base text-gray-500 hover:text-gray-700 font-medium transition-colors order-2 sm:order-1 cursor-pointer"
                >
                  Skip for now
                </button>

                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all order-1 sm:order-2 text-sm sm:text-base cursor-pointer"
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  ) : (
                    <>
                      Let's Go!
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Demo Component
export default function WelcomeDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Welcome Popup Demo</h1>
        <p className="text-sm sm:text-base text-gray-600">Click the button below to see the welcome experience</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
        >
          Show Welcome Popup
        </motion.button>

        <WelcomePopup 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          userName="Sarah"
        />
      </div>
    </div>
  );
}