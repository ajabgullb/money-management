"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
  general?: string
}

const Register = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

  }

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear field-specific errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Create your account</h2>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* General Error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg"
            >
              {errors.general}
            </motion.div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={cn(
                    "pl-10 h-11 transition-all duration-200",
                    "focus:ring-2 focus:ring-green-500 focus:border-green-500",
                    errors.firstName && "border-red-300 focus:border-red-500 focus:ring-red-500",
                  )}
                  disabled={isLoading}
                  autoComplete="given-name"
                />
              </div>
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600"
                >
                  {errors.firstName}
                </motion.p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={cn(
                    "pl-10 h-11 transition-all duration-200",
                    "focus:ring-2 focus:ring-green-500 focus:border-green-500",
                    errors.lastName && "border-red-300 focus:border-red-500 focus:ring-red-500",
                  )}
                  disabled={isLoading}
                  autoComplete="family-name"
                />
              </div>
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600"
                >
                  {errors.lastName}
                </motion.p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={cn(
                  "pl-10 h-11 transition-all duration-200",
                  "focus:ring-2 focus:ring-green-500 focus:border-green-500",
                  errors.email && "border-red-300 focus:border-red-500 focus:ring-red-500",
                )}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-600">
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={cn(
                  "pl-10 pr-10 h-11 transition-all duration-200",
                  "focus:ring-2 focus:ring-green-500 focus:border-green-500",
                  errors.password && "border-red-300 focus:border-red-500 focus:ring-red-500",
                )}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-600">
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={cn(
                  "pl-10 pr-10 h-11 transition-all duration-200",
                  "focus:ring-2 focus:ring-green-500 focus:border-green-500",
                  errors.confirmPassword && "border-red-300 focus:border-red-500 focus:ring-red-500",
                )}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-600">
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                disabled={isLoading}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                I agree to the{" "}
                <a href="/terms" className="text-green-500 hover:text-green-600 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-green-500 hover:text-green-600 underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {errors.agreeToTerms && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-600">
                {errors.agreeToTerms}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={cn(
              "w-full h-11 bg-green-500 hover:bg-green-600 text-white font-medium",
              "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </motion.div>
            ) : (
              "Create account"
            )}
          </Button>

          {/* Password Requirements */}
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700 font-medium mb-1">Password Requirements:</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Register

