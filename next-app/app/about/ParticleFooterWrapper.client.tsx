"use client";
import dynamic from 'next/dynamic';

const ParticleFooter = dynamic(() => import('@/components/sections/about/ParticleFooter'), { ssr: false });

export default function ParticleFooterWrapper() {
  return <ParticleFooter />;
}
