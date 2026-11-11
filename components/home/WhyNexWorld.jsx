"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fingerprint, Wind, Crown, Sparkles } from "lucide-react";

export default function WhyNexWorld() {
  const features = [
    {
      title: "Crafted Identity",
      subtitle: "SINGULAR PROFILES",
      icon: Fingerprint,
      desc: "Fragrance designed not as a generic cosmetic, but as an intimate reflection of your unique aura, crafted with singular precision.",
      accent: "#FF6B5B",
    },
    {
      title: "Memorable Fragrance",
      subtitle: "INDELIBLE SILLAGE",
      icon: Wind,
      desc: "Masterful oil concentrations that project with commanding grace, lingering in rooms and memories with unmistakable sophistication.",
      accent: "#2A7B88",
    },
    {
      title: "Everyday Luxury",
      subtitle: "TIMELESS ELEVATION",
      icon: Crown,
      desc: "Sublime architectural flacons, weighted caps, and pure crystal glass that elevate daily rituals into transcendent luxury moments.",
      accent: "#C5A059",
    },
  ];

  return (
    <section id="why-nexworld" className="py-24 sm:py-32 bg-[#FAF7F2] relative overflow-hidden border-t border-[#14213D]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#14213D]/10 mb-4">
            <Sparkles size={12} className="text-[#FF6B5B]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#14213D]/80">
              THE NEXWORLD DISTINCTION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase">
            WHY NEXWORLD
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#14213D]/70 max-w-xl mx-auto mt-3">
            Three core commitments that define every flacon leaving our private atelier.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-md border border-[#14213D]/10 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Subtle Hover Glow on Top Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
                  style={{ backgroundColor: feat.accent }}
                />

                {/* Icon Crest */}
                <div className="mb-6 w-14 h-14 rounded-2xl bg-[#F4EDE0] border border-[#14213D]/10 flex items-center justify-center text-[#14213D] group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm"
                  style={{
                    backgroundColor: undefined,
                  }}
                >
                  <IconComponent size={26} strokeWidth={1.7} className="transition-colors group-hover:text-[#FF6B5B]" />
                </div>

                {/* Subtitle */}
                <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#14213D]/50 block mb-2">
                  {feat.subtitle}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14213D] tracking-wide mb-3">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-[#14213D]/70 leading-relaxed">
                  {feat.desc}
                </p>

                {/* Bottom Architectural Accent Line */}
                <div className="mt-8 pt-4 border-t border-[#14213D]/5 flex items-center justify-between text-[11px] text-[#14213D]/50 uppercase tracking-widest font-semibold">
                  <span>MAISON PILLAR 0{index + 1}</span>
                  <span className="text-[#FF6B5B] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    EXCELLENCE
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
