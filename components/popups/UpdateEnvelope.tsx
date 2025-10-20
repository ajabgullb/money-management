"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Folder, DollarSign, FileText, Loader2, Trash2 } from 'lucide-react';

import { removeEnvelope, updateEnvelopePartial, Envelope } from '@/store/slices/envelopeSlice';
import { useDispatch } from 'react-redux';
import envelope from '@/lib/categories';

interface UpdateEnvelopeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  updatedEnvelope?: Envelope | null;
  onUpdate: (data: Envelope) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const categories = [
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
];

const UpdateEnvelope: React.FC<UpdateEnvelopeDialogProps> = ({
  isOpen,
  onClose,
  updatedEnvelope,
  onUpdate,
  onDelete
}) => {
  const [formData, setFormData] = useState<Envelope>({
    envelope_id: updatedEnvelope?.envelope_id || '',
    envelope_title: updatedEnvelope?.envelope_title || '',
    category: updatedEnvelope?.category || '',
    allocated_amount: updatedEnvelope?.allocated_amount || 0,
    spent_amount: updatedEnvelope?.spent_amount || 0,
    description: updatedEnvelope?.description || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const dispatch = useDispatch();

  // Clear form when dialog closes
  useEffect(() => {
    if(isOpen) {
      console.log("ID: ", updatedEnvelope?.envelope_id);
    }

    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (updatedEnvelope && isOpen) {
      setFormData({
        envelope_id: updatedEnvelope.envelope_id,
        envelope_title: updatedEnvelope.envelope_title || '',
        category: updatedEnvelope.category || '',
        allocated_amount: updatedEnvelope.allocated_amount,
        spent_amount: updatedEnvelope.spent_amount,
        description: updatedEnvelope.description || ''
      });
      setErrors({});
      setShowDeleteConfirm(false);
    }

  }, [updatedEnvelope, isOpen]);

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.envelope_title.trim()) {
    newErrors.envelope_title = 'Envelope title is required';
    }

    if (!formData.category || formData.category === 'Select a category') {
      newErrors.category = 'Please select a category';
    }

    if (!formData.allocated_amount || formData.allocated_amount <= 0) {
      newErrors.allocated_amount = 'Budget must be greater than 0';
    }

    if (formData.spent_amount === undefined || formData.spent_amount < 0) {
      newErrors.spent_amount = 'Spent cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const resetForm = () => {
    setFormData({
      envelope_id: '',
      envelope_title: '',
      category: '',
      allocated_amount: 0,
      spent_amount: 0,
      description: ''
    });
    setErrors({});
    setShowDeleteConfirm(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setErrors({});
    
      const {data, error} = await envelope.updateEnvelope(
        formData.envelope_id, 
        formData.envelope_title, 
        formData.description, 
        formData.allocated_amount, 
        formData.category, 
        formData.spent_amount
      );
  
      if (error) throw new Error('Failed to update envelope', error);
      
      if (data) {
        dispatch(updateEnvelopePartial({
          envelope_id: data.envelope_id,
          updates: data
        }));
        await onUpdate(data);
      }
      
      console.log('Envelope updated successfully');
      onClose();
      
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to update envelope. Please try again.';
      setErrors({
        envelope_title: errorMessage
      });
      console.error('Error updating envelope:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!updatedEnvelope?.envelope_id) return;
    
    try {
      setIsDeleting(true);
      setErrors({});
      
      const { error } = await envelope.deleteEnvelope(updatedEnvelope.envelope_id);
      
      if (error) {
        throw new Error('Failed to delete envelope');
      }
      
      // ✅ Update Redux immediately after successful API call
      dispatch(removeEnvelope(updatedEnvelope.envelope_id));
      
      // ✅ Notify parent component
      await onDelete(updatedEnvelope.envelope_id);
      
      // ✅ Close dialog
      setShowDeleteConfirm(false);
      onClose();
      
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete envelope. Please try again.';
      setErrors({
        envelope_title: errorMessage
      });
      console.error('Error deleting envelope:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChange = (field: keyof Envelope, value: string | number) => {
    if (field === 'allocated_amount' || field === 'spent_amount') {
      // Convert string to number for amount fields
      const numValue = value === '' ? 0 : parseFloat(value as string);
      setFormData(prev => ({ ...prev, [field]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const charCount = formData.description.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 pb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                      <Tag className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Update Envelope</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    disabled={isLoading || isDeleting}
                  >
                    <X className="w-5 h-5 text-gray-500 cursor-pointer" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      Envelope Title
                    </label>
                    <input
                      type="text"
                      name="envelope_title"
                      value={formData.envelope_title}
                      onChange={(e) => handleChange('envelope_title', e.target.value)}
                      placeholder="e.g., Monthly Groceries"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                        errors.envelope_title 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300'
                      }`}
                      disabled={isLoading || isDeleting}
                    />
                    {errors.envelope_title && (
                      <p className="text-red-600 text-sm mt-1">{errors.envelope_title}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Folder className="w-4 h-4 text-emerald-600" />
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all appearance-none bg-white cursor-pointer ${
                        errors.category 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300'
                      }`}
                      disabled={isLoading || isDeleting}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        Budget
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="allocated_amount"
                          step="0.01"
                          value={formData.allocated_amount}
                          onChange={(e) => handleChange('allocated_amount', e.target.value)}
                          placeholder="0.00"
                          className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                            errors.allocated_amount 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300'
                          }`}
                          disabled={isLoading || isDeleting}
                        />
                      </div>
                      {errors.allocated_amount && (
                        <p className="text-red-600 text-sm mt-1">{errors.allocated_amount}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        Spent
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="spent_amount"
                          step="0.01"
                          value={formData.spent_amount}
                          onChange={(e) => handleChange('spent_amount', e.target.value)}
                          placeholder="0.00"
                          className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all ${
                            errors.spent_amount 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300'
                          }`}
                          disabled={isLoading || isDeleting}
                        />
                      </div>
                      {errors.spent_amount && (
                        <p className="text-red-600 text-sm mt-1">{errors.spent_amount}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Describe what this envelope will be used for..."
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                      disabled={isLoading || isDeleting}
                    />
                    <p className="text-xs text-gray-500 mt-1">{charCount}/500 characters</p>
                  </div>

                  <AnimatePresence>
                    {showDeleteConfirm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-200 rounded-xl p-4"
                      >
                        <p className="text-sm text-red-800 font-medium mb-3">
                          Are you sure you want to delete this envelope? This action cannot be undone.
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {isDeleting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              'Yes, Delete'
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={isLoading || isDeleting || showDeleteConfirm}
                      className="px-6 py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading || isDeleting || showDeleteConfirm}
                      className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Envelope'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UpdateEnvelope;