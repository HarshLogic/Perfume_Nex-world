"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, Check, Droplets } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function IndividualProductStories({ onQuickView }) {
  const { addToCart } = useCart();

  const [quantities, setQuantities] = useState({
    zoya: 1,
    nexdesire: 1,
    "oud-alashhar": 1,
    infinity: 1,
    "oud-alhind": 1,
    nexaura: 1,
  });

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const stories = [
    {
      id: "zoya",
      name: "Zoya",
      brand: "NE / Nexence",
      subtitle: "Eau de Parfum",
      price: 139,
      originalPrice: 169,
      size: "100 ml / 3.4 fl. oz.",
      themeColor: "#F4D7DA",
      accentColor: "#FF6B5B",
      bgStyle: "bg-gradient-to-b from-[#FBF5F6] via-[#F6DEE2] to-[#F4EDE0]",
      badge: "The Pink Flacon",
      badgeColor: "bg-[#FF6B5B]/10 text-[#FF6B5B] border-[#FF6B5B]/20",
      image: "/images/studio/zoya.jpg",
      bottleCutout: "/images/studio/zoya-bottle.png",
      tagline: "TRANSPARENT PINK CRYSTAL & SCULPTURAL SPHERICAL CAP",
      description:
        "Zoya is an ode to radiant grace and modern charm. Featuring pure transparent pink glass crowned with an iconic spherical pink cap, its bottle and light cream/pink presentation box are embossed with the signature gold NE monogram.",
      notes: {
        top: "[Editable Top Notes — e.g. Pink Pepper, Italian Mandarin, White Peach]",
        heart: "[Editable Heart Notes — e.g. Centifolia Rose, Peony Petals, Delicate Jasmine]",
        base: "[Editable Base Notes — e.g. Madagascar Vanilla, Cashmere Musks, White Amber]",
      },
      highlights: [
        "Transparent pink glass with spherical cap",
        "Gold NE monogram & signature gold script",
        "Light cream/pink presentation box with gold details",
      ],
    },
    {
      id: "nexdesire",
      name: "Nexdesire",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 141,
      originalPrice: 175,
      size: "100 ml / 3.4 fl. oz.",
      themeColor: "#E2D4F0",
      accentColor: "#6B2D8A",
      bgStyle: "bg-gradient-to-b from-[#F7F2FB] via-[#E2D4F0] to-[#F4EDE0]",
      badge: "The Amethyst Flacon",
      badgeColor: "bg-[#6B2D8A]/10 text-[#6B2D8A] border-[#6B2D8A]/20",
      image: "/images/studio/nexdesire.jpg",
      bottleCutout: "/images/studio/nexdesire-bottle.png",
      tagline: "DEEP PURPLE GLASS & POLISHED METALLIC GOLD CAP",
      description:
        "An intoxicating aura of passion and mystery. Nexdesire is captured within deep amethyst purple glass adorned with a polished metallic gold cylindrical cap and matching purple luxury box with gleaming gold typography.",
      notes: {
        top: "[Editable Top Notes — e.g. Blackcurrant, Violet Leaves, Bergamot]",
        heart: "[Editable Heart Notes — e.g. Midnight Orchid, Damask Plum, Iris Butter]",
        base: "[Editable Base Notes — e.g. Amber Crystals, Tonka Bean, Smoked Vanilla]",
      },
      highlights: [
        "Deep purple glass with metallic gold cylindrical cap",
        "Embossed with authentic gold NE monogram",
        "Matching purple luxury box with gold details",
      ],
    },
    {
      id: "oud-alashhar",
      name: "Oud Al Ashhar",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 155,
      originalPrice: 189,
      size: "100 ml / 3.4 fl. oz.",
      themeColor: "#E8DAC8",
      accentColor: "#9E6B38",
      bgStyle: "bg-gradient-to-b from-[#F9F5F0] via-[#E8DAC8] to-[#F4EDE0]",
      badge: "The Amber Flacon",
      badgeColor: "bg-[#9E6B38]/10 text-[#9E6B38] border-[#9E6B38]/20",
      image: "/images/studio/oud-alashhar.jpg",
      bottleCutout: "/images/studio/oud-alashhar-bottle.png",
      tagline: "AMBER TRANSPARENT GLASS & GOLD NOBLE WOODS",
      description:
        "A distinguished testament to oriental heritage and warmth. Oud Al Ashhar glows in warm amber transparent glass crowned by a metallic gold cylindrical cap and dark brown/black box with gold Arabic typography.",
      notes: {
        top: "[Editable Top Notes — e.g. Golden Cardamom, Nutmeg, Saffron]",
        heart: "[Editable Heart Notes — e.g. Aged Agarwood, Cedarwood Atlas, Labdanum]",
        base: "[Editable Base Notes — e.g. Royal Ambergris, Leather Accord, Sandalwood]",
      },
      highlights: [
        "Warm transparent amber glass with cylindrical gold cap",
        "Embossed with authentic gold NE monogram",
        "Dark brown/black box with gold typography (عود الأشهر)",
      ],
    },
    {
      id: "infinity",
      name: "NexWorld Infinity",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 129,
      originalPrice: 159,
      size: "100 ml / 3.4 fl. oz.",
      themeColor: "#C7E6ED",
      accentColor: "#2A7B88",
      bgStyle: "bg-gradient-to-b from-[#EFF8FA] via-[#C7E6ED] to-[#F4EDE0]",
      badge: "Bestseller Flacon",
      badgeColor: "bg-[#2A7B88]/10 text-[#2A7B88] border-[#2A7B88]/20",
      image: "/images/studio/infinity.jpg",
      bottleCutout: "/images/studio/infinity-bottle.png",
      tagline: "TRANSPARENT TURQUOISE GLASS & SILVER FLARED CAP",
      description:
        "An endless horizon of magnetic ocean freshness. NexWorld Infinity evokes boundless seas through crystalline turquoise glass adorned with a polished silver metallic flared cap and original bright blue box.",
      notes: {
        top: "[Editable Top Notes — e.g. Sea Salt, Frosted Bergamot, Crisp Marine Accord]",
        heart: "[Editable Heart Notes — e.g. Blue Sage, Crushed Cedar Needle, Cardamom]",
        base: "[Editable Base Notes — e.g. Driftwood, Mineral Ambergris, Smoked Vetiver]",
      },
      highlights: [
        "Turquoise blue glass with silver metallic flared cap",
        "Black NE monogram as printed on original flacon",
        "Bright blue presentation box with dark typography",
      ],
    },
    {
      id: "oud-alhind",
      name: "Oud Alhind",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 165,
      originalPrice: 199,
      size: "100 ml / 3.4 fl. oz.",
      themeColor: "#E8C2C8",
      accentColor: "#801B2A",
      bgStyle: "bg-gradient-to-b from-[#FAF0F2] via-[#E8C2C8] to-[#F4EDE0]",
      badge: "Prestige Reserve",
      badgeColor: "bg-[#801B2A]/10 text-[#801B2A] border-[#801B2A]/20",
      image: "/images/studio/oud-alhind.jpg",
      bottleCutout: "/images/studio/oud-alhind-bottle.png",
      tagline: "TRANSPARENT DEEP RED GLASS & TEXTURED GOLD CAP",
      description:
        "The sovereign majesty of pure Indian oud distilled into liquid ruby. Crowned with an ornate textured gold pyramid cap, Oud Alhind radiates timeless royal luxury alongside its rich burgundy box with gold typography.",
      notes: {
        top: "[Editable Top Notes — e.g. Saffron Stigmas, Royal Incense, Taif Rose]",
        heart: "[Editable Heart Notes — e.g. Vintage Assam Oud, Leather Accord, Nutmeg]",
        base: "[Editable Base Notes — e.g. Golden Amber, Sandalwood Mysore, Dark Patchouli]",
      },
      highlights: [
        "Deep transparent red glass with textured gold pyramid cap",
        "Embossed with authentic gold NE monogram",
        "Rich burgundy/red box with gold typography (عود الهند)",
      ],
    },
    {
      id: "nexaura",
      name: "Nexaura",
      brand: "NE",
      subtitle: "Eau de Parfum",
      price: 151,
      originalPrice: 185,
      size: "100 ml / 3.4 fl. oz.",
      themeColor: "#CAD0DC",
      accentColor: "#182848",
      bgStyle: "bg-gradient-to-b from-[#F0F2F6] via-[#CAD0DC] to-[#F4EDE0]",
      badge: "The Midnight Flacon",
      badgeColor: "bg-[#182848]/10 text-[#182848] border-[#182848]/20",
      image: "/images/studio/nexaura.jpg",
      bottleCutout: "/images/studio/nexaura-bottle.png",
      tagline: "DARK MIDNIGHT GLASS & TACTILE BLACK RIBBED CAP",
      description:
        "The magnetic power of the midnight hour. Nexaura is enveloped in dark midnight glass with a tactile ribbed black cap and gleaming gold NE crest, exuding commanding authority and modern sophistication.",
      notes: {
        top: "[Editable Top Notes — e.g. Smoked Citrus, Black Pepper, Italian Cypress]",
        heart: "[Editable Heart Notes — e.g. Midnight Cedar, Dark Rum Accord, Incense]",
        base: "[Editable Base Notes — e.g. Dark Vetiver, Indonesian Patchouli, Black Amber]",
      },
      highlights: [
        "Dark black/navy glass with black ribbed cylindrical cap",
        "Embossed with authentic gold NE monogram",
        "Dark navy luxury box with gold typography",
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
                  <div className="relative group w-full max-w-lg aspect-square rounded-3xl overflow-hidden bg-[#14213D]/5 border border-[#14213D]/10 shadow-2xl flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={`${product.name} Authentic Bottle & Packaging`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute top-5 left-5">
                      <span className="font-serif text-[10px] uppercase tracking-[0.25em] font-bold text-[#14213D]/70 bg-white/90 px-3 py-1 rounded-full shadow-sm">
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

                {/* Editorial Storytelling & Purchasing Column */}
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

                  {/* Fragrance Notes Cards (Editable Fields Preserved) */}
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
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D]">
                          AED {product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-[#14213D]/40 line-through">
                          AED {product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#14213D]/50 font-medium block">
                        Volume: 100 ml / 3.4 fl. oz.
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
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
