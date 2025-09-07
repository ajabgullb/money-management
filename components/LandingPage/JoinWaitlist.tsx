"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import auth from '@/lib/auth'

const JoinWaitlist = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setError(null)

    const isValid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email)
    if (!isValid) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setLoading(true)
      await auth.waitlistSignup(email)
      setSubmitted(true)
      setEmail('')
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-16">
      <div className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
            Be first to know
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Join the waitlist
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Get an invite when our beta opens. No spam, unsubscribe anytime.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? 'waitlist-email-error' : undefined}
                className="h-11"
              />
              <p
                id="waitlist-email-error"
                aria-live="polite"
                className={`mt-1 h-5 text-sm ${error ? 'text-destructive visible' : 'invisible'} sm:absolute sm:left-0 sm:top-full sm:mt-1 sm:whitespace-nowrap sm:pointer-events-none`}
              >
                {error ?? 'placeholder'}
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="sm:w-auto cursor-pointer bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Joining...
                </span>
              ) : (
                'Join waitlist'
              )}
            </Button>
          </form>
        ) : (
          <div className="mt-8 rounded-xl border bg-green-50 p-4 text-center text-green-800">
            <p className="text-sm sm:text-base">Thanks for joining!  We'll email you when the beta opens.</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-gray-500">
          <span>✅ No spam</span>
          <span>•</span>
          <span>🔒 Privacy-first</span>
          <span>•</span>
          <span>🚀 Early access perks</span>
        </div>
      </div>
    </section>
  )
}

export default JoinWaitlist

