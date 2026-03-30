"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import dynamic from "next/dynamic";
import { ShieldCheck, Beaker, Globe, FlaskConical, Target, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const SourcingGlobe = dynamic(() => import("@/components/three/SourcingGlobe"), {
  ssr: false,
});

export default function Science() {
  const { scrollYProgress } = useScroll();
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="relative bg-background min-h-screen pt-32 pb-40 overflow-hidden">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-16">
            <div className="space-y-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-space font-bold uppercase tracking-[0.6em] text-[10px] text-secondary"
              >
                CLINICAL INFRASTRUCTURE // GLOBAL NODE
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-syne font-extrabold text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85]"
              >
                MOLECULAR <br /> <span className="text-stroke italic text-secondary">INTEGRITY</span> <br /> NETWORK
              </motion.h1>
            </div>

            <p className="font-inter text-foreground/50 max-w-lg text-lg leading-relaxed uppercase tracking-widest border-l border-secondary/30 pl-8">
              We don't source for price. We source for molecular integrity. TITAN KINETIC operates a proprietary supply chain across 14 sovereign nations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StatItem 
                icon={<ShieldCheck className="text-secondary" />} 
                title="Purity Threshold" 
                value="99.8" 
                suffix="%" 
              />
              <StatItem 
                icon={<Globe className="text-secondary" />} 
                title="Sourced Nodes" 
                value="14" 
                suffix="Global" 
              />
            </div>

            <button className="bg-secondary text-background px-12 py-5 font-space font-bold uppercase tracking-widest hover:bg-white hover:text-secondary transition-all transform hover:-translate-y-1 flex items-center gap-4">
              Download Certificates <Activity className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Globe Container */}
          <div className="relative h-[700px] flex items-center justify-center group bg-surface-bright/5 rounded-[40px] border border-outline/10 overflow-hidden">
            {/* Background Kinetic Glow */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 aspect-square bg-secondary/10 blur-[150px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
            
            <div className="relative w-full h-full flex items-center justify-center">
              <SourcingGlobe />
            </div>
            
            {/* UI Overlay on Globe */}
            <div className="absolute bottom-10 left-10 p-8 glass-panel border border-secondary/20 shadow-2xl backdrop-blur-2xl z-20">
              <div className="flex items-center gap-4 text-secondary mb-3">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_10px_#CAF200]" />
                <span className="font-space font-bold text-[12px] uppercase tracking-widest">LIVE NODE: MUNICH ANALYTICAL</span>
              </div>
              <p className="font-space text-white text-[10px] uppercase opacity-40 leading-relaxed tracking-widest">Molecular Index: Optimal <br /> System latency: 0.2ms</p>
            </div>
            
            {/* Technical Scanning HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-background z-10" />
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-10 z-10">
               <div className="flex justify-between">
                  <div className="w-8 h-8 border-t border-l border-secondary/40" />
                  <div className="w-8 h-8 border-t border-r border-secondary/40" />
               </div>
               <div className="flex justify-between">
                  <div className="w-8 h-8 border-b border-l border-secondary/40" />
                  <div className="w-8 h-8 border-b border-r border-secondary/40" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Technical Watermark */}
      <div className="fixed bottom-0 right-0 pointer-events-none opacity-[0.05] translate-y-1/3 translate-x-1/4">
        <span className="font-syne font-black text-[40vw] uppercase leading-none">LAB</span>
      </div>
    </main>
  );
}

function StatItem({ icon, title, value, suffix }: { icon: React.ReactNode, title: string, value: string, suffix: string }) {
  return (
    <div className="p-10 bg-surface-bright/50 border border-outline/20 space-y-4 hover:border-secondary transition-all duration-700 group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-outline flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-background transition-colors">
          {icon}
        </div>
        <span className="font-space font-bold text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-syne font-black text-5xl tracking-tighter">{value}</span>
        <span className="font-space font-bold text-xs uppercase tracking-widest opacity-30">{suffix}</span>
      </div>
    </div>
  );
}
