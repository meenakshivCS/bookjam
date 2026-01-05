'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import BookCard from '@/components/BookCard';
import { mockCategories, getMockBooksByCategory, mockBooks } from '@/lib/mock-data';
import { Book } from '@/lib/types';

interface CategoryPageProps {
  params: { slug: string };
}

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'newest' | 'rating';
type PriceFilter = 'all' | 'under-200' | '200-500' | '500-1000' | 'above-1000';

export default function CategoryPage({ params }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');

  const category = mockCategories.find((c) => c.slug === params.slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
            Category Not Found
          </h1>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Get books for this category, or show all books if no matches
  let baseBooks = getMockBooksByCategory(params.slug);
  if (baseBooks.length === 0) {
    baseBooks = mockBooks.slice(0, 8);
  }

  // Apply filters and sorting
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...baseBooks];

    // Apply price filter
    switch (priceFilter) {
      case 'under-200':
        result = result.filter((book) => book.price < 200);
        break;
      case '200-500':
        result = result.filter((book) => book.price >= 200 && book.price <= 500);
        break;
      case '500-1000':
        result = result.filter((book) => book.price > 500 && book.price <= 1000);
        break;
      case 'above-1000':
        result = result.filter((book) => book.price > 1000);
        break;
    }

    // Apply sorting
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
      case 'newest':
        result.sort((a, b) => (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => (b.review_count || 0) - (a.review_count || 0));
        break;
    }

    return result;
  }, [baseBooks, sortBy, priceFilter]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Category Header */}
      <div
        className="relative py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}30 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body text-secondary-500 mb-6">
            <Link href="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: category.color }}>{category.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1
                className="font-display text-4xl md:text-5xl font-bold mb-3"
                style={{ color: category.color }}
              >
                {category.name}
              </h1>
              {category.description && (
                <p className="font-body text-lg text-secondary-600 max-w-2xl">
                  {category.description}
                </p>
              )}
            </div>
            <p className="font-body text-secondary-500">
              <span className="font-semibold text-charcoal">{filteredAndSortedBooks.length}</span> books found
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20 translate-y-1/2"
          style={{ backgroundColor: category.color }}
        />
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Sort/Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-secondary-500" />
            <span className="font-body font-medium text-charcoal">Filters:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="font-body text-sm text-secondary-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg font-body text-charcoal focus:border-primary-400 outline-none cursor-pointer"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="font-body text-sm text-secondary-600">Price:</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
                className="px-4 py-2 bg-secondary-50 border border-secondary-200 rounded-lg font-body text-charcoal focus:border-primary-400 outline-none cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="under-200">Under ₹200</option>
                <option value="200-500">₹200 - ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="above-1000">Above ₹1000</option>
              </select>
            </div>

            {(sortBy !== 'popularity' || priceFilter !== 'all') && (
              <button
                onClick={() => {
                  setSortBy('popularity');
                  setPriceFilter('all');
                }}
                className="px-4 py-2 text-primary-600 hover:text-primary-700 font-body text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Books Grid */}
        {filteredAndSortedBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredAndSortedBooks.map((book, index) => (
              <BookCard key={book.uid} book={book} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-body text-secondary-500 text-lg mb-4">
              No books match your filters.
            </p>
            <button
              onClick={() => {
                setSortBy('popularity');
                setPriceFilter('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
