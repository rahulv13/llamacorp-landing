import React from 'react';
import type { Metadata } from 'next';
import ServicesClient from '../../components/services/ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | LlamaCorp',
  description: 'We help ambitious teams turn complex ideas into clear, high-performing digital experiences.',
  alternates: {
    canonical: 'https://llamacorp.com/services',
  },
  openGraph: {
    title: 'Our Services | LlamaCorp',
    description: 'We help ambitious teams turn complex ideas into clear, high-performing digital experiences.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
