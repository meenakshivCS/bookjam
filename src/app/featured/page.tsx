'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, SlidersHorizontal, Sparkles } from 'lucide-react';
import BookCard from '@/components/BookCard';
import { getMockFeaturedBooks } from '@/lib/mock-data';

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating';

export default function FeaturedPage() {
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const books = getMockFeaturedBooks();

  const sortedBooks = useMemo(() => {
    const result = [...books];

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recommended':
      default:
        // Keep original order (curated)
        break;
    }

    return result;
  }, [books, sortBy]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-amber-500 to-orange-500 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
              <Star className="w-6 h-6 text-yellow-200" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Editor's Picks
            </h1>
            <p className="font-body text-xl text-white/90">
              Hand-picked by our expert curators. These are the books we can't stop 
              recommending to our friends and family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-secondary-500" />
            <p className="font-body text-secondary-600">
              <span className="font-semibold text-charcoal">{sortedBooks.length}</span> featured picks
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="font-body text-sm text-secondary-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg font-body text-charcoal focus:border-primary-400 outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {sortedBooks.map((book, index) => (
            <BookCard key={book.uid} book={book} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

