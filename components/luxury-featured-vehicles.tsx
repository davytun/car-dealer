"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronUp, 
  Database, 
  Coins,
  Gauge,
  Zap,
  Navigation,
  Loader2,
  Heart
} from "lucide-react";
import { InventorySearch } from "./inventory-search";

// ── DATA: DANISH LUXURY ARCHIVE (REFINED) ──────────────────────────

const LUXURY_INVENTORY = [
  {
    id: 1,
    name: "Audi A6 Avant E-Tron",
    brand: "AUDI",
    price: "62,860,000",
    monthlyPrice: "See Finance",
    mileage: "32,500 miles",
    year: "2022",
    fuel: "EV",
    transmission: "Manual",
    image: "/images/luxury/lambo_revuelto.png",
    badge: "Great Price",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Mint",
      "Accidents": "None",
      "Warranty": "2 Years",
      "Engine": "Electric",
      "Power": "476 HP",
      "Total Price": "62,860,000"
    }
  },
  {
    id: 2,
    name: "2024 Hyundai Elantra",
    brand: "HYUNDAI",
    price: "59,920,000",
    monthlyPrice: "823.200/mo",
    mileage: "89,300 miles",
    year: "2018",
    fuel: "Benzin",
    transmission: "Auto",
    image: "/images/luxury/porsche_911_rimlit.png",
    badge: "Certified",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Good",
      "Accidents": "None",
      "Warranty": "1 Year",
      "Engine": "1.6L GDI",
      "Power": "147 HP",
      "Total Price": "59,920,000"
    }
  },
  {
    id: 3,
    name: "Kia EV9 2024",
    brand: "KIA",
    price: "63,700,000",
    monthlyPrice: "See Finance",
    mileage: "76,400 miles",
    year: "2020",
    fuel: "Diesel",
    transmission: "Auto",
    image: "/images/luxury/ferrari_sf90_moody.png",
    badge: "Premium",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Excellent",
      "Accidents": "None",
      "Warranty": "5 Years",
      "Battery": "99.8 kWh",
      "Range": "300 miles",
      "Total Price": "63,700,000"
    }
  },
  {
    id: 4,
    name: "Chevrolet Camaro 2020",
    brand: "CHEVROLET",
    price: "49,700,000",
    monthlyPrice: "See Finance",
    mileage: "45,800 miles",
    year: "2023",
    fuel: "Benzin",
    transmission: "Auto",
    image: "/images/luxury/porsche_911_rimlit.png",
    badge: "Sports",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Like New",
      "Accidents": "None",
      "Warranty": "4 Years",
      "Engine": "6.2L V8",
      "Power": "455 HP",
      "Total Price": "49,700,000"
    }
  },
  {
    id: 5,
    name: "Audi R8",
    brand: "AUDI",
    price: "63,700,000",
    monthlyPrice: "See Finance",
    mileage: "97,200 miles",
    year: "2022",
    fuel: "EV",
    transmission: "Manual",
    image: "/images/luxury/lambo_revuelto.png",
    badge: "Special",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Performance",
      "Accidents": "None",
      "Warranty": "Expired",
      "Engine": "Electric Mod",
      "Power": "600 HP",
      "Total Price": "63,700,000"
    }
  },
  {
    id: 6,
    name: "Genesis Electrified G80",
    brand: "GENESIS",
    price: "34,860,000",
    monthlyPrice: "See Finance",
    mileage: "51,600 miles",
    year: "2021",
    fuel: "Diesel",
    transmission: "Auto",
    image: "/images/luxury/ferrari_sf90_moody.png",
    badge: "Special",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Luxury",
      "Accidents": "None",
      "Warranty": "3 Years",
      "Engine": "2.2D",
      "Power": "210 HP",
      "Total Price": "34,860,000"
    }
  },
  {
    id: 7,
    name: "Audi A6 Avant E-Tron",
    brand: "AUDI",
    price: "62,860,000",
    monthlyPrice: "See Finance",
    mileage: "32,500 miles",
    year: "2022",
    fuel: "EV",
    transmission: "Manual",
    image: "/images/luxury/lambo_revuelto.png",
    badge: "Great Price",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Mint",
      "Accidents": "None",
      "Warranty": "2 Years",
      "Engine": "Electric",
      "Power": "476 HP",
      "Total Price": "62,860,000"
    }
  },
  {
    id: 8,
    name: "2024 Hyundai Elantra",
    brand: "HYUNDAI",
    price: "59,920,000",
    monthlyPrice: "823.200/mo See Finance",
    mileage: "89,300 miles",
    year: "2018",
    fuel: "Benzin",
    transmission: "Auto",
    image: "/images/luxury/porsche_911_rimlit.png",
    badge: "Certified",
    imagesCount: 8,
    videoCount: 1,
    details: {
      "Condition": "Good",
      "Accidents": "None",
      "Warranty": "1 Year",
      "Engine": "1.6L GDI",
      "Power": "147 HP",
      "Total Price": "59,920,000"
    }
  }
];


// ── MAIN COMPONENT ──────────────────────────────────────────────

const VehicleCard = ({ vehicle, isSelected, onClick, index }: { 
  vehicle: typeof LUXURY_INVENTORY[0], 
  isSelected: boolean, 
  onClick: () => void,
  index: number 
}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onClick}
      className={`relative cursor-pointer group rounded-4xl overflow-hidden border transition-all duration-700 bg-[#0A0A0A]/40 backdrop-blur-xl ${
        isSelected 
        ? "border-white/30 shadow-[0_32px_64px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.05)]" 
        : "border-white/5 opacity-60 hover:opacity-100 hover:border-white/20"
      }`}
    >
      {/* ── IMAGE SECTION ────────────────────────────────────────── */}
      <div className="relative aspect-4/3 overflow-hidden rounded-3xl m-3">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-[#0A0A0A] text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
             {vehicle.badge}
           </span>
        </div>

        {/* Heart Icon */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <motion.div animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}>
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
          </motion.div>
        </button>

        {/* Media Counts & Brand */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
           <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-white/70 text-[8px] font-black tracking-[0.2em] rounded-lg">
             {vehicle.brand}
           </span>
           <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white/50 text-[9px] font-bold">
                <Navigation size={10} /> {vehicle.imagesCount}
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white/50 text-[9px] font-bold">
                <Loader2 size={10} className="animate-spin-slow" /> {vehicle.videoCount}
              </div>
           </div>
        </div>

        {/* Charging Effect (Subtle Line) */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/40 z-30 transition-all duration-1000 group-hover:w-full w-0" />
      </div>

      {/* ── CONTENT SECTION ──────────────────────────────────────── */}
      <div className="px-7 pb-8 pt-2">
        <h3 className="text-xl text-white font-black uppercase tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
          {vehicle.name}
        </h3>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
           <div className="flex items-center gap-3 text-white/40">
              <Gauge size={14} className="shrink-0" />
              <span className="text-[11px] font-bold tracking-tight text-white/70">{vehicle.mileage}</span>
           </div>
           <div className="flex items-center gap-3 text-white/40">
              <Navigation size={14} className="shrink-0" />
              <span className="text-[11px] font-bold tracking-tight text-white/70">{vehicle.year}</span>
           </div>
           <div className="flex items-center gap-3 text-white/40">
              <Zap size={14} className="shrink-0" />
              <span className="text-[11px] font-bold tracking-tight text-white/70">{vehicle.fuel}</span>
           </div>
           <div className="flex items-center gap-3 text-white/40">
              <Loader2 size={14} className="shrink-0" />
              <span className="text-[11px] font-bold tracking-tight text-white/70">{vehicle.transmission}</span>
           </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full mb-6" />

        {/* Price & Action */}
        <div className="flex items-end justify-between">
           <div className="flex flex-col">
              <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] mb-1">Market Price</span>
              <span className="text-2xl text-white font-black tracking-tighter">
                {vehicle.price}
              </span>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[11px] text-white/50 font-bold mb-1">{vehicle.monthlyPrice}</span>
              <button className="text-[9px] text-white/30 font-black hover:text-white transition-colors flex items-center gap-1 group/btn">
                VIEW DETAILS <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export function LuxuryFeaturedVehicles() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % LUXURY_INVENTORY.length);
    setShowDetails(false);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + LUXURY_INVENTORY.length) % LUXURY_INVENTORY.length);
    setShowDetails(false);
  };

  const vehicle = LUXURY_INVENTORY[selectedIndex];
  const progressPercent = ((selectedIndex + 1) / LUXURY_INVENTORY.length) * 100;

  return (
    <section className="relative w-full min-h-screen bg-[#020202] flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* ── BACKGROUND AMBIENCE ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-white/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col gap-6">
        
        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-4">
           <div>
              <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-black block mb-4">INVENTORY / MARKETPLACE</span>
              <h2 className="text-4xl md:text-5xl text-white font-black uppercase tracking-tighter leading-tight">
                Curated<br/><span className="text-white/20">Inventory</span>
              </h2>
           </div>
           <p className="mt-8 text-white/40 text-sm max-w-sm uppercase tracking-widest font-bold text-right hidden md:block">
             Browse our premium vehicle listings with granular filters for your ideal car.
           </p>
        </div>

        {/* ── GRANULAR FILTERS ──────────────────────────────────────── */}
        <div className="mb-12">
           <InventorySearch />
        </div>

        {/* ── MULTI-VEHICLE GRID ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {LUXURY_INVENTORY.map((v, idx) => (
            <VehicleCard 
              key={v.id}
              vehicle={v}
              isSelected={selectedIndex === idx}
              onClick={() => setSelectedIndex(idx)}
              index={idx}
            />
          ))}
        </div>


        {/* ── ARCHIVE DETAIL MODAL (Positioned At Top) ─────────────────── */}
        <AnimatePresence>
          {showDetails && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -50 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl z-50 px-8"
            >
              <div className="bg-[#1A1A1A]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 md:p-16 shadow-[0_60px_120px_rgba(0,0,0,1)] relative">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  {/* CAR DATA Section */}
                  <div className="space-y-10">
                    <h4 className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-black mb-8 border-b border-white/5 pb-4">CAR DATA</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Mileage", value: vehicle.mileage },
                        { label: "Year", value: vehicle.year },
                        { label: "Fuel", value: vehicle.fuel },
                        { label: "Transmission", value: vehicle.transmission },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-white/3">
                          <span className="text-[11px] text-white/40 font-medium tracking-tight">{row.label}</span>
                          <span className="text-[11px] text-white font-bold tracking-tight">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PRICES Section */}
                  <div className="space-y-10">
                    <h4 className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-black mb-8 border-b border-white/5 pb-4">PRICES</h4>
                    <div className="space-y-4">
                      {Object.entries(vehicle.details).map(([key, val], i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-white/3">
                          <span className="text-[11px] text-white/40 font-medium tracking-tight">{key}</span>
                          <span className="text-[11px] text-white font-bold tracking-tight">{val as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-12 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/5">
                    <button className="text-[9px] tracking-tight text-white/90 font-bold px-6 py-2.5 rounded-full bg-white shadow-lg">View Full Inventory</button>
                    <button className="text-[9px] tracking-tight text-white/30 font-bold px-6 py-2.5 rounded-full hover:text-white/60 transition-colors">Compare Vehicles</button>
                  </div>

                  {/* Close button at exact end */}
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all group"
                  >
                    <ArrowLeft size={20} className="-rotate-90 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
