"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, MoveRight, Zap } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-background border-l border-outline/30 z-[101] flex flex-col pt-12 pb-12"
          >
            <div className="px-8 flex justify-between items-center mb-12">
              <div className="space-y-1">
                <span className="font-space font-bold text-[10px] uppercase tracking-[0.4em] text-primary">TITAN KINETIC</span>
                <h2 className="font-syne font-black text-4xl uppercase tracking-tighter">THE ARSENAL <span className="text-stroke italic text-primary">CART</span></h2>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 border border-outline/30 flex items-center justify-center hover:border-primary transition-all group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Cart Items (Empty State for Demo) */}
            <div className="flex-1 flex flex-col items-center justify-center px-12 text-center space-y-8">
              <div className="w-24 h-24 bg-surface/50 border border-outline/30 flex items-center justify-center relative overflow-hidden group">
                 <ShoppingBag className="w-8 h-8 opacity-20 group-hover:scale-110 transition-transform" />
                 <div className="absolute inset-0 bg-primary/5 animate-pulse" />
              </div>
              <div className="space-y-4">
                <h3 className="font-syne font-bold text-2xl uppercase tracking-tighter">Your Arsenal is Empty</h3>
                <p className="font-inter text-xs text-foreground/40 uppercase tracking-widest leading-relaxed">
                  The protocol requires kinetic fuel to proceed. Deploy resources from the arsenal to continue biological expansion.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="bg-primary text-background px-10 py-5 font-space font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 flex items-center gap-3 w-full justify-center group"
              >
                Return to Arsenal <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Checkout Area */}
            <div className="px-8 pt-8 border-t border-outline/30 space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-space font-bold text-[10px] uppercase tracking-widest opacity-40">Subtotal</span>
                <span className="font-syne font-black text-2xl tracking-tighter">$0.00</span>
              </div>
              <p className="font-inter text-[8px] uppercase tracking-widest text-foreground/30 text-center">
                Shipping and taxes calculated at deployment phase.
              </p>
              <div className="p-1 border border-primary/20 bg-primary/5">
                <button 
                   disabled
                   className="w-full bg-primary/20 text-background/50 px-10 py-5 font-space font-bold uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-4"
                >
                  <Zap className="w-4 h-4" /> Finalize Deployment
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
