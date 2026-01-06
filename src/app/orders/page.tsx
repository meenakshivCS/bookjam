'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ChevronRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock orders for demo
const mockOrders = [
  {
    id: 'BJ-2026-001234',
    date: 'January 3, 2026',
    status: 'delivered',
    total: 1247,
    items: [
      { title: 'The Midnight Library', author: 'Matt Haig', price: 399, quantity: 1, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100' },
      { title: 'Atomic Habits', author: 'James Clear', price: 424, quantity: 2, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100' },
    ],
  },
  {
    id: 'BJ-2026-001189',
    date: 'December 28, 2025',
    status: 'in_transit',
    total: 599,
    items: [
      { title: 'The Psychology of Money', author: 'Morgan Housel', price: 599, quantity: 1, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100' },
    ],
  },
  {
    id: 'BJ-2025-009876',
    date: 'December 15, 2025',
    status: 'delivered',
    total: 899,
    items: [
      { title: 'Ikigai', author: 'Héctor García', price: 450, quantity: 1, image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=100' },
      { title: 'The Alchemist', author: 'Paulo Coelho', price: 449, quantity: 1, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=100' },
    ],
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: Package },
  in_transit: { label: 'In Transit', color: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
};

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            My Orders
          </h1>
          <p className="font-body text-white/80">
            Track and manage your BookJam orders
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {mockOrders.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {mockOrders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              const isExpanded = selectedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  layout
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Order Header */}
                  <button
                    onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-secondary-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-primary-500" />
                      </div>
                      <div className="text-left">
                        <p className="font-display font-bold text-charcoal">Order #{order.id}</p>
                        <p className="font-body text-sm text-secondary-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-body font-medium ${status.color}`}>
                        <StatusIcon className="w-4 h-4 inline mr-1" />
                        {status.label}
                      </span>
                      <span className="font-display font-bold text-charcoal">₹{order.total}</span>
                      <ChevronRight className={`w-5 h-5 text-secondary-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </button>

                  {/* Order Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-secondary-200 p-6"
                    >
                      <div className="space-y-4 mb-6">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="relative w-16 h-20 rounded overflow-hidden bg-secondary-100">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-display font-bold text-charcoal">{item.title}</p>
                              <p className="font-body text-sm text-secondary-500">{item.author}</p>
                              <p className="font-body text-sm text-secondary-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-display font-bold text-charcoal">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link href={`/track-order?id=${order.id}`} className="btn-primary text-sm">
                          Track Order
                        </Link>
                        {order.status === 'delivered' && (
                          <>
                            <button className="btn-outline text-sm">
                              Return/Replace
                            </button>
                            <button className="btn-outline text-sm">
                              Write Review
                            </button>
                          </>
                        )}
                        <button className="btn-outline text-sm">
                          Download Invoice
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <Package className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-charcoal mb-2">No Orders Yet</h2>
            <p className="font-body text-secondary-600 mb-6">
              Looks like you haven't placed any orders. Start shopping to see your orders here!
            </p>
            <Link href="/" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


