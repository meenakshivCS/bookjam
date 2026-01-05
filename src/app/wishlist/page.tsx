'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-primary-400" />
        </div>
        <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
          Your Wishlist is Empty
        </h1>
        <p className="font-body text-secondary-600 mb-8">
          Save your favorite books to your wishlist and never lose track of what you want to read next.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 
                   text-white rounded-full font-body font-semibold transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </Link>
      </div>
    </div>
  );
}

