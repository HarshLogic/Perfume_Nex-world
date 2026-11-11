"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Welcome to the exclusive world of NexWorld.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription error.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#14213D] text-[#F4EDE0] relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#F4EDE0]/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#FF6B5B]/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <NeLogo variant="cream" size="md" showWordmark={false} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EDE0]/10 border border-[#F4EDE0]/15 mb-4">
          <Sparkles size={12} className="text-[#FF6B5B]" />
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#F4EDE0]">
            THE PRIVATE LEDGER
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] uppercase leading-tight mb-4">
          ENTER THE WORLD OF NEXWORLD.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#F4EDE0]/75 max-w-xl mx-auto leading-relaxed mb-8">
          Be the first to discover new fragrances, bespoke masterclasses, and private preview collections.
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="Enter your email address..."
              required
              disabled={status === "loading" || status === "success"}
              className="w-full px-6 py-4 rounded-full bg-[#F4EDE0]/10 border border-[#F4EDE0]/20 text-[#F4EDE0] placeholder-[#F4EDE0]/40 text-sm focus:outline-none focus:border-[#FF6B5B] focus:ring-1 focus:ring-[#FF6B5B] transition-all pr-36"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="absolute right-1.5 px-6 py-2.5 rounded-full bg-[#FF6B5B] hover:bg-[#e84d3c] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all disabled:opacity-50"
            >
              <span>{status === "loading" ? "JOINING..." : "SUBSCRIBE"}</span>
              <Send size={13} />
            </button>
          </div>

          {/* Feedback messages */}
          {status === "success" && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#DFBF7E] font-medium">
              <CheckCircle2 size={15} />
              <span>{message}</span>
            </div>
          )}

          {status === "error" && (
            <p className="mt-4 text-xs text-[#FF6B5B] font-medium">{message}</p>
          )}

          <p className="text-[10px] uppercase tracking-wider text-[#F4EDE0]/40 mt-4">
            We honor discretion. Unsubscribe at any time with a single click.
          </p>
        </form>
      </div>
    </section>
  );
}
