"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const IMAGES = [
    "/assets/1.avif",
    "/assets/2.avif",
    "/assets/3.avif",
    "/assets/4.avif",
    "/assets/5.avif",
    "/assets/6.avif",
    "/assets/7.avif",
    "/assets/8.avif",
    "/assets/9.avif",
    "/assets/10.avif",
    "/assets/11.avif",
    "/assets/card1_branding.png",
    "/assets/card2_illustrations.png"
];

export function CtaImageArc() {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    // Responsive container measurement
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        observer.observe(containerRef.current);
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });
        return () => observer.disconnect();
    }, []);

    // Mouse parallax setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });

    useEffect(() => {
        // We use window for mouse move to capture movement anywhere on screen
        const handleMouseMove = (e) => {
            // Respect prefers-reduced-motion
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) return;

            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
            // Subtle movement +/- 30px
            mouseX.set(normalizedX * 30);
            mouseY.set(normalizedY * 30);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Setup active images based on device width
    const isMobile = containerSize.width > 0 && containerSize.width < 768;
    const totalCards = isMobile ? 6 : 13;
    const activeImages = IMAGES.slice(0, totalCards);
    const size = isMobile ? 80 : 120; // 96-130px approx on desktop

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {containerSize.width > 0 && activeImages.map((src, i) => {
                // Arc math: Start near lower-left, arch over center, end near lower-right
                const startAngle = Math.PI * 1.05; // Slightly below horizontal left
                const endAngle = -Math.PI * 0.05;  // Slightly below horizontal right
                const angle = startAngle - (i / (totalCards - 1)) * (startAngle - endAngle);
                
                // Ellipse dimensions relative to container
                const rx = containerSize.width * 0.48; 
                const ry = containerSize.height * 0.55; 
                const cx = containerSize.width / 2;
                const cy = containerSize.height * 0.85; // Center is low so the arc arches above
                
                const x = cx + Math.cos(angle) * rx;
                const y = cy - Math.sin(angle) * ry; 
                
                // Add varied rotation
                const tangentRot = (angle * 180) / Math.PI + 90;
                const randomOffset = (i % 3 === 0) ? -12 : (i % 2 === 0 ? 15 : -5);
                const rotation = tangentRot + randomOffset;
                
                const scale = 1 + (i % 3 === 0 ? 0.15 : (i % 2 === 0 ? -0.1 : 0.05));
                const parallaxFactor = 0.5 + (i % 3) * 0.3;

                return (
                    <FloatingCard 
                        key={i}
                        src={src}
                        i={i}
                        size={size}
                        x={x}
                        y={y}
                        rotation={rotation}
                        scale={scale}
                        parallaxFactor={parallaxFactor}
                        smoothMouseX={smoothMouseX}
                        smoothMouseY={smoothMouseY}
                    />
                );
            })}
        </div>
    );
}

function FloatingCard({ src, i, size, x, y, rotation, scale, parallaxFactor, smoothMouseX, smoothMouseY }) {
    const animatedX = useTransform(smoothMouseX, (v) => x - size/2 + v * parallaxFactor);
    const animatedY = useTransform(smoothMouseY, (v) => y - size/2 + v * parallaxFactor);

    return (
        <motion.div
            className="absolute"
            style={{
                width: size,
                height: size,
                x: animatedX,
                y: animatedY,
                rotate: rotation,
                scale: scale,
            }}
        >
            <motion.div
                className="w-full h-full rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden bg-white/5 border border-white/10"
                animate={{ y: [0, -12, 0] }}
                transition={{
                    duration: 5 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15
                }}
            >
                {/* Subtle inner reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay z-10" />
                <img 
                    src={src} 
                    alt="Project Highlight" 
                    className="w-full h-full object-cover opacity-80 contrast-125 saturate-50" 
                />
            </motion.div>
        </motion.div>
    );
}
