"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  Check,
  Shield,
  Droplets,
  Sparkles,
  Truck,
  RotateCcw,
  Award,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import NeLogo from "@/components/brand/NeLogo";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("notes"); // 'notes' | 'details' | 'reviews'

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
        } else {
          router.push("/");
        }
      })
      .catch((err) => {
        console.error("Error loading product:", err);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EDE0]">
        <div className="text-center space-y-4">
          <NeLogo variant="navy" size="lg" showWordmark={false} />
          <p className="font-serif text-sm tracking-[0.3em] uppercase text-[#14213D]/70 animate-pulse">
            PREPARING PRIVATE FLACON...
          </p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  return (
    <div className="pt-28 pb-20 bg-[#F4EDE0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#14213D]/60 mb-8 font-sans">
          <Link href="/" className="hover:text-[#FF6B5B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#collection" className="hover:text-[#FF6B5B] transition-colors">
            Fragrance Trilogy
          </Link>
          <span>/</span>
          <span className="text-[#14213D] font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Large Flacon Photography */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-lg rounded-3xl bg-white/70 backdrop-blur-md border border-[#14213D]/10 p-8 shadow-xl flex items-center justify-center overflow-hidden">
              <Image
                src={product.bottleImage || product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-6 filter drop-shadow-[0_30px_45px_rgba(20,33,61,0.25)] transition-transform duration-700 hover:scale-105"
              />

              {product.badge && (
                <div className="absolute top-6 left-6">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full bg-[#14213D] text-[#F4EDE0]">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex items-center gap-4 mt-6">
              <div className="relative w-20 h-20 rounded-2xl bg-white/80 border-2 border-[#FF6B5B] p-2 flex items-center justify-center cursor-pointer shadow-sm">
                <Image
                  src={product.bottleImage || product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="relative w-20 h-20 rounded-2xl bg-white/60 border border-[#14213D]/10 p-2 flex items-center justify-center cursor-pointer hover:border-[#14213D]/30 transition-colors">
                <Image
                  src={product.image}
                  alt={`${product.name} Scene`}
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
          </div>

          {/* Right: Editorial & Purchase Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-[11px] uppercase tracking-[0.28em] font-bold text-[#FF6B5B]">
                  {product.subtitle || "Eau de Parfum"}
                </span>
                <div className="flex items-center gap-1.5 text-[#C5A059]">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold text-xs text-[#14213D]">
                    {product.rating || "4.9"}
                  </span>
                  <span className="text-[11px] text-[#14213D]/40">
                    ({product.reviewsCount || 120} connoisseur reviews)
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 my-4">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D]">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#14213D]/40 line-through">
                    ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                  </span>
                )}
                <span className="text-xs uppercase tracking-wider text-[#FF6B5B] font-semibold">
                  Taxes Included • Free Insured Delivery
                </span>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#14213D]/75 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#14213D]/60 block">
                CONCENTRATION & FLACON SIZE
              </span>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-[#14213D] shadow-sm">
                <span className="font-serif font-bold text-sm text-[#14213D]">
                  {product.size || "100ml / 3.4 FL. OZ."}
                </span>
                <span className="text-[10px] text-[#14213D]/50 uppercase tracking-widest font-semibold ml-2">
                  (Official Flacon)
                </span>
              </div>
            </div>

            {/* Stepper, Add to Bag & Wishlist Buttons */}
            <div className="pt-4 border-t border-[#14213D]/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center justify-between border border-[#14213D]/20 rounded-full bg-white px-3 py-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-1 hover:text-[#FF6B5B] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#14213D]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-1 hover:text-[#FF6B5B] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={() => addToCart(product, qty)}
                className="btn-luxury-coral flex-1 py-4 rounded-full font-sans text-xs uppercase tracking-[0.24em] font-semibold flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag size={16} />
                <span>ADD TO SHOPPING BAG</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Add to Wishlist"
                className={`w-14 h-14 rounded-full border border-[#14213D]/15 flex items-center justify-center transition-all ${
                  isFav
                    ? "bg-[#FF6B5B] text-white shadow-md"
                    : "bg-white text-[#14213D] hover:text-[#FF6B5B]"
                }`}
              >
                <Heart size={20} fill={isFav ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Maison Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#14213D]/10 text-xs text-[#14213D]/70 font-sans">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#FF6B5B] shrink-0" />
                <span>Express Insured Courier</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#C5A059] shrink-0" />
                <span>Velvet Presentation Box</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#14213D] shrink-0" />
                <span>100% Authentic Flacon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information: Olfactory Notes, Details, Reviews */}
        <div className="mt-20 pt-10 border-t border-[#14213D]/10">
          <div className="flex items-center justify-center space-x-6 sm:space-x-10 border-b border-[#14213D]/10 pb-4">
            <button
              onClick={() => setActiveTab("notes")}
              className={`font-serif text-sm sm:text-base font-bold tracking-wider uppercase transition-all relative pb-2 ${
                activeTab === "notes"
                  ? "text-[#FF6B5B]"
                  : "text-[#14213D]/60 hover:text-[#14213D]"
              }`}
            >
              Olfactory Pyramid (Editable Notes)
              {activeTab === "notes" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B5B]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`font-serif text-sm sm:text-base font-bold tracking-wider uppercase transition-all relative pb-2 ${
                activeTab === "details"
                  ? "text-[#FF6B5B]"
                  : "text-[#14213D]/60 hover:text-[#14213D]"
              }`}
            >
              Craftsmanship & Sillage
              {activeTab === "details" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B5B]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-serif text-sm sm:text-base font-bold tracking-wider uppercase transition-all relative pb-2 ${
                activeTab === "reviews"
                  ? "text-[#FF6B5B]"
                  : "text-[#14213D]/60 hover:text-[#14213D]"
              }`}
            >
              Connoisseur Reviews ({product.reviewsCount || 120})
              {activeTab === "reviews" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B5B]" />
              )}
            </button>
          </div>

          <div className="py-8 max-w-4xl mx-auto">
            {activeTab === "notes" && (
              <div className="space-y-6 bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-[#14213D]/10">
                <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/10">
                  <span className="font-serif text-xs uppercase tracking-[0.25em] font-bold text-[#14213D] flex items-center gap-2">
                    <Droplets size={16} className="text-[#FF6B5B]" />
                    <span>Official Fragrance Architecture</span>
                  </span>
                  <span className="text-[10px] text-[#FF6B5B] font-bold uppercase tracking-wider">
                    SPECIFICATION PRESERVED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#14213D]/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B5B] block mb-2">
                      TOP ACCORD
                    </span>
                    <p className="font-serif text-sm text-[#14213D]/80 leading-relaxed">
                      {typeof product.notes === "object" ? product.notes.top : product.notes}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#14213D]/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B5B] block mb-2">
                      HEART ACCORD
                    </span>
                    <p className="font-serif text-sm text-[#14213D]/80 leading-relaxed">
                      {typeof product.notes === "object"
                        ? product.notes.heart
                        : "Velvety floral & woody middle accords"}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#14213D]/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B5B] block mb-2">
                      BASE ACCORD
                    </span>
                    <p className="font-serif text-sm text-[#14213D]/80 leading-relaxed">
                      {typeof product.notes === "object"
                        ? product.notes.base
                        : "Deep amber, musk & precious wood foundations"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-4 bg-white/70 p-8 rounded-3xl border border-[#14213D]/10 font-sans text-sm text-[#14213D]/80 leading-relaxed">
                <p>
                  Every NexWorld flacon is blown from heavy optical crystal and hand-inspected in our atelier. Caps are weighted and stamped with the iconic interlocking <strong>NE</strong> monogram.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-[#FAF7F2]">
                    <strong className="block font-serif text-[#14213D] mb-1">
                      Longevity & Sillage
                    </strong>
                    <span>10 to 14 hours of persistent projection, leaving an indelible trail.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF7F2]">
                    <strong className="block font-serif text-[#14213D] mb-1">
                      Application Recommendation
                    </strong>
                    <span>Mist onto pulse points — nape of neck, wrists, and collarbone.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4 bg-white/70 p-8 rounded-3xl border border-[#14213D]/10">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#14213D]/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#14213D]">
                      Vikramaditya S.
                    </span>
                    <div className="flex text-[#C5A059]">
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-xs text-[#14213D]/70 italic font-serif">
                    "The projection on this flacon is exceptional. Received countless compliments on first wear. NexWorld has created something timeless."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#14213D]/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#14213D]">
                      Natasha M.
                    </span>
                    <div className="flex text-[#C5A059]">
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                      <Star size={13} fill="currentColor" />
                    </div>
                  </div>
                  <p className="text-xs text-[#14213D]/70 italic font-serif">
                    "The bottle packaging alone feels like pure museum art. The fragrance evolves so beautifully throughout the day."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
