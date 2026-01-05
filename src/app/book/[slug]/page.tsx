'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react';
import { getMockBookBySlug, mockBooks } from '@/lib/mock-data';
import { useCartStore } from '@/lib/cart-store';
import BookCard from '@/components/BookCard';
import { Author, Category } from '@/lib/types';

interface BookPageProps {
  params: { slug: string };
}

export default function BookPage({ params }: BookPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const { addItem, openCart } = useCartStore();

  const book = getMockBookBySlug(params.slug);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-4">Book Not Found</h1>
          <Link href="/" className="btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const author = Array.isArray(book.author) ? book.author[0] : book.author;
  const authorName = (author as Author)?.name || 'Unknown Author';
  const category = Array.isArray(book.category) ? book.category[0] : book.category;
  const categoryName = (category as Category)?.name || 'General';
  const categorySlug = (category as Category)?.slug || 'general';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(book);
    }
    openCart();
  };

  // Get related books
  const relatedBooks = mockBooks
    .filter((b) => b.uid !== book.uid)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-secondary-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm font-body text-secondary-500">
            <Link href="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link 
              href={`/category/${categorySlug}`} 
              className="hover:text-primary-500 transition-colors"
            >
              {categoryName}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-charcoal truncate max-w-[200px]">{book.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {book.is_bestseller && (
                    <span className="px-3 py-1 bg-primary-500 text-white text-sm font-bold rounded-full">
                      BESTSELLER
                    </span>
                  )}
                  {book.is_new_arrival && (
                    <span className="px-3 py-1 bg-accent-500 text-white text-sm font-bold rounded-full">
                      NEW
                    </span>
                  )}
                  {book.discount_percentage && book.discount_percentage > 0 && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                      {book.discount_percentage}% OFF
                    </span>
                  )}
                </div>

                <Image
                  src={book.cover_image.url}
                  alt={book.title}
                  fill
                  priority
                  className="object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Title & Author */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
              {book.title}
            </h1>
            <p className="font-body text-lg text-secondary-600 mb-4">
              by <span className="text-primary-600 font-medium">{authorName}</span>
            </p>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(book.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-secondary-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-lg font-semibold text-charcoal">
                  {book.rating.toFixed(1)}
                </span>
                {book.review_count && (
                  <span className="font-body text-secondary-500">
                    ({book.review_count.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-primary-600">
                {formatPrice(book.price)}
              </span>
              {book.original_price && (
                <>
                  <span className="font-body text-xl text-secondary-400 line-through">
                    {formatPrice(book.original_price)}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-sm font-bold rounded">
                    Save {formatPrice(book.original_price - book.price)}
                  </span>
                </>
              )}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm font-body text-secondary-600">
              {book.format && (
                <span className="px-3 py-1 bg-secondary-100 rounded-full capitalize">
                  {book.format}
                </span>
              )}
              {book.pages && (
                <span className="px-3 py-1 bg-secondary-100 rounded-full">
                  {book.pages} pages
                </span>
              )}
              {book.language && (
                <span className="px-3 py-1 bg-secondary-100 rounded-full">
                  {book.language}
                </span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <span className="font-body text-secondary-600">Qty:</span>
                <div className="flex items-center border border-secondary-200 rounded-full">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-secondary-600 hover:text-primary-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-body font-semibold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-secondary-600 hover:text-primary-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary-500 
                         hover:bg-primary-600 text-white rounded-full font-body font-semibold 
                         text-lg transition-all hover:shadow-lg hover:shadow-primary-500/30"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Bag
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4 mb-8">
              <button className="flex items-center gap-2 px-6 py-3 border border-secondary-200 
                               rounded-full font-body text-secondary-600 hover:border-primary-400 
                               hover:text-primary-500 transition-all">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-secondary-200 
                               rounded-full font-body text-secondary-600 hover:border-primary-400 
                               hover:text-primary-500 transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-xl p-6 mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-semibold text-charcoal">Free Delivery</p>
                  <p className="font-body text-sm text-secondary-500">
                    On orders over ₹500. Estimated delivery: 3-5 business days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-semibold text-charcoal">Secure Payment</p>
                  <p className="font-body text-sm text-secondary-500">
                    Multiple payment options available
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-semibold text-charcoal">Easy Returns</p>
                  <p className="font-body text-sm text-secondary-500">
                    7-day return policy for undamaged books
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-secondary-200 mb-6">
              <div className="flex gap-6">
                {(['description', 'details', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-body font-semibold capitalize transition-colors relative ${
                      activeTab === tab
                        ? 'text-primary-600'
                        : 'text-secondary-500 hover:text-charcoal'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-body text-secondary-600 leading-relaxed">
                    {book.description}
                  </p>
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { label: 'ISBN', value: book.isbn },
                    { label: 'Publisher', value: book.publisher },
                    { label: 'Pages', value: book.pages },
                    { label: 'Language', value: book.language },
                    { label: 'Format', value: book.format },
                    { label: 'Category', value: categoryName },
                  ].map((detail) => (
                    detail.value && (
                      <div key={detail.label} className="py-2">
                        <p className="font-body text-sm text-secondary-500">{detail.label}</p>
                        <p className="font-body font-medium text-charcoal capitalize">
                          {detail.value}
                        </p>
                      </div>
                    )
                  ))}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <p className="font-body text-secondary-500">
                    Reviews coming soon! Be the first to review this book.
                  </p>
                  <button className="mt-4 btn-secondary">Write a Review</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Books */}
      <div className="container mx-auto px-4 py-12 border-t border-secondary-100">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {relatedBooks.map((relatedBook, index) => (
            <BookCard key={relatedBook.uid} book={relatedBook} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

