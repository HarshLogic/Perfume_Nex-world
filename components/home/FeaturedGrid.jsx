"use client";

import React, { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Sparkles } from "lucide-react";

export default function FeaturedGrid({ products = [], onQuickView }) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Six Creations (6)" },
    { id: "floral", label: "Floral & Amethyst" },
    { id: "oud", label: "Prestige Oud & Woods" },
    { id: "fresh", label: "Aquatic & Midnight" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "floral") return p.id === "zoya" || p.id === "nexdesire";
    if (activeTab === "oud") return p.id === "oud-alashhar" || p.id === "oud-alhind";
    if (activeTab === "fresh") return p.id === "infinity" || p.id === "nexaura";
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
                NEXENCE PORTFOLIO
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase">
              THE COMPLETE COLLECTION
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#14213D]/70 max-w-lg mt-2 leading-relaxed">
              Experience the six official Nexence fragrances. Crafted from exceptional global ingredients and bottled in 100 ml / 3.4 fl. oz. luxury crystal flacons.
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

        {/* Product Cards Grid: 6 Products */}
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
