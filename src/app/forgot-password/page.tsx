'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary-500" />
                </div>
                <h1 className="font-display text-2xl font-bold text-charcoal mb-2">
                  Forgot Password?
                </h1>
                <p className="font-body text-secondary-600">
                  No worries! Enter your email and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-body font-medium text-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Reset Link
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link 
                  href="/account"
                  className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-body"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-charcoal mb-2">
                Check Your Email
              </h2>
              <p className="font-body text-secondary-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions.
              </p>
              <p className="font-body text-sm text-secondary-500 mb-6">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-primary-500 hover:underline"
                >
                  try again
                </button>
              </p>
              <Link 
                href="/account"
                className="btn-primary inline-block"
              >
                Back to Login
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}


