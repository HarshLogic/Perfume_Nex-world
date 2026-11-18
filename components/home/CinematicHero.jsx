"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, Compass } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export default function CinematicHero() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yBottle = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F4EDE0] pt-24 pb-16"
    >
      {/* Ambient Lighting & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Backlight Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#FF6B5B]/10 via-[#C5A059]/15 to-transparent blur-3xl" />
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#C5A059]/40 blur-[1px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#FF6B5B]/30 blur-[1px] animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-[#14213D]/20 blur-[1px] animate-float-reverse" />
      </div>

      <motion.div
        style={{ opacity: opacityHero }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center"
      >
        {/* Top Monogram Crest Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14213D]/5 border border-[#14213D]/10 backdrop-blur-sm">
            <Sparkles size={12} className="text-[#FF6B5B]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] font-semibold text-[#14213D]/80">
              NEXENCE HAUTE PARFUMERIE INTERNATIONALE
            </span>
          </div>
        </motion.div>

        {/* Primary Luxury Headlines — EXACT APPROVED COPY */}
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-4"
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.08em] text-[#14213D] uppercase leading-[1.1]">
            ESSENCE OF <br />
            <span className="text-[#FF6B5B] font-editorial italic font-normal tracking-normal lowercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl block mt-1">
              the world.
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#14213D]/75 max-w-2xl mx-auto tracking-wide font-normal leading-relaxed">
            Experience luxury redefined through our collection of sophisticated fragrances, crafted from the finest ingredients sourced across the globe.
          </p>
        </motion.div>

        {/* Centerpiece Showcase: Flacon with 3D Tilt */}
        <motion.div
          style={{ y: yBottle }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-4 sm:my-8 flex items-center justify-center cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0, y: 0 });
          }}
        >
          {/* Subtle Ring Aura */}
          <div className="absolute w-[320px] sm:w-[440px] md:w-[480px] h-[320px] sm:h-[440px] md:h-[480px] rounded-full border border-[#14213D]/10 pointer-events-none transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute w-[260px] sm:w-[380px] md:w-[420px] h-[260px] sm:h-[380px] md:h-[420px] rounded-full border border-[#C5A059]/20 pointer-events-none animate-pulse-subtle" />

          {/* Interactive Tilt Container */}
          <motion.div
            animate={{
              rotateX: mousePos.y * -16,
              rotateY: mousePos.x * 20,
              scale: isHovered ? 1.04 : 1,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative w-56 sm:w-72 md:w-80 lg:w-96 h-72 sm:h-96 md:h-[420px] flex items-center justify-center filter drop-shadow-[0_28px_40px_rgba(20,33,61,0.22)]"
          >
            <Image
              src="/images/studio/infinity-bottle.png"
              alt="Nexence Luxury Flacon"
              width={420}
              height={420}
              priority
              className="w-auto h-full object-contain select-none pointer-events-none"
            />
          </motion.div>

          {/* Dynamic Floor Shadow */}
          <div
            className="absolute -bottom-4 w-48 sm:w-64 h-6 rounded-full bg-[#14213D]/25 blur-xl transition-all duration-300"
            style={{
              transform: `translateX(${mousePos.x * 30}px) scaleX(${1 + Math.abs(mousePos.x) * 0.2})`,
            }}
          />
        </motion.div>

        {/* CTA Buttons — EXACT APPROVED CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 z-20"
        >
          <a
            href="#collection"
            className="btn-luxury-coral px-8 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.24em] font-semibold flex items-center gap-2 group"
          >
            <span>DISCOVER OUR COLLECTION</span>
            <Compass size={15} className="transition-transform group-hover:rotate-45" />
          </a>

          <a
            href="#story"
            className="btn-luxury-outline px-8 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.24em] font-semibold"
          >
            A LEGACY OF LUXURY
          </a>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 sm:mt-16 flex flex-col items-center text-[#14213D]/60 hover:text-[#FF6B5B] transition-colors cursor-pointer"
          onClick={() => {
            const target = document.getElementById("collection");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] font-semibold mb-2">
            SCROLL TO EXPERIENCE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
