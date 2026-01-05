import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  categories: [
    { name: 'Fiction', href: '/category/fiction' },
    { name: 'Non-Fiction', href: '/category/non-fiction' },
    { name: 'Self-Help', href: '/category/self-help' },
    { name: 'Business & Finance', href: '/category/business-finance' },
    { name: 'Kids Books', href: '/category/kids-books' },
    { name: 'Mystery & Thriller', href: '/category/mystery-thriller' },
  ],
  quickLinks: [
    { name: 'Best Sellers', href: '/bestsellers' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Gift Cards', href: '/gift-cards' },
    { name: 'Book Clubs', href: '/book-clubs' },
    { name: "Today's Deals", href: '/deals' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Track Order', href: '/track-order' },
    { name: 'Returns & Refunds', href: '/returns' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Contact Us', href: '/contact' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Blog', href: '/blog' },
  ],
};

const paymentMethods = [
  'Visa', 'Mastercard', 'American Express', 'PayPal', 'UPI', 'Net Banking'
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary-900 to-secondary-950 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-secondary-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Stay in the Loop
            </h3>
            <p className="font-body text-secondary-300 mb-6">
              Subscribe to our newsletter for book recommendations, exclusive offers, and literary news.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-secondary-800 border border-secondary-700 
                         text-white placeholder:text-secondary-400 focus:border-primary-400 
                         focus:ring-2 focus:ring-primary-400/20 outline-none font-body transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 rounded-full font-body 
                         font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary-400" />
              <span className="font-display text-2xl font-bold">
                Book<span className="text-primary-400">Jam</span>
              </span>
            </Link>
            <p className="font-body text-secondary-300 mb-6 max-w-sm">
              Your destination for the best books across all genres. Discover, explore, and 
              get lost in stories that inspire, educate, and entertain.
            </p>
            <div className="space-y-3 font-body text-secondary-300">
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a href="mailto:hello@bookjam.in" className="hover:text-primary-400 transition-colors">
                  hello@bookjam.in
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a href="tel:+918530206759" className="hover:text-primary-400 transition-colors">
                  +91 8530 206 759
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-3 font-body">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 font-body">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3 font-body">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3 font-body">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="font-body text-secondary-400 text-sm">Follow us:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-secondary-400 hover:text-primary-400 hover:bg-secondary-800 
                           rounded-full transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-secondary-400 hover:text-primary-400 hover:bg-secondary-800 
                           rounded-full transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-secondary-400 hover:text-primary-400 hover:bg-secondary-800 
                           rounded-full transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-secondary-400 hover:text-primary-400 hover:bg-secondary-800 
                           rounded-full transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="font-body text-secondary-400 text-sm">We accept:</span>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-secondary-800 rounded text-xs font-body text-secondary-300"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <p className="font-body text-secondary-400 text-sm">
              © 2026 BookJam. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

