# BookJam - Online Bookstore

A modern, beautiful bookstore website built with Next.js and Contentstack CMS, inspired by [Crossword Bookstores](https://www.crossword.in/).

![BookJam](https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=400&fit=crop)

## Features

- 📚 **Beautiful Book Catalog** - Browse books by categories, bestsellers, and new arrivals
- 🛒 **Shopping Cart** - Add books to cart with persistent storage
- 🔍 **Search Functionality** - Search for books by title, author, or description
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful animations and transitions with Framer Motion
- 🚀 **Fast Performance** - Built with Next.js 14 and optimized for speed
- 📝 **Contentstack CMS** - Headless CMS integration for easy content management

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **CMS**: [Contentstack](https://www.contentstack.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bookjam.git
   cd bookjam
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your Contentstack credentials:
   ```
   NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key
   NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contentstack Setup

### Content Types

Create the following content types in your Contentstack stack:

#### 1. Book (`book`)
| Field | Type | Required |
|-------|------|----------|
| title | Single Line Textbox | Yes |
| slug | Single Line Textbox | Yes |
| author | Reference (Author) | Yes |
| description | Multi Line Textbox | Yes |
| short_description | Single Line Textbox | No |
| cover_image | File | Yes |
| price | Number | Yes |
| original_price | Number | No |
| discount_percentage | Number | No |
| isbn | Single Line Textbox | Yes |
| publisher | Single Line Textbox | No |
| pages | Number | No |
| language | Single Line Textbox | No |
| format | Select (hardcover, paperback, ebook, audiobook) | No |
| category | Reference (Category) | Yes |
| rating | Number | No |
| review_count | Number | No |
| is_bestseller | Boolean | No |
| is_new_arrival | Boolean | No |
| is_featured | Boolean | No |
| stock_quantity | Number | No |
| age_group | Single Line Textbox | No |

#### 2. Category (`category`)
| Field | Type | Required |
|-------|------|----------|
| name | Single Line Textbox | Yes |
| slug | Single Line Textbox | Yes |
| description | Multi Line Textbox | No |
| icon | File | No |
| cover_image | File | No |
| color | Single Line Textbox | No |
| display_order | Number | No |
| is_featured | Boolean | No |

#### 3. Author (`author`)
| Field | Type | Required |
|-------|------|----------|
| name | Single Line Textbox | Yes |
| slug | Single Line Textbox | Yes |
| bio | Multi Line Textbox | No |
| photo | File | No |
| website | Single Line Textbox | No |

#### 4. Banner (`banner`)
| Field | Type | Required |
|-------|------|----------|
| title | Single Line Textbox | Yes |
| subtitle | Single Line Textbox | No |
| description | Multi Line Textbox | No |
| background_image | File | Yes |
| cta_text | Single Line Textbox | No |
| cta_link | Single Line Textbox | No |
| text_color | Select (light, dark) | No |
| display_order | Number | No |
| is_active | Boolean | No |

## Project Structure

```
bookstore/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── book/[slug]/      # Book detail page
│   │   ├── category/[slug]/  # Category page
│   │   ├── bestsellers/      # Bestsellers page
│   │   └── search/           # Search results page
│   ├── components/           # React components
│   │   ├── Header.tsx        # Site header with navigation
│   │   ├── Footer.tsx        # Site footer
│   │   ├── BookCard.tsx      # Book card component
│   │   ├── BookCarousel.tsx  # Horizontal book carousel
│   │   ├── CartDrawer.tsx    # Shopping cart drawer
│   │   ├── HeroBanner.tsx    # Hero banner slider
│   │   ├── GenreGrid.tsx     # Category grid
│   │   ├── FeaturesBar.tsx   # Features/benefits bar
│   │   └── PromoSection.tsx  # Promotional section
│   └── lib/                  # Utility functions and types
│       ├── contentstack.ts   # Contentstack SDK setup
│       ├── types.ts          # TypeScript interfaces
│       ├── mock-data.ts      # Mock data for development
│       └── cart-store.ts     # Zustand cart store
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
- `primary` - Main brand color (orange)
- `secondary` - Supporting color (blue-gray)
- `accent` - Accent color (purple)

### Fonts
The site uses:
- **Playfair Display** - For headings
- **Source Sans 3** - For body text
- **Crimson Pro** - For accent text

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by [Crossword Bookstores](https://www.crossword.in/)
- Book cover images from [Unsplash](https://unsplash.com/)
- Icons from [Lucide](https://lucide.dev/)

