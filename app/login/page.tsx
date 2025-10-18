"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser } from "@/lib/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, LogIn, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    const result = await dispatch(loginUser(email));
    if (loginUser.fulfilled.match(result)) {
      router.push("/products");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFF1F3] px-4 py-8 animate-fade-in relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#A44A3F]/10 to-[#4E6E5D]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#AD8A64]/10 to-[#4E6E5D]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#AD8A64]/5 to-[#A44A3F]/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center space-y-4 animate-slide-down">
          <div className="flex justify-center mb-2">
            <div className="w-24 h-24 bg-gradient-to-br from-[#A44A3F] to-[#AD8A64] rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500">
              <Package className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-[#0D1821]">
              Product Manager
            </h1>
            <p className="text-[#4E6E5D] text-lg font-medium">
              Manage your products with elegance
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border border-[#AD8A64]/30 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
          <CardHeader className="space-y-3 pb-6 bg-gradient-to-r from-[#A44A3F]/5 via-[#4E6E5D]/5 to-[#AD8A64]/5 rounded-t-2xl border-b border-[#AD8A64]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4E6E5D] to-[#AD8A64] rounded-xl flex items-center justify-center">
                <LogIn className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-[#0D1821]">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-[#4E6E5D] font-medium">
                  Sign in to manage your products
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#0D1821] flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#A44A3F]" />
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
                  className={`h-12 transition-all duration-300 border-2 rounded-xl text-[#0D1821] placeholder-[#4E6E5D]/60 ${
                    emailError
                      ? "border-[#A44A3F] focus:border-[#A44A3F] focus:ring-2 focus:ring-[#A44A3F]/20"
                      : "border-[#AD8A64]/30 focus:border-[#4E6E5D] focus:ring-2 focus:ring-[#4E6E5D]/20"
                  }`}
                />
                {emailError && (
                  <p className="text-sm text-[#A44A3F] font-medium animate-slide-down flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-gradient-to-r from-[#A44A3F]/10 to-[#A44A3F]/5 border-2 border-[#A44A3F]/30 rounded-xl animate-slide-down">
                  <p className="text-sm text-[#A44A3F] font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 font-semibold text-base transition-all duration-300 rounded-xl bg-[#4E6E5D] hover:bg-[#4E6E5D]/90 text-white border-0 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-sm text-[#4E6E5D] font-medium bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-[#AD8A64]/20">
            Use your job application email to sign in
          </p>
        </div>
      </div>
    </div>
  );
}
