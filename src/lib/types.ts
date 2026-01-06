// Contentstack Content Type Interfaces

export interface ContentstackImage {
  uid: string;
  url: string;
  filename: string;
  title?: string;
  content_type: string;
}

export interface ContentstackEntry {
  uid: string;
  title: string;
  url?: string;
  created_at: string;
  updated_at: string;
  locale: string;
}

// Book Content Type
export interface Book extends ContentstackEntry {
  title: string;
  slug: string;
  author: Author | Author[];
  description: string;
  short_description?: string;
  cover_image: ContentstackImage;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  isbn: string;
  publisher?: string;
  publication_date?: string;
  pages?: number;
  language?: string;
  format?: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  category: Category | Category[];
  tags?: string[];
  rating?: number;
  review_count?: number;
  is_bestseller?: boolean;
  is_new_arrival?: boolean;
  is_featured?: boolean;
  stock_quantity?: number;
  age_group?: string;
}

// Category Content Type
export interface Category extends ContentstackEntry {
  name: string;
  slug: string;
  description?: string;
  icon?: ContentstackImage;
  cover_image?: ContentstackImage;
  parent_category?: Category;
  display_order?: number;
  is_featured?: boolean;
  color?: string;
}

// Author Content Type
export interface Author extends ContentstackEntry {
  name: string;
  slug: string;
  bio?: string;
  photo?: ContentstackImage;
  website?: string;
  social_links?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

// Banner Content Type
export interface Banner extends ContentstackEntry {
  title: string;
  subtitle?: string;
  description?: string;
  background_image: ContentstackImage;
  cta_text?: string;
  cta_link?: string;
  text_color?: 'light' | 'dark';
  display_order?: number;
  is_active?: boolean;
}

// Navigation Content Type
export interface NavigationItem {
  label: string;
  url: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface Navigation extends ContentstackEntry {
  items: NavigationItem[];
}

// Promotion Content Type
export interface Promotion extends ContentstackEntry {
  title: string;
  description?: string;
  discount_code?: string;
  discount_percentage?: number;
  start_date: string;
  end_date: string;
  banner_image?: ContentstackImage;
  applicable_categories?: Category[];
  is_active?: boolean;
}

// Cart Item
export interface CartItem {
  book: Book;
  quantity: number;
}

// Page Content Type
export interface Page extends ContentstackEntry {
  title: string;
  slug: string;
  seo_title?: string;
  seo_description?: string;
  content?: unknown[];
}


