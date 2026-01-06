'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Truck, Sparkles } from 'lucide-react';
import { useCurrencyStore } from '@/lib/currency-store';

export default function RegionBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { regionVariant, currency, formatPrice } = useCurrencyStore();

  if (!isVisible) return null;

  // Convert threshold to display currency
  const thresholdInINR = regionVariant.freeShippingThreshold / currency.exchangeRate;
  const formattedThreshold = formatPrice(thresholdInINR);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-gradient-to-r from-primary-600 to-primary-500 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-6 flex-wrap">
              {/* Main Message */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-body font-medium text-sm">
                  {regionVariant.bannerText}
                </span>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-2 text-white/90">
                <Truck className="w-4 h-4" />
                <span className="font-body text-sm">
                  Free shipping over {formattedThreshold}
                </span>
              </div>

              {/* Promo Code */}
              {regionVariant.promoCode && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span className="font-body text-sm">
                    Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">{regionVariant.promoCode}</span> for extra discount!
                  </span>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

