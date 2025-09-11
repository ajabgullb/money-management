'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Users, Zap, Shield, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PricingPlan {
  name: string
  description: string
  price: number | 'Free'
  period?: string
  features: string[]
  buttonText: string
  buttonVariant: 'default' | 'outline'
  popular?: boolean
  icon: React.ElementType
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    description: 'Perfect for personal budgeting and getting started with envelope budgeting.',
    price: 'Free',
    features: [
      'Up to 5 custom envelopes',
      'Basic spending tracking',
      'Monthly budget reports',
      'Mobile app access',
      'Email support',
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline',
    icon: Target,
  },
  {
    name: 'Pro',
    description: 'Advanced features for serious budgeters who want complete financial control.',
    price: 99,
    period: '/month',
    features: [
      'Unlimited custom envelopes',
      'Real-time spending alerts',
      'Advanced analytics & insights',
      'Goal setting & tracking',
      'Bank account integration',
      'Priority email support',
      'Export data & reports',
    ],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'default',
    popular: true,
    icon: Zap,
  },
  {
    name: 'Business',
    description: 'Comprehensive solution for small businesses and teams managing multiple budgets.',
    price: 199,
    period: '/month',
    features: [
      'Everything in Pro',
      'Team collaboration (up to 10 users)',
      'Multiple business accounts',
      'Advanced reporting dashboard',
      'API access & integrations',
      'Dedicated account manager',
      'Phone & chat support',
      'Custom envelope templates',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'default',
    icon: Users,
  },
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.25, 0, 1] as const,
    },
  },
}

const PricingSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            <Star className="w-4 h-4 mr-1" />
            Pricing Plans
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your journey to financial freedom with our flexible pricing options. 
            From personal budgeting to business management, we've got you covered.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <Card 
                  className={`relative h-full ${
                    plan.popular 
                      ? 'border-2 border-green-500 shadow-xl scale-105' 
                      : 'border border-gray-200 shadow-lg hover:shadow-xl'
                  } transition-all duration-300 bg-white/80 backdrop-blur-sm`}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    >
                      <Badge className="bg-green-600 hover:bg-green-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      plan.popular ? 'bg-green-600' : 'bg-green-100'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        plan.popular ? 'text-white' : 'text-green-600'
                      }`} />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <div className="text-center mb-8">
                      {plan.price === 'Free' ? (
                        <div className="text-4xl font-bold text-green-600">
                          Free
                        </div>
                      ) : (
                        <div className="flex items-baseline justify-center">
                          <span className="text-2xl font-semibold text-green-600">Rs. </span>
                          <span className="text-4xl font-bold text-green-600">{plan.price}</span>
                          <span className="text-gray-600 ml-1">{plan.period}</span>
                        </div>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * featureIndex }}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="ml-3 text-gray-700 leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={plan.buttonVariant}
                        size="lg"
                        className={`w-full cursor-pointer ${
                          plan.buttonVariant === 'default'
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'border-green-600 text-green-600 hover:bg-green-50'
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Enterprise Solutions
                </h3>
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Need a custom solution for your organization? We offer tailored enterprise 
                plans with advanced security, unlimited users, and dedicated support.
              </p>
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer">
                Contact Enterprise Sales
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>All plans include a 30-day money-back guarantee • No setup fees • Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection