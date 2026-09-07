import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper';
import { JsonLd } from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar />
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
        <Footer />
        <JsonLd schema={getOrganizationSchema()} />
        <JsonLd schema={getWebsiteSchema()} />
      </body>
    </html>
  );
}
