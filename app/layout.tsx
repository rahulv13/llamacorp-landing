import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MagneticTopNavbar from '../components/MagneticTopNavbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'LlamaCorp',
  description: 'AI-powered digital agency crafting intelligent, high-performance websites and digital products for ambitious businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <MagneticTopNavbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
