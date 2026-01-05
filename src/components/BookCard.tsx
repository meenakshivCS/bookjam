'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { Book, Author } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';
import { useWishlistStore } from '@/lib/wishlist-store';

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'compact' | 'featured';
  index?: number;
}

export default function BookCard({ book, variant = 'default', index = 0 }: BookCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(book.uid);
  const author = Array.isArray(book.author) ? book.author[0] : book.author;
  const authorName = (author as Author)?.name || 'Unknown Author';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(book);
    openCart();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(book);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Link href={`/book/${book.slug}`} className="group block">
          <div className="flex gap-4 p-3 rounded-xl hover:bg-primary-50/50 transition-colors">
            <div className="relative w-16 h-24 flex-shrink-0">
              <Image
                src={book.cover_image.url}
                alt={book.title}
                fill
                className="object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-semibold text-charcoal truncate group-hover:text-primary-600">
                {book.title}
              </h4>
              <p className="font-body text-sm text-secondary-500 truncate">{authorName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-body font-bold text-primary-600">{formatPrice(book.price)}</span>
                {book.original_price && (
                  <span className="font-body text-sm text-secondary-400 line-through">
                    {formatPrice(book.original_price)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="group"
      >
        <Link href={`/book/${book.slug}`}>
          <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              {book.is_bestseller && (
                <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
                  BESTSELLER
                </span>
              )}
              {book.is_new_arrival && (
                <span className="px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full">
                  NEW
                </span>
              )}
              {book.discount_percentage && book.discount_percentage > 0 && (
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                  {book.discount_percentage}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-all
                ${inWishlist 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 hover:bg-white text-secondary-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
                }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Cover Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-secondary-100 to-secondary-200">
              <Image
                src={book.cover_image.url}
                alt={book.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-display text-lg font-bold text-charcoal line-clamp-2 group-hover:text-primary-600 transition-colors">
                {book.title}
              </h3>
              <p className="font-body text-sm text-secondary-500 mt-1">{authorName}</p>

              {/* Rating */}
              {book.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-body text-sm font-medium text-charcoal">
                      {book.rating.toFixed(1)}
                    </span>
                  </div>
                  {book.review_count && (
                    <span className="font-body text-xs text-secondary-400">
                      ({book.review_count.toLocaleString()} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price & CTA */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="font-body text-xl font-bold text-charcoal">
                    {formatPrice(book.price)}
                  </span>
                  {book.original_price && (
                    <span className="font-body text-sm text-secondary-400 line-through ml-2">
                      {formatPrice(book.original_price)}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 
                           text-white rounded-full font-body font-medium text-sm transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/book/${book.slug}`}>
        <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {book.discount_percentage && book.discount_percentage > 0 && (
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                {book.discount_percentage}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow transition-all
              ${inWishlist 
                ? 'bg-red-500 text-white opacity-100' 
                : 'bg-white/90 hover:bg-white text-secondary-400 hover:text-red-500 opacity-0 group-hover:opacity-100'
              }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Cover Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-secondary-100 to-secondary-200">
            <Image
              src={book.cover_image.url}
              alt={book.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Quick Add Button */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-2 bg-white 
                         hover:bg-primary-500 hover:text-white rounded-lg font-body font-medium 
                         text-sm text-charcoal transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <h4 className="font-body font-semibold text-charcoal line-clamp-2 text-sm group-hover:text-primary-600 transition-colors">
              {book.title}
            </h4>
            <p className="font-body text-xs text-secondary-500 mt-1 truncate">{authorName}</p>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-body text-xs font-medium text-charcoal">{book.rating.toFixed(1)}</span>
              </div>
            )}

            {/* Price */}
            <div className="mt-2">
              <span className="font-body font-bold text-charcoal">{formatPrice(book.price)}</span>
              {book.original_price && (
                <span className="font-body text-xs text-secondary-400 line-through ml-2">
                  {formatPrice(book.original_price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
