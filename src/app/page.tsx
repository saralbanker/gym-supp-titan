"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import dynamic from "next/dynamic";
import { MoveRight, Zap, Target, Eye, ShieldCheck, Activity, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductScene = dynamic(() => import("@/components/three/ProductScene"), {
  ssr: false,
});

const KineticMatrix = dynamic(() => import("@/components/three/KineticMatrix"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
            alt="TITAN KINETIC Atmosphere" 
            className="w-full h-full object-cover opacity-20 grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="font-space font-bold uppercase tracking-[0.6em] text-[10px] text-primary">TITAN KINETIC // PROTOCOL v4.2</span>
              <h1 className="font-syne font-extrabold text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-[0.85]">
                LIMITS <br /> ARE <br /> <span className="text-stroke italic text-primary">OPTIONAL</span>
              </h1>
            </div>
            
            <p className="font-inter text-foreground/60 max-w-lg text-lg leading-relaxed uppercase tracking-widest">
              The high-end standard in athletic biology. Zero synthetic fillers. 100% molecular purity. Engineered for those who refuse to stall.
            </p>

            <div className="flex flex-wrap gap-6 pt-8">
              <button className="bg-primary text-background px-10 py-5 font-space font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 flex items-center gap-3 group">
                Access Arsenal <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="border border-outline px-10 py-5 font-space font-bold uppercase tracking-widest hover:border-primary transition-all">
                The Lab
              </button>
            </div>
          </motion.div>

          {/* 3D Scene Container */}
          <div className="relative h-[600px] lg:h-[800px] flex items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square bg-primary/10 blur-[150px] rounded-full opacity-40 animate-pulse" />
            <ProductScene />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer">
          <span className="font-space font-bold uppercase tracking-widest text-[8px] opacity-40 group-hover:opacity-100 transition-opacity">Initiate Descent</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent animate-bounce" />
        </div>
      </section>

      {/* Bento Feature Section */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BentoTile 
            icon={<Zap className="w-6 h-6 text-primary" />}
            title="KINETIC ABSORPTION"
            desc="Molecularly micronized for 40% faster bioavailability."
            className="md:col-span-2 lg:col-span-1 h-[400px]"
            bgImg="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
          />
          <BentoTile 
            icon={<ShieldCheck className="w-6 h-6 text-secondary" />}
            title="CERTIFIED PURE"
            desc="Every batch public lab tested via Munich nodes."
            className="h-[400px]"
            bgImg="https://images.unsplash.com/photo-1532187863486-abf268b8b9ef?q=80&w=2070&auto=format&fit=crop"
          />
          <BentoTile 
            icon={<Globe className="w-6 h-6 text-primary" />}
            title="GLOBAL NODES"
            desc="Sourced from 14 sovereign biological nodes."
            className="h-[400px]"
            bgImg="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* Molecular Override Section */}
      <section className="py-40 relative bg-background/50 border-y border-outline/10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[600px] bg-surface-bright/5 rounded-3xl border border-outline/10 group overflow-hidden">
             <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square bg-secondary/10 blur-[150px] rounded-full opacity-40 translate-x-1/4" />
             <KineticMatrix />
             
             {/* Data Overlay */}
             <div className="absolute top-8 left-8 space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-1 h-8 bg-secondary" />
                   <div>
                      <span className="block font-space font-bold text-[10px] uppercase tracking-widest text-secondary">MOLECULAR NODE: CORE_TK_01</span>
                      <span className="block font-space text-[8px] uppercase tracking-[0.4em] opacity-40">System: Operational [100%]</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <span className="font-space font-bold uppercase tracking-[0.6em] text-[10px] text-secondary">PHASE 2 // BIOLOGICAL OPTIMIZATION</span>
              <h2 className="font-syne font-extrabold text-6xl md:text-7xl uppercase tracking-tighter leading-none">
                MOLECULAR <br /> <span className="text-stroke italic text-secondary">OVERRIDE</span>
              </h2>
            </div>

            <p className="font-inter text-foreground/50 text-lg leading-relaxed uppercase tracking-widest border-l border-secondary/30 pl-8">
              The TITAN molecular engine uses a multi-stage kinetic matrix. This dense biological architecture ensures zero degradation through the gastric threshold.
            </p>

            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <span className="block font-syne font-black text-4xl tracking-tighter">0.12ms</span>
                  <span className="block font-space font-bold text-[8px] uppercase tracking-widest opacity-30">CELLULAR UPTAKE SPEED</span>
               </div>
               <div className="space-y-2">
                  <span className="block font-syne font-black text-4xl tracking-tighter">∞ FLUX</span>
                  <span className="block font-space font-bold text-[8px] uppercase tracking-widest opacity-30">ENERGY RECOVERY INDEX</span>
               </div>
            </div>

            <motion.button 
              whileHover={{ x: 10 }}
              className="group flex items-center gap-6 font-space font-bold uppercase tracking-[0.4em] text-xs text-secondary"
            >
               View Molecular Data <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Industrial Statistics */}
      <section className="py-20 border-y border-outline/10 bg-surface/30">
        <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-12 text-center md:text-left">
          <StatItem label="Active Nodes" value="14" />
          <StatItem label="Purity Metric" value="99.8%" />
          <StatItem label="Vanguards" value="1.2k" />
          <StatItem label="Daily Flux" value="48.5m" />
        </div>
      </section>
    </main>
  );
}

function BentoTile({ icon, title, desc, className, bgImg }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={cn("relative p-10 border border-outline/30 overflow-hidden group", className)}
    >
      <div className="absolute inset-0 z-0">
        <img src={bgImg} className="w-full h-full object-cover opacity-10 group-hover:opacity-30 transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="w-12 h-12 bg-surface/50 backdrop-blur-md border border-outline/30 flex items-center justify-center">
          {icon}
        </div>
        <div className="space-y-4">
          <h3 className="font-syne font-bold text-3xl uppercase tracking-tighter leading-none">{title}</h3>
          <p className="font-inter text-xs text-foreground/40 leading-relaxed uppercase tracking-widest">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2 group">
      <span className="block font-space font-bold text-[8px] uppercase tracking-[0.4em] opacity-40 group-hover:text-primary transition-colors">{label}</span>
      <span className="block font-syne font-black text-5xl md:text-6xl tracking-tighter uppercase group-hover:scale-105 transition-transform inline-block cursor-default">{value}</span>
    </div>
  );
}
