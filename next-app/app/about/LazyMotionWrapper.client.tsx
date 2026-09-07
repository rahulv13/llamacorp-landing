"use client";
import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

export default function LazyMotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
