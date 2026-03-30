"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { MoveRight, Zap, Target, ShieldCheck, Activity, Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  color: string;
  textColor: string;
  intensity: string;
  image: string;
}

const products: Product[] = [
  { 
    id: 1, 
    name: "ULTRA WHEY ISO", 
    category: "Protein Matrix", 
    price: "$64.99", 
    color: "bg-primary text-background", 
    textColor: "text-background", 
    intensity: "99.8%",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 2, 
    name: "RAW CREATINE", 
    category: "Strength Node", 
    price: "$39.99", 
    color: "bg-secondary text-background", 
    textColor: "text-background", 
    intensity: "100%",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 3, 
    name: "NITRO PRE-X", 
    category: "Metabolic Energy", 
    price: "$49.99", 
    color: "bg-surface-bright border border-outline", 
    textColor: "text-foreground", 
    intensity: "94.5%",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 4, 
    name: "CRYO REFRESH", 
    category: "Cellular Recovery", 
    price: "$35.99", 
    color: "bg-surface-bright border border-outline text-foreground", 
    textColor: "text-foreground", 
    intensity: "88.0%",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2070&auto=format&fit=crop"
  },
];

export default function Shop() {
  return (
    <main className="relative bg-background min-h-screen pt-32 pb-40 overflow-hidden">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-24 space-y-6">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-space font-bold uppercase tracking-[0.6em] text-[10px] text-primary"
          >
            TITAN KINETIC // SUPPLY DEPOT v4.2
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-syne font-extrabold text-7xl md:text-9xl uppercase tracking-tighter leading-none"
          >
            THE <span className="text-stroke italic">ARSENAL</span>
          </motion.h1>
        </div>

        {/* Tactical Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} delay={idx * 0.1} />
          ))}
        </div>

        {/* Tactical restock protocol */}
        <div className="mt-32 p-12 lg:p-20 border border-primary/20 bg-primary/5 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden backdrop-blur-sm group hover:border-primary/40 transition-colors">
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary opacitiy-20 group-hover:opacity-100 transition-opacity" />
          <div className="space-y-6 max-w-2xl text-center lg:text-left relative z-10">
            <h2 className="font-syne font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">
              AUTO-OPTIMIZE YOUR <span className="text-primary italic text-stroke">RESTOCK</span>
            </h2>
            <p className="font-inter text-foreground/40 uppercase tracking-widest text-xs leading-relaxed">
              Activate the Kinetic Subscription Protocol to receive 15% discount on repeated deployments and guaranteed node priority.
            </p>
          </div>
          <button className="bg-primary text-background px-12 py-6 font-space font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_0_20px_#CAF200] relative z-10">
            Deploy Protocol
          </button>
        </div>
      </div>

      {/* Decorative Blueprint Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,255,0,0.05)_1px,transparent_1px),linear-gradient(rgba(13,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </main>
  );
}

function ProductCard({ product, delay }: { product: Product, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group relative h-[650px] flex flex-col justify-between p-8 border border-outline/20 hover:border-primary/50 transition-all duration-700 bg-surface-bright/20 backdrop-blur-md overflow-hidden"
    >
      {/* Background Asset */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
         <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover opacity-10 group-hover:opacity-40 transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110" 
         />
      </div>

      {/* Top Protocol Header */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="space-y-1">
          <span className="block font-mono text-[8px] uppercase tracking-[0.4em] text-primary/60">NODE_ID / {product.id.toString().padStart(4, '0')}</span>
          <span className="block font-mono text-[8px] uppercase tracking-[0.4em] opacity-30">BATCH_TK_2026_09</span>
        </div>
        <div className="w-8 h-8 border border-outline/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
          <Box className="w-3 h-3 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
        </div>
      </div>

      {/* Center Identification */}
      <div className="relative z-20 space-y-4">
        <h3 className="font-syne font-black text-4xl uppercase tracking-tighter leading-[var(--leading-clinical)] group-hover:text-primary transition-colors duration-500">
          {product.name}
        </h3>
        <p className="font-space font-bold text-[10px] uppercase tracking-[var(--tracking-expanded)] text-foreground/40">
          {product.category}
        </p>
      </div>

      {/* Bottom Technical Data */}
      <div className="relative z-20 space-y-8">
         <div className="grid grid-cols-2 gap-4 border-t border-outline/10 pt-6">
            <div className="space-y-1">
              <span className="block font-space text-[7px] uppercase tracking-[0.3em] opacity-30">Purity_Idx</span>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-primary" />
                <span className="font-mono text-[10px] font-bold">{product.intensity}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="block font-space text-[7px] uppercase tracking-[0.3em] opacity-30">Bio_Availability</span>
              <div className="flex items-center gap-2 text-secondary">
                <Zap className="w-3 h-3" />
                <span className="font-mono text-[10px] font-bold">OPTIMIZED</span>
              </div>
            </div>
         </div>
         
         <div className="flex justify-between items-center group/price pt-4">
            <span className="font-syne font-black text-4xl tracking-tighter group-active:scale-95 transition-transform">{product.price}</span>
            <button className="flex items-center gap-4 group/btn">
              <span className="font-space text-[8px] uppercase tracking-[0.4em] opacity-0 group-hover/btn:opacity-100 -translate-x-4 group-hover/btn:translate-x-0 transition-all duration-500">DEPLOY_NODE</span>
              <div className="w-14 h-14 bg-white/5 border border-outline/20 flex items-center justify-center group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all transform group-hover:rotate-45 shadow-[0_0_0_0_rgba(202,242,0,0)] group-hover:shadow-[0_0_30px_rgba(202,242,0,0.3)]">
                 <MoveRight className="w-5 h-5 transform group-hover:-rotate-45 transition-transform" />
              </div>
            </button>
         </div>
      </div>

      {/* Hover Edge Highlight */}
      <div className="absolute top-0 right-0 w-[1px] h-0 bg-primary group-hover:h-full transition-all duration-1000 delay-100" />
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-1000" />
    </motion.div>
  );
}
