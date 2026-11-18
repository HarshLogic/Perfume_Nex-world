"use client";

import React, { useState, useEffect } from "react";
import CinematicHero from "@/components/home/CinematicHero";
import BottleSpreadSection from "@/components/home/BottleSpreadSection";
import IndividualProductStories from "@/components/home/IndividualProductStories";
import BrandStory from "@/components/home/BrandStory";
import WhyNexence from "@/components/home/WhyNexence";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import NewsletterSection from "@/components/home/NewsletterSection";
import ContactSection from "@/components/home/ContactSection";
import QuickViewModal from "@/components/modals/QuickViewModal";
import { Sparkles } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="relative overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <CinematicHero />

      {/* 2. Essence of the World Introduction */}
      <section className="py-20 bg-[#F4EDE0] border-t border-[#14213D]/5 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14213D]/5 border border-[#14213D]/10 mb-4">
            <Sparkles size={12} className="text-[#FF6B5B]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#14213D]/80">
              GLOBAL OLFACTORY HARMONY
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wider text-[#14213D]">
            FRAGRANCES CRAFTED FROM INGREDIENTS SOURCED ACROSS THE GLOBE
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#14213D]/75 max-w-2xl mx-auto mt-3 leading-relaxed">
            From the sun-drenched fields of Grasse to the spice markets of Istanbul and the sacred agarwood forests of Assam, Nexence unifies the world's most exceptional botanicals into six transcendent flacons.
          </p>
        </div>
      </section>

      {/* 3. Six-Product Fragrance Collection (GSAP Scroll Spreading Animation) */}
      <BottleSpreadSection onQuickView={handleOpenQuickView} />

      {/* 4. Individual Product Storytelling Sections (Zoya, Nexdesire, Oud Al Ashhar, NexWorld Infinity, Oud Alhind, Nexaura) */}
      <IndividualProductStories onQuickView={handleOpenQuickView} />

      {/* 5. A Legacy of Luxury Brand Story */}
      <BrandStory />

      {/* 6. Premium Brand Experience Section (Why Nexence) */}
      <WhyNexence />

      {/* 7. Complete Six-Product Portfolio Grid */}
      <FeaturedGrid products={products} onQuickView={handleOpenQuickView} />

      {/* 8. Newsletter Subscription */}
      <NewsletterSection />

      {/* 9. Contact Section (info@nexence.in) */}
      <ContactSection />

      {/* 10. Brand Closing Statement */}
      <section className="py-16 bg-[#14213D] text-[#F4EDE0] border-t border-b border-[#F4EDE0]/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center mb-4">
            <NeLogo variant="cream" size="sm" showWordmark={false} />
          </div>
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic tracking-wide text-[#F4EDE0] leading-snug">
            "Capturing the essence of the world in every bottle. Experience luxury redefined."
          </blockquote>
          <span className="block mt-4 text-[10px] uppercase tracking-[0.3em] font-semibold text-[#FF6B5B]">
            NEXENCE LUXURY PERFUMES
          </span>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
