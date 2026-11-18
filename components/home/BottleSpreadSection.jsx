"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag, Eye, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function BottleSpreadSection({ onQuickView }) {
  const sectionRef = useRef(null);
  const bgGlowRef = useRef(null);

  // References for all 6 bottles
  const bottleRefs = useRef([]);
  const shadowRefs = useRef([]);
  const cardRefs = useRef([]);

  const { addToCart } = useCart();
  const [activeBottleIndex, setActiveBottleIndex] = useState(3);

  const sixProducts = [
    {
      id: "zoya",
      name: "Zoya",
      subtitle: "Eau de Parfum",
      price: 139,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/zoya.jpg",
      bottleImage: "/images/studio/zoya-bottle.png",
      themeColor: "#F4D7DA",
      accentColor: "#FF6B5B",
      desc: "Transparent pink glass crowned with a sculptural spherical cap & gold NE monogram.",
    },
    {
      id: "nexdesire",
      name: "Nexdesire",
      subtitle: "Eau de Parfum",
      price: 141,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/nexdesire.jpg",
      bottleImage: "/images/studio/nexdesire-bottle.png",
      themeColor: "#E2D4F0",
      accentColor: "#6B2D8A",
      desc: "Deep purple glass with metallic gold cylindrical cap & radiant gold NE crest.",
    },
    {
      id: "oud-alashhar",
      name: "Oud Al Ashhar",
      subtitle: "Eau de Parfum",
      price: 155,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/oud-alashhar.jpg",
      bottleImage: "/images/studio/oud-alashhar-bottle.png",
      themeColor: "#E8DAC8",
      accentColor: "#9E6B38",
      desc: "Warm transparent amber glass with metallic gold cylindrical cap & gold NE monogram.",
    },
    {
      id: "infinity",
      name: "NexWorld Infinity",
      subtitle: "Eau de Parfum",
      price: 129,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/infinity.jpg",
      bottleImage: "/images/studio/infinity-bottle.png",
      themeColor: "#C7E6ED",
      accentColor: "#2A7B88",
      desc: "Transparent turquoise/blue glass with silver metallic cap & black NE monogram.",
    },
    {
      id: "oud-alhind",
      name: "Oud Alhind",
      subtitle: "Eau de Parfum",
      price: 165,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/oud-alhind.jpg",
      bottleImage: "/images/studio/oud-alhind-bottle.png",
      themeColor: "#E8C2C8",
      accentColor: "#801B2A",
      desc: "Deep red glass flacon with decorative textured gold pyramid cap & gold NE crest.",
    },
    {
      id: "nexaura",
      name: "Nexaura",
      subtitle: "Eau de Parfum",
      price: 151,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/nexaura.jpg",
      bottleImage: "/images/studio/nexaura-bottle.png",
      themeColor: "#CAD0DC",
      accentColor: "#182848",
      desc: "Dark midnight glass with black ribbed cap & gold NE monogram.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;

    // Responsive spread coordinates across the 6 bottles
    // From leftmost (index 0: Zoya) to rightmost (index 5: Nexaura)
    const spreads = isMobile
      ? [-110, -65, -20, 20, 65, 110]
      : isTablet
      ? [-380, -230, -75, 75, 230, 380]
      : [-520, -315, -105, 105, 315, 520];

    const rotations = [-8, -5, -2, 2, 5, 8];
    const verticalOffsets = isMobile ? [-15, 10, -10, 10, -10, 15] : [10, -15, 0, -20, -5, 15];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(5, Math.floor(p * 6));
            setActiveBottleIndex(idx);
          },
        },
      });

      // Initial Grouped State Setup
      sixProducts.forEach((_, i) => {
        const bottleEl = bottleRefs.current[i];
        const shadowEl = shadowRefs.current[i];
        const cardEl = cardRefs.current[i];

        if (bottleEl) {
          // Centered cluster initial layout
          const initX = (i - 2.5) * (isMobile ? 12 : 25);
          gsap.set(bottleEl, {
            x: initX,
            y: 0,
            scale: i === 3 || i === 4 ? 1.05 : 0.9,
            rotation: (i - 2.5) * 1.5,
            zIndex: i === 3 ? 30 : i === 2 || i === 4 ? 20 : 10,
          });
        }
        if (shadowEl) {
          const initX = (i - 2.5) * (isMobile ? 12 : 25);
          gsap.set(shadowEl, { x: initX, scale: 0.9, opacity: 0.5 });
        }
        if (cardEl) {
          gsap.set(cardEl, { opacity: 0, y: 35, pointerEvents: "none" });
        }
      });

      // PHASE 1: Spreading animation on scroll
      sixProducts.forEach((_, i) => {
        const bottleEl = bottleRefs.current[i];
        const shadowEl = shadowRefs.current[i];

        if (bottleEl && shadowEl) {
          tl.to(
            bottleEl,
            {
              x: spreads[i],
              y: verticalOffsets[i],
              scale: isMobile ? 0.72 : 1,
              rotation: rotations[i],
              ease: "power2.out",
              duration: 3,
            },
            0
          ).to(
            shadowEl,
            {
              x: spreads[i],
              scale: isMobile ? 0.8 : 1.05,
              opacity: 0.65,
              ease: "power2.out",
              duration: 3,
            },
            0
          );
        }
      });

      // Ambient Lighting Evolution
      if (bgGlowRef.current) {
        tl.to(
          bgGlowRef.current,
          {
            background:
              "radial-gradient(ellipse at center, rgba(199,230,237,0.3) 0%, rgba(226,212,240,0.25) 35%, rgba(244,215,218,0.2) 65%, rgba(244,237,224,1) 85%)",
            duration: 3,
            ease: "none",
          },
          0
        );
      }

      // PHASE 2: Reveal individual product cards and details
      cardRefs.current.forEach((cardEl) => {
        if (cardEl) {
          tl.to(
            cardEl,
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              ease: "power2.out",
              duration: 1.5,
            },
            "-=1.0"
          );
        }
      });

      // Gentle floating sine-wave at full spread
      sixProducts.forEach((_, i) => {
        const bottleEl = bottleRefs.current[i];
        if (bottleEl) {
          tl.to(
            bottleEl,
            {
              y: verticalOffsets[i] - 12,
              duration: 1.5,
              ease: "sine.inOut",
            },
            "+=0.1"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F4EDE0] text-[#14213D] flex flex-col justify-between overflow-hidden py-10"
    >
      {/* Background Lighting */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 transition-colors duration-1000 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,107,91,0.1) 0%, rgba(197,160,89,0.08) 40%, rgba(244,237,224,1) 80%)",
        }}
      />

      {/* Header Announcement */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-4">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#14213D]/10">
          <Sparkles size={11} className="text-[#FF6B5B]" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-[#14213D]/80">
            NEXENCE SIGNATURE COLLECTION
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase">
          THE SIX PILLARS OF LUXURY
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#14213D]/70 max-w-xl mx-auto mt-1 tracking-wider">
          Scroll to experience the six master flacons float and separate in orchestrated symphony.
        </p>
      </div>

      {/* Pinned Stage: All 6 Bottles */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-2 my-auto min-h-[480px] sm:min-h-[540px]">
        {sixProducts.map((p, idx) => (
          <div
            key={p.id}
            ref={(el) => (bottleRefs.current[idx] = el)}
            className="absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
            style={{ willChange: "transform" }}
          >
            {/* Flacon Container */}
            <div className="relative w-32 sm:w-44 md:w-52 lg:w-56 h-52 sm:h-72 md:h-80 flex items-center justify-center">
              <Image
                src={p.bottleImage}
                alt={`Nexence ${p.name}`}
                width={260}
                height={340}
                priority
                className="w-auto h-full object-contain filter drop-shadow-[0_20px_30px_rgba(20,33,61,0.25)] hover:scale-105 transition-transform"
              />
            </div>

            {/* Individual Reveal Card on Scroll */}
            <div
              ref={(el) => (cardRefs.current[idx] = el)}
              className="w-44 sm:w-52 mt-2 p-3 sm:p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#14213D]/10 text-center shadow-lg transition-all"
            >
              <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#FF6B5B] block">
                {p.size}
              </span>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#14213D] tracking-wide truncate mt-0.5">
                {p.name}
              </h3>
              <p className="text-[10px] text-[#14213D]/65 line-clamp-1 mt-0.5 font-sans">
                {p.desc}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#14213D]/10 mt-2">
                <span className="font-serif font-bold text-xs sm:text-sm text-[#14213D]">
                  AED {p.price.toLocaleString()}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onQuickView && onQuickView(p)}
                    aria-label={`View ${p.name}`}
                    className="p-1 rounded-full hover:bg-[#14213D]/10 text-[#14213D] transition-colors"
                  >
                    <Eye size={13} />
                  </button>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="px-2.5 py-1 rounded-full bg-[#FF6B5B] hover:bg-[#e84d3c] text-white text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm"
                  >
                    <ShoppingBag size={11} />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic Floor Shadows for each bottle */}
        {sixProducts.map((_, idx) => (
          <div
            key={`shadow-${idx}`}
            ref={(el) => (shadowRefs.current[idx] = el)}
            className="absolute bottom-12 w-28 sm:w-36 h-4 rounded-full bg-[#14213D]/25 blur-lg pointer-events-none"
          />
        ))}
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 text-center pb-2 text-[10px] tracking-[0.3em] uppercase text-[#14213D]/40 font-semibold font-sans">
        CONTINUE SCROLLING FOR INDIVIDUAL FRAGRANCE STORIES ↓
      </div>
    </section>
  );
}
