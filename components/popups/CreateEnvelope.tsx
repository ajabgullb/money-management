"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { DollarSign, Tag, FileText, FolderOpen, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import envelope from '@/lib/categories'
import auth from '@/lib/auth'

interface CreateEnvelopeProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (envelopeData: EnvelopeData) => void;
}

interface EnvelopeData {
  title: string;
  allocatedMoney: number;
  description: string;
  category: string;
  spentAmount: number;
}

interface EnvelopeErrors {
  title?: string;
  allocatedMoney?: string;
  description?: string;
  category?: string;
  spentAmount?: string;
  general?: string;
}

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Savings',
  'Other'
]

const CreateEnvelope: React.FC<CreateEnvelopeProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<EnvelopeData>({
    title: '',
    allocatedMoney: 0,
    description: '',
    category: '',
    spentAmount: 0
  })
  const [errors, setErrors] = useState<EnvelopeErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const isMountedRef = useRef(true)
  const submitAttemptedRef = useRef(false)

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset to avoid visual glitch
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          setFormData({
            title: '',
            allocatedMoney: 0,
            description: '',
            category: '',
            spentAmount: 0
          })
          setErrors({})
          setShowSuccess(false)
          submitAttemptedRef.current = false
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleInputChange = useCallback((
    field: keyof EnvelopeData,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field as keyof EnvelopeErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }, [errors])

  const validateForm = useCallback((): boolean => {
    const newErrors: EnvelopeErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Envelope title is required'
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Envelope title must be at least 2 characters'
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Envelope title must be less than 50 characters'
    }

    if (!formData.allocatedMoney || formData.allocatedMoney <= 0) {
      newErrors.allocatedMoney = 'Allocated money must be greater than 0'
    } else if (formData.allocatedMoney > 1000000) {
      newErrors.allocatedMoney = 'Amount seems too large. Please verify.'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    } else if (formData.description.trim().length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (formData.spentAmount < 0) {
      newErrors.spentAmount = 'Spent amount cannot be negative'
    }

    if (formData.spentAmount > formData.allocatedMoney) {
      newErrors.spentAmount = 'Spent amount cannot exceed allocated budget'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isLoading || submitAttemptedRef.current) return
    
    if (!validateForm()) return
    
    submitAttemptedRef.current = true
    setIsLoading(true)
    setErrors({})
    
    try {
      const user_id = await auth.getUserID()
      
      if (!user_id) {
        throw new Error("Please log in to create an envelope")
      }
      
      const data = await envelope.createEnvelope(
        user_id, 
        formData.title.trim(), 
        formData.description.trim(), 
        formData.allocatedMoney,
        formData.category,
        formData.spentAmount
      )

      if (!isMountedRef.current) return
      
      if (!data) {
        throw new Error('Failed to create envelope. Please try again.')
      }
      
      if (data && data.length > 0) {
        const envelopeData: EnvelopeData = {
          title: data[0].envelope_title,
          allocatedMoney: data[0].allocated_amount,
          description: data[0].description,
          category: data[0].category,
          spentAmount: data[0].spent_amount
        };
        
        console.log('Envelope created successfully:', envelopeData);
        
        // Show success message
        setShowSuccess(true);
        
        // Call parent callback with properly formatted data
        if (onSubmit) {
          onSubmit(envelopeData);
        }
        
        // Close after showing success
        setTimeout(() => {
          if (isMountedRef.current) {
            onClose();
          }
        }, 1500);
      } else {
        throw new Error('Failed to create envelope. No data returned.');
      }
      
    } catch (error) {
      console.error('Error creating envelope:', error)
      
      if (!isMountedRef.current) return
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to create envelope. Please try again.'
      
      setErrors({ general: errorMessage })
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
        submitAttemptedRef.current = false
      }
    }
  }, [formData, validateForm, onSubmit, onClose, isLoading])

  const handleCancel = useCallback(() => {
    if (isLoading) return
    onClose()
  }, [onClose, isLoading])

  const remainingBudget = formData.allocatedMoney - formData.spentAmount
  const isOverBudget = remainingBudget < 0

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-[95vw] sm:w-full max-w-lg mx-auto p-0 max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 space-y-0 flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <DialogTitle className="text-base sm:text-xl font-bold text-gray-900">
              Create Envelope
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Success Message Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center space-y-3 px-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Envelope Created!</h3>
                <p className="text-sm text-gray-600 mt-1">Your budget envelope has been set up successfully.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-5">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-0.5">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Envelope Title */}
            <div className="space-y-1.5 sm:space-y-2">
              <label 
                htmlFor="envelope-title" 
                className="text-sm font-medium text-gray-700 flex items-center space-x-1.5 sm:space-x-2"
              >
                <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span>Envelope Title</span>
              </label>
              <input
                id="envelope-title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Monthly Groceries"
                maxLength={50}
                className={`
                  w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg transition-all text-sm sm:text-base
                  focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none
                  ${errors.title 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                disabled={isLoading}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-xs sm:text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5 sm:space-y-2">
              <label 
                htmlFor="category" 
                className="text-sm font-medium text-gray-700 flex items-center space-x-1.5 sm:space-x-2"
              >
                <FolderOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span>Category</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`
                  w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg transition-all text-sm sm:text-base
                  focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none
                  ${errors.category 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                disabled={isLoading}
                aria-invalid={!!errors.category}
                aria-describedby={errors.category ? "category-error" : undefined}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p id="category-error" className="text-xs sm:text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />
                  <span>{errors.category}</span>
                </p>
              )}
            </div>

            {/* Allocated Money and Spent Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Allocated Money */}
              <div className="space-y-1.5 sm:space-y-2">
                <label 
                  htmlFor="allocated-money" 
                  className="text-sm font-medium text-gray-700 flex items-center space-x-1.5 sm:space-x-2"
                >
                  <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <span>Budget</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm sm:text-base font-medium">$</span>
                  </div>
                  <input
                    id="allocated-money"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.allocatedMoney || ''}
                    onChange={(e) => handleInputChange('allocatedMoney', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`
                      w-full pl-7 sm:pl-8 pr-3 py-2.5 sm:py-3 border rounded-lg transition-all text-sm sm:text-base
                      focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none
                      ${errors.allocatedMoney 
                        ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    disabled={isLoading}
                    aria-invalid={!!errors.allocatedMoney}
                    aria-describedby={errors.allocatedMoney ? "allocated-error" : undefined}
                  />
                </div>
                {errors.allocatedMoney && (
                  <p id="allocated-error" className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.allocatedMoney}</span>
                  </p>
                )}
              </div>

              {/* Spent Amount */}
              <div className="space-y-1.5 sm:space-y-2">
                <label 
                  htmlFor="spent-amount" 
                  className="text-sm font-medium text-gray-700 flex items-center space-x-1.5 sm:space-x-2"
                >
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <span>Spent</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm sm:text-base font-medium">$</span>
                  </div>
                  <input
                    id="spent-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.spentAmount || ''}
                    onChange={(e) => handleInputChange('spentAmount', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`
                      w-full pl-7 sm:pl-8 pr-3 py-2.5 sm:py-3 border rounded-lg transition-all text-sm sm:text-base
                      focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none
                      ${errors.spentAmount 
                        ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    disabled={isLoading}
                    aria-invalid={!!errors.spentAmount}
                    aria-describedby={errors.spentAmount ? "spent-error" : undefined}
                  />
                </div>
                {errors.spentAmount && (
                  <p id="spent-error" className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.spentAmount}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Remaining Budget Display */}
            {formData.allocatedMoney > 0 && (
              <div className={`
                border rounded-lg p-3 sm:p-3.5 transition-colors
                ${isOverBudget 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-green-50 border-green-200'
                }
              `}>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">Remaining:</span>
                  <span className={`
                    font-bold text-base sm:text-lg
                    ${isOverBudget ? 'text-red-600' : 'text-green-600'}
                  `}>
                    ${Math.abs(remainingBudget).toFixed(2)}
                    {isOverBudget && ' over'}
                  </span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5 sm:space-y-2">
              <label 
                htmlFor="description" 
                className="text-sm font-medium text-gray-700 flex items-center space-x-1.5 sm:space-x-2"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span>Description</span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what this envelope will be used for..."
                rows={3}
                maxLength={500}
                className={`
                  w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg transition-all resize-none text-sm sm:text-base
                  focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none
                  ${errors.description 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                disabled={isLoading}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              <div className="flex items-center justify-between">
                {errors.description ? (
                  <p id="description-error" className="text-xs sm:text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.description}</span>
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    {formData.description.length}/500 characters
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="border-t border-gray-100 px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 flex-shrink-0">
            <div className="flex flex-col-reverse sm:flex-row space-y-reverse space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="
                  flex-1 px-4 py-2.5 sm:py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg text-sm sm:text-base
                  hover:bg-white hover:border-gray-400 transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 outline-none
                "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="
                  flex-1 px-4 py-2.5 sm:py-2.5 bg-green-600 text-white font-medium rounded-lg text-sm sm:text-base
                  hover:bg-green-700 active:bg-green-800 transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:ring-2 focus:ring-green-500 focus:ring-offset-2 outline-none
                  flex items-center justify-center space-x-2
                "
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Envelope</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEnvelope