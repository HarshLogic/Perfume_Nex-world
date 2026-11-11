"use client";

import React from "react";
import Image from "next/image";
import { Check, Sparkles, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ToastNotification() {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#14213D] text-[#F4EDE0] shadow-2xl border border-[#FF6B5B]/30 max-w-sm">
        {notification.item && (
          <div className="relative w-12 h-14 rounded-lg bg-white/10 p-1 shrink-0 flex items-center justify-center">
            <Image
              src={notification.item.bottleImage || notification.item.image || "/images/zego.png"}
              alt="Fragrance"
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-[#FF6B5B] text-[10px] uppercase font-bold tracking-widest">
            <Sparkles size={11} />
            <span>COLLECTION UPDATED</span>
          </div>
          <p className="font-serif text-xs font-bold text-[#F4EDE0] mt-0.5 line-clamp-1">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
}
