'use client';

import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary-500" />
            </div>
            <h1 className="font-display text-2xl font-bold text-charcoal">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="font-body text-secondary-500 mt-2">
              {isLogin ? 'Sign in to your account' : 'Join BookJam today'}
            </p>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-secondary-50 rounded-xl border border-secondary-200 
                             focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none 
                             font-body transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-body text-sm font-medium text-charcoal mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-secondary-50 rounded-xl border border-secondary-200 
                           focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none 
                           font-body transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-secondary-50 rounded-xl border border-secondary-200 
                           focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none 
                           font-body transition-all"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-secondary-300 text-primary-500" />
                  <span className="font-body text-sm text-secondary-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="font-body text-sm text-primary-600 hover:text-primary-700">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-primary-500 hover:bg-primary-600 
                       text-white rounded-xl font-body font-semibold transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-secondary-500">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 font-body text-sm text-secondary-400">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}


