'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Briefcase, 
  Search, 
  Heart, 
  Sparkles, 
  Baby, 
  Compass 
} from 'lucide-react';
import { mockCategories } from '@/lib/mock-data';

const iconMap: Record<string, React.ReactNode> = {
  'fiction': <BookOpen className="w-8 h-8" />,
  'non-fiction': <Brain className="w-8 h-8" />,
  'self-help': <Sparkles className="w-8 h-8" />,
  'business-finance': <Briefcase className="w-8 h-8" />,
  'mystery-thriller': <Search className="w-8 h-8" />,
  'kids-books': <Baby className="w-8 h-8" />,
  'romance': <Heart className="w-8 h-8" />,
  'fantasy-adventure': <Compass className="w-8 h-8" />,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function GenreGrid() {
  return (
    <section className="py-16 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full 
                     font-body font-medium text-sm mb-4"
          >
            Explore by Genre
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-charcoal"
          >
            Find Your Next Read
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {mockCategories.map((category) => (
            <motion.div key={category.uid} variants={item}>
              <Link href={`/category/${category.slug}`}>
                <div
                  className="group relative overflow-hidden rounded-2xl p-6 md:p-8 h-40 md:h-48 
                           flex flex-col justify-end transition-all duration-300 
                           hover:shadow-xl hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}30 100%)`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="absolute top-4 right-4 p-3 rounded-full transition-all duration-300 
                             group-hover:scale-110 group-hover:rotate-12"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color,
                    }}
                  >
                    {iconMap[category.slug] || <BookOpen className="w-8 h-8" />}
                  </div>

                  {/* Decorative circles */}
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20 
                             group-hover:scale-150 transition-transform duration-500"
                    style={{ backgroundColor: category.color }}
                  />
                  <div
                    className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10 
                             group-hover:scale-125 transition-transform duration-500 delay-100"
                    style={{ backgroundColor: category.color }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3
                      className="font-display text-xl md:text-2xl font-bold mb-1 
                               group-hover:translate-x-1 transition-transform"
                      style={{ color: category.color }}
                    >
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="font-body text-sm text-secondary-600 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

