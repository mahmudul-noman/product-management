"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { loginUser } from "@/lib/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading, error } = useAppSelector((state) => state.auth)

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      setEmailError("Email is required")
      return false
    }
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailError) validateEmail(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) return

    const result = await dispatch(loginUser(email))
    if (loginUser.fulfilled.match(result)) {
      router.push("/products")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted px-4 py-8 animate-fade-in relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo and Header */}
        <div className="text-center space-y-2 animate-slide-down">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center shadow-2xl glow-primary transform hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-3xl">PM</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Product Manager
          </h1>
          <p className="text-muted-foreground text-lg">Manage your products efficiently</p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-2xl animate-slide-up backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-2 pb-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-t-lg">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to manage your products</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  disabled={loading}
                  className={`h-11 transition-all border-2 ${
                    emailError
                      ? "border-destructive focus:ring-destructive focus:ring-2"
                      : "border-border focus:ring-primary focus:ring-2"
                  }`}
                />
                {emailError && (
                  <p className="text-sm text-destructive font-medium animate-slide-down">✗ {emailError}</p>
                )}
              </div>

              {error && (
                <div className="p-4 bg-gradient-to-r from-destructive/10 to-destructive/5 border-2 border-destructive/30 rounded-lg animate-slide-down">
                  <p className="text-sm text-destructive font-medium">⚠ {error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 font-semibold text-base transition-all hover:shadow-xl glow-primary gradient-primary text-white border-0"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <p className="text-center text-xs text-muted-foreground">Use your job application email to sign in</p>
      </div>
    </div>
  )
}
