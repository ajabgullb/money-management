'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Send, 
  Clock,
  CheckCircle,
  AlertCircle,
  Headphones,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ContactMethod {
  icon: React.ElementType
  title: string
  description: string
  contact: string
  availability?: string
  bgColor: string
  iconColor: string
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  inquiryType: string
}

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email with detailed responses',
    contact: 'support@envomag.com',
    availability: 'Usually responds within 24 hours',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    contact: '+1 (555) 123-4567',
    availability: 'Business hours only',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1] as const,
    },
  },
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: ''
      })
      setSubmitStatus('idle')
    }, 3000)
  }

  return (
    <section id='contact' className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            <MessageSquare className="w-4 h-4 mr-1" />
            Get in Touch
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We're Here to Help
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about EnvoMag? Need help getting started? Our friendly support team 
            is ready to assist you on your journey to better financial management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <motion.div
                  key={method.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 ${method.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {method.title}
                          </h4>
                          <p className="text-gray-600 mb-2">
                            {method.description}
                          </p>
                          <p className="text-green-600 font-medium mb-1">
                            {method.contact}
                          </p>
                          {method.availability && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {method.availability}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                      <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing & Pricing</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="What's this about?"
                      required
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your question or concern..."
                      rows={5}
                      required
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center text-green-600 bg-green-50 p-3 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Something went wrong. Please try again.
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Headphones className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Need Quick Answers?
                </h3>
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Check out our comprehensive FAQ section or browse our help documentation 
                for instant answers to common questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer">
                  View FAQ
                </Button>
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer">
                  Help Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>We typically respond within 24 hours • Available Monday-Friday, 9AM-6PM EST</p>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection

