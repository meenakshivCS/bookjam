'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useCurrencyStore, CURRENCIES } from '@/lib/currency-store';

export default function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useCurrencyStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currencyCode: string) => {
    setCurrency(currencyCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-body"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currency.code}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-secondary-200 overflow-hidden z-50"
          >
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-body text-secondary-500 uppercase tracking-wide">
                Select Currency
              </p>
              {CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleSelect(curr.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                    currency.code === curr.code
                      ? 'bg-primary-50 text-primary-600'
                      : 'hover:bg-secondary-50 text-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-secondary-100 rounded-full font-bold text-sm">
                      {curr.symbol}
                    </span>
                    <div className="text-left">
                      <p className="font-body font-medium text-sm">{curr.code}</p>
                      <p className="font-body text-xs text-secondary-500">{curr.name}</p>
                    </div>
                  </div>
                  {currency.code === curr.code && (
                    <Check className="w-4 h-4 text-primary-500" />
                  )}
                </button>
              ))}
            </div>
            <div className="px-4 py-3 bg-secondary-50 border-t border-secondary-200">
              <p className="font-body text-xs text-secondary-500">
                Prices will be shown in {currency.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

