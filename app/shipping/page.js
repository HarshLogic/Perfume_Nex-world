import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export const metadata = {
  title: "Shipping & Delivery Policy | Nexence Luxury Perfumes",
  description: "Learn about Nexence white-glove packaging, transit insurance, and expedited nationwide delivery.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#14213D]/10 shadow-sm space-y-8">
        <div className="text-center pb-6 border-b border-[#14213D]/10">
          <NeLogo variant="navy" size="md" showWordmark={false} />
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF6B5B] block mt-3 mb-1">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wider text-[#14213D]">
            SHIPPING & DISPATCH POLICY
          </h1>
          <p className="text-xs text-[#14213D]/65 mt-2">
            Every Nexence flacon is dispatched with white-glove care, temperature-stable packaging, and comprehensive transit insurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 text-center">
            <div className="w-12 h-12 rounded-full bg-[#14213D] text-[#DFBF7E] flex items-center justify-center mx-auto mb-3">
              <Truck size={22} />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#14213D] uppercase">Complimentary Express</h4>
            <p className="text-xs text-[#14213D]/70 mt-1">Free insured express shipping across all pin codes in India.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 text-center">
            <div className="w-12 h-12 rounded-full bg-[#14213D] text-[#DFBF7E] flex items-center justify-center mx-auto mb-3">
              <Clock size={22} />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#14213D] uppercase">24-48 Hour Dispatch</h4>
            <p className="text-xs text-[#14213D]/70 mt-1">Orders undergo olfactive sealing and are dispatched promptly.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 text-center">
            <div className="w-12 h-12 rounded-full bg-[#14213D] text-[#DFBF7E] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck size={22} />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#14213D] uppercase">100% Insured Transit</h4>
            <p className="text-xs text-[#14213D]/70 mt-1">Direct signature tracking and replacement coverage in transit.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#14213D]/80 leading-relaxed font-sans">
          <h3 className="font-serif font-bold text-base text-[#14213D]">
            1. Domestic Dispatch Timelines
          </h3>
          <p>
            Metro destinations typically receive parcels within 2–4 business days. Regional and interior destinations are delivered within 4–6 business days via our premium insured courier partners.
          </p>

          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            2. Secure Packaging Standard
          </h3>
          <p>
            Fragrance glass bottles and rigid presentation boxes are cushioned within thermal and shock-absorbent luxury shippers designed to protect the bottle cap seal and delicate aromachemical formulations from vibration and extreme weather.
          </p>

          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            3. Tracking Your Flacon
          </h3>
          <p>
            Upon dispatch, your unique consignment number is registered to your order record and sent to your email. You can also monitor your dispatch in real-time under our{" "}
            <Link href="/orders" className="text-[#FF6B5B] underline">
              Client Ledger
            </Link>.
          </p>

          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            4. Assistance & Questions
          </h3>
          <p>
            For delivery inquiries, contact our official client team at{" "}
            <a href="mailto:info@nexence.in" className="text-[#FF6B5B] underline font-semibold">
              info@nexence.in
            </a>.
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
