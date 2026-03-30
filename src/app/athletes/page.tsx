"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { Activity, Zap, Target } from "lucide-react";

// Curated Moody Photography for a "TITAN" High-End Aesthetic
const athletes = [
  { 
    id: 1, 
    name: "Marcus Thorne", 
    title: "Vanguard // Heavy Volume", 
    specialty: "Hypertrophy Optimization", 
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    bio: "Marcus utilizes the TITAN kinetic sequence to maintain cellular energy levels during 2.5-hour metabolic stress sessions."
  },
  { 
    id: 2, 
    name: "Sasha Vane", 
    title: "Vanguard // High Intensity", 
    specialty: "Neuromuscular Endurance", 
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    bio: "Sasha’s programming requires zero-latency recovery. Her stack focuses on cryogenic restoration and nitrogen-rich isolate."
  },
];

export default function Athletes() {
  return (
    <main className="relative bg-background min-h-screen pt-32 pb-24 overflow-hidden">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-32 space-y-4 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-space font-bold uppercase tracking-[0.6em] text-[10px] text-primary"
          >
            TITAN BIOLOGICAL ASSETS
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-syne font-extrabold text-7xl md:text-9xl uppercase tracking-tighter leading-none"
          >
            THE <span className="text-stroke italic">VANGUARDS</span>
          </motion.h1>
        </div>

        <div className="space-y-60">
          {athletes.map((athlete, idx) => (
            <AthleteSection key={athlete.id} athlete={athlete} reversed={idx % 2 !== 0} />
          ))}
        </div>
      </div>

      {/* Decorative Background Text */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none -translate-x-20">
        <span className="font-syne font-black text-[30vw] uppercase leading-none">PROTOCOL</span>
      </div>
    </main>
  );
}

function AthleteSection({ athlete, reversed }: { athlete: any, reversed: boolean }) {
  return (
    <div className={cn("flex flex-col lg:flex-row gap-20 items-center", reversed && "lg:flex-row-reverse")}>
      {/* Cinematic Profile Image */}
      <motion.div 
        initial={{ opacity: 0, x: reversed ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 aspect-[3/4] relative border-l border-primary/30 overflow-hidden group"
      >
        <img 
          src={athlete.image} 
          alt={athlete.name} 
          className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-[2s] ease-out transform group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-10 left-10 space-y-2">
          <h2 className="font-syne font-black text-6xl uppercase tracking-tighter leading-none">{athlete.name}</h2>
          <span className="font-space font-bold text-primary uppercase tracking-[0.4em] text-xs pb-4 block">{athlete.title}</span>
          <p className="font-inter text-[10px] text-foreground/40 max-w-xs uppercase tracking-widest">{athlete.bio}</p>
        </div>
      </motion.div>

      {/* Stats & Radar Integration */}
      <div className="w-full lg:w-1/2 space-y-12">
        <div className="space-y-4">
          <span className="font-space font-bold uppercase tracking-[0.4em] text-[10px] opacity-40">PERFORMANCE DEPLOYMENT</span>
          <h3 className="font-syne font-extrabold text-4xl uppercase tracking-tighter leading-none">{athlete.specialty}</h3>
        </div>

        {/* High-End Technical Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RadarItem icon={<Zap className="w-4 h-4" />} label="Kinetic Flux" value="98.2" unit="%" />
          <RadarItem icon={<Activity className="w-4 h-4" />} label="Nitrogen Retention" value="94.8" unit="%" />
          <RadarItem icon={<Target className="w-4 h-4" />} label="Neural Focus" value="100" unit="%" />
          <RadarItem icon={<Activity className="w-4 h-4" />} label="Lactate Threshold" value="88.5" unit="VO2" />
        </div>

        <div className="pt-12 border-t border-outline/30 space-y-6">
          <h4 className="font-space font-bold text-[10px] uppercase tracking-widest opacity-40">PROTOCOL STACK COMPONENTS</h4>
          <div className="flex flex-wrap gap-4">
            <span className="px-5 py-3 border border-primary/20 text-primary font-space font-bold text-[10px] uppercase tracking-widest bg-primary/5 hover:bg-primary hover:text-background transition-all">Ultra Whey ISO</span>
            <span className="px-5 py-3 border border-secondary/20 text-secondary font-space font-bold text-[10px] uppercase tracking-widest bg-secondary/5 hover:bg-secondary hover:text-background transition-all">Nitro Pre-X</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadarItem({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string, unit: string }) {
  return (
    <div className="p-8 bg-surface-bright/50 border border-outline/30 flex items-center justify-between group hover:border-primary transition-all duration-500 hover:bg-surface-bright relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1 h-1 bg-primary/20" />
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-10 h-10 border border-outline flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
          {icon}
        </div>
        <span className="font-space font-bold text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100">{label}</span>
      </div>
      <div className="flex items-baseline gap-2 relative z-10">
        <span className="font-syne font-black text-3xl">{value}</span>
        <span className="font-space font-bold text-[10px] uppercase tracking-widest opacity-30">{unit}</span>
      </div>
    </div>
  );
}
