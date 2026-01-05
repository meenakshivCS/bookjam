import HeroBanner from '@/components/HeroBanner';
import GenreGrid from '@/components/GenreGrid';
import BookCarousel from '@/components/BookCarousel';
import FeaturesBar from '@/components/FeaturesBar';
import PromoSection from '@/components/PromoSection';
import {
  getBestsellers,
  getNewArrivals,
  getFeaturedBooks,
  getKidsBooks,
} from '@/lib/contentstack-data';

export default async function Home() {
  const bestsellers = await getBestsellers();
  const newArrivals = await getNewArrivals();
  const featuredBooks = await getFeaturedBooks();
  const kidsBooks = await getKidsBooks();

  return (
    <>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Features Bar */}
      <FeaturesBar />

      {/* Genre Grid */}
      <GenreGrid />

      {/* Featured Books */}
      <div className="bg-gradient-to-b from-white to-primary-50/30">
        <BookCarousel
          title="Editor's Picks"
          subtitle="Staff Favorites"
          books={featuredBooks}
          viewAllLink="/featured"
          variant="featured"
        />
      </div>

      {/* Best Sellers */}
      <BookCarousel
        title="Best Sellers"
        subtitle="Top Charts"
        books={bestsellers}
        viewAllLink="/bestsellers"
      />

      {/* Promo Section */}
      <PromoSection />

      {/* New Arrivals */}
      <div className="bg-gradient-to-b from-cream to-white">
        <BookCarousel
          title="New Arrivals"
          subtitle="Just Landed"
          books={newArrivals}
          viewAllLink="/new-arrivals"
          variant="featured"
        />
      </div>

      {/* Kids Books */}
      <BookCarousel
        title="Best of Children's Books"
        subtitle="For Young Readers"
        books={kidsBooks}
        viewAllLink="/category/kids-books"
      />
    </>
  );
}

