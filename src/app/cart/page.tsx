'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { useCurrencyStore } from '@/lib/currency-store';
import { Author } from '@/lib/types';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const { formatPrice, regionVariant, currency } = useCurrencyStore();

  const subtotalINR = getTotalPrice();
  const itemCount = getTotalItems();
  
  // Get free shipping threshold in INR (convert back from region's currency)
  const thresholdInINR = regionVariant.freeShippingThreshold / currency.exchangeRate;
  const shipping = subtotalINR >= thresholdInINR ? 0 : Math.round(49 * currency.exchangeRate * 100) / 100;
  const shippingINR = subtotalINR >= thresholdInINR ? 0 : 49;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingCart className="w-20 h-20 text-secondary-300 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
              Your Cart is Empty
            </h1>
            <p className="font-body text-secondary-600 mb-8">
              Looks like you haven't added any books yet. Start exploring our collection!
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Continue Shopping
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
      <section className="py-8 bg-white border-b border-secondary-200">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold text-charcoal">
            Shopping Cart ({itemCount} items)
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((cartItem) => {
              const { book, quantity } = cartItem;
              const author = Array.isArray(book.author) ? book.author[0] : book.author;
              const authorName = (author as Author)?.name || 'Unknown Author';

              return (
                <motion.div
                  key={book.uid}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-secondary-100 flex-shrink-0">
                      {book.cover_image ? (
                        <Image
                          src={book.cover_image.url}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-secondary-400">
                          <ShoppingCart className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <Link 
                        href={`/book/${book.slug}`}
                        className="font-display text-lg font-bold text-charcoal hover:text-primary-500 transition-colors"
                      >
                        {book.title}
                      </Link>
                      <p className="font-body text-secondary-500 text-sm mb-2">{authorName}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-display text-xl font-bold text-primary-500">{formatPrice(book.price)}</span>
                        {book.original_price && book.original_price > book.price && (
                          <span className="font-body text-sm text-secondary-400 line-through">
                            {formatPrice(book.original_price)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(book.uid, Math.max(1, quantity - 1))}
                            className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center hover:bg-secondary-200 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-charcoal" />
                          </button>
                          <span className="font-body font-medium text-charcoal w-8 text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(book.uid, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center hover:bg-secondary-200 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-charcoal" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(book.uid)}
                          className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 font-body text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="font-display text-lg font-bold text-charcoal">
                        {formatPrice(book.price * quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Continue Shopping */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-body font-medium"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-display text-xl font-bold text-charcoal mb-6">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="w-full pl-10 pr-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
                    />
                  </div>
                  <button className="btn-outline">Apply</button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-secondary-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(subtotalINR)}</span>
                </div>
                <div className="flex justify-between font-body text-secondary-600">
                  <span>Shipping</span>
                  <span className={shippingINR === 0 ? 'text-green-500' : ''}>
                    {shippingINR === 0 ? 'FREE' : formatPrice(shippingINR)}
                  </span>
                </div>
                {shippingINR === 0 && (
                  <p className="text-green-600 text-sm font-body">
                    ✓ You qualify for free shipping!
                  </p>
                )}
                {shippingINR > 0 && (
                  <p className="text-secondary-500 text-sm font-body">
                    Add {formatPrice(thresholdInINR - subtotalINR)} more for free shipping
                  </p>
                )}
                <div className="border-t border-secondary-200 pt-3 flex justify-between">
                  <span className="font-display font-bold text-charcoal">Total</span>
                  <span className="font-display text-xl font-bold text-primary-500">{formatPrice(subtotalINR + shippingINR)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-secondary-200">
                <div className="flex items-center justify-center gap-4 text-secondary-500">
                  <span className="text-xs font-body">🔒 Secure Checkout</span>
                  <span className="text-xs font-body">💳 Multiple Payment Options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
