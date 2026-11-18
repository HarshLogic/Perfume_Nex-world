import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export const metadata = {
  title: "Returns & Exchanges | Nexence Luxury Perfumes",
  description: "Guidelines on returns, damage in transit claims, and client satisfaction guarantee for Nexence perfumes.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#14213D]/10 shadow-sm space-y-8">
        <div className="text-center pb-6 border-b border-[#14213D]/10">
          <NeLogo variant="navy" size="md" showWordmark={false} />
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF6B5B] block mt-3 mb-1">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#14213D]">
            RETURNS & EXCHANGES POLICY
          </h1>
          <p className="text-xs text-[#14213D]/65 mt-2">
            Our unwavering commitment to haute parfumerie excellence, hygiene standards, and customer satisfaction.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#14213D]/80 leading-relaxed font-sans">
          <h3 className="font-serif font-bold text-base text-[#14213D]">
            1. Fragrance Hygiene & Seal Integrity
          </h3>
          <p>
            Due to the rare composition of high-concentration extraits and personal hygiene standards, once a fragrance box is unsealed or pumped, it cannot be returned for resale. We invite clients to consult our Scent Consultant before finalizing their choice.
          </p>

          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            2. Transit Damage & Replacement Policy
          </h3>
          <p>
            In the rare event that a bottle arrives cracked, leaking, or damaged in transit, please contact us within 7 calendar days of receipt. Send clear photos of the package and damaged flacon to{" "}
            <a href="mailto:info@nexence.in" className="text-[#FF6B5B] underline font-semibold">
              info@nexence.in
            </a>.
          </p>

          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            3. Resolution Procedure
          </h3>
          <p>
            Upon receipt of verification, our concierge team will promptly dispatch a brand-new replacement flacon at zero additional charge, or process a full credit via your original payment method.
          </p>

          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            4. Dedicated Concierge Desk
          </h3>
          <p>
            Our client support team is at your disposal. For all returns, questions, or product queries, write directly to:
          </p>
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 inline-block">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block">Official Support Email</span>
            <a href="mailto:info@nexence.in" className="font-mono text-sm font-bold text-[#FF6B5B]">
              info@nexence.in
            </a>
          </div>
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
