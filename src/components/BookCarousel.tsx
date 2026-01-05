'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import BookCard from './BookCard';
import { Book } from '@/lib/types';

interface BookCarouselProps {
  title: string;
  subtitle?: string;
  books: Book[];
  viewAllLink?: string;
  variant?: 'default' | 'featured';
}

export default function BookCarousel({
  title,
  subtitle,
  books,
  viewAllLink,
  variant = 'default',
}: BookCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            {subtitle && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full 
                         font-body font-medium text-sm mb-3"
              >
                {subtitle}
              </motion.span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-2xl md:text-3xl font-bold text-charcoal"
            >
              {title}
            </motion.h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Navigation Arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full border border-secondary-200 text-secondary-600 
                         hover:border-primary-400 hover:text-primary-500 hover:bg-primary-50 
                         transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full border border-secondary-200 text-secondary-600 
                         hover:border-primary-400 hover:text-primary-500 hover:bg-primary-50 
                         transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View All Link */}
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="flex items-center gap-1 text-primary-600 hover:text-primary-700 
                         font-body font-medium transition-colors"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative -mx-4 px-4">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {books.map((book, index) => (
              <div
                key={book.uid}
                className={`flex-shrink-0 snap-start ${
                  variant === 'featured' 
                    ? 'w-[280px] md:w-[300px]' 
                    : 'w-[180px] md:w-[200px]'
                }`}
              >
                <BookCard book={book} variant={variant} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

