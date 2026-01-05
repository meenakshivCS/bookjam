import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Blog - BookJam',
  description: 'Discover book reviews, reading tips, author interviews, and literary news on the BookJam blog.',
};

const blogPosts = [
  {
    id: 1,
    title: '10 Must-Read Books for 2026',
    excerpt: 'Start the new year right with our curated list of the most anticipated books of 2026. From fiction to self-help, we\'ve got you covered.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
    author: 'Priya Sharma',
    date: 'January 2, 2026',
    category: 'Book Lists',
  },
  {
    id: 2,
    title: 'The Rise of Indian Authors in Global Literature',
    excerpt: 'Indian authors are making waves on the international stage. We explore how contemporary Indian literature is captivating readers worldwide.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
    author: 'Rahul Mehta',
    date: 'December 28, 2025',
    category: 'Industry News',
  },
  {
    id: 3,
    title: 'How to Build a Reading Habit in 2026',
    excerpt: 'Struggling to read more? Here are practical tips and strategies to help you develop a consistent reading habit this year.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600',
    author: 'Ananya Patel',
    date: 'December 20, 2025',
    category: 'Reading Tips',
  },
  {
    id: 4,
    title: 'Interview: Amish Tripathi on Mythology in Modern Fiction',
    excerpt: 'We sat down with bestselling author Amish Tripathi to discuss his unique approach to retelling ancient Indian epics.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600',
    author: 'Vikram Singh',
    date: 'December 15, 2025',
    category: 'Author Interviews',
  },
  {
    id: 5,
    title: 'Best Children\'s Books to Inspire Young Readers',
    excerpt: 'Looking for books to ignite your child\'s imagination? Check out our top picks for young readers of all ages.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
    author: 'Priya Sharma',
    date: 'December 10, 2025',
    category: 'Kids Books',
  },
  {
    id: 6,
    title: 'The Art of Book Cover Design',
    excerpt: 'Ever wondered what goes into creating an eye-catching book cover? We explore the creative process behind some iconic designs.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600',
    author: 'Ananya Patel',
    date: 'December 5, 2025',
    category: 'Behind the Scenes',
  },
];

const categories = ['All', 'Book Lists', 'Reading Tips', 'Author Interviews', 'Industry News', 'Kids Books'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            BookJam Blog
          </h1>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto">
            Book reviews, reading tips, author interviews, and everything literary.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-body text-sm transition-all ${
                category === 'All'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-body mb-4 w-fit">
                  {blogPosts[0].category}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="font-body text-secondary-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-secondary-500 font-body text-sm mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </span>
                </div>
                <Link href="#" className="btn-primary w-fit flex items-center gap-2">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-xs font-body mb-3">
                  {post.category}
                </span>
                <h3 className="font-display text-lg font-bold text-charcoal mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-body text-secondary-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-secondary-500 font-body text-xs">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-outline">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}

