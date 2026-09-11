import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PublicNavbar, PublicFooterWrapper } from '../components/PublicLayoutElements';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.llamacorp.in'),
  title: 'LlamaCorp | AI-Powered Web Design & Development Agency',
  description: 'AI-powered digital agency crafting intelligent, high-performance websites and digital products for ambitious businesses.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <PublicNavbar />
        <main className="flex-grow">
          {children}
        </main>
        <PublicFooterWrapper>
          <Footer />
        </PublicFooterWrapper>
      </body>
    </html>
  );
}
