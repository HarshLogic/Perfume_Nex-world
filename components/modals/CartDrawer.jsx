"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#14213D]/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] text-[#14213D] shadow-2xl flex flex-col border-l border-[#14213D]/10">
          {/* Header */}
          <div className="p-6 border-b border-[#14213D]/10 flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#FF6B5B]" />
              <h2 className="font-serif text-lg font-bold tracking-wider uppercase text-[#14213D]">
                YOUR PRIVATE BAG ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#14213D]/60 hover:text-[#14213D] rounded-full hover:bg-[#14213D]/5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Complimentary Packaging Banner */}
          <div className="bg-[#14213D] text-[#F4EDE0] px-6 py-2.5 flex items-center justify-between text-[11px] font-sans">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[#DFBF7E]" />
              <span>Complimentary luxury velvet casket & samples</span>
            </div>
            <span className="text-[#DFBF7E] font-semibold">INCLUDED</span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#14213D]/5 flex items-center justify-center text-[#14213D]/40 mb-4">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#14213D]">
                  Your shopping bag is empty
                </h3>
                <p className="text-xs text-[#14213D]/60 max-w-xs mt-1 mb-6">
                  Experience the signature trilogy and discover your olfactory identity.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-luxury-navy px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  EXPLORE FRAGRANCES
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-4 rounded-2xl bg-white/80 border border-[#14213D]/10 shadow-sm"
                >
                  {/* Flacon Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl bg-[#F4EDE0]/60 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.bottleImage || item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#FF6B5B] font-bold">
                            {item.subtitle}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-[#14213D]">
                            {item.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#14213D]/40 hover:text-[#FF6B5B] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#14213D]/50 font-medium">
                        {item.size}
                      </span>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#14213D]/20 rounded-full bg-white px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-[#14213D]/60 hover:text-[#14213D] p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#14213D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-[#14213D]/60 hover:text-[#14213D] p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-sm text-[#14213D]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#14213D]/10 bg-white/90 space-y-4">
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between text-[#14213D]/70">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-[#14213D]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[#14213D]/70">
                  <span>Insured Express Shipping</span>
                  <span className="text-[#FF6B5B] font-semibold uppercase text-[10px]">
                    FREE / COMPLIMENTARY
                  </span>
                </div>
                <div className="pt-2 border-t border-[#14213D]/10 flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-[#14213D]">
                    Estimated Total
                  </span>
                  <span className="font-serif font-bold text-xl text-[#14213D]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-luxury-coral w-full py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={15} />
                </Link>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#14213D]/70 hover:text-[#14213D] transition-colors uppercase tracking-wider"
                >
                  CONTINUE BROWSING
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#14213D]/50 uppercase tracking-widest font-semibold pt-1">
                <ShieldCheck size={12} className="text-[#C5A059]" />
                <span>OFFICIAL MAISON GUARANTEE & SECURE CHECKOUT</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
