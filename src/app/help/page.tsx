'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  Truck, 
  CreditCard, 
  RefreshCw, 
  Package,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    title: 'Orders & Shipping',
    icon: Truck,
    faqs: [
      {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number on our Track Order page or on the courier partner\'s website to track your shipment.',
      },
      {
        question: 'What are the delivery charges?',
        answer: 'Delivery is FREE for orders above ₹499. For orders below ₹499, a flat delivery charge of ₹49 applies. Express delivery is available at additional charges.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 5-7 business days. Express delivery (where available) takes 2-3 business days. Delivery times may vary based on your location.',
      },
      {
        question: 'Do you deliver to my location?',
        answer: 'We deliver to all serviceable pin codes across India. Enter your pin code during checkout to check if delivery is available in your area.',
      },
    ],
  },
  {
    title: 'Payments',
    icon: CreditCard,
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Credit/Debit Cards (Visa, MasterCard, RuPay), UPI, Net Banking, and Cash on Delivery (COD) for eligible orders.',
      },
      {
        question: 'Is it safe to use my credit card?',
        answer: 'Yes, absolutely! All transactions are encrypted with SSL technology. We use trusted payment gateways and never store your complete card details on our servers.',
      },
      {
        question: 'Can I pay using multiple payment methods?',
        answer: 'Currently, we support single payment method per order. However, you can use gift cards along with other payment methods.',
      },
      {
        question: 'Why was my payment declined?',
        answer: 'Payments can be declined due to insufficient funds, incorrect card details, or bank restrictions. Please verify your details or try another payment method.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    icon: RefreshCw,
    faqs: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 7-day return policy. Books must be in original, unused condition with all tags intact. Simply initiate a return from your Orders page.',
      },
      {
        question: 'How long does a refund take?',
        answer: 'Refunds are processed within 5-7 business days after we receive and verify the returned item. The amount will be credited to your original payment method.',
      },
      {
        question: 'Can I exchange a book?',
        answer: 'Yes! You can exchange for a different book or the same title if you received a damaged copy. Contact our support team to initiate an exchange.',
      },
      {
        question: 'What if I receive a damaged book?',
        answer: 'We\'re sorry if that happened! Please contact us within 48 hours of delivery with photos of the damage. We\'ll arrange a free replacement or refund.',
      },
    ],
  },
  {
    title: 'Account & Orders',
    icon: Package,
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Account" in the top menu and select "Sign Up". You can register using your email address or social media accounts.',
      },
      {
        question: 'How can I cancel my order?',
        answer: 'You can cancel your order from the Orders page before it is shipped. Once shipped, you\'ll need to wait for delivery and then initiate a return.',
      },
      {
        question: 'Can I modify my order after placing it?',
        answer: 'Order modifications are possible within 1 hour of placing the order. After that, you\'ll need to cancel and place a new order.',
      },
      {
        question: 'I forgot my password. What should I do?',
        answer: 'Click on "Forgot Password" on the login page. Enter your registered email, and we\'ll send you a link to reset your password.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-secondary-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-body font-medium text-charcoal pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-secondary-400 transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="font-body text-secondary-600 pb-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Help Center
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto">
            Find answers to frequently asked questions or get in touch with our support team.
          </p>
        </div>
      </section>

      {/* Quick Contact */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/contact" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h3 className="font-display font-bold text-charcoal">Email Support</h3>
              <p className="font-body text-secondary-500 text-sm">support@bookjam.in</p>
            </div>
          </Link>
          <Link href="tel:+918012345678" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h3 className="font-display font-bold text-charcoal">Call Us</h3>
              <p className="font-body text-secondary-500 text-sm">+91 80 1234 5678</p>
            </div>
          </Link>
          <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary-500" />
            </div>
            <div>
              <h3 className="font-display font-bold text-charcoal">Live Chat</h3>
              <p className="font-body text-secondary-500 text-sm">Mon-Sat, 9AM-8PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-charcoal text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {faqCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-6 bg-secondary-50 border-b border-secondary-200">
                <category.icon className="w-6 h-6 text-primary-500" />
                <h3 className="font-display text-lg font-bold text-charcoal">{category.title}</h3>
              </div>
              <div className="p-6">
                {category.faqs.map((faq) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="font-body text-secondary-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

