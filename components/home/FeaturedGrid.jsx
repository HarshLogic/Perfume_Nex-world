"use client";

import React, { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Sparkles } from "lucide-react";

export default function FeaturedGrid({ products = [], onQuickView }) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "The Trilogy" },
    { id: "floral", label: "Floral & Sensual" },
    { id: "aquatic", label: "Aquatic & Fresh" },
    { id: "oud", label: "Imperial Oud" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "floral") return p.category?.toLowerCase().includes("floral") || p.id === "zego";
    if (activeTab === "aquatic") return p.category?.toLowerCase().includes("aquatic") || p.id === "infinity";
    if (activeTab === "oud") return p.category?.toLowerCase().includes("oud") || p.id === "oud-alhind";
    return true;
  });

  return (
    <section id="featured-collection" className="py-24 sm:py-32 bg-[#F4EDE0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#14213D]/10 mb-4">
              <Sparkles size={12} className="text-[#FF6B5B]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#14213D]/80">
                CURATED SHOWCASE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase">
              FEATURED COLLECTION
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#14213D]/70 max-w-lg mt-2">
              Explore the official NexWorld portfolio. Handcrafted luxury extractions designed for unforgettable presence.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#14213D]/10 pb-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#14213D] text-[#F4EDE0] shadow-sm"
                      : "text-[#14213D]/60 hover:text-[#14213D] hover:bg-[#14213D]/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
