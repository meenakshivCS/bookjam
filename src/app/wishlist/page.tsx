'use client';

import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlistStore } from '@/lib/wishlist-store';
import { useCartStore } from '@/lib/cart-store';
import { Author } from '@/lib/types';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (item: typeof items[0]) => {
    addItem(item);
    removeItem(item.uid);
    openCart();
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addItem(item);
    });
    clearWishlist();
    openCart();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <Heart className="w-20 h-20 text-secondary-300 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="font-body text-secondary-600 mb-8">
              Start adding books you love! Click the heart icon on any book to save it to your wishlist.
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Explore Books
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-red-400 to-pink-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-white fill-white" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
              My Wishlist
            </h1>
          </div>
          <p className="font-body text-white/80">
            {items.length} book{items.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm">
          <p className="font-body text-secondary-600">
            Total: <span className="font-bold text-charcoal">
              {formatPrice(items.reduce((sum, item) => sum + item.price, 0))}
            </span>
          </p>
          <div className="flex gap-3">
            <button 
              onClick={handleAddAllToCart}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add All to Cart
            </button>
            <button 
              onClick={clearWishlist}
              className="btn-outline text-red-500 border-red-200 hover:bg-red-50"
            >
              Clear Wishlist
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const author = Array.isArray(item.author) ? item.author[0] : item.author;
            const authorName = (author as Author)?.name || 'Unknown Author';

            return (
              <motion.div
                key={item.uid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4 p-4">
                  {/* Cover Image */}
                  <Link href={`/book/${item.slug}`} className="flex-shrink-0">
                    <div className="relative w-24 h-36 rounded-lg overflow-hidden bg-secondary-100">
                      {item.cover_image ? (
                        <Image
                          src={item.cover_image.url}
                          alt={item.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary-400">
                          <Heart className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/book/${item.slug}`}
                      className="font-display font-bold text-charcoal hover:text-primary-500 transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <p className="font-body text-sm text-secondary-500 mt-1">{authorName}</p>
                    
                    <div className="mt-2">
                      <span className="font-display text-lg font-bold text-primary-500">
                        {formatPrice(item.price)}
                      </span>
                      {item.original_price && item.original_price > item.price && (
                        <span className="font-body text-sm text-secondary-400 line-through ml-2">
                          {formatPrice(item.original_price)}
                        </span>
                      )}
                    </div>

                    <p className="font-body text-xs text-secondary-400 mt-2">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex border-t border-secondary-100">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-primary-500 hover:bg-primary-50 transition-colors font-body font-medium"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <div className="w-px bg-secondary-100" />
                  <button
                    onClick={() => removeItem(item.uid)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-red-500 hover:bg-red-50 transition-colors font-body font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-body font-medium"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
