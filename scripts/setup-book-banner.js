/**
 * Create Book and Banner content types (simplified version)
 */

const https = require('https');

const API_KEY = 'blta792e06fbd51e931';
const MANAGEMENT_TOKEN = process.argv[2] || 'cs86e6fbc7a6eabdf4bff1465e';

const contentTypes = [
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
        },
        {
          display_name: 'Description',
          uid: 'description',
          data_type: 'text',
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
        },
        {
          display_name: 'Price',
          uid: 'price',
          data_type: 'number',
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
        },
        {
          display_name: 'Publisher',
          uid: 'publisher',
          data_type: 'text',
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
        {
          display_name: 'Author',
          uid: 'author',
          data_type: 'reference',
          reference_to: ['author'],
        },
        {
          display_name: 'Category',
          uid: 'category',
          data_type: 'reference',
          reference_to: ['category'],
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
            reject(new Error(json.error_message || json.errors ? JSON.stringify(json.errors) : JSON.stringify(json)));
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

async function setup() {
  console.log('\n🚀 Creating Book and Banner content types...\n');

  for (const ct of contentTypes) {
    try {
      console.log(`📦 Creating content type: ${ct.content_type.title}...`);
      await makeRequest('POST', '/content_types', ct);
      console.log(`   ✅ Created ${ct.content_type.title}`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`   ⏭️  ${ct.content_type.title} already exists`);
      } else {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }
  }

  // Create a banner entry
  console.log('\n📝 Creating banner entry...\n');
  try {
    const result = await makeRequest('POST', '/content_types/banner/entries?locale=en-us', {
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
    });
    console.log('   ✅ Created banner');
    
    // Publish
    await makeRequest('POST', `/content_types/banner/entries/${result.entry.uid}/publish`, {
      entry: { environments: ['prod'], locales: ['en-us'] },
    });
    console.log('   📤 Published banner');
  } catch (error) {
    console.log(`   ⚠️  Banner: ${error.message}`);
  }

  console.log('\n✅ Done!\n');
}

setup().catch(console.error);

