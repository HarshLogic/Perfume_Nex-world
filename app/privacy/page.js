import React from "react";
import Link from "next/link";
import NeLogo from "@/components/brand/NeLogo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-[#14213D]/10 shadow-sm space-y-6">
        <div className="text-center pb-6 border-b border-[#14213D]/10">
          <NeLogo variant="navy" size="md" showWordmark={false} />
          <h1 className="font-serif text-3xl font-bold uppercase tracking-wider text-[#14213D] mt-3">
            PRIVACY POLICY & CLIENT DISCRETION
          </h1>
          <p className="text-xs text-[#14213D]/60 mt-1">
            Effective Date: November 2026 • NexWorld Parfums Inc.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#14213D]/80 leading-relaxed font-sans">
          <p>
            At NexWorld, discretion is as essential to our identity as our master olfactory formulations. We respect your personal privacy and treat your acquisition data with the utmost confidentiality.
          </p>
          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            1. Information We Collect
          </h3>
          <p>
            When you acquire a flacon or register with our concierge, we collect your name, destination address, email, and phone number exclusively to fulfill your shipment and authenticate your warranty.
          </p>
          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            2. Payment Security
          </h3>
          <p>
            All financial transactions are processed through 256-bit encrypted Razorpay gateways. NexWorld never stores raw payment card numbers or banking credentials.
          </p>
          <h3 className="font-serif font-bold text-base text-[#14213D] pt-2">
            3. Client Inquiries
          </h3>
          <p>
            For privacy concierge requests or ledger deletions, contact us directly at{" "}
            <a href="mailto:concierge@nexworldperfumes.com" className="text-[#FF6B5B] underline">
              concierge@nexworldperfumes.com
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
