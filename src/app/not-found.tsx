import Link from 'next/link';
import { BookOpen, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 bg-primary-100 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-primary-200 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-20 h-20 text-primary-500" />
          </div>
        </div>

        <h1 className="font-display text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
          Page Not Found
        </h2>
        <p className="font-body text-secondary-600 mb-8">
          Oops! The page you're looking for seems to have wandered off into another story. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 
                     bg-primary-500 hover:bg-primary-600 text-white rounded-full 
                     font-body font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 
                     border-2 border-primary-500 text-primary-600 hover:bg-primary-50 
                     rounded-full font-body font-semibold transition-colors"
          >
            <Search className="w-5 h-5" />
            Search Books
          </Link>
        </div>
      </div>
    </div>
  );
}


