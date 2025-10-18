import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Wallet, Search } from 'lucide-react';
import { CreateEnvelope } from '@/components/index';
import auth from "@/lib/auth"
import envelope from '@/lib/categories';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';

import EnvelopesSkeleton from './EnvelopeSkeleton';
import { setEnvelopes } from '@/store/slices/envelopeSlice';

export default function EnvelopesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateEnvelopeOpen, setIsCreateEnvelopeOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  
  const handleOpenCreateEnvelope = () => setIsCreateEnvelopeOpen(true)
  const handleCloseCreateEnvelope = () => setIsCreateEnvelopeOpen(false)

  const envelopes = useSelector((state: RootState) => state.envelope.envelopes);

  const fetchEnvelopes = async () => {
    try {
      setIsLoading(true);
      const user_id = await auth.getUserID();

      if (!user_id) {
        throw new Error("User not found at EnvelopesPage");
      }

      const { error, data } = await envelope.getEnvelopes(user_id);

      if (error) throw error;
      dispatch(setEnvelopes(data))
    } catch (error) {
      console.log("Error fetching Envelopes, ", error);
      throw error;
    } finally { setIsLoading(false); }
  }

  useEffect(() => {
    fetchEnvelopes();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  } as const;

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)"
    },
    tap: { scale: 0.95 }
  };

  if (isLoading) return <EnvelopesSkeleton />

  if (envelopes.length > 0) {
    return (
      <motion.div
        className="p-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with search and filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Envelopes</h1>
            <p className="text-gray-600 mt-1">Manage your savings goals</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search envelopes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleOpenCreateEnvelope}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Envelope
            </motion.button>

            <CreateEnvelope 
              isOpen={isCreateEnvelopeOpen}
              onClose={handleCloseCreateEnvelope}
            />
          </div>
        </div>

        {/* Envelopes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {envelopes
            .filter(envelope => 
              envelope.envelope_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              envelope.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((envelope, index) => {
              const progress = (envelope.spent_amount / envelope.allocated_amount) * 100;
              const available_amount = envelope.allocated_amount - envelope.spent_amount;

              return (
                <motion.div
                  key={envelope.envelope_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:border-green-200 transition-all duration-200"
                >
                  {/* Envelope Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {envelope.envelope_title}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {envelope.category}
                      </span>
                    </div>
                    <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center`}>
                      <Wallet className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>

                  {/* Amount Information */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Available Cash</span>
                      <span className="text-lg font-bold text-green-600">
                        ${available_amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Allocated Amount</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${envelope.allocated_amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-green-600">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className={`${progress == 100 ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-green-500 to-green-600"} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Spent Amount */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {available_amount == 0 ? 'Money\'s Finsished' : 'Spent'}
                      </span>
                      <span className={`text-sm font-bold ${
                        available_amount == 0 ? 'text-red-500' : 'text-green-600'
                      }`}>
                        ${envelope.spent_amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Empty search results */}
        {envelopes.filter(envelope => 
          envelope.envelope_title.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No envelopes found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Empty state when no envelopes exist
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-center max-w-md mx-auto"
        variants={emptyStateVariants}
      >
        {/* Empty state illustration */}
        <motion.div
          className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Wallet className="w-16 h-16 text-green-600" />
        </motion.div>

        {/* Empty state content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          No Envelopes Yet
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Start organizing your money by creating your first envelope. 
          Set savings goals, track your progress, and take control of your finances.
        </p>

        {/* Create envelope button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleOpenCreateEnvelope}
          className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-200 shadow-lg cursor-pointer"
        >
          <Plus className="w-6 h-6" />
          Create My First Envelope
        </motion.button>

        <CreateEnvelope 
          isOpen={isCreateEnvelopeOpen}
          onClose={handleCloseCreateEnvelope}
        />

        {/* Additional helpful text */}
        <motion.div
          className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3">
            What are envelopes?
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Envelopes help you allocate money for specific purposes like emergency funds, 
            vacations, or large purchases. Each envelope has a target amount and tracks 
            your progress toward that goal.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

