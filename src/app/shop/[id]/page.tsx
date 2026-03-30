"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import dynamic from "next/dynamic";
import { Plus, Minus, ShoppingCart, ShieldCheck, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const ExplodedProductScene = dynamic(() => import("@/components/three/ExplodedJar"), {
  ssr: false,
});

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [isExploded, setIsExploded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="relative bg-background min-h-screen pt-32 pb-24 overflow-x-hidden">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: 3D Scene with Explosion Trigger */}
          <div className="w-full lg:w-1/2 sticky top-32 group">
            <div className="relative h-[600px] border border-outline/30 bg-surface/50 rounded-2xl overflow-hidden group-hover:border-primary/50 transition-colors">
              <ExplodedProductScene exploded={isExploded} />
              
              {/* Explosion Hint */}
              <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer z-10"
                onMouseEnter={() => setIsExploded(true)}
                onMouseLeave={() => setIsExploded(false)}
              >
                <div className="w-px h-12 bg-primary/30" />
                <span className="font-space font-bold uppercase tracking-[0.3em] text-[10px] text-primary">
                  {isExploded ? "INTEGRITY RESTORED" : "EXPLODE ANALYTICAL STACK"}
                </span>
                <Info className="w-4 h-4 text-primary opacity-50" />
              </div>
            </div>
          </div>

          {/* Right: Product Info & Purchase Logic */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="space-y-4">
              <span className="font-space font-bold uppercase tracking-[0.4em] text-xs text-primary">TITAN ARSENAL // UNIT 01</span>
              <h1 className="font-syne font-extrabold text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none">
                ULTRA WHEY <br /> <span className="text-stroke italic text-primary">ISOLATE</span>
              </h1>
            </div>

            <p className="font-inter text-foreground/60 max-w-lg text-lg leading-relaxed uppercase tracking-widest">
              The gold-standard in elite muscle restoration. Zero-fillers, 100% molecular purity. Engineered for immediate nitrogen retention post-training.
            </p>

            {/* Nutrition Bento Grid Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NutritionItem label="Protein" value="25G" desc="Isolate Matrix" />
              <NutritionItem label="BCAAs" value="5.5G" desc="Natural Source" />
              <NutritionItem label="Glutamine" value="4G" desc="Post-Kinetic" />
              <NutritionItem label="Integrity" value="100%" suffix="Purity" />
            </div>

            {/* Purchase Logic */}
            <div className="pt-12 border-t border-outline flex flex-col sm:flex-row items-center gap-8">
              <div className="flex items-center gap-6 bg-surface p-2 border border-outline">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-primary transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-space font-black text-2xl w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:text-primary transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button className="flex-1 w-full bg-primary text-background px-12 py-5 font-space font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 flex items-center justify-center gap-4">
                Add To Arsenal <ShoppingCart className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-outline/30 opacity-60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="font-space font-bold text-[10px] uppercase tracking-widest">Lab-Tested Purity</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-space font-bold text-[10px] uppercase tracking-widest">Kinetic Release</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function NutritionItem({ label, value, desc, suffix, className }: { label: string, value: string, desc?: string, suffix?: string, className?: string }) {
  return (
    <div className={cn("p-8 bg-surface-bright border border-outline/50 space-y-2 group hover:border-primary transition-colors", className)}>
      <span className="font-space font-bold text-[10px] uppercase tracking-widest opacity-40 group-hover:text-primary group-hover:opacity-100 transition-all">{label}</span>
      <div className="flex items-baseline gap-2">
        <h4 className="font-syne font-black text-4xl tracking-tighter">{value}</h4>
        {suffix && <span className="font-space font-bold text-[10px] uppercase tracking-widest opacity-40">{suffix}</span>}
      </div>
      {desc && <p className="font-inter text-[10px] uppercase tracking-widest opacity-40">{desc}</p>}
    </div>
  );
}
