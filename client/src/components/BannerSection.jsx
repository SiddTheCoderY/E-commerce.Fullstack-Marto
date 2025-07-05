import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/nightside.jpg",
  "/images/FirstPageBanner.png",
  "/images/secondPageBanner.png",
];

const svgs = [
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 12l18-12v24z"/></svg>`, // Triangle
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 2h20v20H2z"/></svg>`, // Square
  // More Different squares
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16v16H4z"/></svg>`, // Square with rounded corners
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M6 6h12v12H6z"/></svg>`, // Square with border
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 8h8v8H8z"/></svg>`, // Square with diagonal lines
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L2 22h20L12 2z"/></svg>`, // Triangle with border
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L2 22h20L12 2z"/></svg>`, // Triangle with diagonal lines
  `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 4v16l11-8z"/></svg>`, // Media play
];

export default function BannerSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: left→right, -1: right→left
  const [shapes, setShapes] = useState([]);
  const bannerRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setDirection((d) => d * -1); // flip direction each time
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const createParticle = (x, y) => {
    const id = Date.now() + Math.random();
    const icon = svgs[Math.floor(Math.random() * svgs.length)];
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    const rotate = Math.random() * 720;
    const size = Math.random() * 120 + 50; // Bigger size

    return { id, x, y, icon, color, rotate, size };
  };

  const handleMouseMove = (e) => {
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const shape = createParticle(x, y);
    setShapes((prev) => [...prev, shape]);

    setTimeout(() => {
      setShapes((prev) => prev.filter((s) => s.id !== shape.id));
    }, 1200);
  };

  const handleClick = (e) => {
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const burst = Array.from({ length: 8 }, () => createParticle(x, y));
    setShapes((prev) => [...prev, ...burst]);

    setTimeout(() => {
      const ids = burst.map((s) => s.id);
      setShapes((prev) => prev.filter((s) => !ids.includes(s.id)));
    }, 1500);
  };

  // Calculate next index for the background image
  const nextIndex = (index + 1) % images.length;

  // clipPath animations based on direction
  // left→right: clipPath inset from right 0% to 100% (hides current image left→right)
  // right→left: clipPath inset from left 0% to 100%
  const clipPathStart = "inset(0% 0% 0% 0%)";
  const clipPathEnd =
    direction === 1 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";

  return (
    <div
      loading="lazy"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="relative w-full h-full overflow-hidden rounded-xl shadow-md"
    >
      {/* Next image behind */}
      <div
        className="absolute w-full h-full bg-cover bg-center top-0 left-0"
        style={{ backgroundImage: `url(${images[nextIndex]})`, zIndex: 0 }}
      />

      {/* Current image on top with animated clipPath */}
      <motion.div
        key={images[index]}
        className="absolute w-full h-full bg-cover bg-center top-0 left-0"
        style={{ backgroundImage: `url(${images[index]})`, zIndex: 1 }}
        initial={{ clipPath: clipPathStart }}
        animate={{ clipPath: clipPathEnd }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* SVG Particles */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute pointer-events-none glitch-shape"
          initial={{
            scale: 0.5,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            scale: 1.2,
            opacity: 0,
            x: shape.x + (Math.random() * 40 - 20),
            y: shape.y + (Math.random() * 40 - 20),
            rotate: shape.rotate,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            type: "spring",
            stiffness: 50,
            damping: 12,
          }}
          style={{
            left: shape.x,
            top: shape.y,
            color: shape.color,
            width: shape.size,
            height: shape.size,
            zIndex: 20,
            mixBlendMode: "screen",
            filter: "drop-shadow(0 0 8px currentColor)",
          }}
          dangerouslySetInnerHTML={{ __html: shape.icon }}
        />
      ))}

     
    </div>
  );
}
