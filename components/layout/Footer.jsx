"use client";

import React from "react";
import Link from "next/link";
import NeLogo from "@/components/brand/NeLogo";
import { Instagram, Twitter, Facebook, ArrowUp, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#14213D] text-[#F4EDE0] pt-20 pb-12 relative overflow-hidden">
      {/* Subtle Background Monogram Watermark */}
      <div className="absolute right-[-60px] bottom-[-60px] opacity-[0.03] pointer-events-none select-none">
        <NeLogo variant="cream" size="xl" showWordmark={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#F4EDE0]/10">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-6">
            <NeLogo variant="cream" size="lg" showWordmark={true} subtitle="HAUTE PARFUMERIE" />
            <p className="text-[#F4EDE0]/70 text-sm leading-relaxed max-w-sm font-sans">
              NexWorld is an international luxury fragrance house crafting evocative olfactory identities. Every flacon is an intimate dialogue between master perfumery and timeless architecture.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#F4EDE0]/20 flex items-center justify-center text-[#F4EDE0]/80 hover:text-[#FF6B5B] hover:border-[#FF6B5B] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-[#F4EDE0]/20 flex items-center justify-center text-[#F4EDE0]/80 hover:text-[#FF6B5B] hover:border-[#FF6B5B] transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#F4EDE0]/20 flex items-center justify-center text-[#F4EDE0]/80 hover:text-[#FF6B5B] hover:border-[#FF6B5B] transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Col 3: The Collection */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.25em] text-[#FF6B5B] mb-5 font-semibold">
              The Collection
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F4EDE0]/70">
              <li>
                <Link href="/product/zego" className="hover:text-[#F4EDE0] transition-colors">
                  Zego — Eau de Parfum
                </Link>
              </li>
              <li>
                <Link href="/product/infinity" className="hover:text-[#F4EDE0] transition-colors">
                  NexWorld Infinity
                </Link>
              </li>
              <li>
                <Link href="/product/oud-alhind" className="hover:text-[#F4EDE0] transition-colors">
                  Oud Alhind — Extrait
                </Link>
              </li>
              <li>
                <Link href="/#collection" className="hover:text-[#F4EDE0] transition-colors">
                  Signature Discovery Set
                </Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-[#F4EDE0] transition-colors">
                  Private Reserve
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Maison & Services */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.25em] text-[#FF6B5B] mb-5 font-semibold">
              Maison
            </h4>
            <ul className="space-y-3 font-sans text-xs tracking-wider text-[#F4EDE0]/70">
              <li>
                <Link href="/#story" className="hover:text-[#F4EDE0] transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/#why-nexworld" className="hover:text-[#F4EDE0] transition-colors">
                  The Art of Sillage
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#F4EDE0] transition-colors">
                  Client Concierge
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-[#F4EDE0] transition-colors">
                  Track Your Flacon
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#C5A059] hover:underline transition-colors">
                  Curator Access (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Atelier Contact */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.25em] text-[#FF6B5B] mb-5 font-semibold">
              Atelier
            </h4>
            <div className="space-y-3.5 text-xs text-[#F4EDE0]/70 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#FF6B5B] shrink-0 mt-0.5" />
                <span>NexWorld Fragrance Maison, Mumbai & Paris</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#FF6B5B] shrink-0" />
                <span>concierge@nexworldperfumes.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#FF6B5B] shrink-0" />
                <span>+91 (022) 8000-NEXW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F4EDE0]/50 font-sans gap-4">
          <p>© {new Date().getFullYear()} NEXWORLD PARFUMS INC. All Rights Reserved.</p>
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
              className="flex items-center gap-1.5 hover:text-[#FF6B5B] transition-colors"
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
