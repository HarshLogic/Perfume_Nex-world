"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, X, ArrowRight, CheckCircle2, RotateCcw, ShoppingBag, Compass } from "lucide-react";
import { useCart } from "@/context/CartContext";
import NeLogo from "@/components/brand/NeLogo";

export default function ScentFinderModal({ isOpen, onClose }) {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    aura: "",
    occasion: "",
    accord: "",
  });

  if (!isOpen) return null;

  const questions = [
    {
      step: 1,
      title: "WHAT AURA DO YOU WISH TO COMMAND?",
      subtitle: "Select the visceral emotional impression you desire your sillage to leave behind.",
      field: "aura",
      options: [
        {
          id: "radiant",
          label: "Radiant & Romantic Grace",
          desc: "Soft, alluring warmth, feminine poise, luminous modern charm.",
          flacon: "zego",
          tag: "Blush Floral",
        },
        {
          id: "magnetic",
          label: "Magnetic Ocean Freshness",
          desc: "Expansive horizons, crisp authority, effortless contemporary magnetism.",
          flacon: "infinity",
          tag: "Aquatic Woody",
        },
        {
          id: "imperial",
          label: "Imperial Royalty & Mystery",
          desc: "Sovereign depth, enigmatic warmth, timeless aristocrat presence.",
          flacon: "oud-alhind",
          tag: "Imperial Oud",
        },
      ],
    },
    {
      step: 2,
      title: "FOR WHAT OCCASION WILL THIS SILLAGE BE WORN?",
      subtitle: "Different atmospheric temperatures and settings awaken different molecular notes.",
      field: "occasion",
      options: [
        {
          id: "daytime",
          label: "Sunlit Soirées & Everyday Intimacy",
          desc: "Versatile, luminous, captivating from morning conversations to sunset champagne.",
          flacon: "zego",
        },
        {
          id: "signature",
          label: "Executive Presence & Mediterranean Travels",
          desc: "Fresh morning projection evolving into deep mineral woods by dusk.",
          flacon: "infinity",
        },
        {
          id: "nocturne",
          label: "Grand Receptions & Starlit Galas",
          desc: "High-octane formal evenings, winter banquets, indelible grand entrances.",
          flacon: "oud-alhind",
        },
      ],
    },
    {
      step: 3,
      title: "WHICH INGREDIENT HARMONY RESONATES DEEPEST?",
      subtitle: "The foundational olfactory family that stirs your sensory memory.",
      field: "accord",
      options: [
        {
          id: "floral-vanilla",
          label: "Centifolia Rose, Pink Pepper & Cashmere Vanilla",
          desc: "Delicate petals suspended in velvety Madagascar amber crystals.",
          flacon: "zego",
        },
        {
          id: "marine-sage",
          label: "Sea Mineral Salts, Frosted Bergamot & Blue Cedar",
          desc: "Invigorating coastal ozone blended with aristocratic driftwood.",
          flacon: "infinity",
        },
        {
          id: "agarwood-saffron",
          label: "Wild Assam Agarwood, Saffron Stigmas & Golden Resins",
          desc: "Rare vintage oud wood harvested sustainably from ancient Himalayan foothills.",
          flacon: "oud-alhind",
        },
      ],
    },
  ];

  const handleSelectOption = (field, flaconId) => {
    setAnswers({ ...answers, [field]: flaconId });
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Results stage
    }
  };

  // Determine matched fragrance
  const getRecommendation = () => {
    const counts = { zego: 0, infinity: 0, "oud-alhind": 0 };
    Object.values(answers).forEach((val) => {
      if (counts[val] !== undefined) counts[val]++;
    });

    let best = "infinity";
    let max = -1;
    for (const [k, v] of Object.entries(counts)) {
      if (v > max) {
        max = v;
        best = k;
      }
    }

    if (best === "zego") {
      return {
        id: "zego",
        name: "Zego",
        subtitle: "Eau de Parfum",
        price: 4999,
        size: "100ml / 3.4 FL. OZ.",
        image: "/images/zego.png",
        bottleImage: "/images/zego-bottle.png",
        theme: "Blush Pink Glass Flacon",
        quote: "Your spirit embodies luminous charm, velvety modern grace, and radiant warmth.",
        notes: "Pink Pepper • Damask Rose Petals • Madagascar Vanilla",
      };
    } else if (best === "oud-alhind") {
      return {
        id: "oud-alhind",
        name: "Oud Alhind",
        subtitle: "Extrait de Parfum",
        price: 6299,
        size: "100ml / 3.4 FL. OZ.",
        image: "/images/oud-alhind.png",
        bottleImage: "/images/oud-bottle.png",
        theme: "Ruby Glass Flacon with 24K Gold Cap",
        quote: "Your presence commands undeniable majesty, enigmatic distinction, and regal sillage.",
        notes: "Saffron Stigmas • Rare Assam Agarwood • Golden Amber",
      };
    } else {
      return {
        id: "infinity",
        name: "NexWorld Infinity",
        subtitle: "Eau de Parfum",
        price: 5499,
        size: "100ml / 3.4 FL. OZ.",
        image: "/images/infinity.png",
        bottleImage: "/images/infinity-bottle.png",
        theme: "Turquoise Glass Flacon with Silver Chrome Cap",
        quote: "Your essence reflects infinite possibility, magnetic ocean serenity, and contemporary leadership.",
        notes: "Sea Mineral Accord • Blue Sage • Mineral Ambergris",
      };
    }
  };

  const currentQ = questions[step - 1];
  const matched = step === 4 ? getRecommendation() : null;

  const handleReset = () => {
    setStep(1);
    setAnswers({ aura: "", occasion: "", accord: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-[#14213D]/80 backdrop-blur-md" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#14213D]/10 overflow-hidden z-10 p-6 sm:p-10 my-8 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#14213D]/40 hover:text-[#14213D] p-1.5 rounded-full hover:bg-[#14213D]/5 transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="flex justify-center mb-2">
            <NeLogo variant="navy" size="sm" showWordmark={false} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF6B5B] block mb-1">
            BESPOKE OLFACTORY CONSULTANT
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#14213D]">
            DISCOVER YOUR SIGNATURE FLACON
          </h2>
          {step <= 3 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    num === step
                      ? "w-8 bg-[#FF6B5B]"
                      : num < step
                      ? "w-4 bg-[#14213D]"
                      : "w-4 bg-[#14213D]/15"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Questions Step 1, 2, 3 */}
        {step <= 3 && currentQ && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#14213D]/50 block mb-1">
                QUESTION 0{step} OF 03
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14213D] tracking-wide">
                {currentQ.title}
              </h3>
              <p className="text-xs text-[#14213D]/70 max-w-md mx-auto mt-1">
                {currentQ.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.field, opt.flacon)}
                  className="p-6 rounded-2xl bg-white border border-[#14213D]/10 hover:border-[#FF6B5B] hover:shadow-lg transition-all text-left flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {opt.tag && (
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#FF6B5B] block mb-2">
                        {opt.tag}
                      </span>
                    )}
                    <h4 className="font-serif font-bold text-base text-[#14213D] group-hover:text-[#FF6B5B] transition-colors mb-2">
                      {opt.label}
                    </h4>
                    <p className="text-xs text-[#14213D]/70 leading-relaxed font-sans">
                      {opt.desc}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#14213D]/40 group-hover:text-[#FF6B5B] mt-4 flex items-center gap-1 transition-colors">
                    <span>Select Profile</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Bespoke Recommendation Result */}
        {step === 4 && matched && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#14213D]/10 shadow-xl text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14213D]/5 text-[#FF6B5B] text-[10px] uppercase font-bold tracking-widest">
              <CheckCircle2 size={13} />
              <span>OFFICIAL OLFACTORY MATCH CERTIFIED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-5 relative aspect-square rounded-2xl bg-[#F4EDE0]/50 p-4 flex items-center justify-center">
                <Image
                  src={matched.bottleImage || matched.image}
                  alt={matched.name}
                  fill
                  className="object-contain filter drop-shadow-xl p-2"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#FF6B5B]">
                  {matched.subtitle} • {matched.size}
                </span>
                <h3 className="font-serif text-3xl font-bold uppercase text-[#14213D]">
                  {matched.name}
                </h3>
                <p className="font-editorial italic text-base text-[#14213D]/80 leading-relaxed">
                  "{matched.quote}"
                </p>
                <div className="p-3 rounded-xl bg-[#FAF7F2] text-xs font-serif text-[#14213D]/80">
                  <strong className="text-[#14213D] block font-sans text-[10px] uppercase tracking-wider mb-0.5">
                    Signature Accords:
                  </strong>
                  {matched.notes}
                </div>
                <div className="font-serif font-bold text-2xl text-[#14213D] pt-1">
                  ₹{matched.price.toLocaleString("en-IN")}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      addToCart(matched, 1);
                      onClose();
                    }}
                    className="btn-luxury-coral w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                  >
                    <ShoppingBag size={14} />
                    <span>ACQUIRE FLACON</span>
                  </button>
                  <Link
                    href={`/product/${matched.id}`}
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#14213D]/20 text-xs font-semibold uppercase tracking-wider text-center hover:bg-[#14213D] hover:text-white transition-colors"
                  >
                    VIEW FULL DETAILS
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#14213D]/10 flex items-center justify-center">
              <button
                onClick={handleReset}
                className="text-xs text-[#14213D]/60 hover:text-[#FF6B5B] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw size={13} />
                <span>Retake Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
