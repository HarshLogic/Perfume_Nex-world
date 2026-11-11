"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X, ShieldCheck } from "lucide-react";
import NeLogo from "@/components/brand/NeLogo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, setIsAuthModalOpen, logout, isAdmin } = useAuth();
  const { setIsSearchOpen } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/#collection" },
    { name: "Our Story", href: "/#story" },
    { name: "Why NexWorld", href: "/#why-nexworld" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#F4EDE0]/90 backdrop-blur-md border-b border-[#14213D]/10 py-3.5 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Monogram & Name */}
            <Link href="/" className="group flex items-center">
              <NeLogo
                variant="navy"
                size="md"
                showWordmark={true}
                subtitle="PARFUMS"
              />
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-sans text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-200 relative py-1 ${
                      isActive
                        ? "text-[#FF6B5B] font-semibold"
                        : "text-[#14213D] hover:text-[#FF6B5B]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B5B] rounded-full" />
                    )}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.22em] font-semibold text-[#FF6B5B] bg-[#FF6B5B]/10 px-3 py-1 rounded-full hover:bg-[#FF6B5B]/20 transition-all"
                >
                  <ShieldCheck size={14} />
                  Admin
                </Link>
              )}
            </nav>

            {/* Right: Actions (Search, Wishlist, Bag, Account) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search Fragrances"
                className="p-2 text-[#14213D] hover:text-[#FF6B5B] transition-colors rounded-full hover:bg-[#14213D]/5"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="p-2 text-[#14213D] hover:text-[#FF6B5B] transition-colors rounded-full hover:bg-[#14213D]/5 relative"
              >
                <Heart size={19} strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF6B5B] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Bag"
                className="p-2 text-[#14213D] hover:text-[#FF6B5B] transition-colors rounded-full hover:bg-[#14213D]/5 relative"
              >
                <ShoppingBag size={19} strokeWidth={1.8} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF6B5B] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User Account Button */}
              {isAuthenticated ? (
                <div className="relative group">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 p-2 text-[#14213D] hover:text-[#FF6B5B] transition-colors rounded-full hover:bg-[#14213D]/5"
                  >
                    <User size={19} strokeWidth={1.8} />
                    <span className="hidden lg:inline text-xs font-medium tracking-wide">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  aria-label="Sign In"
                  className="p-2 text-[#14213D] hover:text-[#FF6B5B] transition-colors rounded-full hover:bg-[#14213D]/5"
                >
                  <User size={19} strokeWidth={1.8} />
                </button>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
                className="md:hidden p-2 text-[#14213D] hover:text-[#FF6B5B] transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#F4EDE0] border-b border-[#14213D]/10 px-6 py-6 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg tracking-wider text-[#14213D] hover:text-[#FF6B5B] py-2 border-b border-[#14213D]/5"
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg text-[#FF6B5B] font-semibold py-2"
                >
                  Admin Portal
                </Link>
              )}
              {isAuthenticated ? (
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium text-[#14213D]"
                  >
                    My Account ({user?.name})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-xs text-[#FF6B5B] underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full py-2.5 bg-[#14213D] text-[#F4EDE0] text-xs font-semibold uppercase tracking-widest rounded"
                >
                  Sign In / Register
                </button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
