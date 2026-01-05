import Contentstack from 'contentstack';

// Contentstack SDK initialization
const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || '',
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'development',
  region: (process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as Contentstack.Region) || Contentstack.Region.US,
});

// Content Type UIDs - these should match your Contentstack content types
export const CONTENT_TYPES = {
  BOOK: 'book',
  CATEGORY: 'category',
  BANNER: 'banner',
  AUTHOR: 'author',
  PAGE: 'page',
  NAVIGATION: 'navigation',
  PROMOTION: 'promotion',
} as const;

// Fetch all entries of a content type
export async function getEntries<T>(
  contentTypeUid: string,
  options?: {
    limit?: number;
    skip?: number;
    includeReference?: string[];
    query?: Record<string, unknown>;
    orderBy?: { field: string; direction: 'asc' | 'desc' };
  }
): Promise<T[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = Stack.ContentType(contentTypeUid).Query();

    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.skip) {
      query = query.skip(options.skip);
    }
    if (options?.includeReference) {
      options.includeReference.forEach((ref: string) => {
        query = query.includeReference(ref);
      });
    }
    if (options?.query) {
      Object.entries(options.query).forEach(([key, value]) => {
        query = query.where(key, value);
      });
    }
    if (options?.orderBy) {
      query = options.orderBy.direction === 'asc' 
        ? query.ascending(options.orderBy.field)
        : query.descending(options.orderBy.field);
    }

    const result = await query.toJSON().find();
    return (result[0] || []) as T[];
  } catch (error) {
    console.error(`Error fetching entries for ${contentTypeUid}:`, error);
    return [];
  }
}

// Fetch a single entry by UID
export async function getEntryByUid<T>(
  contentTypeUid: string,
  entryUid: string,
  includeReference?: string[]
): Promise<T | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = Stack.ContentType(contentTypeUid).Entry(entryUid);

    if (includeReference) {
      includeReference.forEach((ref: string) => {
        query = query.includeReference(ref);
      });
    }

    const result = await query.toJSON().fetch();
    return result as T;
  } catch (error) {
    console.error(`Error fetching entry ${entryUid}:`, error);
    return null;
  }
}

// Fetch entry by URL/slug
export async function getEntryBySlug<T>(
  contentTypeUid: string,
  slug: string,
  includeReference?: string[]
): Promise<T | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = Stack.ContentType(contentTypeUid).Query().where('url', `/${slug}`);

    if (includeReference) {
      includeReference.forEach((ref: string) => {
        query = query.includeReference(ref);
      });
    }

    const result = await query.toJSON().find();
    return (result[0]?.[0] as T) || null;
  } catch (error) {
    console.error(`Error fetching entry by slug ${slug}:`, error);
    return null;
  }
}

// Search books
export async function searchBooks<T>(
  searchTerm: string,
  options?: { limit?: number; category?: string }
): Promise<T[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = Stack.ContentType(CONTENT_TYPES.BOOK)
      .Query()
      .regex('title', searchTerm, 'i');

    if (options?.category) {
      query = query.where('category', options.category);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const result = await query.toJSON().find();
    return (result[0] || []) as T[];
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
}

export default Stack;
