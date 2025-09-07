"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import auth from '@/lib/auth'
import supabase from '@/lib/supabaseClient'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    try {
      setLoading(true)
      const data = await auth.signUpNewUser(email, password)
      // Supabase may require email verification; if no immediate session, inform the user
      if ((data as any)?.session) {
        router.push('/dashboard')
        return
      }
      setMessage('Sign-up successful. Please check your email to verify your account.')
    } catch (err: any) {
      setError(err?.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setError(null)
      setMessage(null)
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined,
          skipBrowserRedirect: true,
        },
      })
      if (error) throw error
      if (data?.url) {
        window.location.href = data.url
        return
      }
      setError('Unable to start Google sign-in. Please try again later.')
    } catch (err: any) {
      setError(err?.message || 'Google sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center tracking-tight mb-1">Create account</h1>
        <p className="text-sm text-center text-muted-foreground mb-6">Join us and start managing your money smarter.</p>

        {error && (
          <div className="mb-4 text-sm text-destructive" role="alert">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 text-sm text-green-600 dark:text-green-500" role="status">
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="size-4" aria-hidden>
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.602 32.491 29.197 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.816C14.655 16.108 18.961 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.869 6.053 29.702 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
            <path fill="#4CAF50" d="M24 44c5.138 0 9.735-1.97 13.246-5.181l-6.104-5.159C29.119 35.808 26.671 36.8 24 36c-5.179 0-9.594-3.525-11.285-8.297l-6.561 5.047C9.463 39.556 16.199 44 24 44z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.018 2.491-2.808 4.59-5.157 6.003l.004-.003 6.104 5.159C34.961 40.126 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
          </svg>
          Continue with Google
        </Button>
      </div>
    </div>
  )
}

export default Register
