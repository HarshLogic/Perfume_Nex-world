"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export default function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
      })
      .catch((err) => console.error("Error fetching order:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0] flex items-center justify-center">
        <div className="text-center space-y-4">
          <NeLogo variant="navy" size="md" showWordmark={false} />
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#14213D]/70 animate-pulse">
            RETRIEVING ORDER DISPATCH RECORD...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-36 pb-20 bg-[#F4EDE0] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <h2 className="font-serif text-2xl font-bold text-[#14213D]">
            Order Record Not Found
          </h2>
          <p className="text-xs text-[#14213D]/70">
            We could not locate this order in the private ledger.
          </p>
          <Link
            href="/"
            className="btn-luxury-navy inline-block px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { title: "Order Placed", status: "Confirmed", icon: CheckCircle2 },
    { title: "Atelier Encasing", status: "Velvet Boxing", icon: Package },
    { title: "Insured Dispatch", status: "Handed to Courier", icon: Truck },
    { title: "Delivered", status: "Residence Arrival", icon: MapPin },
  ];

  // Determine current step index based on order.orderStatus
  let currentStep = 1;
  const s = (order.orderStatus || "").toLowerCase();
  if (s.includes("process") || s.includes("pending")) currentStep = 1;
  else if (s.includes("encas") || s.includes("confirm")) currentStep = 2;
  else if (s.includes("ship") || s.includes("transit")) currentStep = 3;
  else if (s.includes("deliver")) currentStep = 4;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F4EDE0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Order Success Top Callout */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#14213D] text-[#DFBF7E] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle2 size={30} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF6B5B] block mb-1">
            HAUTE PARFUMERIE ORDER CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide uppercase text-[#14213D]">
            THANK YOU FOR YOUR PATRONAGE
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#14213D]/70 max-w-lg mx-auto mt-2">
            Order <strong className="text-[#14213D] font-mono">{order.orderNumber}</strong> has been registered in the NexWorld private archive.
          </p>
        </div>

        {/* Live Tracking Progress Bar */}
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#14213D]/10 shadow-lg mb-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#14213D]/10">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block">
                CURRENT ORDER STATUS
              </span>
              <h3 className="font-serif text-lg font-bold text-[#FF6B5B] uppercase">
                {order.orderStatus || "Processing"}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block">
                DATE OF ACQUISITION
              </span>
              <span className="text-xs font-semibold text-[#14213D]">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
            {steps.map((st, idx) => {
              const isPassed = idx + 1 <= currentStep;
              const isCurrent = idx + 1 === currentStep;
              const StepIcon = st.icon;

              return (
                <div key={st.title} className="flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isPassed
                        ? "bg-[#14213D] text-[#DFBF7E]"
                        : "bg-[#14213D]/10 text-[#14213D]/40"
                    } ${isCurrent ? "ring-4 ring-[#FF6B5B]/30 scale-105" : ""}`}
                  >
                    <StepIcon size={20} />
                  </div>
                  <h4
                    className={`font-serif text-xs font-bold mt-3 ${
                      isPassed ? "text-[#14213D]" : "text-[#14213D]/40"
                    }`}
                  >
                    {st.title}
                  </h4>
                  <span className="text-[10px] text-[#14213D]/60 mt-0.5">
                    {st.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#14213D]/10 shadow-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#14213D]/10">
            <h3 className="font-serif text-base font-bold uppercase tracking-wider text-[#14213D]">
              PURCHASED FRAGRANCES ({order.items?.length || 0})
            </h3>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#14213D]/70 hover:text-[#FF6B5B] transition-colors"
            >
              <Printer size={14} />
              <span>PRINT RECEIPT</span>
            </button>
          </div>

          {/* Purchased Items */}
          <div className="space-y-4">
            {order.items?.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/5"
              >
                <div className="relative w-16 h-20 rounded-xl bg-white p-2 shrink-0 flex items-center justify-center">
                  <Image
                    src={item.image || "/images/zego.png"}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-[#14213D] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#14213D]/60">
                    {item.size || "100ml / 3.4 FL. OZ."} • Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-serif font-bold text-sm text-[#14213D]">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#14213D]/10 text-xs text-[#14213D]/80">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block mb-1">
                DELIVERY RECIPIENT
              </span>
              <p className="font-bold text-[#14213D]">{order.customer?.name}</p>
              <p>{order.customer?.address}</p>
              <p>
                {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
              </p>
              <p className="text-[#14213D]/60 mt-1">{order.customer?.phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#14213D]/50 block mb-1">
                PAYMENT ARCHITECTURE
              </span>
              <p className="font-bold text-[#14213D]">{order.paymentMethod}</p>
              <p className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={12} />
                <span>Payment Authorized & Cleared</span>
              </p>
              {order.razorpayPaymentId && (
                <p className="text-[10px] font-mono text-[#14213D]/50 mt-1">
                  ID: {order.razorpayPaymentId}
                </p>
              )}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="pt-4 border-t border-[#14213D]/10 space-y-2 text-xs text-[#14213D]/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-serif font-bold text-[#14213D]">
                ₹{order.subtotal?.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Insured Domestic Delivery</span>
              <span className="text-[#FF6B5B] font-semibold">FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Velvet Presentation Box</span>
              <span className="text-[#C5A059] font-semibold">COMPLIMENTARY</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#14213D] pt-2 border-t border-[#14213D]/5">
              <span>Grand Total Paid</span>
              <span className="font-serif text-xl">₹{order.total?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="btn-luxury-coral inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow-lg"
          >
            <span>CONTINUE BROWSING MAISON</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
