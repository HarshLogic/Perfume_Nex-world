"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Compass, Feather, Award } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="story" className="relative py-24 sm:py-32 bg-[#F4EDE0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Image with Floating Monogram Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#14213D]/10">
              <Image
                src="/images/brand-story.png"
                alt="NexWorld Perfume Atelier & Craftsmanship"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              {/* Subtle Warm Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/60 via-transparent to-transparent" />
            </div>

            {/* Overlapping Architectural Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-[#14213D]/10 max-w-xs hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[#FF6B5B]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#14213D]">
                  MASTER ATELIER
                </span>
              </div>
              <p className="font-editorial italic text-base text-[#14213D]/80 leading-relaxed">
                "Fragrance is invisible architecture. It lingers long after the moment has passed."
              </p>
              <span className="block mt-2 text-[10px] uppercase tracking-wider text-[#FF6B5B] font-semibold">
                — NexWorld Master Nose
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#14213D]/10 mb-4">
                <Compass size={12} className="text-[#FF6B5B]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#14213D]/80">
                  OUR PHILOSOPHY
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase leading-[1.15]">
                BEYOND FRAGRANCE. <br />
                <span className="text-[#FF6B5B] font-editorial italic lowercase tracking-normal font-normal text-4xl sm:text-5xl md:text-6xl">
                  a world of identity.
                </span>
              </h2>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#14213D]/75 leading-relaxed">
              <p>
                NexWorld was conceived not merely to produce scents, but to author personal signatures. Born from an uncompromising pursuit of pure aesthetic distinction, we weave rare natural extractions with structural glass silhouettes.
              </p>
              <p>
                From the velvety blush radiance of <strong className="text-[#14213D] font-serif">Zego</strong>, to the infinite aquatic expanse of <strong className="text-[#14213D] font-serif">Infinity</strong>, to the royal agarwood depth of <strong className="text-[#14213D] font-serif">Oud Alhind</strong> — each creation is a distinct chapter of human emotion.
              </p>
            </div>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#14213D]/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#FF6B5B]">
                  <Feather size={16} />
                  <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#14213D]">
                    Artisanal Distillation
                  </span>
                </div>
                <p className="text-xs text-[#14213D]/65 leading-normal">
                  Sourced sustainably from vintage harvests in Grasse, Assam, and the Mediterranean.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#FF6B5B]">
                  <Award size={16} />
                  <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#14213D]">
                    Haute Concentration
                  </span>
                </div>
                <p className="text-xs text-[#14213D]/65 leading-normal">
                  Formulated at premium Eau de Parfum and Extrait levels for indelible, lasting sillage.
                </p>
              </div>
            </div>

            <div>
              <a
                href="#collection"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.24em] font-semibold text-[#FF6B5B] hover:text-[#14213D] transition-colors group"
              >
                <span>EXPLORE THE TRILOGY ARCHIVE</span>
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
