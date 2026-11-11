"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, Check, Sparkles, Layers, Shield, Droplets } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function IndividualProductStories({ onQuickView }) {
  const { addToCart } = useCart();

  // Quantities for each story section
  const [quantities, setQuantities] = useState({
    zego: 1,
    infinity: 1,
    "oud-alhind": 1,
  });

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const stories = [
    {
      id: "zego",
      name: "Zego",
      brand: "NexWorld",
      subtitle: "Eau de Parfum",
      price: 4999,
      originalPrice: 6500,
      size: "100ml / 3.4 FL. OZ.",
      themeColor: "#F4D7DA",
      accentColor: "#FF6B5B",
      bgStyle: "bg-gradient-to-b from-[#FBF5F6] via-[#F6DEE2] to-[#F4EDE0]",
      badge: "The Pink Flacon",
      badgeColor: "bg-[#FF6B5B]/10 text-[#FF6B5B] border-[#FF6B5B]/20",
      image: "/images/zego.png",
      bottleCutout: "/images/zego-bottle.png",
      tagline: "RADIANT SENSUALITY IN SCULPTED BLUSH GLASS",
      description:
        "NexWorld Zego is a celebration of modern grace. Bottled within an architectural soft pink flacon crowned by a rounded sculpted cap, its sillage weaves a trail of luminous romance and timeless confidence.",
      notes: {
        top: "[Editable Top Notes — e.g. Pink Pepper, Italian Bergamot, Lychee Nectar]",
        heart: "[Editable Heart Notes — e.g. Centifolia Rose, Peony Petals, White Peach]",
        base: "[Editable Base Notes — e.g. Madagascar Vanilla, Cashmere Musks, Blonde Amber]",
      },
      highlights: [
        "Hand-sculpted rounded pink cap",
        "8-12 hours velvety projection",
        "Complimentary satin travel pouch",
      ],
    },
    {
      id: "infinity",
      name: "NexWorld Infinity",
      brand: "NexWorld",
      subtitle: "Eau de Parfum",
      price: 5499,
      originalPrice: 7200,
      size: "100ml / 3.4 FL. OZ.",
      themeColor: "#C7E6ED",
      accentColor: "#2A7B88",
      bgStyle: "bg-gradient-to-b from-[#F1F8FA] via-[#D5ECF1] to-[#F4EDE0]",
      badge: "The Turquoise Flacon",
      badgeColor: "bg-[#2A7B88]/10 text-[#2A7B88] border-[#2A7B88]/20",
      image: "/images/infinity.png",
      bottleCutout: "/images/infinity-bottle.png",
      tagline: "AN ENDLESS HORIZON OF MAGNETIC OCEAN DEPTH",
      description:
        "NexWorld Infinity captures the magnetic serenity of boundless blue oceans. Encased in a pristine turquoise rectangular flacon crowned with a monolithic silver chrome cap, it projects freshness infused with aristocratic cedar and ambergris.",
      notes: {
        top: "[Editable Top Notes — e.g. Sea Mineral Accord, Frosted Citrus, Clary Sage]",
        heart: "[Editable Heart Notes — e.g. Blue Lavender, Blue Pine, Crushed Nutmeg]",
        base: "[Editable Base Notes — e.g. Sun-bleached Driftwood, Mineral Ambergris, Vetiver]",
      },
      highlights: [
        "Heavy crystal glass with chrome cap",
        "10-14 hours intense aquatic sillage",
        "Cold-pressed oceanic botanicals",
      ],
    },
    {
      id: "oud-alhind",
      name: "Oud Alhind",
      brand: "NexWorld",
      subtitle: "Extrait de Parfum",
      price: 6299,
      originalPrice: 8500,
      size: "100ml / 3.4 FL. OZ.",
      themeColor: "#E8C2C8",
      accentColor: "#801B2A",
      bgStyle: "bg-gradient-to-b from-[#FAF1F3] via-[#EBC7CD] to-[#F4EDE0]",
      badge: "The Prestige Reserve",
      badgeColor: "bg-[#801B2A]/10 text-[#801B2A] border-[#801B2A]/20",
      image: "/images/oud-alhind.png",
      bottleCutout: "/images/oud-bottle.png",
      tagline: "IMPERIAL DISTILLATION OF ANCIENT ASSAM OUD",
      description:
        "Oud Alhind represents the pinnacle of oriental luxury. Wrapped in an opulent ruby-red rectangular flacon crowned by a 24K gold-plated cap, this extrait de parfum harmonizes rare Indian oud with golden saffron and warm resinous amber.",
      notes: {
        top: "[Editable Top Notes — e.g. Saffron Stigmas, Royal Incense, Taif Damascena]",
        heart: "[Editable Heart Notes — e.g. Vintage Assam Agarwood, Leather Accord, Nutmeg]",
        base: "[Editable Base Notes — e.g. Golden Amber, Sandalwood Mysore, Dark Patchouli]",
      },
      highlights: [
        "High 30% Extrait de Parfum concentration",
        "24K Gold-polished signature cap",
        "Over 16 hours commanding presence",
      ],
    },
  ];

  return (
    <div className="space-y-0">
      {stories.map((product, index) => {
        const isEven = index % 2 === 0;
        const currentQty = quantities[product.id] || 1;

        return (
          <section
            key={product.id}
            id={`experience-${product.id}`}
            className={`relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 ${product.bgStyle} overflow-hidden border-t border-[#14213D]/5`}
          >
            {/* Ambient Background Aura */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: product.themeColor }}
            />

            <div className="max-w-7xl mx-auto w-full relative z-10">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual Presentation Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 flex flex-col items-center justify-center ${
                    !isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative group w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md p-6 border border-[#14213D]/10 shadow-2xl">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={`${product.name} Luxury Fragrance`}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Subtle Corner Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="font-serif text-[10px] uppercase tracking-[0.25em] font-bold text-[#14213D]/60 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                        {product.size}
                      </span>
                    </div>

                    <div className="absolute bottom-5 right-5">
                      <button
                        onClick={() => onQuickView && onQuickView(product)}
                        className="px-3.5 py-1.5 rounded-full bg-[#14213D] text-[#F4EDE0] text-xs font-semibold tracking-wider hover:bg-[#FF6B5B] transition-colors shadow"
                      >
                        ENLARGE VIEW
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Editorial Storytelling & Buying Options Column */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 space-y-6 ${
                    !isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Category Pill */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.25em] border ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#14213D]/60 font-semibold">
                      {product.subtitle}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase">
                      {product.name}
                    </h2>
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#FF6B5B] font-semibold mt-2">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-[#14213D]/75 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Fragrance Notes Cards (Editable Fields per Master Prompt) */}
                  <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#14213D]/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-xs uppercase tracking-[0.22em] font-bold text-[#14213D] flex items-center gap-1.5">
                        <Droplets size={14} className="text-[#FF6B5B]" />
                        <span>Fragrance Notes Olfactory Pyramid</span>
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider text-[#FF6B5B] font-semibold">
                        EDITABLE SPECIFICATION
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#F4EDE0]/60 border border-[#14213D]/5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block mb-1">
                          TOP NOTES
                        </span>
                        <p className="text-[11px] text-[#14213D]/90 font-serif leading-tight">
                          {product.notes.top}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#F4EDE0]/60 border border-[#14213D]/5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block mb-1">
                          HEART NOTES
                        </span>
                        <p className="text-[11px] text-[#14213D]/90 font-serif leading-tight">
                          {product.notes.heart}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#F4EDE0]/60 border border-[#14213D]/5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block mb-1">
                          BASE NOTES
                        </span>
                        <p className="text-[11px] text-[#14213D]/90 font-serif leading-tight">
                          {product.notes.base}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2">
                    {product.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#14213D]/70">
                        <Check size={14} className="text-[#FF6B5B] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing, Quantity & Add to Cart Controls */}
                  <div className="pt-4 border-t border-[#14213D]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
                    {/* Price Block */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm text-[#14213D]/40 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#14213D]/50 font-medium block">
                        Complimentary Domestic Delivery Included
                      </span>
                    </div>

                    {/* Quantity Stepper & Add to Bag */}
                    <div className="flex items-center gap-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#14213D]/20 rounded-full bg-white/80 p-1">
                        <button
                          onClick={() => handleQtyChange(product.id, -1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#14213D]/10 text-[#14213D] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#14213D]">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleQtyChange(product.id, 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#14213D]/10 text-[#14213D] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Add to Bag CTA */}
                      <button
                        onClick={() => addToCart(product, currentQty)}
                        className="btn-luxury-coral px-6 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      >
                        <ShoppingBag size={15} />
                        <span>ADD TO CART</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
