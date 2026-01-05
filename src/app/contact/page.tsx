'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Get in Touch
          </motion.h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-display text-2xl font-bold text-charcoal mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Our Office</h3>
                  <p className="font-body text-secondary-600">
                    BookJam Headquarters<br />
                    42 Book Street, Indiranagar<br />
                    Bangalore, Karnataka 560038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Phone</h3>
                  <p className="font-body text-secondary-600">
                    +91 80 1234 5678<br />
                    +91 98765 43210 (WhatsApp)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Email</h3>
                  <p className="font-body text-secondary-600">
                    hello@bookjam.in<br />
                    support@bookjam.in
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-charcoal mb-1">Business Hours</h3>
                  <p className="font-body text-secondary-600">
                    Monday - Saturday: 9:00 AM - 8:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className="mt-12 p-6 bg-primary-50 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-primary-500" />
                <h3 className="font-display font-bold text-charcoal">Need Quick Help?</h3>
              </div>
              <p className="font-body text-secondary-600 mb-4">
                Check our FAQ section for instant answers to common questions.
              </p>
              <a href="/help" className="btn-primary inline-block">
                Visit Help Center
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Send us a Message</h2>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal mb-2">Message Sent!</h3>
                  <p className="font-body text-secondary-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-body font-medium text-charcoal mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-body font-medium text-charcoal mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-body font-medium text-charcoal mb-2">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-body font-medium text-charcoal mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

