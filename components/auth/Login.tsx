"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import auth from "@/lib/auth"
import { useDispatch } from "react-redux"
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const dispatch = useDispatch()
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      setErrors({})

      if (!validateForm()) {
        setIsLoading(false)
        return
      }

      const data = await auth.signIn(
        formData.email, 
        formData.password,
        dispatch
      )
      
      if (data.user) {
        console.log('Sign in successful');

        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      }

    } catch (error) {
      console.log(`The error from handleSubmit: ${error}`)
      setIsLoading(false)
      setErrors({
        general: "Something went wrong :: handleSubmit(), Please try again!"
      })

      throw error
    }

  }

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
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
          <h2 className="text-xl font-semibold text-gray-900">Sign in to your account</h2>
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={cn(
                  "pl-10 pr-10 h-11 transition-all duration-200",
                  "focus:ring-2 focus:ring-green-500 focus:border-green-500",
                  errors.password && "border-red-300 focus:border-red-500 focus:ring-red-500",
                )}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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

          {/* Forgot Password */}
          <div className="flex items-center justify-end">
            <Button
              type="button"
              variant="link"
              className="text-sm text-green-500 hover:text-green-600 p-0 h-auto cursor-pointer"
              disabled={isLoading}
            >
              Forgot password?
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={cn(
              "w-full h-11 bg-green-500 hover:bg-green-600 text-white font-medium",
              "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer",
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </motion.div>
            ) : (
              "Sign in"
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}

export default Login

