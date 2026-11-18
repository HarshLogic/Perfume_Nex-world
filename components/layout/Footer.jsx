"use client";

import React from "react";
import Link from "next/link";
import NeLogo from "@/components/brand/NeLogo";
import { ArrowUp, Mail, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#14213D] text-[#F4EDE0] pt-20 pb-12 relative overflow-hidden border-t border-[#F4EDE0]/10">
      {/* Background Watermark Crest */}
      <div className="absolute right-[-60px] bottom-[-60px] opacity-[0.03] pointer-events-none select-none">
        <NeLogo variant="cream" size="xl" showWordmark={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#F4EDE0]/10">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-6">
            <NeLogo variant="cream" size="lg" showWordmark={true} subtitle="HAUTE PARFUMERIE" />
            <p className="text-[#F4EDE0]/75 text-sm leading-relaxed max-w-sm font-sans">
              "Capturing the essence of the world in every bottle. Experience luxury redefined."
            </p>
            <p className="text-xs text-[#F4EDE0]/60 leading-relaxed max-w-sm">
              Nexence represents the pinnacle of international fragrance craftsmanship, blending rare botanical extractions sourced across the globe into timeless olfactory signatures.
            </p>
          </div>

          {/* Col 3: The Collection */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.28em] text-[#FF6B5B] mb-5 font-bold">
              The Collection
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F4EDE0]/70">
              <li>
                <Link href="/product/zoya" className="hover:text-[#F4EDE0] transition-colors">
                  Zoya — 100 ml
                </Link>
              </li>
              <li>
                <Link href="/product/nexdesire" className="hover:text-[#F4EDE0] transition-colors">
                  Nexdesire — 100 ml
                </Link>
              </li>
              <li>
                <Link href="/product/oud-alashhar" className="hover:text-[#F4EDE0] transition-colors">
                  Oud Al Ashhar — 100 ml
                </Link>
              </li>
              <li>
                <Link href="/product/infinity" className="hover:text-[#F4EDE0] transition-colors">
                  NexWorld Infinity — 100 ml
                </Link>
              </li>
              <li>
                <Link href="/product/oud-alhind" className="hover:text-[#F4EDE0] transition-colors">
                  Oud Alhind — 100 ml
                </Link>
              </li>
              <li>
                <Link href="/product/nexaura" className="hover:text-[#F4EDE0] transition-colors">
                  Nexaura — 100 ml
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Navigation & Customer Info */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.28em] text-[#FF6B5B] mb-5 font-bold">
              Maison
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F4EDE0]/70">
              <li>
                <Link href="/" className="hover:text-[#F4EDE0] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#collection" className="hover:text-[#F4EDE0] transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-[#F4EDE0] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#F4EDE0] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F4EDE0] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F4EDE0] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#F4EDE0] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#F4EDE0] transition-colors">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Official Contact */}
          <div>
            <h4 className="font-serif text-xs uppercase tracking-[0.28em] text-[#FF6B5B] mb-5 font-bold">
              Concierge
            </h4>
            <div className="space-y-4 text-xs text-[#F4EDE0]/75 font-sans">
              <p className="leading-relaxed">
                For private fragrance consultations, orders, and inquiries:
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF6B5B] block">
                  OFFICIAL MAISON INBOX
                </span>
                <a
                  href="mailto:info@nexence.in"
                  className="font-serif text-sm text-[#F4EDE0] hover:text-[#FF6B5B] flex items-center gap-2 font-medium transition-colors"
                >
                  <Mail size={16} className="text-[#FF6B5B] shrink-0" />
                  <span>info@nexence.in</span>
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="text-[11px] text-[#DFBF7E] hover:underline uppercase tracking-wider font-semibold block"
                >
                  Atelier Curator Access →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F4EDE0]/60 font-sans gap-4">
          <p>© NEXENCE. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-[#F4EDE0] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#F4EDE0] transition-colors">
              Terms & Conditions
            </Link>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex items-center gap-1.5 hover:text-[#FF6B5B] transition-colors font-semibold"
            >
              <span>TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
