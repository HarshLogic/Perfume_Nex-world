"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setFeedback("Please fill in all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFeedback(data.message || "Thank you for reaching out. We will contact you shortly.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setFeedback("Network error. Please write directly to info@nexence.in.");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#FAF7F2] relative overflow-hidden border-t border-[#14213D]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14213D]/5 border border-[#14213D]/10 mb-4">
            <Sparkles size={12} className="text-[#FF6B5B]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#14213D]/80">
              CLIENT CONCIERGE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.08em] text-[#14213D] uppercase">
            CONNECT WITH NEXENCE
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#14213D]/70 mt-3 leading-relaxed">
            For bespoke fragrance inquiries, distribution partnerships, or private consultations, our atelier concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Contact Link */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#14213D]/10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <NeLogo variant="navy" size="sm" showWordmark={false} />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#FF6B5B] font-bold block">
                  DIRECT ATELIER LIAISON
                </span>
                <h3 className="font-serif text-lg font-bold text-[#14213D]">
                  Maison Nexence
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#14213D]/75 leading-relaxed font-sans">
              Every message is reviewed with discretion and care. For direct communication, reach us at our official international liaison inbox:
            </p>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#14213D]/10 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#14213D]/50 block">
                OFFICIAL MAISON EMAIL
              </span>
              <a
                href="mailto:info@nexence.in"
                className="font-serif text-lg text-[#14213D] hover:text-[#FF6B5B] font-bold flex items-center gap-2.5 transition-colors"
              >
                <Mail size={18} className="text-[#FF6B5B] shrink-0" />
                <span>info@nexence.in</span>
              </a>
              <span className="text-[10px] text-[#14213D]/50 block font-sans">
                Typically responds within 24 business hours.
              </span>
            </div>

            <div className="pt-2">
              <span className="font-editorial italic text-sm text-[#14213D]/70 block">
                "Capturing the essence of the world in every bottle."
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#14213D]/10 shadow-lg">
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#14213D] mb-6">
              SEND A PRIVATE INQUIRY
            </h3>

            {status === "success" ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                <h4 className="font-serif text-lg font-bold text-emerald-900">
                  Message Successfully Dispatched
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  {feedback}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2 rounded-full bg-[#14213D] text-[#F4EDE0] text-xs font-semibold uppercase tracking-wider"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{feedback}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Lady Genevieve"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Fragrance Consultation / Private Order"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your inquiry or request with our concierge..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#14213D]/15 text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-luxury-coral w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-60"
                >
                  <Send size={14} />
                  <span>{status === "loading" ? "SENDING MESSAGE..." : "TRANSMIT INQUIRY"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
