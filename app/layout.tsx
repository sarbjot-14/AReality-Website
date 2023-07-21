import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import NavBarBurger from '@/components/ui/Navbar/NavBarBurger';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

export const dynamic = 'force-dynamic';

const meta = {
  title: 'AReality',
  description: 'AReality',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: '',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AReality',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-white loading">
        <SupabaseProvider>
          {/* @ts-ignore*/}
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] flex flex-col items-center my-20 "
          >
            <div className="w-full md:w-4/5">{children}</div>
          </main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
