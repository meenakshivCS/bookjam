'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  BookOpen,
  User,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { mockCategories } from '@/lib/mock-data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  
  const { getTotalItems, toggleCart } = useCartStore();
  const cartCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-primary-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm font-body">
          <span className="inline-flex items-center gap-2">
            🎉 <span className="font-medium">Flat 15% OFF</span> on all books + 
            <span className="font-medium">Free Shipping</span> on orders over ₹500!
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-primary-500 group-hover:text-primary-600 transition-colors" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <span className="font-display text-2xl md:text-3xl font-bold text-charcoal tracking-tight">
              Book<span className="text-primary-500">Jam</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for books, authors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-secondary-200 
                         focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none
                         font-body text-charcoal placeholder:text-secondary-400 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/wishlist"
              className="p-2 text-secondary-600 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all"
            >
              <Heart className="w-6 h-6" />
            </Link>
            <Link
              href="/account"
              className="p-2 text-secondary-600 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all"
            >
              <User className="w-6 h-6" />
            </Link>
            <button
              onClick={toggleCart}
              className="relative p-2 text-secondary-600 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-all"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs 
                           font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-secondary-600 hover:text-primary-500 rounded-full"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 text-secondary-600 hover:text-primary-500 rounded-full"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-secondary-600 hover:text-primary-500 rounded-full"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-1 py-2 border-t border-primary-50">
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="nav-link flex items-center gap-1 px-4 py-2 text-charcoal hover:text-primary-500 font-body font-medium transition-colors">
              All Categories
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-secondary-100 py-2 z-50"
                >
                  {mockCategories.map((category) => (
                    <Link
                      key={category.uid}
                      href={`/category/${category.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors"
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-body text-charcoal">{category.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Link href="/bestsellers" className="nav-link px-4 py-2 text-charcoal hover:text-primary-500 font-body font-medium transition-colors">
            Best Sellers
          </Link>
          <Link href="/new-arrivals" className="nav-link px-4 py-2 text-charcoal hover:text-primary-500 font-body font-medium transition-colors">
            New Arrivals
          </Link>
          <Link href="/category/kids-books" className="nav-link px-4 py-2 text-charcoal hover:text-primary-500 font-body font-medium transition-colors">
            Kids Books
          </Link>
          <Link href="/deals" className="nav-link px-4 py-2 text-primary-500 hover:text-primary-600 font-body font-semibold transition-colors">
            Today's Deals 🔥
          </Link>
        </nav>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-primary-100"
          >
            <form onSubmit={handleSearch} className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-secondary-200 
                           focus:border-primary-400 outline-none font-body"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-primary-100 bg-white"
          >
            <nav className="p-4 space-y-2">
              <Link
                href="/bestsellers"
                className="block px-4 py-3 rounded-lg hover:bg-primary-50 font-body font-medium text-charcoal"
                onClick={() => setIsMenuOpen(false)}
              >
                Best Sellers
              </Link>
              <Link
                href="/new-arrivals"
                className="block px-4 py-3 rounded-lg hover:bg-primary-50 font-body font-medium text-charcoal"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/category/kids-books"
                className="block px-4 py-3 rounded-lg hover:bg-primary-50 font-body font-medium text-charcoal"
                onClick={() => setIsMenuOpen(false)}
              >
                Kids Books
              </Link>
              <Link
                href="/deals"
                className="block px-4 py-3 rounded-lg bg-primary-50 font-body font-semibold text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Today's Deals 🔥
              </Link>
              <div className="pt-4 border-t border-secondary-100">
                <p className="px-4 pb-2 text-sm text-secondary-500 font-body">Categories</p>
                {mockCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.uid}
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-body text-charcoal">{category.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

