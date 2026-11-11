"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import NeLogo from "@/components/brand/NeLogo";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F4EDE0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-3">
            <NeLogo variant="navy" size="md" showWordmark={false} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF6B5B] block mb-1">
            CURATED SELECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide uppercase text-[#14213D]">
            YOUR PRIVATE WISHLIST ({wishlist.length})
          </h1>
          <p className="text-xs text-[#14213D]/65 mt-2">
            Save your desired olfactive compositions for future acquisitions.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white/60 rounded-3xl p-8 border border-[#14213D]/10 max-w-md mx-auto">
            <Heart size={36} className="mx-auto text-[#14213D]/25 mb-4" />
            <h3 className="font-serif text-xl font-bold text-[#14213D]">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-[#14213D]/60 mt-1 mb-6">
              Browse our trilogy and click the heart on any flacon to preserve it here.
            </p>
            <Link
              href="/#collection"
              className="btn-luxury-coral inline-block px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              EXPLORE TRILOGY
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#14213D]/10 shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full rounded-2xl bg-[#F4EDE0]/50 p-4 mb-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.bottleImage || item.image || "/images/zego.png"}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white text-[#FF6B5B] shadow-sm hover:scale-105 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#FF6B5B] font-bold">
                    {item.subtitle || "Eau de Parfum"}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#14213D] mt-0.5">
                    {item.name}
                  </h3>
                  <span className="font-serif font-bold text-base text-[#14213D] block my-2">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#14213D]/10 flex items-center gap-3">
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="btn-luxury-coral flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                  >
                    <ShoppingBag size={14} />
                    <span>ADD TO BAG</span>
                  </button>
                  <Link
                    href={`/product/${item.id}`}
                    className="p-2.5 rounded-full border border-[#14213D]/15 hover:bg-[#14213D] hover:text-white transition-colors"
                  >
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
