import SupabaseProvider from '../supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import SideBar from './(components)/SideBar/SideBar';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <div className="bg-white loading max-h-500 ml-24 md:ml-52 ">
      <SideBar></SideBar>
      {children}
    </div>
  );
}
