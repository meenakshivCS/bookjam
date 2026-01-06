'use client';

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RotateCcw, CreditCard } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Free Shipping',
    description: 'On orders over ₹500',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: <RotateCcw className="w-6 h-6" />,
    title: 'Easy Returns',
    description: '7-day return policy',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Multiple Payment Options',
    description: 'Cards, UPI, Net Banking',
  },
];

export default function FeaturesBar() {
  return (
    <section className="py-8 md:py-12 bg-white border-y border-secondary-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left"
            >
              <div className="flex-shrink-0 p-3 bg-primary-50 text-primary-500 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-body font-semibold text-charcoal">{feature.title}</h3>
                <p className="font-body text-sm text-secondary-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


