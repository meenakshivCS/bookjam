// Contentstack data fetching with fallback to mock data
import { getEntries, CONTENT_TYPES } from './contentstack';
import { Book, Category, Banner, Author } from './types';
import {
  mockBooks,
  mockCategories,
  mockBanners,
  getMockBestsellers,
  getMockNewArrivals,
  getMockFeaturedBooks,
  getMockKidsBooks,
  getMockBooksByCategory,
  getMockBookBySlug,
} from './mock-data';

// Check if Contentstack is configured
const isContentstackConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY &&
    process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN &&
    process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT
  );
};

// Fetch all books from Contentstack or fallback to mock
export async function getBooks(): Promise<Book[]> {
  if (!isContentstackConfigured()) {
    console.log('Using mock data - Contentstack not configured');
    return mockBooks;
  }

  try {
    const books = await getEntries<Book>(CONTENT_TYPES.BOOK, {
      includeReference: ['author', 'category'],
    });
    
    if (books.length === 0) {
      console.log('No books in Contentstack, using mock data');
      return mockBooks;
    }
    
    return books;
  } catch (error) {
    console.error('Error fetching books from Contentstack:', error);
    return mockBooks;
  }
}

// Fetch all categories from Contentstack or fallback to mock
export async function getCategories(): Promise<Category[]> {
  if (!isContentstackConfigured()) {
    return mockCategories;
  }

  try {
    const categories = await getEntries<Category>(CONTENT_TYPES.CATEGORY, {
      orderBy: { field: 'display_order', direction: 'asc' },
    });
    
    if (categories.length === 0) {
      return mockCategories;
    }
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories from Contentstack:', error);
    return mockCategories;
  }
}

// Fetch all banners from Contentstack or fallback to mock
export async function getBanners(): Promise<Banner[]> {
  if (!isContentstackConfigured()) {
    return mockBanners;
  }

  try {
    const banners = await getEntries<Banner>(CONTENT_TYPES.BANNER, {
      query: { is_active: true },
      orderBy: { field: 'display_order', direction: 'asc' },
    });
    
    if (banners.length === 0) {
      return mockBanners;
    }
    
    return banners;
  } catch (error) {
    console.error('Error fetching banners from Contentstack:', error);
    return mockBanners;
  }
}

// Fetch bestsellers
export async function getBestsellers(): Promise<Book[]> {
  if (!isContentstackConfigured()) {
    return getMockBestsellers();
  }

  try {
    const books = await getEntries<Book>(CONTENT_TYPES.BOOK, {
      query: { is_bestseller: true },
      includeReference: ['author', 'category'],
      limit: 12,
    });
    
    if (books.length === 0) {
      return getMockBestsellers();
    }
    
    return books;
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    return getMockBestsellers();
  }
}

// Fetch new arrivals
export async function getNewArrivals(): Promise<Book[]> {
  if (!isContentstackConfigured()) {
    return getMockNewArrivals();
  }

  try {
    const books = await getEntries<Book>(CONTENT_TYPES.BOOK, {
      query: { is_new_arrival: true },
      includeReference: ['author', 'category'],
      limit: 12,
    });
    
    if (books.length === 0) {
      return getMockNewArrivals();
    }
    
    return books;
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return getMockNewArrivals();
  }
}

// Fetch featured books
export async function getFeaturedBooks(): Promise<Book[]> {
  if (!isContentstackConfigured()) {
    return getMockFeaturedBooks();
  }

  try {
    const books = await getEntries<Book>(CONTENT_TYPES.BOOK, {
      query: { is_featured: true },
      includeReference: ['author', 'category'],
      limit: 12,
    });
    
    if (books.length === 0) {
      return getMockFeaturedBooks();
    }
    
    return books;
  } catch (error) {
    console.error('Error fetching featured books:', error);
    return getMockFeaturedBooks();
  }
}

// Fetch kids books
export async function getKidsBooks(): Promise<Book[]> {
  if (!isContentstackConfigured()) {
    return getMockKidsBooks();
  }

  try {
    const allBooks = await getEntries<Book>(CONTENT_TYPES.BOOK, {
      includeReference: ['author', 'category'],
    });
    
    const kidsBooks = allBooks.filter((book) => {
      const category = Array.isArray(book.category) ? book.category[0] : book.category;
      return category?.slug === 'kids-books';
    });
    
    if (kidsBooks.length === 0) {
      return getMockKidsBooks();
    }
    
    return kidsBooks;
  } catch (error) {
    console.error('Error fetching kids books:', error);
    return getMockKidsBooks();
  }
}

// Fetch books by category
export async function getBooksByCategory(categorySlug: string): Promise<Book[]> {
  if (!isContentstackConfigured()) {
    return getMockBooksByCategory(categorySlug);
  }

  try {
    const allBooks = await getEntries<Book>(CONTENT_TYPES.BOOK, {
      includeReference: ['author', 'category'],
    });
    
    const categoryBooks = allBooks.filter((book) => {
      const category = Array.isArray(book.category) ? book.category[0] : book.category;
      return category?.slug === categorySlug;
    });
    
    if (categoryBooks.length === 0) {
      return getMockBooksByCategory(categorySlug);
    }
    
    return categoryBooks;
  } catch (error) {
    console.error('Error fetching books by category:', error);
    return getMockBooksByCategory(categorySlug);
  }
}

// Fetch single book by slug
export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (!isContentstackConfigured()) {
    return getMockBookBySlug(slug) || null;
  }

  try {
    const books = await getEntries<Book>(CONTENT_TYPES.BOOK, {
      query: { url: `/${slug}` },
      includeReference: ['author', 'category'],
    });
    
    if (books.length === 0) {
      // Try with slug field
      const booksBySlug = await getEntries<Book>(CONTENT_TYPES.BOOK, {
        includeReference: ['author', 'category'],
      });
      
      const book = booksBySlug.find((b) => b.slug === slug);
      if (book) return book;
      
      return getMockBookBySlug(slug) || null;
    }
    
    return books[0];
  } catch (error) {
    console.error('Error fetching book by slug:', error);
    return getMockBookBySlug(slug) || null;
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isContentstackConfigured()) {
    return mockCategories.find((c) => c.slug === slug) || null;
  }

  try {
    const categories = await getEntries<Category>(CONTENT_TYPES.CATEGORY, {
      query: { slug },
    });
    
    if (categories.length === 0) {
      return mockCategories.find((c) => c.slug === slug) || null;
    }
    
    return categories[0];
  } catch (error) {
    console.error('Error fetching category:', error);
    return mockCategories.find((c) => c.slug === slug) || null;
  }
}

