"use client";

import React, { useState, useEffect } from "react";
import CinematicHero from "@/components/home/CinematicHero";
import BottleSpreadSection from "@/components/home/BottleSpreadSection";
import IndividualProductStories from "@/components/home/IndividualProductStories";
import BrandStory from "@/components/home/BrandStory";
import WhyNexWorld from "@/components/home/WhyNexWorld";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import NewsletterSection from "@/components/home/NewsletterSection";
import QuickViewModal from "@/components/modals/QuickViewModal";

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
      {/* Section 2: Cinematic Hero */}
      <CinematicHero />

      {/* Section 3: The Fragrance Collection (GSAP Scroll Spread Animation) */}
      <BottleSpreadSection onQuickView={handleOpenQuickView} />

      {/* Section 4: Individual Product Experiences (Zego, Infinity, Oud Alhind) */}
      <IndividualProductStories onQuickView={handleOpenQuickView} />

      {/* Section 5: Brand Story */}
      <BrandStory />

      {/* Section 6: Why NexWorld */}
      <WhyNexWorld />

      {/* Section 7: Featured Collection Grid */}
      <FeaturedGrid products={products} onQuickView={handleOpenQuickView} />

      {/* Section 8: Newsletter */}
      <NewsletterSection />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
