'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Percent } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Promo Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-500 to-accent-600 p-8 md:p-10"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4">
                <Gift className="w-5 h-5 text-white" />
                <span className="font-body font-medium text-white text-sm">Limited Time Offer</span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Gift Cards Available
              </h3>
              <p className="font-body text-white/90 mb-6 max-w-sm">
                The perfect gift for book lovers. Available in denominations from ₹500 to ₹5000.
              </p>

              <Link
                href="/gift-cards"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-accent-600 
                         rounded-full font-body font-semibold hover:bg-white/90 transition-colors"
              >
                Shop Gift Cards
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Promo Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary-800 to-secondary-900 p-8 md:p-10"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/30 rounded-full mb-4">
                <Percent className="w-5 h-5 text-primary-400" />
                <span className="font-body font-medium text-primary-400 text-sm">New Year Special</span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Up to 40% Off
              </h3>
              <p className="font-body text-white/80 mb-6 max-w-sm">
                Start 2026 with amazing reads. Huge discounts on bestsellers and new arrivals.
              </p>

              <Link
                href="/deals"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white 
                         rounded-full font-body font-semibold hover:bg-primary-600 transition-colors"
              >
                Shop Deals
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

