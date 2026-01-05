# Contentstack Content Types for BookJam

This document describes the content types you need to create in Contentstack to power the BookJam bookstore website.

## Quick Setup Guide

1. Log in to your Contentstack account
2. Create a new Stack or use an existing one
3. Go to Content Models and create the following content types
4. Create sample entries for each content type
5. Update your `.env.local` file with your Stack credentials

---

## Content Types

### 1. Book

**UID**: `book`

This is the main content type for storing book information.

| Field Name | Field UID | Field Type | Required | Notes |
|------------|-----------|------------|----------|-------|
| Title | `title` | Single Line Textbox | Yes | Book title |
| URL | `url` | Single Line Textbox | Yes | URL-friendly slug (e.g., `/books/psychology-of-money`) |
| Author | `author` | Reference | Yes | Reference to Author content type |
| Description | `description` | Multi Line Textbox | Yes | Full book description |
| Short Description | `short_description` | Single Line Textbox | No | Brief tagline |
| Cover Image | `cover_image` | File | Yes | Book cover image |
| Price | `price` | Number | Yes | Current selling price in INR |
| Original Price | `original_price` | Number | No | Original price before discount |
| Discount Percentage | `discount_percentage` | Number | No | Discount percentage |
| ISBN | `isbn` | Single Line Textbox | Yes | ISBN number |
| Publisher | `publisher` | Single Line Textbox | No | Publisher name |
| Publication Date | `publication_date` | Date | No | Publication date |
| Pages | `pages` | Number | No | Number of pages |
| Language | `language` | Single Line Textbox | No | Book language |
| Format | `format` | Select | No | Options: hardcover, paperback, ebook, audiobook |
| Category | `category` | Reference | Yes | Reference to Category content type |
| Tags | `tags` | Tags | No | Additional tags for search |
| Rating | `rating` | Number | No | Average rating (1-5) |
| Review Count | `review_count` | Number | No | Number of reviews |
| Is Bestseller | `is_bestseller` | Boolean | No | Mark as bestseller |
| Is New Arrival | `is_new_arrival` | Boolean | No | Mark as new arrival |
| Is Featured | `is_featured` | Boolean | No | Feature on homepage |
| Stock Quantity | `stock_quantity` | Number | No | Available stock |
| Age Group | `age_group` | Single Line Textbox | No | Target age group (for kids books) |

---

### 2. Category

**UID**: `category`

Categories for organizing books.

| Field Name | Field UID | Field Type | Required | Notes |
|------------|-----------|------------|----------|-------|
| Title | `title` | Single Line Textbox | Yes | Internal title |
| Name | `name` | Single Line Textbox | Yes | Display name |
| URL | `url` | Single Line Textbox | Yes | URL-friendly slug |
| Description | `description` | Multi Line Textbox | No | Category description |
| Icon | `icon` | File | No | Category icon |
| Cover Image | `cover_image` | File | No | Banner image |
| Color | `color` | Single Line Textbox | No | Hex color code (e.g., #e87523) |
| Parent Category | `parent_category` | Reference | No | Reference to parent Category (for subcategories) |
| Display Order | `display_order` | Number | No | Order in navigation |
| Is Featured | `is_featured` | Boolean | No | Show on homepage |

**Suggested Categories:**
- Fiction
- Non-Fiction
- Self-Help
- Business & Finance
- Mystery & Thriller
- Kids Books
- Romance
- Fantasy & Adventure

---

### 3. Author

**UID**: `author`

Author information.

| Field Name | Field UID | Field Type | Required | Notes |
|------------|-----------|------------|----------|-------|
| Title | `title` | Single Line Textbox | Yes | Internal title |
| Name | `name` | Single Line Textbox | Yes | Author's full name |
| URL | `url` | Single Line Textbox | Yes | URL-friendly slug |
| Bio | `bio` | Multi Line Textbox | No | Author biography |
| Photo | `photo` | File | No | Author headshot |
| Website | `website` | Single Line Textbox | No | Author's website URL |
| Social Links | `social_links` | Group | No | Social media links |
| ├─ Twitter | `twitter` | Single Line Textbox | No | Twitter handle |
| ├─ Instagram | `instagram` | Single Line Textbox | No | Instagram handle |
| └─ Facebook | `facebook` | Single Line Textbox | No | Facebook page |

---

### 4. Banner

**UID**: `banner`

Hero banners for the homepage slider.

| Field Name | Field UID | Field Type | Required | Notes |
|------------|-----------|------------|----------|-------|
| Title | `title` | Single Line Textbox | Yes | Main headline |
| Subtitle | `subtitle` | Single Line Textbox | No | Secondary headline |
| Description | `description` | Multi Line Textbox | No | Supporting text |
| Background Image | `background_image` | File | Yes | Banner image (1600x600 recommended) |
| CTA Text | `cta_text` | Single Line Textbox | No | Button text |
| CTA Link | `cta_link` | Single Line Textbox | No | Button link URL |
| Text Color | `text_color` | Select | No | Options: light, dark |
| Display Order | `display_order` | Number | No | Order in carousel |
| Is Active | `is_active` | Boolean | No | Show/hide banner |

---

### 5. Promotion

**UID**: `promotion`

Special promotions and offers.

| Field Name | Field UID | Field Type | Required | Notes |
|------------|-----------|------------|----------|-------|
| Title | `title` | Single Line Textbox | Yes | Promotion name |
| Description | `description` | Multi Line Textbox | No | Promotion details |
| Discount Code | `discount_code` | Single Line Textbox | No | Coupon code |
| Discount Percentage | `discount_percentage` | Number | No | Discount amount |
| Start Date | `start_date` | Date | Yes | Promotion start |
| End Date | `end_date` | Date | Yes | Promotion end |
| Banner Image | `banner_image` | File | No | Promotional banner |
| Applicable Categories | `applicable_categories` | Reference | No | Reference to Categories |
| Is Active | `is_active` | Boolean | No | Enable/disable |

---

### 6. Navigation

**UID**: `navigation`

Site navigation structure.

| Field Name | Field UID | Field Type | Required | Notes |
|------------|-----------|------------|----------|-------|
| Title | `title` | Single Line Textbox | Yes | Navigation name |
| Items | `items` | Modular Blocks | Yes | Navigation items |

**Modular Block - Navigation Item:**
| Field Name | Field UID | Field Type | Required |
|------------|-----------|------------|----------|
| Label | `label` | Single Line Textbox | Yes |
| URL | `url` | Single Line Textbox | Yes |
| Icon | `icon` | Single Line Textbox | No |
| Children | `children` | Modular Blocks | No |

---

## API Endpoints

Once you've created your content types and entries, you can access them via the Contentstack Delivery API:

```
GET /v3/content_types/book/entries
GET /v3/content_types/category/entries
GET /v3/content_types/author/entries
GET /v3/content_types/banner/entries
```

## Environment Variables

Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment
NEXT_PUBLIC_CONTENTSTACK_REGION=us  # or eu, azure_na, azure_eu
```

## Sample Content

After creating the content types, add at least:
- 10-15 books with various categories
- 8 categories (matching the ones in mock-data.ts)
- 5-10 authors
- 3 banners for the homepage carousel

This will give you enough content to fully showcase the website.

