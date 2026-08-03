import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  expandable?: boolean;
  width?: string;
  height?: string;
  expandedWidth?: string;
  expandedHeight?: string;
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  shadowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  glowIntensity?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  borderRadius?: string;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = '',
  draggable = false,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'xl',
  borderRadius = '32px',
  glowIntensity = 'sm',
  shadowIntensity = 'md',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = (e: React.MouseEvent) => {
    if (!expandable) return;
    if ((e.target as HTMLElement).closest('a, button, input, select, textarea')) return;
    setIsExpanded(!isExpanded);
  };

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  const shadowStyles = {
    none: 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
    xs: 'inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.3)',
    sm: 'inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35)',
    md: 'inset 1px 1px 2px 0 rgba(255, 255, 255, 0.2), inset -1px -1px 2px 0 rgba(255, 255, 255, 0.1)',
    lg: 'inset 4px 4px 4px 0 rgba(255, 255, 255, 0.5), inset -4px -4px 4px 0 rgba(255, 255, 255, 0.5)',
    xl: 'inset 6px 6px 6px 0 rgba(255, 255, 255, 0.55), inset -6px -6px 6px 0 rgba(255, 255, 255, 0.55)',
    '2xl': 'inset 8px 8px 8px 0 rgba(255, 255, 255, 0.6), inset -8px -8px 8px 0 rgba(255, 255, 255, 0.6)',
  };

  const glowStyles = {
    none: '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
    xs: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 16px rgba(255, 255, 255, 0.05)',
    sm: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 12px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    md: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(255, 255, 255, 0.15)',
    lg: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(255, 255, 255, 0.2)',
    xl: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 48px rgba(255, 255, 255, 0.25)',
    '2xl': '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 60px rgba(255, 255, 255, 0.3)',
  };

  const MotionComponent = draggable || expandable ? motion.div : 'div';

  const motionProps = (draggable || expandable)
    ? {
        animate: expandable ? (isExpanded ? 'expanded' : 'collapsed') : undefined,
        onClick: expandable ? handleToggleExpansion : undefined,
        drag: draggable,
        dragConstraints: draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined,
        dragElastic: draggable ? 0.3 : undefined,
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.98 },
      }
    : {};

  return (
    <MotionComponent
      className={`relative ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${expandable ? 'cursor-pointer' : ''} ${className}`}
      style={{
        borderRadius,
        ...(width && !expandable && { width }),
        ...(height && !expandable && { height }),
      }}
      {...motionProps}
      {...props}
    >
      {/* 1. Refraction Bend Layer */}
      <div
        className={`absolute inset-0 ${blurClasses[blurIntensity]} z-0`}
        style={{
          borderRadius,
          filter: 'url(#glass-blur)',
        }}
      />

      {/* 2. Glow / Ambient Shadow Layer */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          borderRadius,
          boxShadow: glowStyles[glowIntensity],
        }}
      />

      {/* 3. Rim Highlight Layer */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          borderRadius,
          boxShadow: shadowStyles[shadowIntensity],
        }}
      />

      {/* 4. Content */}
      <div className="relative z-30 h-full">{children}</div>
    </MotionComponent>
  );
};
