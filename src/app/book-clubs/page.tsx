'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Calendar, MessageCircle, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const bookClubs = [
  {
    name: 'Fiction Fanatics',
    members: 2847,
    description: 'For lovers of literary fiction, contemporary novels, and storytelling masterpieces.',
    currentBook: 'The Midnight Library',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    color: '#8B4513',
  },
  {
    name: 'Mystery & Thriller Club',
    members: 1923,
    description: 'Dive into suspenseful mysteries, edge-of-seat thrillers, and whodunits.',
    currentBook: 'The Silent Patient',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400',
    color: '#2D3748',
  },
  {
    name: 'Self-Help Society',
    members: 3156,
    description: 'Personal development, productivity, mindfulness, and becoming your best self.',
    currentBook: 'Atomic Habits',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    color: '#48BB78',
  },
  {
    name: 'Young Readers Circle',
    members: 1547,
    description: 'Parents and kids exploring the best children\'s literature together.',
    currentBook: 'The Very Hungry Caterpillar',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    color: '#F6AD55',
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Monthly Book Picks',
    description: 'Our curators select engaging books each month across all genres.',
  },
  {
    icon: MessageCircle,
    title: 'Discussion Forums',
    description: 'Share thoughts, theories, and connect with fellow readers online.',
  },
  {
    icon: Calendar,
    title: 'Virtual Meetups',
    description: 'Join live discussions with authors and fellow book club members.',
  },
  {
    icon: Star,
    title: 'Exclusive Discounts',
    description: 'Members get special pricing on monthly picks and related titles.',
  },
];

export default function BookClubsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Users className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            BookJam Book Clubs
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join a community of passionate readers. Discover new books, share perspectives, 
            and connect with fellow bibliophiles.
          </p>
          <button className="btn-primary bg-white text-primary-500 hover:bg-secondary-100">
            Join a Club - It's Free!
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal mb-2">{feature.title}</h3>
                <p className="font-body text-secondary-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Clubs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-4">
            Choose Your Club
          </h2>
          <p className="font-body text-secondary-600 text-center mb-12 max-w-2xl mx-auto">
            Join one or multiple clubs based on your reading interests. Each club meets monthly 
            to discuss the selected book.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bookClubs.map((club, index) => (
              <motion.div
                key={club.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div 
                  className="h-32 relative"
                  style={{ backgroundColor: club.color }}
                >
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-display text-2xl font-bold text-white text-center px-4">
                      {club.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-secondary-500 font-body text-sm mb-3">
                    <Users className="w-4 h-4" />
                    <span>{club.members.toLocaleString()} members</span>
                  </div>
                  <p className="font-body text-secondary-600 mb-4">
                    {club.description}
                  </p>
                  <div className="p-3 bg-secondary-50 rounded-lg mb-4">
                    <p className="font-body text-xs text-secondary-500 mb-1">Currently Reading:</p>
                    <p className="font-body font-medium text-charcoal">{club.currentBook}</p>
                  </div>
                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    Join Club
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
            Can't Find Your Genre?
          </h2>
          <p className="font-body text-secondary-600 mb-6 max-w-xl mx-auto">
            Start your own book club! Gather a group of friends or let others join your reading adventure.
          </p>
          <button className="btn-outline">
            Start a New Club
          </button>
        </div>
      </section>
    </div>
  );
}


