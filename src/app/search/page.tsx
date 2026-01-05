'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import BookCard from '@/components/BookCard';
import { mockBooks } from '@/lib/mock-data';
import { Book } from '@/lib/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate search - in production, this would call the Contentstack API
    const searchResults = mockBooks.filter((book) => {
      const searchLower = query.toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(searchLower);
      const author = Array.isArray(book.author) ? book.author[0] : book.author;
      const authorMatch = author?.name?.toLowerCase().includes(searchLower) || false;
      const descMatch = book.description?.toLowerCase().includes(searchLower) || false;
      return titleMatch || authorMatch || descMatch;
    });

    // Simulate network delay
    setTimeout(() => {
      setResults(searchResults);
      setIsLoading(false);
    }, 300);
  }, [query]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-secondary-100">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body text-secondary-500 mb-6">
            <Link href="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-charcoal">Search</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-primary-500" />
            <h1 className="font-display text-2xl md:text-3xl font-bold text-charcoal">
              Search Results
            </h1>
          </div>
          <p className="font-body text-secondary-600">
            {query ? (
              <>
                Showing results for "<span className="font-semibold text-charcoal">{query}</span>"
              </>
            ) : (
              'Enter a search term to find books'
            )}
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="font-body text-secondary-600">
                <span className="font-semibold text-charcoal">{results.length}</span> books found
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-secondary-200 rounded-lg font-body text-secondary-600 hover:border-primary-400 transition-colors">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <select className="px-4 py-2 bg-white border border-secondary-200 rounded-lg font-body text-charcoal focus:border-primary-400 outline-none">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {results.map((book, index) => (
                <BookCard key={book.uid} book={book} index={index} />
              ))}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-secondary-300" />
            </div>
            <h2 className="font-display text-2xl font-bold text-charcoal mb-3">
              No Results Found
            </h2>
            <p className="font-body text-secondary-500 mb-6 max-w-md mx-auto">
              We couldn't find any books matching "{query}". Try different keywords or browse our categories.
            </p>
            <Link href="/" className="btn-primary">
              Browse All Books
            </Link>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-primary-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-charcoal mb-3">
              Start Your Search
            </h2>
            <p className="font-body text-secondary-500 mb-6">
              Use the search bar above to find your next great read.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}

