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
  const containerRef = useRef(null);

  const zegoRef = useRef(null);
  const infinityRef = useRef(null);
  const oudRef = useRef(null);

  const zegoShadowRef = useRef(null);
  const infinityShadowRef = useRef(null);
  const oudShadowRef = useRef(null);

  const zegoCardRef = useRef(null);
  const infinityCardRef = useRef(null);
  const oudCardRef = useRef(null);

  const titleRef = useRef(null);
  const bgGlowRef = useRef(null);

  const { addToCart } = useCart();
  const [activeBottle, setActiveBottle] = useState("infinity");

  const products = {
    zego: {
      id: "zego",
      name: "Zego",
      subtitle: "Eau de Parfum",
      price: 4999,
      size: "100ml / 3.4 FL. OZ.",
      image: "/images/zego.png",
      bottleImage: "/images/zego-bottle.png",
      themeColor: "#F4D7DA",
      accentColor: "#FF6B5B",
      desc: "Blush flacon with rounded cap. Modern feminine radiance & gentle floral warmth.",
      notes: "Pink Pepper • Damask Rose • Cashmere Wood",
    },
    infinity: {
      id: "infinity",
      name: "NexWorld Infinity",
      subtitle: "Eau de Parfum",
      price: 5499,
      size: "100ml / 3.4 FL. OZ.",
      image: "/images/infinity.png",
      bottleImage: "/images/infinity-bottle.png",
      themeColor: "#C7E6ED",
      accentColor: "#2A7B88",
      desc: "Crystalline turquoise flacon with silver cap. Magnetic ocean depth & crisp mineral notes.",
      notes: "Frosted Bergamot • Blue Sage • Mineral Ambergris",
    },
    oud: {
      id: "oud-alhind",
      name: "Oud Alhind",
      subtitle: "Extrait de Parfum",
      price: 6299,
      size: "100ml / 3.4 FL. OZ.",
      image: "/images/oud-alhind.png",
      bottleImage: "/images/oud-bottle.png",
      themeColor: "#E8C2C8",
      accentColor: "#801B2A",
      desc: "Imperial ruby flacon with gold cap. Regal Indian Assam oud of timeless distinction.",
      notes: "Saffron Stigmas • Aged Assam Oud • Amber",
    },
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Separation distances based on viewport
    const spreadDistance = isMobile ? 110 : isTablet ? 250 : 380;
    const verticalOffset = isMobile ? 25 : 0;

    const ctx = gsap.context(() => {
      // Timeline pinned to the scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            if (prog < 0.35) {
              setActiveBottle("infinity");
            } else if (prog < 0.68) {
              setActiveBottle("zego");
            } else {
              setActiveBottle("oud");
            }
          },
        },
      });

      // Initial Clustered State setup
      gsap.set(zegoRef.current, {
        x: isMobile ? -15 : -35,
        y: 15,
        scale: 0.9,
        rotation: -3,
        zIndex: 10,
      });
      gsap.set(infinityRef.current, {
        x: 0,
        y: 0,
        scale: 1.05,
        rotation: 0,
        zIndex: 30,
      });
      gsap.set(oudRef.current, {
        x: isMobile ? 15 : 35,
        y: 15,
        scale: 0.92,
        rotation: 3,
        zIndex: 10,
      });

      // Shadows initially clustered
      gsap.set(zegoShadowRef.current, { x: isMobile ? -15 : -35, scale: 0.85, opacity: 0.5 });
      gsap.set(infinityShadowRef.current, { x: 0, scale: 1.1, opacity: 0.7 });
      gsap.set(oudShadowRef.current, { x: isMobile ? 15 : 35, scale: 0.85, opacity: 0.5 });

      // Cards initially hidden
      gsap.set([zegoCardRef.current, infinityCardRef.current, oudCardRef.current], {
        opacity: 0,
        y: 40,
        pointerEvents: "none",
      });

      // PHASE 1: Spread Apart Animation
      tl.to(
        zegoRef.current,
        {
          x: -spreadDistance,
          y: verticalOffset,
          scale: 1,
          rotation: -5,
          ease: "power2.out",
          duration: 3,
        },
        0
      )
        .to(
          zegoShadowRef.current,
          {
            x: -spreadDistance,
            scale: 1,
            opacity: 0.6,
            ease: "power2.out",
            duration: 3,
          },
          0
        )
        .to(
          infinityRef.current,
          {
            y: -15,
            scale: 1.08,
            rotation: 0,
            ease: "power2.out",
            duration: 3,
          },
          0
        )
        .to(
          infinityShadowRef.current,
          {
            scale: 1.15,
            opacity: 0.8,
            ease: "power2.out",
            duration: 3,
          },
          0
        )
        .to(
          oudRef.current,
          {
            x: spreadDistance,
            y: verticalOffset,
            scale: 1,
            rotation: 5,
            ease: "power2.out",
            duration: 3,
          },
          0
        )
        .to(
          oudShadowRef.current,
          {
            x: spreadDistance,
            scale: 1,
            opacity: 0.6,
            ease: "power2.out",
            duration: 3,
          },
          0
        )
        // Background color & lighting evolution
        .to(
          bgGlowRef.current,
          {
            background:
              "radial-gradient(ellipse at center, rgba(199,230,237,0.45) 0%, rgba(244,215,218,0.35) 45%, rgba(244,237,224,1) 85%)",
            duration: 3,
            ease: "none",
          },
          0
        );

      // PHASE 2: Floating rotation & Individual details reveal
      tl.to(
        [zegoCardRef.current, infinityCardRef.current, oudCardRef.current],
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          stagger: 0.2,
          ease: "power2.out",
          duration: 1.8,
        },
        "-=1.2"
      )
        // Gentle dynamic floating on full spread
        .to(
          zegoRef.current,
          {
            y: verticalOffset - 12,
            rotation: -7,
            duration: 1.5,
            ease: "sine.inOut",
          },
          "+=0.2"
        )
        .to(
          infinityRef.current,
          {
            y: -28,
            duration: 1.5,
            ease: "sine.inOut",
          },
          "<"
        )
        .to(
          oudRef.current,
          {
            y: verticalOffset - 12,
            rotation: 7,
            duration: 1.5,
            ease: "sine.inOut",
          },
          "<"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F4EDE0] text-[#14213D] flex flex-col justify-between overflow-hidden py-10"
    >
      {/* Dynamic Ambient Background Lighting */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 transition-colors duration-1000 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,107,91,0.12) 0%, rgba(197,160,89,0.08) 40%, rgba(244,237,224,1) 80%)",
        }}
      />

      {/* Header Announcement */}
      <div ref={titleRef} className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-6">
        <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#14213D]/10">
          <Sparkles size={11} className="text-[#FF6B5B]" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-[#14213D]/80">
            CINEMATIC FRAGRANCE TRILOGY
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#14213D] uppercase">
          SCENT THAT DEFINES YOU
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#14213D]/70 max-w-lg mx-auto mt-1 tracking-wider">
          As you scroll, experience the three sovereign pillars of the NexWorld maison spread apart in orchestrated harmony.
        </p>
      </div>

      {/* Interactive Cinematic Stage: The 3 Bottles */}
      <div
        ref={containerRef}
        className="relative z-20 flex-1 flex items-center justify-center w-full max-w-7xl mx-auto px-4 my-auto min-h-[460px] sm:min-h-[520px]"
      >
        {/* ================= BOTTLE 1: ZEGO (Pink) ================= */}
        <div
          ref={zegoRef}
          className="absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
          style={{ willChange: "transform" }}
        >
          <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <Image
              src={products.zego.bottleImage}
              alt="NexWorld Zego Luxury Perfume"
              width={340}
              height={340}
              priority
              className="w-auto h-full object-contain filter drop-shadow-[0_25px_35px_rgba(244,215,218,0.7)]"
            />
          </div>

          {/* Individual Card: Zego */}
          <div
            ref={zegoCardRef}
            className="w-64 sm:w-72 mt-2 sm:mt-4 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-[#14213D]/10 text-center shadow-lg transition-all"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#FF6B5B]">
              {products.zego.subtitle}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#14213D] tracking-wider mt-0.5">
              {products.zego.name}
            </h3>
            <p className="text-[11px] text-[#14213D]/70 line-clamp-2 mt-1 leading-snug">
              {products.zego.desc}
            </p>
            <div className="text-[10px] text-[#14213D]/50 italic my-1.5 font-serif">
              {products.zego.notes}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#14213D]/10 mt-2">
              <span className="font-serif font-bold text-sm text-[#14213D]">
                ₹{products.zego.price.toLocaleString("en-IN")}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onQuickView && onQuickView(products.zego)}
                  aria-label="Quick View Zego"
                  className="p-1.5 rounded-full hover:bg-[#14213D]/10 text-[#14213D] transition-colors"
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => addToCart(products.zego, 1)}
                  className="px-3 py-1.5 rounded-full bg-[#FF6B5B] hover:bg-[#e84d3c] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm"
                >
                  <ShoppingBag size={12} />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTLE 2: NEXWORLD INFINITY (Center Blue) ================= */}
        <div
          ref={infinityRef}
          className="absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
          style={{ willChange: "transform" }}
        >
          <div className="relative w-48 sm:w-60 md:w-72 lg:w-80 h-72 sm:h-88 md:h-[420px] flex items-center justify-center">
            <Image
              src={products.infinity.bottleImage}
              alt="NexWorld Infinity Luxury Perfume"
              width={380}
              height={380}
              priority
              className="w-auto h-full object-contain filter drop-shadow-[0_28px_40px_rgba(42,123,136,0.5)]"
            />
          </div>

          {/* Individual Card: Infinity */}
          <div
            ref={infinityCardRef}
            className="w-68 sm:w-80 mt-2 sm:mt-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#2A7B88]/20 text-center shadow-xl ring-1 ring-[#2A7B88]/10"
          >
            <div className="inline-block px-2 py-0.5 mb-1 rounded-full bg-[#2A7B88]/10 text-[9px] uppercase tracking-[0.25em] font-bold text-[#2A7B88]">
              SIGNATURE FLAGSHIP
            </div>
            <h3 className="font-serif text-xl font-bold text-[#14213D] tracking-wider">
              {products.infinity.name}
            </h3>
            <p className="text-[11px] text-[#14213D]/70 line-clamp-2 mt-1 leading-snug">
              {products.infinity.desc}
            </p>
            <div className="text-[10px] text-[#14213D]/50 italic my-1.5 font-serif">
              {products.infinity.notes}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#14213D]/10 mt-2">
              <span className="font-serif font-bold text-base text-[#14213D]">
                ₹{products.infinity.price.toLocaleString("en-IN")}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onQuickView && onQuickView(products.infinity)}
                  aria-label="Quick View Infinity"
                  className="p-1.5 rounded-full hover:bg-[#14213D]/10 text-[#14213D] transition-colors"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => addToCart(products.infinity, 1)}
                  className="px-4 py-1.5 rounded-full bg-[#14213D] hover:bg-[#0c1425] text-[#F4EDE0] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <ShoppingBag size={13} className="text-[#FF6B5B]" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTLE 3: OUD ALHIND (Right Red) ================= */}
        <div
          ref={oudRef}
          className="absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
          style={{ willChange: "transform" }}
        >
          <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <Image
              src={products.oud.bottleImage}
              alt="NexWorld Oud Alhind Luxury Perfume"
              width={340}
              height={340}
              priority
              className="w-auto h-full object-contain filter drop-shadow-[0_25px_35px_rgba(128,27,42,0.6)]"
            />
          </div>

          {/* Individual Card: Oud Alhind */}
          <div
            ref={oudCardRef}
            className="w-64 sm:w-72 mt-2 sm:mt-4 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-[#14213D]/10 text-center shadow-lg transition-all"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#801B2A]">
              {products.oud.subtitle}
            </span>
            <h3 className="font-serif text-lg font-bold text-[#14213D] tracking-wider mt-0.5">
              {products.oud.name}
            </h3>
            <p className="text-[11px] text-[#14213D]/70 line-clamp-2 mt-1 leading-snug">
              {products.oud.desc}
            </p>
            <div className="text-[10px] text-[#14213D]/50 italic my-1.5 font-serif">
              {products.oud.notes}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#14213D]/10 mt-2">
              <span className="font-serif font-bold text-sm text-[#14213D]">
                ₹{products.oud.price.toLocaleString("en-IN")}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onQuickView && onQuickView(products.oud)}
                  aria-label="Quick View Oud Alhind"
                  className="p-1.5 rounded-full hover:bg-[#14213D]/10 text-[#14213D] transition-colors"
                >
                  <Eye size={15} />
                </button>
                <button
                  onClick={() => addToCart(products.oud, 1)}
                  className="px-3 py-1.5 rounded-full bg-[#FF6B5B] hover:bg-[#e84d3c] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm"
                >
                  <ShoppingBag size={12} />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Floor Shadows */}
        <div
          ref={zegoShadowRef}
          className="absolute bottom-16 w-36 sm:w-48 h-5 rounded-full bg-[#F4D7DA]/80 blur-xl pointer-events-none"
        />
        <div
          ref={infinityShadowRef}
          className="absolute bottom-12 w-44 sm:w-56 h-6 rounded-full bg-[#2A7B88]/40 blur-xl pointer-events-none"
        />
        <div
          ref={oudShadowRef}
          className="absolute bottom-16 w-36 sm:w-48 h-5 rounded-full bg-[#801B2A]/30 blur-xl pointer-events-none"
        />
      </div>

      {/* Subtle Bottom Instruction */}
      <div className="relative z-10 text-center pb-2 text-[10px] tracking-[0.3em] uppercase text-[#14213D]/40 font-semibold font-sans">
        CONTINUE SCROLLING FOR INDIVIDUAL FRAGRANCE EXPERIENCES ↓
      </div>
    </section>
  );
}
