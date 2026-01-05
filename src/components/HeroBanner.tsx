'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockBanners } from '@/lib/mock-data';

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = mockBanners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        {banners.map(
          (banner, index) =>
            index === currentIndex && (
              <motion.div
                key={banner.uid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <Image
                  src={banner.background_image.url}
                  alt={banner.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 ${
                    banner.text_color === 'light'
                      ? 'bg-gradient-to-r from-black/70 via-black/40 to-transparent'
                      : 'bg-gradient-to-r from-white/80 via-white/50 to-transparent'
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="max-w-xl"
                    >
                      {banner.subtitle && (
                        <motion.span
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className={`inline-block px-4 py-1 rounded-full text-sm font-body font-semibold mb-4 ${
                            banner.text_color === 'light'
                              ? 'bg-primary-500 text-white'
                              : 'bg-primary-100 text-primary-600'
                          }`}
                        >
                          {banner.subtitle}
                        </motion.span>
                      )}
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight ${
                          banner.text_color === 'light' ? 'text-white' : 'text-charcoal'
                        }`}
                      >
                        {banner.title}
                      </motion.h1>
                      {banner.description && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className={`font-body text-lg md:text-xl mb-8 ${
                            banner.text_color === 'light' ? 'text-white/90' : 'text-secondary-600'
                          }`}
                        >
                          {banner.description}
                        </motion.p>
                      )}
                      {banner.cta_text && banner.cta_link && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Link
                            href={banner.cta_link}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 
                                     text-white rounded-full font-body font-semibold text-lg shadow-lg 
                                     shadow-primary-500/30 hover:shadow-primary-500/50 transition-all 
                                     hover:-translate-y-0.5"
                          >
                            {banner.cta_text}
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 
                 backdrop-blur-sm rounded-full text-white transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/40 
                 backdrop-blur-sm rounded-full text-white transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary-500'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

