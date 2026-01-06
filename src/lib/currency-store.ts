import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number; // Rate relative to INR (base currency)
  locale: string;
  region: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', exchangeRate: 1, locale: 'en-IN', region: 'India' },
  { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 0.012, locale: 'en-US', region: 'United States' },
  { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.011, locale: 'de-DE', region: 'Europe' },
  { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.0095, locale: 'en-GB', region: 'United Kingdom' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', exchangeRate: 0.044, locale: 'ar-AE', region: 'UAE' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', exchangeRate: 0.016, locale: 'en-SG', region: 'Singapore' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 0.018, locale: 'en-AU', region: 'Australia' },
];

// Region-specific content variants
export interface RegionVariant {
  region: string;
  currencies: string[];
  bannerText: string;
  bannerSubtext: string;
  promoCode?: string;
  freeShippingThreshold: number;
  featuredGenres: string[];
  shippingInfo: string;
}

export const REGION_VARIANTS: RegionVariant[] = [
  {
    region: 'India',
    currencies: ['INR'],
    bannerText: 'Welcome to BookJam India!',
    bannerSubtext: 'Free shipping on orders above ₹499',
    promoCode: 'NAMASTE10',
    freeShippingThreshold: 499,
    featuredGenres: ['Indian Fiction', 'Mythology', 'Self-Help'],
    shippingInfo: 'Delivery in 3-7 business days across India',
  },
  {
    region: 'United States',
    currencies: ['USD'],
    bannerText: 'BookJam Ships to USA!',
    bannerSubtext: 'Free international shipping on orders over $50',
    promoCode: 'USA15',
    freeShippingThreshold: 50,
    featuredGenres: ['Bestsellers', 'Contemporary Fiction', 'Business'],
    shippingInfo: 'International delivery in 10-15 business days',
  },
  {
    region: 'Europe',
    currencies: ['EUR', 'GBP'],
    bannerText: 'BookJam Europe',
    bannerSubtext: 'Free shipping on orders over €45',
    promoCode: 'EURO15',
    freeShippingThreshold: 45,
    featuredGenres: ['Literary Fiction', 'Classics', 'Philosophy'],
    shippingInfo: 'EU delivery in 12-18 business days',
  },
  {
    region: 'UAE',
    currencies: ['AED'],
    bannerText: 'مرحبا بكم في BookJam!',
    bannerSubtext: 'Free shipping on orders over AED 150',
    promoCode: 'DUBAI20',
    freeShippingThreshold: 150,
    featuredGenres: ['Islamic Literature', 'Arabic Fiction', 'Business'],
    shippingInfo: 'UAE delivery in 7-10 business days',
  },
  {
    region: 'International',
    currencies: ['SGD', 'AUD'],
    bannerText: 'BookJam Ships Worldwide!',
    bannerSubtext: 'Flat rate international shipping',
    freeShippingThreshold: 75,
    featuredGenres: ['Bestsellers', 'Award Winners', 'Non-Fiction'],
    shippingInfo: 'International delivery in 15-21 business days',
  },
];

interface CurrencyState {
  currency: Currency;
  regionVariant: RegionVariant;
  setCurrency: (currencyCode: string) => void;
  convertPrice: (priceInINR: number) => number;
  formatPrice: (priceInINR: number) => string;
  getRegionVariant: () => RegionVariant;
}

const getVariantForCurrency = (currencyCode: string): RegionVariant => {
  const variant = REGION_VARIANTS.find(v => v.currencies.includes(currencyCode));
  return variant || REGION_VARIANTS[0]; // Default to India
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: CURRENCIES[0], // Default to INR
      regionVariant: REGION_VARIANTS[0],

      setCurrency: (currencyCode: string) => {
        const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
        const regionVariant = getVariantForCurrency(currencyCode);
        set({ currency, regionVariant });
      },

      convertPrice: (priceInINR: number) => {
        const { currency } = get();
        return Math.round(priceInINR * currency.exchangeRate * 100) / 100;
      },

      formatPrice: (priceInINR: number) => {
        const { currency, convertPrice } = get();
        const convertedPrice = convertPrice(priceInINR);
        
        return new Intl.NumberFormat(currency.locale, {
          style: 'currency',
          currency: currency.code,
          minimumFractionDigits: currency.code === 'INR' ? 0 : 2,
          maximumFractionDigits: 2,
        }).format(convertedPrice);
      },

      getRegionVariant: () => {
        return get().regionVariant;
      },
    }),
    {
      name: 'bookjam-currency',
    }
  )
);

