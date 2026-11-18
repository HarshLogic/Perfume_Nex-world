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
      subtitle: "Select the visceral impression you desire your sillage to leave behind.",
      field: "aura",
      options: [
        {
          id: "romantic",
          label: "Radiant & Romantic Grace",
          desc: "Soft luminous charm, velvety feminine poise, delicate warmth.",
          flacon: "zoya",
          tag: "Blush Flora",
        },
        {
          id: "sensual",
          label: "Intoxicating Velvet & Mystery",
          desc: "Sensual violet allure, magnetic intrigue, opulent charm.",
          flacon: "nexdesire",
          tag: "Amethyst Floral",
        },
        {
          id: "warm-wood",
          label: "Sunlit Amber & Noble Woods",
          desc: "Warm golden resins, sun-drenched cedar, refined vintage depth.",
          flacon: "oud-alashhar",
          tag: "Warm Amber",
        },
        {
          id: "magnetic",
          label: "Magnetic Ocean Freshness",
          desc: "Expansive horizons, crisp authority, boundless coastal serenity.",
          flacon: "infinity",
          tag: "Aquatic Woody",
        },
        {
          id: "imperial",
          label: "Imperial Majesty & Ancient Saffron",
          desc: "Sovereign presence, rare agarwood depth, regal red glass.",
          flacon: "oud-alhind",
          tag: "Prestige Oud",
        },
        {
          id: "nocturne",
          label: "Midnight Enigma & Dark Velvet",
          desc: "Smoky midnight allure, quiet power, commanding nocturnal sillage.",
          flacon: "nexaura",
          tag: "Midnight Leather",
        },
      ],
    },
    {
      step: 2,
      title: "FOR WHAT OCCASION WILL THIS SILLAGE BE WORN?",
      subtitle: "Atmospheric temperatures and environments awaken distinct fragrance notes.",
      field: "occasion",
      options: [
        {
          id: "daytime",
          label: "Sunlit Soirées & Intimate Gatherings",
          desc: "Versatile, luminous, enchanting from morning to golden hour.",
          flacon: "zoya",
        },
        {
          id: "evening-cocktail",
          label: "Twilight Receptions & Romantic Dinners",
          desc: "Sensual presence designed for candlelit rooms and velvet evenings.",
          flacon: "nexdesire",
        },
        {
          id: "executive-daily",
          label: "Diplomatic Meetings & Cultural Galas",
          desc: "A warm, dignified aura that exudes effortless authority and warmth.",
          flacon: "oud-alashhar",
        },
        {
          id: "signature",
          label: "Executive Presence & Mediterranean Travels",
          desc: "Fresh morning projection evolving into deep marine woods by dusk.",
          flacon: "infinity",
        },
        {
          id: "nocturne",
          label: "Grand Receptions & Royal Banquets",
          desc: "High-octane formal evenings, winter ceremonies, unforgettable entrance.",
          flacon: "oud-alhind",
        },
        {
          id: "after-hours",
          label: "Black-Tie Galas & Enigmatic Nights",
          desc: "Unapologetic distinction that lingers long after midnight.",
          flacon: "nexaura",
        },
      ],
    },
    {
      step: 3,
      title: "WHICH INGREDIENT FAMILY RESONATES DEEPEST?",
      subtitle: "The foundational olfactory family that speaks to your sensory memory.",
      field: "accord",
      options: [
        {
          id: "zoya-accord",
          label: "Luminous Petals, Delicate Citrus & Soft Musks",
          desc: "Sweet blossoming grace captured in transparent pink glass.",
          flacon: "zoya",
        },
        {
          id: "nexdesire-accord",
          label: "Midnight Iris, Dark Berries & Velvety Tonka",
          desc: "Rich nocturnal intrigue crowned with polished metallic gold.",
          flacon: "nexdesire",
        },
        {
          id: "oud-alashhar-accord",
          label: "Golden Amber, Cambodian Agarwood & Dry Vetiver",
          desc: "Harmonious balance of golden resin and warm desert wood.",
          flacon: "oud-alashhar",
        },
        {
          id: "infinity-accord",
          label: "Sea Mineral Salts, Frosted Bergamot & Blue Driftwood",
          desc: "Invigorating coastal ozone blended with aristocratic woods.",
          flacon: "infinity",
        },
        {
          id: "oud-alhind-accord",
          label: "Wild Assam Agarwood, Saffron Stigmas & Precious Resins",
          desc: "Rare vintage agarwood harvested from ancient Himalayan valleys.",
          flacon: "oud-alhind",
        },
        {
          id: "nexaura-accord",
          label: "Smoked Birch, Leather Woods & Dark Incense",
          desc: "Deep magnetic woods formulated for indelible masculine and unisex power.",
          flacon: "nexaura",
        },
      ],
    },
  ];

  const handleSelectOption = (field, flaconId) => {
    const updated = { ...answers, [field]: flaconId };
    setAnswers(updated);
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
  };

  const fragranceCatalog = {
    zoya: {
      id: "zoya",
      name: "Zoya",
      brand: "NE / Nexence Collection",
      subtitle: "Eau de Parfum",
      price: 139,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/zoya.jpg",
      bottleImage: "/images/studio/zoya-bottle.png",
      theme: "Transparent Pink Glass Flacon with Spherical Pink Cap & Gold NE Monogram",
      quote: "Your spirit radiates romance, ethereal grace, and luminous modern charm.",
      notes: "[Editable Top Notes] • [Editable Heart Notes] • [Editable Base Notes]",
    },
    nexdesire: {
      id: "nexdesire",
      name: "Nexdesire",
      brand: "NE / Nexence Collection",
      subtitle: "Eau de Parfum",
      price: 141,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/nexdesire.jpg",
      bottleImage: "/images/studio/nexdesire-bottle.png",
      theme: "Deep Purple Glass Flacon with Metallic Gold Cylindrical Cap & Gold NE Monogram",
      quote: "Your presence commands hypnotic allure, velvet mystery, and nocturnal sophistication.",
      notes: "[Editable Top Notes] • [Editable Heart Notes] • [Editable Base Notes]",
    },
    "oud-alashhar": {
      id: "oud-alashhar",
      name: "Oud Al Ashhar",
      brand: "NE / Nexence Collection",
      subtitle: "Eau de Parfum",
      price: 155,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/oud-alashhar.jpg",
      bottleImage: "/images/studio/oud-alashhar-bottle.png",
      theme: "Amber Brown Glass Flacon with Metallic Gold Cylindrical Cap & Gold Arabic Script",
      quote: "Your character exudes warmth, enduring noble woods, and golden desert prestige.",
      notes: "[Editable Top Notes] • [Editable Heart Notes] • [Editable Base Notes]",
    },
    infinity: {
      id: "infinity",
      name: "NexWorld Infinity",
      brand: "NE / Nexence Collection",
      subtitle: "Eau de Parfum",
      price: 129,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/infinity.jpg",
      bottleImage: "/images/studio/infinity-bottle.png",
      theme: "Transparent Turquoise Glass Flacon with Silver Metallic Cap & Black NE Monogram",
      quote: "Your essence reflects infinite possibility, magnetic ocean freshness, and boundless horizons.",
      notes: "[Editable Top Notes] • [Editable Heart Notes] • [Editable Base Notes]",
    },
    "oud-alhind": {
      id: "oud-alhind",
      name: "Oud Alhind",
      brand: "NE / Nexence Collection",
      subtitle: "Eau de Parfum",
      price: 165,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/oud-alhind.jpg",
      bottleImage: "/images/studio/oud-alhind-bottle.png",
      theme: "Deep Transparent Red Glass Flacon with Textured Gold Pyramid Cap & Gold NE Monogram",
      quote: "Your presence commands undeniable majesty, enigmatic regal heritage, and timeless sillage.",
      notes: "[Editable Top Notes] • [Editable Heart Notes] • [Editable Base Notes]",
    },
    nexaura: {
      id: "nexaura",
      name: "Nexaura",
      brand: "NE / Nexence Collection",
      subtitle: "Eau de Parfum",
      price: 151,
      size: "100 ml / 3.4 fl. oz.",
      image: "/images/studio/nexaura.jpg",
      bottleImage: "/images/studio/nexaura-bottle.png",
      theme: "Dark Black/Navy Glass Flacon with Black Ribbed Cap & Gold NE Monogram",
      quote: "Your aura projects understated authority, smoky twilight depths, and absolute magnetic power.",
      notes: "[Editable Top Notes] • [Editable Heart Notes] • [Editable Base Notes]",
    },
  };

  const getRecommendation = () => {
    const scores = {
      zoya: 0,
      nexdesire: 0,
      "oud-alashhar": 0,
      infinity: 0,
      "oud-alhind": 0,
      nexaura: 0,
    };

    Object.values(answers).forEach((val) => {
      if (scores[val] !== undefined) scores[val] += 2;
    });

    let best = "zoya";
    let max = -1;
    for (const [k, v] of Object.entries(scores)) {
      if (v > max) {
        max = v;
        best = k;
      }
    }

    return fragranceCatalog[best] || fragranceCatalog["zoya"];
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
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#14213D]/10 overflow-hidden z-10 p-6 sm:p-10 my-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
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
            NEXENCE BESPOKE OLFACTORY CONSULTANT
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
                CONSULTATION PHASE 0{step} OF 03
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#14213D] tracking-wide">
                {currentQ.title}
              </h3>
              <p className="text-xs text-[#14213D]/70 max-w-md mx-auto mt-1">
                {currentQ.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.field, opt.flacon)}
                  className="p-5 rounded-2xl bg-white border border-[#14213D]/10 hover:border-[#FF6B5B] hover:shadow-lg transition-all text-left flex flex-col justify-between group hover:-translate-y-1"
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
              <span>OFFICIAL NEXENCE MATCH CERTIFIED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              <div className="md:col-span-5 relative aspect-square rounded-2xl bg-[#F4EDE0]/50 p-4 flex items-center justify-center overflow-hidden">
                <Image
                  src={matched.bottleImage || matched.image}
                  alt={matched.name}
                  fill
                  className="object-contain filter drop-shadow-xl p-4"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#FF6B5B]">
                  {matched.subtitle} • {matched.size}
                </span>
                <h3 className="font-serif text-3xl font-bold uppercase text-[#14213D]">
                  {matched.name}
                </h3>
                <p className="text-xs text-[#C5A059] font-medium">
                  {matched.theme}
                </p>
                <p className="font-editorial italic text-base text-[#14213D]/80 leading-relaxed">
                  "{matched.quote}"
                </p>
                <div className="p-3 rounded-xl bg-[#FAF7F2] text-xs font-serif text-[#14213D]/80">
                  <strong className="text-[#14213D] block font-sans text-[10px] uppercase tracking-wider mb-0.5">
                    Olfactory Formulation:
                  </strong>
                  {matched.notes}
                </div>
                <div className="font-serif font-bold text-2xl text-[#14213D] pt-1">
                  AED {matched.price.toLocaleString()}
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
