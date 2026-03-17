"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronDown, 
  SlidersHorizontal, 
  Zap, 
  CarFront, 
  Shield, 
  Crown,
  Search as SearchIcon,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import LightRays from "@/components/ui/light-rays";

// ── REAL DATA ──────────────────────────────────────────────────

const FILTER_DATA = {
  "Select Brand": ["All Brands", "Porsche", "Ferrari", "Lamborghini", "Mercedes-AMG", "Aston Martin", "McLaren"],
  "Select Model": ["All Models", "911 GT3", "SF90 Stradale", "Revuelto", "Project One", "DBS Volante", "750S"],
  "Select Miles": ["Any Mileage", "< 1,000 mi", "< 5,000 mi", "< 10,000 mi", "Brand New"],
  "Max Price": ["No Limit", "$100,000+", "$250,000+", "$500,000+", "$1,000,000+"]
};

const CATEGORIES = [
  { name: "Electric", icon: Zap },
  { name: "Sedan", icon: CarFront },
  { name: "SUV", icon: Shield },
  { name: "Pickup", icon: CarFront },
  { name: "Luxury", icon: Crown },
  { name: "Hatchback", icon: CarFront },
];

// ── SUB-COMPONENT: LUXURY DROPDOWN ──────────────────────────────

function SearchDropdown({ 
  label, 
  currentValue, 
  options, 
  onSelect,
  isOpen,
  onToggle,
  isLast = false
}: { 
  label: string, 
  currentValue: string, 
  options: string[], 
  onSelect: (val: string) => void,
  isOpen: boolean,
  onToggle: () => void,
  isLast?: boolean
}) {
  return (
    <div 
      className={`relative flex flex-col px-4 md:px-6 py-3 md:py-4 border-white/5 transition-all hover:bg-white/4 cursor-pointer group/item ${!isLast ? "md:border-r" : ""}`} 
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <label className="text-[7px] md:text-[8px] tracking-[0.3em] text-white/30 uppercase font-black mb-1 group-hover/item:text-white/50 transition-colors line-clamp-1">{label}</label>
      <div className="flex items-center justify-between gap-2 md:gap-4 text-white font-bold text-[9px] md:text-[11px] uppercase tracking-widest whitespace-nowrap">
        <span className="truncate">{currentValue}</span>
        <ChevronDown size={10} className={`text-white/20 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-4 w-64 max-sm:fixed max-sm:inset-x-4 max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:w-auto bg-bg-elevated backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] z-200 overflow-hidden p-2"
          >
            {options.map((opt) => (
              <div 
                key={opt}
                onClick={(e) => { e.stopPropagation(); onSelect(opt); }}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-[10px] tracking-widest uppercase font-bold text-white/60 hover:text-white transition-all group/opt"
              >
                {opt}
                {currentValue === opt && <Check size={12} className="text-white" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MAIN HERO COMPONENT ──────────────────────────────────────────

export function HeroAnimation() {
  const [activeTab, setActiveTab] = useState("new");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selections, setSelections] = useState({
    "Select Brand": "All Brands",
    "Select Model": "All Models",
    "Select Miles": "Any Mileage",
    "Max Price": "No Limit"
  });

  const searchBtnRef = useRef<HTMLButtonElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = () => {
      console.log("Closing all dropdowns");
      setOpenDropdown(null);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const handleSearch = () => {
    console.log("Searching with:", selections);
    alert(`Searching for: ${selections["Select Brand"]} ${selections["Select Model"]}`);
  };

  const handleCategoryClick = (catName: string) => {
    setIsNavigating(true);
    console.log("Navigating to category:", catName);
    // Simulation of navigation delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-bg-base flex flex-col items-center justify-center pt-24 pb-12">
      
      {/* ── BACKGROUND LAYER ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero2.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlay (Subtle) */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Light Rays Effect */}
        <div className="absolute inset-0 z-10">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.2}
            lightSpread={1.0}
            rayLength={3.0}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.03}
            distortion={0.15}
            pulsating={true}
            saturation={1.2}
          />
        </div>
      </div>

      {/* ── ATMOSPHERIC LAYER ── (Removed noise for clarity) */}

      {/* ── CONTENT AREA ───────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl px-6 md:px-12 flex flex-col items-center">
        
        {/* Editorial Heading */}
        <div className="text-center mb-16 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] tracking-[1em] text-white/30 uppercase font-black mb-6">Ignite Luxury Collection 2026</span>
            <h1 className="text-[10vw] md:text-[6vw] font-extralight text-white leading-[0.9] tracking-tight uppercase flex flex-col items-center">
              Find Your Dream
              <span className="font-black italic tracking-normal md:tracking-tighter text-white">Luxury Vehicle Today</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/40 text-[11px] md:text-xs tracking-[0.3em] uppercase font-bold max-w-2xl mx-auto leading-loose"
          >
            Discover exclusive new and pre-owned vehicles with ease, <br className="hidden md:block" /> transparency, and expert guidance.
          </motion.p>
        </div>

        {/* ── FUNCTIONAL SEARCH HUB ──────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl"
        >
          {/* Tabs */}
          <div className="flex gap-6 mb-4 justify-center md:justify-start px-8">
            {["new", "pre-owned"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-2 text-[10px] tracking-[0.4em] font-black uppercase transition-all ${activeTab === tab ? "text-white" : "text-white/20 hover:text-white/50"}`}
              >
                {tab === "new" ? "New" : "Pre-Owned"} Vehicles
                {activeTab === tab && (
                  <motion.div layoutId="tabLine" className="absolute -bottom-1 left-0 w-full h-px bg-white/60" />
                )}
              </button>
            ))}
          </div>

          {/* Unified Search Bar */}
          <div className="relative bg-bg-surface/40 backdrop-blur-3xl border border-white/10 p-4 md:p-3 rounded-3xl md:rounded-[3rem] flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-2 shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
            
            <div className="grid grid-cols-2 lg:grid-cols-4 flex-1">
              {(Object.keys(FILTER_DATA) as Array<keyof typeof FILTER_DATA>).map((key, i) => (
                <SearchDropdown 
                  key={key}
                  label={key}
                  currentValue={selections[key]}
                  options={FILTER_DATA[key]}
                  isOpen={openDropdown === key}
                  onToggle={() => setOpenDropdown(openDropdown === key ? null : key)}
                  onSelect={(val) => {
                    setSelections(prev => ({ ...prev, [key]: val }));
                    setOpenDropdown(null);
                  }}
                  isLast={i === 3}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 px-3">
              <Button variant="ghost" className="hidden sm:flex w-12 h-12 rounded-full border border-white/5 bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all">
                <SlidersHorizontal size={16} />
              </Button>
              
              <button 
                ref={searchBtnRef}
                className="w-full sm:w-auto bg-white text-black px-10 h-14 rounded-full font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4 hover:bg-[#F0F0F0] active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] group"
              >
                <SearchIcon size={14} strokeWidth={4} className="group-hover:scale-110 transition-transform" />
                Search Inventory
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── CATEGORY GRID ────────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 w-full"
        >
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-12 bg-white/10" />
              <span className="text-[11px] tracking-[0.8em] text-white/30 uppercase font-bold">Browse Categories</span>
              <div className="h-px w-12 bg-white/10" />
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 px-4 w-full transition-all duration-1000 ${isNavigating ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
               {CATEGORIES.map((cat, i) => (
                 <motion.div 
                  key={cat.name} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.1)"],
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.8 + i * 0.1 },
                    y: { duration: 0.8, delay: 0.8 + i * 0.1 },
                    borderColor: { 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.8 
                    }
                  }}
                  whileHover={{ 
                    y: -5,
                    borderColor: "rgba(255,255,255,0.8)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group relative h-40 md:h-48 bg-bg-surface/80 backdrop-blur-3xl border rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
                  style={{ perspective: "1000px" }}
                 >
                    {/* Living Border Glow (Inner) */}
                    <motion.div 
                      animate={{ opacity: [0, 0.2, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                      className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/20 to-transparent pointer-events-none"
                    />

                    {/* Icon Sphere & Perpetual Pulse */}
                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/20 transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] mb-3 md:mb-4">
                      <motion.div 
                         animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                         className="absolute inset-0 rounded-full border border-white/40"
                      />
                      <cat.icon strokeWidth={1} className="relative z-10 w-5 h-5 md:w-6 md:h-6 transform group-hover:rotate-12 transition-transform duration-700" />
                    </div>
                    
                    <div className="text-center relative z-10">
                      <span className="text-[10px] tracking-[0.4em] text-white/60 uppercase font-black group-hover:text-white transition-all duration-500 block">{cat.name}</span>
                      <span className="text-[7px] tracking-[0.2em] text-white/30 uppercase font-bold absolute -bottom-4 left-1/2 -content-[calc(50%)] opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-1/2 whitespace-nowrap">Explore Collection</span>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(-5%, 3%); }
          30% { transform: translate(3%, -5%); }
          40% { transform: translate(-3%, 7%); }
          50% { transform: translate(-5%, 3%); }
          60% { transform: translate(7%, 0); }
          70% { transform: translate(0, 5%); }
          80% { transform: translate(-7%, 0); }
          90% { transform: translate(5%, 3%); }
        }
        .animate-grain {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          background-repeat: repeat;
          animation: grain 15s steps(15) infinite;
        }
      `}</style>
    </div>
  );
}
