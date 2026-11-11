"use client";

import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldCheck } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "login") {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || "Authentication failed");
      }
    } else {
      const res = await register(name, email, password);
      if (!res.success) {
        setError(res.error || "Registration failed");
      }
    }
    setLoading(false);
  };

  const handleFillDemo = (type) => {
    if (type === "admin") {
      setEmail("admin@nexworld.com");
      setPassword("adminpassword123");
      setMode("login");
    } else {
      setEmail("collector@luxuryfragrance.com");
      setPassword("password123");
      setName("Lady Eleanora");
      setMode("login");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-[#14213D]/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#14213D]/10 overflow-hidden z-10 p-8 animate-fadeIn">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 text-[#14213D]/50 hover:text-[#14213D] p-1 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <NeLogo variant="navy" size="md" showWordmark={false} />
          </div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#14213D]">
            {mode === "login" ? "CLIENT CONCIERGE" : "JOIN THE MAISON"}
          </h2>
          <p className="font-sans text-xs text-[#14213D]/65 mt-1">
            {mode === "login"
              ? "Access your private fragrance ledger and orders"
              : "Create an account for bespoke luxury benefits"}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-full bg-[#14213D]/5 p-1 mb-6 border border-[#14213D]/10">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
              mode === "login"
                ? "bg-[#14213D] text-[#F4EDE0] shadow-sm"
                : "text-[#14213D]/60 hover:text-[#14213D]"
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
              mode === "register"
                ? "bg-[#14213D] text-[#F4EDE0] shadow-sm"
                : "text-[#14213D]/60 hover:text-[#14213D]"
            }`}
          >
            REGISTER
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3.5 text-[#14213D]/40" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maharani Gayatri"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3.5 text-[#14213D]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-[#14213D]/70 mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-[#14213D]/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#14213D]/15 text-xs text-[#14213D] focus:outline-none focus:border-[#FF6B5B]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-luxury-coral w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow-lg mt-2 transition-all disabled:opacity-60"
          >
            {loading ? "AUTHENTICATING..." : mode === "login" ? "ENTER CONCIERGE" : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Quick Demo Credentials for Testing */}
        <div className="mt-6 pt-4 border-t border-[#14213D]/10 text-center">
          <span className="text-[10px] uppercase tracking-wider text-[#14213D]/50 font-bold block mb-2">
            QUICK DEMO ACCESS:
          </span>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo("admin")}
              className="text-[11px] px-3 py-1 rounded bg-[#14213D]/10 hover:bg-[#14213D] hover:text-white transition-colors font-medium text-[#14213D]"
            >
              Fill Admin Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
