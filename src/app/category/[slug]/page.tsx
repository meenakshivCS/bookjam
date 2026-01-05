import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import BookCard from '@/components/BookCard';
import { mockCategories, getMockBooksByCategory, mockBooks } from '@/lib/mock-data';

// Allow dynamic rendering for category pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = mockCategories.find((c) => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found - BookJam',
    };
  }

  return {
    title: `${category.name} Books - BookJam`,
    description: category.description || `Browse our collection of ${category.name} books at BookJam.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find((c) => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  // Get books for this category, or show all books if no matches
  let books = getMockBooksByCategory(params.slug);
  if (books.length === 0) {
    // Show some books as placeholder
    books = mockBooks.slice(0, 8);
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Category Header */}
      <div 
        className="relative py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}30 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body text-secondary-500 mb-6">
            <Link href="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/categories" className="hover:text-primary-500 transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: category.color }}>{category.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 
                className="font-display text-4xl md:text-5xl font-bold mb-3"
                style={{ color: category.color }}
              >
                {category.name}
              </h1>
              {category.description && (
                <p className="font-body text-lg text-secondary-600 max-w-2xl">
                  {category.description}
                </p>
              )}
            </div>
            <p className="font-body text-secondary-500">
              <span className="font-semibold text-charcoal">{books.length}</span> books found
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div 
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20 translate-y-1/2"
          style={{ backgroundColor: category.color }}
        />
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* Sort/Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="font-body text-secondary-600">Sort by:</span>
            <select className="px-4 py-2 bg-white border border-secondary-200 rounded-lg font-body text-charcoal focus:border-primary-400 outline-none">
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Rating</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-body text-secondary-600">Price:</span>
            <select className="px-4 py-2 bg-white border border-secondary-200 rounded-lg font-body text-charcoal focus:border-primary-400 outline-none">
              <option>All Prices</option>
              <option>Under ₹200</option>
              <option>₹200 - ₹500</option>
              <option>₹500 - ₹1000</option>
              <option>Above ₹1000</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {books.map((book, index) => (
            <BookCard key={book.uid} book={book} index={index} />
          ))}
        </div>

        {/* Load More */}
        {books.length >= 8 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Books
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

