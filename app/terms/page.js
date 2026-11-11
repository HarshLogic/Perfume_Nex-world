import React from "react";
import Link from "next/link";
import NeLogo from "@/components/brand/NeLogo";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-[#14213D]/10 shadow-sm space-y-6">
        <div className="text-center pb-6 border-b border-[#14213D]/10">
          <NeLogo variant="navy" size="md" showWordmark={false} />
          <h1 className="font-serif text-3xl font-bold uppercase tracking-wider text-[#14213D] mt-3">
            TERMS & CONDITIONS OF SALE
          </h1>
          <p className="text-xs text-[#14213D]/60 mt-1">
            NexWorld Luxury Perfumes • Maison Guidelines
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#14213D]/80 leading-relaxed font-sans">
          <p>
            Welcome to the official online boutique of NexWorld. By acquiring any flacon from our collections, you agree to the conditions set forth herein.
          </p>
          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            1. Authenticity Guarantee
          </h3>
          <p>
            All fragrances sold directly through NexWorld are 100% authentic, hand-inspected, and delivered in official sealed packaging with the interlocking NE monogram.
          </p>
          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            2. Shipping & Delivery
          </h3>
          <p>
            We provide insured domestic express courier delivery across India. Deliveries are typically dispatched within 24–48 hours of formulation verification.
          </p>
          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            3. Returns & Replacements
          </h3>
          <p>
            Due to the delicate nature of high-concentration extraits and personal hygiene standards, flacons may only be returned if received damaged or defective in transit, reported within 7 days of delivery.
          </p>
        </div>

        <div className="pt-6 border-t border-[#14213D]/10 text-center">
          <Link
            href="/"
            className="btn-luxury-navy inline-block px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            RETURN TO MAISON
          </Link>
        </div>
      </div>
    </div>
  );
}
