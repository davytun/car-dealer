"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, SlidersHorizontal, ArrowRight, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GridBackground from "@/components/ui/grid-background";

const FILTER_CATEGORIES = [
  { id: "brand", label: "Brand", options: ["All Brands", "Porsche", "Ferrari", "Lamborghini", "Audi", "BMW", "Mercedes"] },
  { id: "body", label: "Body Type", options: ["All Types", "Coupe", "Sedan", "SUV", "Convertible", "Hatchback"] },
  { id: "price", label: "Price Range", options: ["Any Price", "$50k - $100k", "$100k - $250k", "$250k - $500k", "$500k+"] },
  { id: "transmission", label: "Transmission", options: ["All", "Automatic", "Manual", "Semi-Auto"] },
];

export function InventorySearch() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({
    brand: "All Brands",
    body: "All Types",
    price: "Any Price",
    transmission: "All",
  });
  
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.from(".filter-item", {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const toggleFilter = (id: string) => {
    setActiveFilter(activeFilter === id ? null : id);
  };

  const handleSelect = (category: string, value: string) => {
    setSelectedValues(prev => ({ ...prev, [category]: value }));
    setActiveFilter(null);
  };

  const clearFilters = () => {
    setSelectedValues({
      brand: "All Brands",
      body: "All Types",
      price: "Any Price",
      transmission: "All",
    });
    setActiveFilter(null);
  };

  const totalActiveFilters = Object.values(selectedValues).filter(v => 
    !["All Brands", "All Types", "Any Price", "All"].includes(v)
  ).length;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto px-4 relative z-40 mb-12"
    >
      {/* ── DESKTOP VIEW ────────────────────────────────────────── */}
      <div className="hidden md:block relative">
        <div className="bg-bg-surface/40 backdrop-blur-3xl border border-white/10 rounded-full p-2 md:p-3 flex items-center gap-2 shadow-[0_24px_48px_rgba(0,0,0,0.6)]">
          <div className="flex-1 flex items-center px-4">
            {FILTER_CATEGORIES.map((cat) => (
              <div key={cat.id} className="relative flex-1 min-w-[140px] border-r border-white/5 last:border-r-0 filter-item">
                <button 
                  onClick={() => toggleFilter(cat.id)}
                  className="w-full text-left px-4 py-3 group flex flex-col justify-center transition-all"
                >
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-black mb-1 group-hover:text-white/50 transition-colors">
                    {cat.label}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-white font-bold truncate pr-2">
                      {selectedValues[cat.id]}
                    </span>
                    <ChevronDown 
                      size={14} 
                      className={`text-white/20 transition-transform duration-500 ${activeFilter === cat.id ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {activeFilter === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-4 w-56 bg-bg-elevated border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                    >
                      <div className="p-2 space-y-1">
                        {cat.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(cat.id, opt)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              selectedValues[cat.id] === opt 
                                ? "bg-white text-black" 
                                : "text-white/50 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pr-2">
            <button 
              onClick={clearFilters}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/5 text-white/30 hover:text-white hover:bg-white/5 transition-all"
            >
              <X size={16} />
            </button>
            <button className="bg-white text-black h-14 px-8 rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 hover:bg-[#F0F0F0] active:scale-95 transition-all shadow-xl group">
              <Search size={14} strokeWidth={2.5} />
              <span>Explore</span>
              <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={12} className="text-black" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE VIEW ─────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Mobile Trigger Pill */}
        <button 
          onClick={() => setIsMobileDrawerOpen(true)}
          className="w-full bg-bg-surface/60 backdrop-blur-3xl border border-white/10 rounded-full p-4 flex items-center justify-between shadow-lg active:scale-95 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
              <Search size={18} />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">Search Inventory</span>
              <span className="text-sm text-white font-bold">
                {totalActiveFilters > 0 ? `${totalActiveFilters} Filters Applied` : "Find your ideal car"}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md">
            <SlidersHorizontal size={18} />
          </div>
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileDrawerOpen && (
            <div className="fixed inset-0 z-100 flex items-end justify-center">
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileDrawerOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Drawer Content */}
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-h-[90vh] bg-bg-elevated rounded-t-[2.5rem] border-t border-white/10 flex flex-col overflow-hidden"
              >
                {/* Drag Handle */}
                <div className="w-full flex justify-center pt-4 pb-2">
                  <div className="w-12 h-1 bg-white/10 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-8 py-6 flex items-center justify-between border-b border-white/5">
                  <h3 className="text-xl text-white font-black uppercase tracking-tight">FILTERS</h3>
                  <button 
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Filters Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10 pb-32 custom-scrollbar">
                  {FILTER_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-4">
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] uppercase tracking-[0.3em] text-white/10 font-black">{cat.label}</span>
                         <div className="flex-1 h-px bg-white/5" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(cat.id, opt)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-bold transition-all border ${
                              selectedValues[cat.id] === opt 
                                ? "bg-white text-black border-white shadow-[0_8px_20px_rgba(255,255,255,0.2)]" 
                                : "bg-white/3 text-white/30 border-white/5 hover:border-white/10 hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sticky Action Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-bg-elevated via-bg-elevated to-transparent border-t border-white/5 flex items-center gap-4">
                   <button 
                    onClick={clearFilters}
                    className="h-16 px-8 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                   >
                     Reset
                   </button>
                   <button 
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="flex-1 bg-white text-black h-16 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 shadow-2xl active:scale-95 transition-all"
                   >
                     Explore Inventory
                     <ArrowRight size={16} strokeWidth={2.5} />
                   </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:block absolute inset-0 -z-10 bg-white/5 blur-3xl opacity-50 rounded-full" />
      
      <div className="absolute inset-0 -z-20 opacity-30">
        <GridBackground 
          type="dot"
          dotColor="rgba(255, 255, 255, 0.1)"
          maskSize="ellipse 100% 100% at 50% 50%"
        />
      </div>
    </div>
  );
}
