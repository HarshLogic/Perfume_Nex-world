"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

export default function SearchModal({ products = [] }) {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(products.slice(0, 3));
      return;
    }

    const q = searchQuery.toLowerCase();
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        JSON.stringify(p.notes || "").toLowerCase().includes(q)
    );
    setResults(matched);
  }, [searchQuery, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-[#14213D]/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#14213D]/10 overflow-hidden z-10 p-6 sm:p-8 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b-2 border-[#14213D] pb-3">
          <Search size={22} className="text-[#FF6B5B] shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fragrances, notes (Oud, Rose, Ambergris)..."
            autoFocus
            className="w-full bg-transparent text-[#14213D] placeholder-[#14213D]/40 text-lg sm:text-xl font-serif focus:outline-none"
          />
          <button
            onClick={() => {
              setSearchQuery("");
              setIsSearchOpen(false);
            }}
            className="p-1.5 text-[#14213D]/50 hover:text-[#14213D] rounded-full hover:bg-[#14213D]/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50">
            POPULAR:
          </span>
          {["Zego", "Infinity", "Oud Alhind", "Assam Oud", "Extrait"].map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="text-xs px-3 py-1 rounded-full bg-white border border-[#14213D]/10 text-[#14213D] hover:bg-[#FF6B5B] hover:text-white hover:border-[#FF6B5B] transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="mt-6 max-h-96 overflow-y-auto space-y-3">
          <div className="text-[11px] uppercase tracking-wider text-[#14213D]/50 font-bold">
            {searchQuery.trim()
              ? `RESULTS (${results.length})`
              : "THE NEXWORLD SIGNATURE TRILOGY"}
          </div>

          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#14213D]/60 font-sans">
              No matching fragrances found for "{searchQuery}".
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={() => setIsSearchOpen(false)}
                className="flex items-center gap-4 p-3 rounded-2xl bg-white hover:bg-white/90 border border-[#14213D]/5 shadow-sm hover:shadow transition-all group"
              >
                <div className="relative w-14 h-16 rounded-xl bg-[#F4EDE0] p-1.5 shrink-0 flex items-center justify-center">
                  <Image
                    src={product.bottleImage || product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-[#FF6B5B] font-bold block">
                    {product.subtitle || "Eau de Parfum"}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#14213D] group-hover:text-[#FF6B5B] transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#14213D]/60 truncate">
                    {product.size} • ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-[#14213D]/40 group-hover:text-[#FF6B5B] group-hover:translate-x-1 transition-all">
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
