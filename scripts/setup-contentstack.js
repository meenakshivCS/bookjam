/**
 * Contentstack Setup Script
 * 
 * This script creates all the required content types for BookJam
 * 
 * Usage:
 * 1. Get your Management Token from Contentstack:
 *    Settings → Tokens → Add Management Token
 * 
 * 2. Run this script:
 *    node scripts/setup-contentstack.js YOUR_MANAGEMENT_TOKEN
 */

const https = require('https');

const API_KEY = 'blta792e06fbd51e931';
const MANAGEMENT_TOKEN = process.argv[2];

if (!MANAGEMENT_TOKEN) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                  BookJam Contentstack Setup                     ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  To run this script, you need a Management Token:              ║
║                                                                 ║
║  1. Go to Contentstack Dashboard                                ║
║  2. Settings → Tokens → Add Management Token                    ║
║  3. Give it a name like "BookJam Setup"                         ║
║  4. Copy the token                                              ║
║                                                                 ║
║  Then run:                                                      ║
║  node scripts/setup-contentstack.js YOUR_MANAGEMENT_TOKEN       ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
  `);
  process.exit(1);
}

// Content Type Definitions
const contentTypes = [
  {
    content_type: {
      title: 'Author',
      uid: 'author',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true,
          unique: true,
          field_metadata: { _default: true },
        },
        {
          display_name: 'Name',
          uid: 'name',
          data_type: 'text',
          mandatory: true,
        },
        {
          display_name: 'Slug',
          uid: 'slug',
          data_type: 'text',
          mandatory: true,
          unique: true,
        },
        {
          display_name: 'Bio',
          uid: 'bio',
          data_type: 'text',
          field_metadata: { multiline: true },
        },
        {
          display_name: 'Photo',
          uid: 'photo',
          data_type: 'file',
        },
        {
          display_name: 'Website',
          uid: 'website',
          data_type: 'text',
        },
      ],
      options: {
        title: 'name',
        publishable: true,
        is_page: false,
      },
    },
  },
  {
    content_type: {
      title: 'Category',
      uid: 'category',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true,
          unique: true,
          field_metadata: { _default: true },
        },
        {
          display_name: 'Name',
          uid: 'name',
          data_type: 'text',
          mandatory: true,
        },
        {
          display_name: 'Slug',
          uid: 'slug',
          data_type: 'text',
          mandatory: true,
          unique: true,
        },
        {
          display_name: 'Description',
          uid: 'description',
          data_type: 'text',
          field_metadata: { multiline: true },
        },
        {
          display_name: 'Icon',
          uid: 'icon',
          data_type: 'file',
        },
        {
          display_name: 'Cover Image',
          uid: 'cover_image',
          data_type: 'file',
        },
        {
          display_name: 'Color',
          uid: 'color',
          data_type: 'text',
          field_metadata: {
            description: 'Hex color code (e.g., #e87523)',
          },
        },
        {
          display_name: 'Display Order',
          uid: 'display_order',
          data_type: 'number',
        },
        {
          display_name: 'Is Featured',
          uid: 'is_featured',
          data_type: 'boolean',
        },
      ],
      options: {
        title: 'name',
        publishable: true,
        is_page: false,
      },
    },
  },
  {
    content_type: {
      title: 'Book',
      uid: 'book',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true,
          unique: true,
          field_metadata: { _default: true },
        },
        {
          display_name: 'Slug',
          uid: 'slug',
          data_type: 'text',
          mandatory: true,
          unique: true,
        },
        {
          display_name: 'Author',
          uid: 'author',
          data_type: 'reference',
          reference_to: ['author'],
          mandatory: true,
        },
        {
          display_name: 'Description',
          uid: 'description',
          data_type: 'text',
          mandatory: true,
          field_metadata: { multiline: true },
        },
        {
          display_name: 'Short Description',
          uid: 'short_description',
          data_type: 'text',
        },
        {
          display_name: 'Cover Image',
          uid: 'cover_image',
          data_type: 'file',
          mandatory: true,
        },
        {
          display_name: 'Price',
          uid: 'price',
          data_type: 'number',
          mandatory: true,
        },
        {
          display_name: 'Original Price',
          uid: 'original_price',
          data_type: 'number',
        },
        {
          display_name: 'Discount Percentage',
          uid: 'discount_percentage',
          data_type: 'number',
        },
        {
          display_name: 'ISBN',
          uid: 'isbn',
          data_type: 'text',
          mandatory: true,
        },
        {
          display_name: 'Publisher',
          uid: 'publisher',
          data_type: 'text',
        },
        {
          display_name: 'Publication Date',
          uid: 'publication_date',
          data_type: 'isodate',
        },
        {
          display_name: 'Pages',
          uid: 'pages',
          data_type: 'number',
        },
        {
          display_name: 'Language',
          uid: 'language',
          data_type: 'text',
        },
        {
          display_name: 'Format',
          uid: 'format',
          data_type: 'text',
          enum: {
            advanced: false,
            choices: [
              { value: 'hardcover' },
              { value: 'paperback' },
              { value: 'ebook' },
              { value: 'audiobook' },
            ],
          },
        },
        {
          display_name: 'Category',
          uid: 'category',
          data_type: 'reference',
          reference_to: ['category'],
          mandatory: true,
        },
        {
          display_name: 'Rating',
          uid: 'rating',
          data_type: 'number',
        },
        {
          display_name: 'Review Count',
          uid: 'review_count',
          data_type: 'number',
        },
        {
          display_name: 'Is Bestseller',
          uid: 'is_bestseller',
          data_type: 'boolean',
        },
        {
          display_name: 'Is New Arrival',
          uid: 'is_new_arrival',
          data_type: 'boolean',
        },
        {
          display_name: 'Is Featured',
          uid: 'is_featured',
          data_type: 'boolean',
        },
        {
          display_name: 'Stock Quantity',
          uid: 'stock_quantity',
          data_type: 'number',
        },
        {
          display_name: 'Age Group',
          uid: 'age_group',
          data_type: 'text',
        },
      ],
      options: {
        title: 'title',
        publishable: true,
        is_page: false,
      },
    },
  },
  {
    content_type: {
      title: 'Banner',
      uid: 'banner',
      schema: [
        {
          display_name: 'Title',
          uid: 'title',
          data_type: 'text',
          mandatory: true,
          unique: true,
          field_metadata: { _default: true },
        },
        {
          display_name: 'Subtitle',
          uid: 'subtitle',
          data_type: 'text',
        },
        {
          display_name: 'Description',
          uid: 'description',
          data_type: 'text',
          field_metadata: { multiline: true },
        },
        {
          display_name: 'Background Image',
          uid: 'background_image',
          data_type: 'file',
          mandatory: true,
        },
        {
          display_name: 'CTA Text',
          uid: 'cta_text',
          data_type: 'text',
        },
        {
          display_name: 'CTA Link',
          uid: 'cta_link',
          data_type: 'text',
        },
        {
          display_name: 'Text Color',
          uid: 'text_color',
          data_type: 'text',
          enum: {
            advanced: false,
            choices: [{ value: 'light' }, { value: 'dark' }],
          },
        },
        {
          display_name: 'Display Order',
          uid: 'display_order',
          data_type: 'number',
        },
        {
          display_name: 'Is Active',
          uid: 'is_active',
          data_type: 'boolean',
        },
      ],
      options: {
        title: 'title',
        publishable: true,
        is_page: false,
      },
    },
  },
];

// Sample content entries
const sampleEntries = {
  author: [
    {
      entry: {
        title: 'Morgan Housel',
        name: 'Morgan Housel',
        slug: 'morgan-housel',
        bio: 'Morgan Housel is a partner at The Collaborative Fund and a former columnist at The Motley Fool and The Wall Street Journal.',
      },
    },
    {
      entry: {
        title: 'James Clear',
        name: 'James Clear',
        slug: 'james-clear',
        bio: 'James Clear is an author and speaker focused on habits, decision-making, and continuous improvement.',
      },
    },
  ],
  category: [
    {
      entry: {
        title: 'Fiction',
        name: 'Fiction',
        slug: 'fiction',
        description: 'Explore worlds beyond imagination',
        color: '#e87523',
        display_order: 1,
        is_featured: true,
      },
    },
    {
      entry: {
        title: 'Non-Fiction',
        name: 'Non-Fiction',
        slug: 'non-fiction',
        description: 'Real stories, real insights',
        color: '#577ca2',
        display_order: 2,
        is_featured: true,
      },
    },
    {
      entry: {
        title: 'Self-Help',
        name: 'Self-Help',
        slug: 'self-help',
        description: 'Transform your life',
        color: '#d946ef',
        display_order: 3,
        is_featured: true,
      },
    },
    {
      entry: {
        title: 'Business & Finance',
        name: 'Business & Finance',
        slug: 'business-finance',
        description: 'Master the art of wealth',
        color: '#059669',
        display_order: 4,
        is_featured: true,
      },
    },
    {
      entry: {
        title: 'Kids Books',
        name: 'Kids Books',
        slug: 'kids-books',
        description: 'Adventures for young minds',
        color: '#f59e0b',
        display_order: 5,
        is_featured: true,
      },
    },
  ],
  banner: [
    {
      entry: {
        title: 'New Year Reading Goals',
        subtitle: 'Start 2026 Right',
        description: 'Discover books that will transform your year. Up to 40% off on bestsellers!',
        cta_text: 'Shop Now',
        cta_link: '/bestsellers',
        text_color: 'light',
        display_order: 1,
        is_active: true,
      },
    },
  ],
};

// API request helper
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

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Main setup function
async function setup() {
  console.log('\n🚀 Starting BookJam Contentstack Setup...\n');

  // Create content types
  for (const ct of contentTypes) {
    try {
      console.log(`📦 Creating content type: ${ct.content_type.title}...`);
      await makeRequest('POST', '/content_types', ct);
      console.log(`   ✅ Created ${ct.content_type.title}`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ⏭️  ${ct.content_type.title} already exists, skipping`);
      } else {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }
  }

  console.log('\n📝 Creating sample entries...\n');

  // Create sample entries (except books which need references)
  for (const [contentType, entries] of Object.entries(sampleEntries)) {
    for (const entry of entries) {
      try {
        console.log(`   Creating ${contentType}: ${entry.entry.title}...`);
        const result = await makeRequest(
          'POST',
          `/content_types/${contentType}/entries?locale=en-us`,
          entry
        );
        console.log(`   ✅ Created ${entry.entry.title}`);
        
        // Publish the entry
        try {
          await makeRequest(
            'POST',
            `/content_types/${contentType}/entries/${result.entry.uid}/publish`,
            {
              entry: {
                environments: ['prod'],
                locales: ['en-us'],
              },
            }
          );
          console.log(`   📤 Published ${entry.entry.title}`);
        } catch (pubError) {
          console.log(`   ⚠️  Could not publish: ${pubError.message}`);
        }
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`   ⏭️  ${entry.entry.title} already exists`);
        } else {
          console.log(`   ❌ Error: ${error.message}`);
        }
      }
    }
  }

  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                     Setup Complete! 🎉                          ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Content types created:                                         ║
║  • Author                                                       ║
║  • Category                                                     ║
║  • Book                                                         ║
║  • Banner                                                       ║
║                                                                 ║
║  Sample entries added to Author, Category, and Banner.          ║
║                                                                 ║
║  Next steps:                                                    ║
║  1. Go to Contentstack Dashboard                                ║
║  2. Add Book entries (they need Author & Category references)   ║
║  3. Upload cover images for books                               ║
║  4. Publish all entries to 'prod' environment                   ║
║  5. Refresh your website at http://localhost:3000               ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
  `);
}

setup().catch(console.error);


