import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import BookCard from '@/components/BookCard';
import { getMockBestsellers } from '@/lib/mock-data';

export const metadata = {
  title: 'Best Sellers - BookJam',
  description: 'Discover the most popular books at BookJam. Shop our bestseller collection with great discounts.',
};

export default function BestsellersPage() {
  const books = getMockBestsellers();

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="relative py-16 md:py-24 bg-gradient-to-br from-primary-500 to-primary-600 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Best Sellers</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
              Best Sellers
            </h1>
          </div>
          <p className="font-body text-lg text-white/80 max-w-2xl">
            Our most popular books that readers can't put down. Discover what everyone's reading.
          </p>
        </div>
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="font-body text-secondary-600">
            <span className="font-semibold text-charcoal">{books.length}</span> bestselling books
          </p>
          <select className="px-4 py-2 bg-white border border-secondary-200 rounded-lg font-body text-charcoal focus:border-primary-400 outline-none">
            <option>Sort by: Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {books.map((book, index) => (
            <BookCard key={book.uid} book={book} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

