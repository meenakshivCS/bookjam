/**
 * Add sample books to Contentstack
 */

const https = require('https');

const API_KEY = 'blta792e06fbd51e931';
const MANAGEMENT_TOKEN = 'cs86e6fbc7a6eabdf4bff1465e';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.contentstack.io',
      port: 443,
      path: `/v3${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        api_key: API_KEY,
        authorization: MANAGEMENT_TOKEN,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject(new Error(json.error_message || JSON.stringify(json)));
          }
        } catch (e) {
          reject(new Error(body));
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function getEntries(contentType) {
  const result = await makeRequest('GET', `/content_types/${contentType}/entries?locale=en-us`);
  return result.entries || [];
}

async function createEntry(contentType, entry) {
  return makeRequest('POST', `/content_types/${contentType}/entries?locale=en-us`, { entry });
}

async function publishEntry(contentType, uid) {
  return makeRequest('POST', `/content_types/${contentType}/entries/${uid}/publish`, {
    entry: { environments: ['prod'], locales: ['en-us'] },
  });
}

async function setup() {
  console.log('\n📚 Adding sample books to Contentstack...\n');

  // Get existing authors and categories
  console.log('📋 Fetching authors and categories...');
  const authors = await getEntries('author');
  const categories = await getEntries('category');

  console.log(`   Found ${authors.length} authors and ${categories.length} categories\n`);

  // Map by name for easy lookup
  const authorMap = {};
  authors.forEach((a) => {
    authorMap[a.name.toLowerCase()] = a.uid;
  });

  const categoryMap = {};
  categories.forEach((c) => {
    categoryMap[c.slug] = c.uid;
  });

  console.log('Authors:', Object.keys(authorMap));
  console.log('Categories:', Object.keys(categoryMap));
  console.log('');

  // Sample books data
  const books = [
    {
      title: 'The Psychology of Money',
      slug: 'psychology-of-money',
      description: 'Timeless lessons on wealth, greed, and happiness. Doing well with money isn\'t necessarily about what you know. It\'s about how you behave.',
      short_description: 'Timeless lessons on wealth, greed, and happiness',
      price: 339,
      original_price: 399,
      discount_percentage: 15,
      isbn: '978-0857197689',
      publisher: 'Harriman House',
      pages: 256,
      language: 'English',
      format: 'paperback',
      rating: 4.8,
      review_count: 15420,
      is_bestseller: true,
      is_featured: true,
      stock_quantity: 50,
      author_name: 'morgan housel',
      category_slug: 'business-finance',
    },
    {
      title: 'Atomic Habits',
      slug: 'atomic-habits',
      description: 'Transform your life with tiny changes. An easy and proven way to build good habits and break bad ones.',
      short_description: 'Tiny changes, remarkable results',
      price: 509,
      original_price: 599,
      discount_percentage: 15,
      isbn: '978-0735211292',
      publisher: 'Penguin Random House',
      pages: 320,
      language: 'English',
      format: 'hardcover',
      rating: 4.9,
      review_count: 45230,
      is_bestseller: true,
      is_featured: true,
      stock_quantity: 55,
      author_name: 'james clear',
      category_slug: 'self-help',
    },
    {
      title: 'Deep Work',
      slug: 'deep-work',
      description: 'Rules for Focused Success in a Distracted World. Deep work is the ability to focus without distraction on a cognitively demanding task.',
      short_description: 'Rules for Focused Success in a Distracted World',
      price: 399,
      original_price: 499,
      discount_percentage: 20,
      isbn: '978-1455586691',
      publisher: 'Grand Central Publishing',
      pages: 304,
      language: 'English',
      format: 'paperback',
      rating: 4.6,
      review_count: 8932,
      is_bestseller: true,
      is_new_arrival: false,
      stock_quantity: 40,
      author_name: 'james clear',
      category_slug: 'self-help',
    },
    {
      title: 'The Midnight Library',
      slug: 'midnight-library',
      description: 'Between life and death there is a library filled with books about all the lives you could have lived. A dazzling novel about all the choices that go into a life well lived.',
      short_description: 'A novel about all the lives we could have lived',
      price: 424,
      original_price: 499,
      discount_percentage: 15,
      isbn: '978-0525559474',
      publisher: 'Viking',
      pages: 304,
      language: 'English',
      format: 'hardcover',
      rating: 4.6,
      review_count: 18765,
      is_bestseller: true,
      is_featured: true,
      stock_quantity: 40,
      author_name: 'morgan housel',
      category_slug: 'fiction',
    },
    {
      title: 'Think and Grow Rich',
      slug: 'think-and-grow-rich',
      description: 'The classic guide to success and wealth that has inspired millions worldwide. This timeless book reveals the secrets to achieving your goals.',
      short_description: 'The timeless classic on success',
      price: 199,
      original_price: 250,
      discount_percentage: 20,
      isbn: '978-0449214923',
      publisher: 'Fawcett Books',
      pages: 320,
      language: 'English',
      format: 'paperback',
      rating: 4.5,
      review_count: 32156,
      is_bestseller: true,
      stock_quantity: 45,
      author_name: 'morgan housel',
      category_slug: 'business-finance',
    },
    {
      title: 'The Magic of Thinking Big',
      slug: 'magic-thinking-big',
      description: 'Millions of readers have acquired the secrets of success through The Magic of Thinking Big. Achieve everything you always wanted: financial security, power, influence, and so much more.',
      short_description: 'Achieve everything you always wanted',
      price: 299,
      original_price: 350,
      discount_percentage: 15,
      isbn: '978-0671646783',
      publisher: 'Touchstone',
      pages: 320,
      language: 'English',
      format: 'paperback',
      rating: 4.4,
      review_count: 12890,
      is_bestseller: false,
      is_new_arrival: true,
      is_featured: true,
      stock_quantity: 35,
      author_name: 'james clear',
      category_slug: 'self-help',
    },
    {
      title: 'The Adventures of Tom Sawyer',
      slug: 'tom-sawyer',
      description: 'A beloved classic about a mischievous young boy and his adventures along the Mississippi River. Perfect for young readers.',
      short_description: 'A timeless adventure for young readers',
      price: 199,
      original_price: 250,
      discount_percentage: 20,
      isbn: '978-0486400778',
      publisher: 'Dover Publications',
      pages: 224,
      language: 'English',
      format: 'paperback',
      rating: 4.7,
      review_count: 5621,
      is_bestseller: true,
      age_group: '9-12 Years',
      stock_quantity: 60,
      author_name: 'morgan housel',
      category_slug: 'kids-books',
    },
    {
      title: 'The Secret Garden',
      slug: 'secret-garden',
      description: 'A heartwarming tale of a young girl who discovers a hidden garden and transforms her life. A classic children\'s story.',
      short_description: 'A magical tale of discovery',
      price: 179,
      original_price: 225,
      discount_percentage: 20,
      isbn: '978-0064401883',
      publisher: 'HarperCollins',
      pages: 288,
      language: 'English',
      format: 'paperback',
      rating: 4.8,
      review_count: 8932,
      is_bestseller: true,
      is_new_arrival: true,
      age_group: '6-8 Years',
      stock_quantity: 45,
      author_name: 'james clear',
      category_slug: 'kids-books',
    },
  ];

  // Create each book
  for (const bookData of books) {
    const { author_name, category_slug, ...book } = bookData;

    // Add references
    const authorUid = authorMap[author_name];
    const categoryUid = categoryMap[category_slug];

    if (!authorUid) {
      console.log(`   ⚠️  Author not found for "${book.title}", skipping reference`);
    } else {
      book.author = [{ uid: authorUid, _content_type_uid: 'author' }];
    }

    if (!categoryUid) {
      console.log(`   ⚠️  Category not found for "${book.title}", skipping reference`);
    } else {
      book.category = [{ uid: categoryUid, _content_type_uid: 'category' }];
    }

    try {
      console.log(`📖 Creating: ${book.title}...`);
      const result = await createEntry('book', book);
      console.log(`   ✅ Created`);

      // Publish
      await publishEntry('book', result.entry.uid);
      console.log(`   📤 Published to prod`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ⏭️  Already exists, skipping`);
      } else {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }
  }

  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                   Sample Books Added! 📚                        ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Books created and published:                                   ║
║  • The Psychology of Money (Business & Finance)                 ║
║  • Atomic Habits (Self-Help)                                    ║
║  • Deep Work (Self-Help)                                        ║
║  • The Midnight Library (Fiction)                               ║
║  • Think and Grow Rich (Business & Finance)                     ║
║  • The Magic of Thinking Big (Self-Help)                        ║
║  • The Adventures of Tom Sawyer (Kids Books)                    ║
║  • The Secret Garden (Kids Books)                               ║
║                                                                 ║
║  🌐 Refresh http://localhost:3000 to see the changes!           ║
║                                                                 ║
║  Note: Cover images need to be added manually in Contentstack   ║
║  Dashboard since the API doesn't support file uploads easily.   ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
  `);
}

setup().catch(console.error);


