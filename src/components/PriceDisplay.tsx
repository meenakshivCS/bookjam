'use client';

import { useCurrencyStore } from '@/lib/currency-store';

interface PriceDisplayProps {
  priceInINR: number;
  originalPriceInINR?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscount?: boolean;
  className?: string;
}

export default function PriceDisplay({
  priceInINR,
  originalPriceInINR,
  size = 'md',
  showDiscount = true,
  className = '',
}: PriceDisplayProps) {
  const { formatPrice } = useCurrencyStore();

  const formattedPrice = formatPrice(priceInINR);
  const formattedOriginal = originalPriceInINR ? formatPrice(originalPriceInINR) : null;
  
  const hasDiscount = originalPriceInINR && originalPriceInINR > priceInINR;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPriceInINR - priceInINR) / originalPriceInINR) * 100)
    : 0;

  const sizeClasses = {
    sm: {
      price: 'text-sm font-bold',
      original: 'text-xs',
      discount: 'text-xs px-1.5 py-0.5',
    },
    md: {
      price: 'text-base font-bold',
      original: 'text-sm',
      discount: 'text-xs px-2 py-0.5',
    },
    lg: {
      price: 'text-xl font-bold',
      original: 'text-sm',
      discount: 'text-sm px-2 py-1',
    },
    xl: {
      price: 'text-2xl font-bold',
      original: 'text-base',
      discount: 'text-sm px-2 py-1',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={`font-body text-charcoal ${classes.price}`}>
        {formattedPrice}
      </span>
      
      {hasDiscount && formattedOriginal && (
        <span className={`font-body text-secondary-400 line-through ${classes.original}`}>
          {formattedOriginal}
        </span>
      )}
      
      {hasDiscount && showDiscount && discountPercentage > 0 && (
        <span className={`font-body font-medium bg-green-100 text-green-700 rounded-full ${classes.discount}`}>
          {discountPercentage}% off
        </span>
      )}
    </div>
  );
}

