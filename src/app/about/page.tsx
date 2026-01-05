'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Heart, Globe, Award, Truck } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { label: 'Books Available', value: '50,000+' },
  { label: 'Happy Customers', value: '100,000+' },
  { label: 'Years of Service', value: '15+' },
  { label: 'Cities Delivered', value: '500+' },
];

const values = [
  {
    icon: BookOpen,
    title: 'Passion for Books',
    description: 'We believe books have the power to transform lives and open new worlds.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Building a community of readers who share their love for literature.',
  },
  {
    icon: Heart,
    title: 'Customer Love',
    description: 'Every customer interaction is an opportunity to spread joy.',
  },
  {
    icon: Globe,
    title: 'Accessible Reading',
    description: 'Making books accessible to everyone, everywhere in India.',
  },
];

const team = [
  { name: 'Priya Sharma', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
  { name: 'Rahul Mehta', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
  { name: 'Ananya Patel', role: 'Chief Book Curator', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
  { name: 'Vikram Singh', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-500 to-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="font-body text-xl text-white/90">
              BookJam started with a simple dream: to make the joy of reading accessible to every Indian household. 
              Today, we're proud to be one of India's most loved online bookstores.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-secondary-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-charcoal mb-6">Our Mission</h2>
            <p className="font-body text-lg text-secondary-600 leading-relaxed">
              At BookJam, we're on a mission to ignite the love of reading across India. We curate the finest 
              collection of books across genres, from timeless classics to contemporary bestsellers, making 
              them available at your fingertips. Whether you're a passionate reader, a curious learner, or 
              looking for the perfect gift, BookJam is your destination.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">{value.title}</h3>
                <p className="font-body text-secondary-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal">{member.name}</h3>
                <p className="font-body text-secondary-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-12">Why Choose BookJam?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Award className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">Curated Selection</h3>
              <p className="font-body text-secondary-600">
                Every book is hand-picked by our expert curators to ensure quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Truck className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">Fast Delivery</h3>
              <p className="font-body text-secondary-600">
                Free shipping on orders above ₹499. Delivered to your doorstep.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Heart className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">Customer First</h3>
              <p className="font-body text-secondary-600">
                Easy returns, responsive support, and a satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

