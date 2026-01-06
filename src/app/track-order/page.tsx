'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearched(true);
    }
  };

  // Mock order status for demo
  const mockOrder = {
    id: 'BJ-2026-001234',
    date: 'January 3, 2026',
    status: 'in_transit',
    items: [
      { title: 'The Midnight Library', quantity: 1 },
      { title: 'Atomic Habits', quantity: 2 },
    ],
    tracking: [
      { status: 'Order Placed', date: 'Jan 3, 2026 10:30 AM', completed: true },
      { status: 'Order Confirmed', date: 'Jan 3, 2026 11:00 AM', completed: true },
      { status: 'Shipped', date: 'Jan 4, 2026 2:00 PM', completed: true },
      { status: 'In Transit', date: 'Jan 5, 2026 8:00 AM', completed: true, current: true },
      { status: 'Out for Delivery', date: 'Expected Jan 6, 2026', completed: false },
      { status: 'Delivered', date: '', completed: false },
    ],
    courier: 'BlueDart',
    trackingNumber: 'BD123456789',
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <Package className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Track Your Order
          </h1>
          <p className="font-body text-xl text-white/90">
            Enter your order ID to see the current status
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <label className="block font-body font-medium text-charcoal mb-2">Order ID</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g., BJ-2026-001234"
                className="flex-1 px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg font-body focus:border-primary-400 outline-none"
              />
              <button type="submit" className="btn-primary flex items-center gap-2">
                <Search className="w-5 h-5" />
                Track
              </button>
            </div>
            <p className="font-body text-sm text-secondary-500 mt-2">
              You can find your Order ID in the confirmation email or SMS.
            </p>
          </form>

          {/* Search Results */}
          {searched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-charcoal">Order #{mockOrder.id}</h2>
                    <p className="font-body text-secondary-500">Placed on {mockOrder.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-body text-sm font-medium">
                    In Transit
                  </span>
                </div>
                <div className="border-t border-secondary-200 pt-4">
                  <p className="font-body text-secondary-600 mb-2">Items in this order:</p>
                  <ul className="font-body text-charcoal">
                    {mockOrder.items.map((item, i) => (
                      <li key={i}>• {item.title} × {item.quantity}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-charcoal mb-6">Shipment Progress</h3>
                <div className="space-y-0">
                  {mockOrder.tracking.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? step.current 
                              ? 'bg-primary-500 text-white' 
                              : 'bg-green-500 text-white'
                            : 'bg-secondary-200 text-secondary-400'
                        }`}>
                          {step.completed ? (
                            step.current ? <Truck className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 bg-secondary-400 rounded-full" />
                          )}
                        </div>
                        {index < mockOrder.tracking.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            step.completed ? 'bg-green-500' : 'bg-secondary-200'
                          }`} />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className={`font-body font-medium ${
                          step.current ? 'text-primary-500' : step.completed ? 'text-charcoal' : 'text-secondary-400'
                        }`}>
                          {step.status}
                        </p>
                        <p className="font-body text-sm text-secondary-500">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courier Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-charcoal mb-4">Courier Details</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-secondary-600">Carrier: <span className="text-charcoal font-medium">{mockOrder.courier}</span></p>
                    <p className="font-body text-secondary-600">Tracking #: <span className="text-charcoal font-medium">{mockOrder.trackingNumber}</span></p>
                  </div>
                  <a 
                    href={`https://www.bluedart.com/tracking?trackingId=${mockOrder.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm"
                  >
                    Track on Courier Site
                  </a>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-charcoal mb-1">Delivery Address</h3>
                    <p className="font-body text-secondary-600">
                      John Doe<br />
                      42 Book Street, Indiranagar<br />
                      Bangalore, Karnataka 560038
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Help Text */}
          {!searched && (
            <div className="text-center">
              <p className="font-body text-secondary-500 mb-4">
                Need help finding your order ID? Check your email or SMS for the order confirmation.
              </p>
              <a href="/help" className="text-primary-500 hover:underline font-body">
                Contact Support →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


