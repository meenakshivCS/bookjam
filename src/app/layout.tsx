import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  title: 'BookJam - Your Destination for Books',
  description: 'Discover the best books across all genres at BookJam. Shop bestsellers, new arrivals, fiction, non-fiction, kids books and more with great discounts and free shipping.',
  keywords: 'books, bookstore, online bookstore, buy books, bestsellers, fiction, non-fiction, kids books, India',
  openGraph: {
    title: 'BookJam - Your Destination for Books',
    description: 'Discover the best books across all genres at BookJam.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BookJam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookJam - Your Destination for Books',
    description: 'Discover the best books across all genres at BookJam.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}


