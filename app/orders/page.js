"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, ArrowRight, Clock, Search, ShieldCheck } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export default function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchNum, setSearchNum] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
      })
      .catch((err) => console.error("Error loading orders:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) =>
    searchNum
      ? o.orderNumber?.toLowerCase().includes(searchNum.toLowerCase()) ||
        o.customer?.name?.toLowerCase().includes(searchNum.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F4EDE0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-3">
            <NeLogo variant="navy" size="md" showWordmark={false} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF6B5B] block mb-1">
            CLIENT LEDGER
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide uppercase text-[#14213D]">
            YOUR FRAGRANCE ARCHIVE
          </h1>
          <p className="text-xs text-[#14213D]/65 mt-2">
            Track dispatches, inspect receipts, and manage private acquisitions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-4 text-[#14213D]/40" />
            <input
              type="text"
              value={searchNum}
              onChange={(e) => setSearchNum(e.target.value)}
              placeholder="Search by order number (e.g. NW-2026-9812)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
            />
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="py-20 text-center font-serif text-xs uppercase tracking-widest text-[#14213D]/60 animate-pulse">
            LOADING ORDER ARCHIVES...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-3xl p-8 border border-[#14213D]/10">
            <Package size={32} className="mx-auto text-[#14213D]/30 mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#14213D]">
              No Orders Found
            </h3>
            <p className="text-xs text-[#14213D]/60 mt-1 mb-6">
              You have not placed any orders yet or no match found.
            </p>
            <Link
              href="/#collection"
              className="btn-luxury-coral inline-block px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              EXPLORE TRILOGY
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#14213D]/10 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#14213D]">
                      {order.orderNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B5B]/10 text-[#FF6B5B] text-[10px] font-bold uppercase tracking-wider">
                      {order.orderStatus || "Processing"}
                    </span>
                  </div>
                  <p className="text-xs text-[#14213D]/60">
                    Recipient: {order.customer?.name} • Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-[#14213D]/80 font-medium">
                    {order.items?.map((i) => `${i.name} (x${i.quantity})`).join(", ")}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[#14213D]/5">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#14213D]/50 block">
                      TOTAL PAID
                    </span>
                    <span className="font-serif font-bold text-lg text-[#14213D]">
                      ₹{order.total?.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <Link
                    href={`/orders/${order.orderNumber || order.id}`}
                    className="btn-luxury-navy px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <span>TRACK FLACON</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
