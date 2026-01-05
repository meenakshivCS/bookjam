'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { Author } from '@/lib/types';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = getTotalPrice();
  const shippingThreshold = 500;
  const freeShipping = totalPrice >= shippingThreshold;
  const remainingForFreeShipping = shippingThreshold - totalPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary-500" />
                <h2 className="font-display text-xl font-bold text-charcoal">Your Bag</h2>
                <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-secondary-500 hover:text-charcoal hover:bg-secondary-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className="px-4 py-3 bg-primary-50 border-b border-primary-100">
                {freeShipping ? (
                  <p className="font-body text-sm text-green-600 font-medium flex items-center gap-2">
                    🎉 You've unlocked free shipping!
                  </p>
                ) : (
                  <div>
                    <p className="font-body text-sm text-charcoal">
                      Add <span className="font-bold text-primary-600">{formatPrice(remainingForFreeShipping)}</span> more for free shipping
                    </p>
                    <div className="mt-2 h-2 bg-primary-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(totalPrice / shippingThreshold) * 100}%` }}
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-12 h-12 text-secondary-300" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                    Your bag is empty
                  </h3>
                  <p className="font-body text-secondary-500 mb-6">
                    Looks like you haven't added any books yet.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full 
                             font-body font-medium transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const author = Array.isArray(item.book.author)
                      ? item.book.author[0]
                      : item.book.author;
                    const authorName = (author as Author)?.name || 'Unknown Author';

                    return (
                      <motion.div
                        key={item.book.uid}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4 p-3 bg-white rounded-xl shadow-sm"
                      >
                        {/* Book Cover */}
                        <Link
                          href={`/book/${item.book.slug}`}
                          onClick={closeCart}
                          className="relative w-20 h-28 flex-shrink-0"
                        >
                          <Image
                            src={item.book.cover_image.url}
                            alt={item.book.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/book/${item.book.slug}`}
                            onClick={closeCart}
                            className="font-body font-semibold text-charcoal line-clamp-2 hover:text-primary-600 transition-colors"
                          >
                            {item.book.title}
                          </Link>
                          <p className="font-body text-sm text-secondary-500 mt-0.5">{authorName}</p>
                          <p className="font-body font-bold text-primary-600 mt-2">
                            {formatPrice(item.book.price)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.book.uid, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full 
                                         border border-secondary-200 text-secondary-600 
                                         hover:border-primary-400 hover:text-primary-500 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-body font-medium text-charcoal">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.book.uid, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full 
                                         border border-secondary-200 text-secondary-600 
                                         hover:border-primary-400 hover:text-primary-500 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.book.uid)}
                              className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 
                                       rounded-full transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary-100 p-4 bg-white">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-secondary-600">Subtotal</span>
                  <span className="font-body font-bold text-charcoal">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-secondary-600">Shipping</span>
                  <span className="font-body font-medium text-green-600">
                    {freeShipping ? 'FREE' : formatPrice(50)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-secondary-100">
                  <span className="font-display text-lg font-bold text-charcoal">Total</span>
                  <span className="font-display text-xl font-bold text-primary-600">
                    {formatPrice(totalPrice + (freeShipping ? 0 : 50))}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-4 bg-primary-500 
                           hover:bg-primary-600 text-white rounded-full font-body font-semibold 
                           transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="mt-3 w-full py-3 text-primary-600 hover:text-primary-700 font-body 
                           font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

