import React, { useRef, useEffect } from "react";

/** Inline Noise overlay */
export const Noise = ({
  patternRefreshInterval = 2,
  patternAlpha = 16,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let frame = 0;
    let id = 0;
    const size = 1024;
    const resize = () => {
      canvas.width = size;
      canvas.height = size;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };
    const draw = () => {
      const img = ctx.createImageData(size, size);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; data[i + 1] = v; data[i + 2] = v; data[i + 3] = patternAlpha;
      }
      ctx.putImageData(img, 0, 0);
    };
    const loop = () => { if (frame % patternRefreshInterval === 0) draw(); frame++; id = requestAnimationFrame(loop); };
    window.addEventListener("resize", resize);
    resize(); loop();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(id); };
  }, [patternRefreshInterval, patternAlpha]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 z-0" style={{ imageRendering: "pixelated" }} />;
};

export function NoiseBackground({ children, className = "", as: Component = "div" }) {
  return (
    <Component className={`relative w-full bg-neutral-950 overflow-hidden ${className}`}>
      {/* spotlight */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_560px_at_50%_220px,#22d3ee33,transparent_70%)]" />
      
      {/* grid with top fade mask */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#64748b3a_1px,transparent_1px),linear-gradient(to_bottom,#64748b3a_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_90%_60%_at_50%_20%,#000_70%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_90%_60%_at_50%_20%,#000_70%,transparent_100%)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]" />
      
      <Noise patternAlpha={18} />

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </Component>
  );
}
