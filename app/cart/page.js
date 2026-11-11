"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === "NEXWORLD10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setCouponMessage("Privilege code applied: 10% Maison discount");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid privilege code");
    }
  };

  const finalTotal = Math.max(0, subtotal - discount);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 rounded-full bg-[#14213D]/5 flex items-center justify-center text-[#14213D]/40 mx-auto mb-6">
            <ShoppingBag size={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#14213D] uppercase tracking-wider mb-2">
            YOUR BAG IS EMPTY
          </h1>
          <p className="font-sans text-sm text-[#14213D]/70 mb-8 leading-relaxed">
            The fragrance trilogy awaits your discovery. Select your signature flacon to begin your olfactory journey.
          </p>
          <Link
            href="/#collection"
            className="btn-luxury-coral inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.24em] shadow-lg"
          >
            <span>DISCOVER THE TRILOGY</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F4EDE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#FF6B5B] block mb-1">
            HAUTE PARFUMERIE ORDER
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide uppercase text-[#14213D]">
            YOUR SHOPPING BAG ({totalItems})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-[#14213D]/10 shadow-sm"
              >
                <div className="relative w-28 h-32 rounded-2xl bg-[#F4EDE0]/60 p-3 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.bottleImage || item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#FF6B5B] font-bold">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#14213D]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#14213D]/60 font-sans">
                    Flacon Size: {item.size}
                  </p>
                  <p className="font-serif font-bold text-base text-[#14213D] pt-1">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-[#14213D]/20 rounded-full bg-white px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1 hover:text-[#FF6B5B] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#14213D]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1 hover:text-[#FF6B5B] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="font-serif font-bold text-lg text-[#14213D] block">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[#14213D]/40 hover:text-[#FF6B5B] p-2 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {/* Packaging Notice */}
            <div className="p-4 rounded-2xl bg-[#14213D] text-[#F4EDE0] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles size={16} className="text-[#C5A059]" />
                <span>Every flacon is ensconced in our signature velvet presentation casket with handwritten authenticity certificate.</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#14213D]/10 shadow-lg space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-[#14213D]">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs text-[#14213D]/70 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-[#14213D]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[#FF6B5B]">
                    <span>Privilege Discount</span>
                    <span className="font-serif font-bold">-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Express Courier (Insured)</span>
                  <span className="text-[#FF6B5B] font-semibold uppercase text-[10px]">
                    FREE / COMPLIMENTARY
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Velvet Gift Presentation</span>
                  <span className="text-[#C5A059] font-semibold uppercase text-[10px]">
                    COMPLIMENTARY
                  </span>
                </div>

                <div className="pt-4 border-t border-[#14213D]/10 flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-[#14213D]">
                    Grand Total
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#14213D]">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Privilege Code (NEXWORLD10)"
                    className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] uppercase tracking-wider focus:outline-none focus:border-[#FF6B5B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-full bg-[#14213D] text-[#F4EDE0] text-xs font-semibold uppercase tracking-wider hover:bg-[#FF6B5B] transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] text-[#FF6B5B] font-semibold mt-1.5 ml-2">
                    {couponMessage}
                  </p>
                )}
              </form>

              {/* Checkout Action */}
              <Link
                href="/checkout"
                className="btn-luxury-coral w-full py-4 rounded-full font-sans text-xs uppercase tracking-[0.24em] font-semibold flex items-center justify-center gap-2 shadow-xl"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#14213D]/50 uppercase tracking-widest font-semibold pt-2 text-center">
                <ShieldCheck size={14} className="text-[#C5A059] shrink-0" />
                <span>SECURE RAZORPAY ENCRYPTION & OFFICIAL GUARANTEE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
