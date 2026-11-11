"use client";

import React from "react";
import Link from "next/link";
import { User, Package, LogOut, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import NeLogo from "@/components/brand/NeLogo";

export default function AccountPage() {
  const { user, isAuthenticated, logout, setIsAuthModalOpen, isAdmin } = useAuth();
  const { wishlistCount } = useWishlist();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4 bg-white/70 p-8 rounded-3xl border border-[#14213D]/10 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#14213D] text-[#F4EDE0] flex items-center justify-center mx-auto mb-4">
            <User size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#14213D]">
            CLIENT CONCIERGE
          </h2>
          <p className="text-xs text-[#14213D]/70 mt-2 mb-6 leading-relaxed">
            Please authenticate to inspect your personal fragrance archive, dispatch statuses, and saved preferences.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="btn-luxury-coral w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow"
          >
            SIGN IN / REGISTER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F4EDE0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-3">
            <NeLogo variant="navy" size="md" showWordmark={false} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF6B5B] block mb-1">
            HAUTE CLIENT PROFILE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide uppercase text-[#14213D]">
            WELCOME, {user.name}
          </h1>
          <p className="text-xs text-[#14213D]/65 mt-1">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link
            href="/orders"
            className="p-6 rounded-3xl bg-white/85 border border-[#14213D]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#14213D]/5 text-[#14213D] flex items-center justify-center mb-4 group-hover:bg-[#FF6B5B] group-hover:text-white transition-colors">
              <Package size={22} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#14213D]">
                Order Archives
              </h3>
              <p className="text-xs text-[#14213D]/60 mt-1">
                Track status and inspect past acquisitions.
              </p>
            </div>
            <span className="text-xs text-[#FF6B5B] font-semibold mt-4 flex items-center gap-1">
              <span>View Dispatches</span>
              <ArrowRight size={13} />
            </span>
          </Link>

          <Link
            href="/wishlist"
            className="p-6 rounded-3xl bg-white/85 border border-[#14213D]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#14213D]/5 text-[#14213D] flex items-center justify-center mb-4 group-hover:bg-[#FF6B5B] group-hover:text-white transition-colors">
              <Heart size={22} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#14213D]">
                Saved Wishlist ({wishlistCount})
              </h3>
              <p className="text-xs text-[#14213D]/60 mt-1">
                Your preserved olfactive choices.
              </p>
            </div>
            <span className="text-xs text-[#FF6B5B] font-semibold mt-4 flex items-center gap-1">
              <span>Inspect Wishlist</span>
              <ArrowRight size={13} />
            </span>
          </Link>

          {isAdmin ? (
            <Link
              href="/admin"
              className="p-6 rounded-3xl bg-[#14213D] text-[#F4EDE0] border border-[#14213D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#DFBF7E] flex items-center justify-center mb-4">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#DFBF7E]">
                  Curator Admin Portal
                </h3>
                <p className="text-xs text-[#F4EDE0]/70 mt-1">
                  Manage inventory, pricing, and dispatches.
                </p>
              </div>
              <span className="text-xs text-[#FF6B5B] font-semibold mt-4 flex items-center gap-1">
                <span>Enter Atelier Admin</span>
                <ArrowRight size={13} />
              </span>
            </Link>
          ) : (
            <div className="p-6 rounded-3xl bg-white/85 border border-[#14213D]/10 shadow-sm flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#14213D]/5 text-[#14213D] flex items-center justify-center mb-4">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#14213D]">
                  VIP Patron Status
                </h3>
                <p className="text-xs text-[#14213D]/60 mt-1">
                  Access to private invitations and new batch alerts.
                </p>
              </div>
              <span className="text-xs text-emerald-600 font-semibold mt-4">
                Active Patron
              </span>
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <div className="text-center pt-6 border-t border-[#14213D]/10">
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#14213D]/20 text-xs font-semibold uppercase tracking-wider text-[#14213D] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out of Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
