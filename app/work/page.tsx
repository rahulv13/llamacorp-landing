import React from 'react';
import type { Metadata } from 'next';
import WorkClient from '../../components/work/WorkClient';

export const metadata: Metadata = {
  title: 'Our Work - Case Studies & Portfolio | LlamaCorp',
  description: 'Explore Llamacorp\'s latest web design and development projects. See how we help startups and enterprises achieve digital excellence.',
  alternates: {
    canonical: 'https://llamacorp.com/work',
  },
  openGraph: {
    title: 'Our Work - Case Studies & Portfolio | LlamaCorp',
    description: 'Explore Llamacorp\'s latest web design and development projects. See how we help startups and enterprises achieve digital excellence.',
    type: 'website',
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
