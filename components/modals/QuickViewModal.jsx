"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Plus, Minus, ShoppingBag, Heart, Droplets, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!isOpen || !product) return null;

  const isFav = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#14213D]/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#14213D]/10 overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#14213D] flex items-center justify-center shadow-sm transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-gradient-to-b from-white/90 to-[#F4EDE0] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#14213D]/10">
            <div className="relative w-full h-72 sm:h-96">
              <Image
                src={product.bottleImage || product.image}
                alt={product.name}
                fill
                className="object-contain filter drop-shadow-[0_20px_30px_rgba(20,33,61,0.2)]"
              />
            </div>
            {product.badge && (
              <span className="absolute top-6 left-6 font-sans text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full bg-[#14213D] text-[#F4EDE0]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#FF6B5B]">
                  {product.subtitle || "Eau de Parfum"}
                </span>
                <div className="flex items-center gap-1 text-[#C5A059] text-xs">
                  <Star size={13} fill="currentColor" />
                  <span className="font-bold text-[#14213D]">
                    {product.rating || "4.9"}
                  </span>
                  <span className="text-[#14213D]/40 text-[10px]">
                    ({product.reviewsCount || 140} reviews)
                  </span>
                </div>
              </div>

              {/* Product Name */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D] tracking-wide">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="font-serif text-2xl font-bold text-[#14213D]">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#14213D]/40 line-through">
                    ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xs text-[#FF6B5B] font-semibold">
                  (Includes all taxes & delivery)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#14213D]/75 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Notes Olfactory Pyramid (Editable Fields) */}
              <div className="mt-4 p-4 rounded-xl bg-white/70 border border-[#14213D]/10 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6B5B] flex items-center gap-1">
                  <Droplets size={12} />
                  <span>Fragrance Notes Structure (Editable)</span>
                </span>
                <div className="space-y-1 text-xs text-[#14213D]/80">
                  <p>
                    <strong className="text-[#14213D]">Top:</strong>{" "}
                    {typeof product.notes === "object" ? product.notes.top : product.notes}
                  </p>
                  {typeof product.notes === "object" && (
                    <>
                      <p>
                        <strong className="text-[#14213D]">Heart:</strong>{" "}
                        {product.notes.heart}
                      </p>
                      <p>
                        <strong className="text-[#14213D]">Base:</strong>{" "}
                        {product.notes.base}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Size Badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs text-[#14213D]/60 font-medium">Size:</span>
                <span className="text-xs font-bold text-[#14213D] bg-white px-3 py-1 rounded-md border border-[#14213D]/10">
                  {product.size || "100ml / 3.4 FL. OZ."}
                </span>
              </div>
            </div>

            {/* Actions: Stepper + Add to Cart + Wishlist */}
            <div className="pt-4 border-t border-[#14213D]/10 space-y-3">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-[#14213D]/20 rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1 hover:text-[#FF6B5B] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#14213D]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-1 hover:text-[#FF6B5B] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAdd}
                  className="btn-luxury-coral flex-1 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag size={15} />
                  <span>ADD TO BAG</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Save to wishlist"
                  className={`w-11 h-11 rounded-full border border-[#14213D]/10 flex items-center justify-center transition-all ${
                    isFav
                      ? "bg-[#FF6B5B] text-white"
                      : "bg-white text-[#14213D] hover:text-[#FF6B5B]"
                  }`}
                >
                  <Heart size={17} fill={isFav ? "currentColor" : "none"} />
                </button>
              </div>

              {/* View Full Product Link */}
              <div className="text-center">
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest text-[#14213D]/70 hover:text-[#FF6B5B] font-semibold transition-colors underline"
                >
                  VIEW COMPLETE EDITORIAL EXPERIENCE →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
