"use client";
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import PageTransitionSystem from '../sections/PageTransitionSystem';

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageTransitionSystem key={pathname}>
        {children}
      </PageTransitionSystem>
    </AnimatePresence>
  );
}
