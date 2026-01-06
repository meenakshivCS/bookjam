'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { useCurrencyStore } from '@/lib/currency-store';
import { Author } from '@/lib/types';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { formatPrice, regionVariant, currency } = useCurrencyStore();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const totalPrice = getTotalPrice();
  // Calculate free shipping threshold based on region
  const thresholdInINR = regionVariant.freeShippingThreshold / currency.exchangeRate;
  const shippingFee = totalPrice >= thresholdInINR ? 0 : 50;
  const finalTotal = totalPrice + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    clearCart();
  };

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
            Your cart is empty
          </h1>
          <p className="font-body text-secondary-500 mb-6">
            Add some books to your cart before checking out.
          </p>
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
            Order Placed Successfully!
          </h1>
          <p className="font-body text-secondary-600 mb-2">
            Thank you for your order. We've sent a confirmation email to{' '}
            <span className="font-semibold">{formData.email || 'your email'}</span>.
          </p>
          <p className="font-body text-secondary-500 mb-8">
            Your books will be delivered within 3-5 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="px-6 py-3 border-2 border-primary-500 text-primary-600 rounded-full font-body font-semibold hover:bg-primary-50 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-secondary-100">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm font-body text-secondary-500">
            <Link href="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/cart" className="hover:text-primary-500 transition-colors">
              Cart
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-charcoal">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-body font-semibold ${
                step === 'details'
                  ? 'bg-primary-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {step === 'details' ? '1' : <Check className="w-4 h-4" />}
            </div>
            <span className="font-body font-medium text-charcoal">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-secondary-200" />
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-body font-semibold ${
                step === 'payment'
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-200 text-secondary-500'
              }`}
            >
              2
            </div>
            <span
              className={`font-body font-medium ${
                step === 'payment' ? 'text-charcoal' : 'text-secondary-400'
              }`}
            >
              Payment
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'details' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-md p-6 md:p-8"
              >
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Shipping Details
                </h2>

                <form onSubmit={handleSubmitDetails} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-charcoal mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="123 Main Street, Apartment 4B"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="input"
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary py-4">
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-md p-6 md:p-8"
              >
                <button
                  onClick={() => setStep('details')}
                  className="flex items-center gap-2 text-secondary-500 hover:text-primary-500 font-body mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Details
                </button>

                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4 mb-8">
                  {[
                    { id: 'card', icon: CreditCard, label: 'Credit / Debit Card' },
                    { id: 'upi', icon: Smartphone, label: 'UPI' },
                    { id: 'netbanking', icon: Building2, label: 'Net Banking' },
                    { id: 'wallet', icon: Wallet, label: 'Wallet' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-secondary-200 hover:border-primary-300'
                      }`}
                    >
                      <method.icon
                        className={`w-6 h-6 ${
                          paymentMethod === method.id
                            ? 'text-primary-500'
                            : 'text-secondary-400'
                        }`}
                      />
                      <span
                        className={`font-body font-medium ${
                          paymentMethod === method.id
                            ? 'text-primary-600'
                            : 'text-charcoal'
                        }`}
                      >
                        {method.label}
                      </span>
                      {paymentMethod === method.id && (
                        <div className="ml-auto w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block font-body text-sm font-medium text-charcoal mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-sm font-medium text-charcoal mb-2">
                          Expiry Date
                        </label>
                        <input type="text" className="input" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-charcoal mb-2">
                          CVV
                        </label>
                        <input type="text" className="input" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="mb-8">
                    <label className="block font-body text-sm font-medium text-charcoal mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="yourname@upi"
                    />
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay ${formatPrice(finalTotal)}`
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-secondary-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-body text-sm">
                    Secured by 256-bit SSL encryption
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="font-display text-xl font-bold text-charcoal mb-4">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => {
                  const author = Array.isArray(item.book.author)
                    ? item.book.author[0]
                    : item.book.author;
                  const authorName = (author as Author)?.name || 'Unknown';

                  return (
                    <div key={item.book.uid} className="flex gap-3">
                      <div className="relative w-16 h-20 flex-shrink-0">
                        {item.book.cover_image?.url ? (
                          <Image
                            src={item.book.cover_image.url}
                            alt={item.book.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary-100 rounded-lg flex items-center justify-center">
                            <span className="text-secondary-400 text-xs">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body font-medium text-charcoal text-sm line-clamp-2">
                          {item.book.title}
                        </p>
                        <p className="font-body text-xs text-secondary-500">
                          {authorName}
                        </p>
                        <p className="font-body text-sm text-charcoal mt-1">
                          {formatPrice(item.book.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-secondary-100 pt-4 space-y-2">
                <div className="flex justify-between font-body text-secondary-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-body text-secondary-600">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                    {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between font-display text-lg font-bold text-charcoal pt-2 border-t border-secondary-100">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 text-green-700">
                  <Truck className="w-5 h-5" />
                  <span className="font-body text-sm font-medium">
                    {shippingFee === 0
                      ? 'You qualify for free shipping!'
                      : `Add ${formatPrice(thresholdInINR - totalPrice)} more for free shipping`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


