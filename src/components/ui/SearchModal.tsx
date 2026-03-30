"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, ArrowRight, Zap, Target, Activity } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex flex-col items-center pt-[15vh] px-6"
        >
          {/* Close Trigger (Pixel Perfect Corner) */}
          <button 
            onClick={onClose}
            className="absolute top-12 right-12 w-16 h-16 border border-outline/30 flex items-center justify-center hover:border-primary transition-all group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <div className="w-full max-w-4xl space-y-12">
            {/* Search Input Container */}
            <div className="relative group">
              <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                 <Search className="w-8 h-8 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <input 
                autoFocus
                type="text"
                placeholder="INTIATE PROTOCOL SEARCH..."
                className="w-full bg-transparent border-b-2 border-outline/20 py-8 text-4xl md:text-6xl font-syne font-black uppercase tracking-tighter focus:outline-none focus:border-primary transition-all placeholder:text-outline/40"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="absolute right-0 bottom-4 flex items-center gap-3 font-space text-[10px] uppercase tracking-widest opacity-20">
                <Command className="w-3 h-3" /> + K TO DEPLOY
              </div>
            </div>

            {/* Tactical Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
              <div className="space-y-6">
                <h3 className="font-space font-bold text-[10px] uppercase tracking-[0.4em] text-primary">PRIORITY ARSENAL</h3>
                <div className="space-y-4">
                  <SearchItem icon={<Zap className="w-4 h-4" />} title="Ultra Whey ISO v4" category="Protein Matrix" />
                  <SearchItem icon={<Target className="w-4 h-4" />} title="Nitro Pre-X" category="Metabolic Energy" />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="font-space font-bold text-[10px] uppercase tracking-[0.4em] text-secondary">ACTIVE PROTOCOLS</h3>
                <div className="space-y-4">
                  <SearchItem icon={<Activity className="w-4 h-4" />} title="Subscription Node" category="Autoship" />
                  <SearchItem icon={<ArrowRight className="w-4 h-4" />} title="Vanguard Program" category="Athletes" />
                </div>
              </div>
            </div>
          </div>

          {/* Background Decorative Data Stream */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-[0.05] pointer-events-none w-full text-center font-mono text-[8px] uppercase tracking-[1em] whitespace-nowrap">
             PROTOCOL_SEARCH_ID_0X9F2A // SECTOR_KINETIC // BINARY_DECODE_ACTIVE // ENCRYPT_AES_256
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function SearchItem({ icon, title, category }: { icon: React.ReactNode, title: string, category: string }) {
  return (
    <div className="flex items-center justify-between p-6 border border-outline/10 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-6">
        <div className="text-foreground/40 group-hover:text-primary transition-colors">
          {icon}
        </div>
        <div className="space-y-1">
          <span className="block font-syne font-bold text-lg uppercase tracking-tight">{title}</span>
          <span className="block font-space text-[8px] uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">{category}</span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
    </div>
  );
}
