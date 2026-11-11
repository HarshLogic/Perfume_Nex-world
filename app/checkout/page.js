"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import NeLogo from "@/components/brand/NeLogo";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "Aarav Sharma",
    email: user?.email || "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    address: "42 Altamount Road, Cumballa Hill",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400026",
    paymentMethod: "Razorpay",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [showMockPaymentModal, setShowMockPaymentModal] = useState(false);
  const [createdOrderDetails, setCreatedOrderDetails] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your shopping bag is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create payment session
      const payRes = await fetch("/api/payment/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: subtotal,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
        }),
      });

      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.error || "Payment session creation failed");

      // Check if Razorpay JS SDK is loaded and live key is present
      if (!payData.isMock && window.Razorpay) {
        const options = {
          key: payData.keyId,
          amount: payData.amount,
          currency: payData.currency,
          name: "NEXWORLD PARFUMS",
          description: "Haute Fragrance Purchase",
          image: "/brand/ne-monogram.svg",
          order_id: payData.orderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#14213D",
          },
          handler: async (response) => {
            await finalizeOrder(response.razorpay_payment_id, payData.orderId);
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setIsProcessing(false);
      } else {
        // Show seamless instant simulated Razorpay modal
        setCreatedOrderDetails(payData);
        setShowMockPaymentModal(true);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to proceed with checkout");
      setIsProcessing(false);
    }
  };

  const finalizeOrder = async (paymentId, orderSessionId) => {
    try {
      // Create official order record
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: cart.map((i) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          image: i.bottleImage || i.image,
        })),
        subtotal,
        tax: 0,
        shipping: 0,
        total: subtotal,
        paymentMethod: "Razorpay (UPI / NetBanking)",
        paymentStatus: "Paid",
        razorpayPaymentId: paymentId || `pay_${Date.now()}`,
        orderStatus: "Processing",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order creation failed");

      // Celebrate with luxury golden & coral confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C5A059", "#FF6B5B", "#14213D", "#F4EDE0"],
        });
      } catch (e) {
        // Safe confetti fallback
      }

      clearCart();
      setShowMockPaymentModal(false);
      router.push(`/orders/${data.order.orderNumber || data.order.id}`);
    } catch (err) {
      setError(err.message || "Failed to finalize order");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F4EDE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="flex justify-center mb-3">
            <NeLogo variant="navy" size="md" showWordmark={false} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FF6B5B] block mb-1">
            SECURE CLIENT CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide uppercase text-[#14213D]">
            MAISON ACQUISITION
          </h1>
          <p className="text-xs text-[#14213D]/65 mt-2">
            Insured priority transport direct from our private formulation atelier.
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-red-100 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleInitiatePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Shipping Address & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#14213D]/10 shadow-sm space-y-5">
              <h2 className="font-serif text-lg font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-2">
                <Truck size={18} className="text-[#FF6B5B]" />
                <span>1. CLIENT DESTINATION & CONTACT</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Phone Number (For Courier) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                  Email Address (For Order Tracking & Certificate) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                  Street Address / Residence *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Postal Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Gateway Option */}
            <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#14213D]/10 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-2">
                <CreditCard size={18} className="text-[#FF6B5B]" />
                <span>2. PAYMENT ARCHITECTURE</span>
              </h2>

              <div className="p-4 rounded-2xl border-2 border-[#14213D] bg-[#FAF7F2]/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-[#FF6B5B] bg-white" />
                  <div>
                    <span className="font-serif font-bold text-sm text-[#14213D] block">
                      Razorpay Luxury Payment Suite
                    </span>
                    <span className="text-[11px] text-[#14213D]/60 font-sans">
                      UPI (Google Pay / PhonePe), Credit/Debit Cards, NetBanking, Cred
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#FF6B5B] font-bold">
                  256-BIT ENCRYPTION
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#14213D]/10 shadow-xl space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold uppercase tracking-wider text-[#14213D]">
                FLACON ARCHIVE SUMMARY
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center gap-3.5 pb-3 border-b border-[#14213D]/5"
                  >
                    <div className="relative w-12 h-14 rounded-lg bg-[#FAF7F2] p-1 shrink-0 flex items-center justify-center">
                      <Image
                        src={item.bottleImage || item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-[#14213D] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-[#14213D]/60">
                        Qty: {item.quantity} • {item.size}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-xs text-[#14213D]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 text-xs text-[#14213D]/70 font-sans border-t border-[#14213D]/10 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-[#14213D]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Express Courier</span>
                  <span className="text-[#FF6B5B] font-semibold uppercase text-[10px]">
                    FREE / COMPLIMENTARY
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Signature Velvet Gift Presentation</span>
                  <span className="text-[#C5A059] font-semibold uppercase text-[10px]">
                    INCLUDED
                  </span>
                </div>
                <div className="pt-3 border-t border-[#14213D]/10 flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-[#14213D]">
                    Total Payable
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#14213D]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="btn-luxury-coral w-full py-4 rounded-full font-sans text-xs uppercase tracking-[0.24em] font-semibold flex items-center justify-center gap-2 shadow-xl transition-all disabled:opacity-50"
              >
                <Lock size={15} />
                <span>
                  {isProcessing
                    ? "COMMUNICATING WITH GATEWAY..."
                    : `AUTHORIZE ₹${subtotal.toLocaleString("en-IN")}`}
                </span>
              </button>

              <div className="pt-2 text-center text-[10px] text-[#14213D]/50 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-[#C5A059]" />
                <span>AUTHORIZED NEXWORLD MAISON TRANSACTION</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Simulated Razorpay Test Authorization Modal */}
      {showMockPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#14213D]/80 backdrop-blur-md" />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#14213D]/10 overflow-hidden z-10 p-8 text-center animate-fadeIn">
            {/* Top Monogram */}
            <div className="w-14 h-14 rounded-2xl bg-[#14213D] text-[#F4EDE0] flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="font-serif font-bold text-lg">NE</span>
            </div>

            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#FF6B5B] block mb-1">
              RAZORPAY INDIA SECURE CHECKOUT
            </span>
            <h3 className="font-serif text-xl font-bold text-[#14213D]">
              Authorize Payment of ₹{subtotal.toLocaleString("en-IN")}
            </h3>
            <p className="text-xs text-[#14213D]/65 mt-1 max-w-xs mx-auto">
              Test mode active. Click below to simulate instant successful payment clearance.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 text-left text-xs space-y-1.5 font-sans">
              <div className="flex justify-between">
                <span className="text-[#14213D]/60">Merchant:</span>
                <span className="font-bold text-[#14213D]">NexWorld Luxury Perfumes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#14213D]/60">Client:</span>
                <span className="font-bold text-[#14213D]">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#14213D]/60">Amount:</span>
                <span className="font-bold text-[#14213D]">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#14213D]/60">Status:</span>
                <span className="font-bold text-emerald-600">Session Verified</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => finalizeOrder(`pay_rzp_${Date.now()}`)}
                className="btn-luxury-coral w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>CONFIRM & PLACE ORDER</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMockPaymentModal(false)}
                className="w-full py-2.5 text-xs text-[#14213D]/60 hover:text-[#14213D] uppercase tracking-wider font-semibold"
              >
                Cancel Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
