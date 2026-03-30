"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CartSidebar } from "../ui/CartSidebar";
import { SearchModal } from "../ui/SearchModal";

const navLinks = [
  { name: "THE ARSENAL", href: "/shop", id: "nav-shop" },
  { name: "THE LAB", href: "/science", id: "nav-science" },
  { name: "VANGUARDS", href: "/athletes", id: "nav-athletes" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      aria-label="Primary Navigation"
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-700",
        isScrolled ? "py-4 bg-background/80 backdrop-blur-2xl border-b border-outline/20" : "py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          aria-label="Titan Kinetic Home"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 bg-primary flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_15px_#CAF200]">
            <Zap className="w-5 h-5 text-background" />
          </div>
          <span className="font-syne font-black text-2xl tracking-tighter uppercase group-hover:text-primary transition-colors">
            TITAN <span className="italic opacity-50 group-hover:opacity-100 transition-all">KINETIC</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="font-space font-bold text-[10px] uppercase tracking-[0.4em] text-foreground/60 hover:text-primary transition-all hover:tracking-[0.6em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
          
          <div className="flex items-center gap-6 pl-8 border-l border-outline/30">
            <button 
                aria-label="Search Arsenal" 
                className="hover:text-primary transition-colors flex items-center gap-2 group/search"
                onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
              <span className="font-space text-[8px] uppercase tracking-widest opacity-0 group-hover/search:opacity-40 transition-opacity">Deploy Search</span>
            </button>
            <button 
                aria-label="Cart" 
                className="relative hover:text-primary transition-colors px-2 py-4"
                onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-[8px] font-black rounded-full flex items-center justify-center shadow-[0_0_8px_#CAF200] group-hover:scale-110 transition-transform">
                0
              </span>
            </button>
            <button 
              aria-label="Member Portal"
              className="px-6 py-2 border border-primary/20 bg-primary/5 text-primary font-space font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-background transition-all"
            >
              Access Portal
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Mobile Menu"
          className="lg:hidden p-2 text-primary shadow-[0_0_10px_rgba(202,242,0,0.1)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-[88px] bg-background lg:hidden z-40 overflow-hidden px-6 pt-12"
          >
            <div className="flex flex-col gap-12 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="font-syne font-black text-4xl uppercase tracking-tighter text-foreground group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                  <span className="block h-px w-0 bg-primary group-hover:w-full transition-all" />
                </Link>
              ))}
              
              <div className="flex flex-col gap-8 w-full items-center pt-20 border-t border-outline/10">
                 <button className="w-full py-6 font-space font-bold uppercase tracking-widest bg-primary text-background">
                    Access Portal
                 </button>
                 <span className="font-space text-[10px] opacity-20 uppercase tracking-[0.6em]">Titan Kinetic // 2026 Systems</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
};
