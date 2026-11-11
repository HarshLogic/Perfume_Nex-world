"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const isFav = isInWishlist(product.id);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-3xl bg-white/70 backdrop-blur-md border border-[#14213D]/10 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-[#FAF7F2] to-[#F4EDE0]/50 p-6 flex items-center justify-center overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full bg-white/90 text-[#14213D] border border-[#14213D]/10 shadow-sm backdrop-blur-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFav
              ? "bg-[#FF6B5B] text-white shadow-md"
              : "bg-white/80 text-[#14213D]/70 hover:text-[#FF6B5B] hover:bg-white shadow-sm"
          }`}
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Product Image with Hover Flip / Scale */}
        <Link
          href={`/product/${product.id}`}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={product.bottleImage || product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-110 filter drop-shadow-[0_15px_25px_rgba(20,33,61,0.15)]"
          />
        </Link>

        {/* Quick Action Overlay (Desktop) */}
        <div
          className={`absolute inset-x-4 bottom-4 z-20 flex items-center justify-center gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="flex-1 py-2.5 px-3 rounded-full bg-white/95 backdrop-blur-md text-[#14213D] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-[#14213D] hover:text-[#F4EDE0] transition-colors"
          >
            <Eye size={14} />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>

      {/* Product Details Block */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-white/40">
        <div>
          {/* Subtitle & Rating */}
          <div className="flex items-center justify-between text-xs text-[#14213D]/60 mb-1.5">
            <span className="uppercase tracking-[0.22em] font-semibold text-[10px]">
              {product.subtitle || "Eau de Parfum"}
            </span>
            <div className="flex items-center gap-1 text-[#C5A059]">
              <Star size={12} fill="currentColor" />
              <span className="font-semibold text-xs text-[#14213D]">
                {product.rating || "4.9"}
              </span>
              <span className="text-[10px] text-[#14213D]/40">
                ({product.reviewsCount || 120})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.id}`} className="group/title">
            <h3 className="font-serif text-xl font-bold text-[#14213D] tracking-wide group-hover/title:text-[#FF6B5B] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Notes Preview (Editable Field) */}
          <p className="text-[11px] text-[#14213D]/60 italic font-serif line-clamp-1 mt-1.5">
            {typeof product.notes === "object"
              ? `${product.notes.top?.split("—")[1]?.trim() || "Notes"} • ${
                  product.notes.heart?.split("—")[1]?.trim() || ""
                }`
              : product.notes}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-4 mt-4 border-t border-[#14213D]/5 flex items-center justify-between">
          <div>
            <span className="font-serif font-bold text-lg text-[#14213D]">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#14213D]/40 line-through ml-2">
                ₹{Number(product.originalPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="w-10 h-10 rounded-full bg-[#FF6B5B] hover:bg-[#e84d3c] text-white flex items-center justify-center transition-all shadow-sm hover:scale-105"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
