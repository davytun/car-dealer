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
import GridBackground from "@/components/ui/grid-background";

// ── DATA: DANISH LUXURY ARCHIVE (REFINED) ──────────────────────────

const LUXURY_INVENTORY = [
  {
    id: 1,
    name: "Porsche 911 GT3",
    brand: "PORSCHE",
    price: "162,000,000",
    monthlyPrice: "2.1M/mo",
    mileage: "1,200 miles",
    year: "2023",
    fuel: "Benzin",
    transmission: "PDK",
    image: "/images/card/card-1.jpg",
    badge: "Rare Find",
    imagesCount: 12,
    videoCount: 2,
    details: {
      "Condition": "Pristine",
      "Power": "502 HP",
      "Engines": "4.0L Flat-6",
      "0-60 mph": "3.2s",
      "Top Speed": "197 mph"
    }
  },
  {
    id: 2,
    name: "Lamborghini Revuelto",
    brand: "LAMBORGHINI",
    price: "608,000,000",
    monthlyPrice: "7.5M/mo",
    mileage: "450 miles",
    year: "2024",
    fuel: "Hybrid",
    transmission: "DCT",
    image: "/images/card/card-2.jpg",
    badge: "New Arrival",
    imagesCount: 15,
    videoCount: 3,
    details: {
      "Condition": "New",
      "Power": "1001 HP",
      "Engine": "6.5L V12 + Motors",
      "0-60 mph": "2.5s",
      "Drive": "AWD"
    }
  },
  {
    id: 3,
    name: "Ferrari SF90 Stradale",
    brand: "FERRARI",
    price: "525,000,000",
    monthlyPrice: "6.2M/mo",
    mileage: "800 miles",
    year: "2023",
    fuel: "Hybrid",
    transmission: "DCT",
    image: "/images/card/card-3.jpg",
    badge: "Certified",
    imagesCount: 10,
    videoCount: 1,
    details: {
      "Condition": "Mint",
      "Power": "986 HP",
      "Engine": "4.0L V8 Twin-Turbo",
      "0-60 mph": "2.5s",
      "Warranty": "3 Years"
    }
  },
  {
    id: 4,
    name: "McLaren 750S Spider",
    brand: "MCLAREN",
    price: "324,000,000",
    monthlyPrice: "4.1M/mo",
    mileage: "150 miles",
    year: "2024",
    fuel: "Benzin",
    transmission: "DCT",
    image: "/images/card/card-4.jpg",
    badge: "Limited Edition",
    imagesCount: 18,
    videoCount: 2,
    details: {
      "Condition": "New",
      "Power": "740 HP",
      "Weight": "1,389 kg",
      "0-60 mph": "2.7s",
      "Structure": "Carbon Fiber"
    }
  },
  {
    id: 5,
    name: "Aston Martin DBS",
    brand: "ASTON MARTIN",
    price: "316,000,000",
    monthlyPrice: "3.9M/mo",
    mileage: "2,100 miles",
    year: "2023",
    fuel: "Benzin",
    transmission: "Auto",
    image: "/images/card/card-5.jpg",
    badge: "Premium",
    imagesCount: 9,
    videoCount: 1,
    details: {
      "Condition": "Excellent",
      "Power": "715 HP",
      "Engine": "5.2L V12",
      "Top Speed": "211 mph",
      "Interior": "Leather/Alcantara"
    }
  },
  {
    id: 6,
    name: "Mercedes-AMG One",
    brand: "MERCEDES",
    price: "2,700,000,000",
    monthlyPrice: "POA",
    mileage: "10 miles",
    year: "2024",
    fuel: "Hybrid",
    transmission: "Manual-Sequential",
    image: "/images/card/card-16.png",
    badge: "Hypercar",
    imagesCount: 25,
    videoCount: 5,
    details: {
      "Condition": "Investment Grade",
      "Power": "1063 HP",
      "Engine": "1.6L V6 Turbo E-Hybrid",
      "F1 Tech": "Included",
      "Production": "1 of 275"
    }
  },
  {
    id: 7,
    name: "Rolls-Royce Spectre",
    brand: "ROLLS-ROYCE",
    price: "420,000,000",
    monthlyPrice: "5.5M/mo",
    mileage: "100 miles",
    year: "2024",
    fuel: "Electric",
    transmission: "Single-Speed",
    image: "/images/card/card-25.jpg",
    badge: "Ultra Luxury",
    imagesCount: 14,
    videoCount: 2,
    details: {
      "Condition": "Bespoke",
      "Range": "320 miles",
      "Power": "577 HP",
      "Interior": "Starlight Headliner",
      "Curb Weight": "2,975 kg"
    }
  },
  {
    id: 8,
    name: "Bentley Continental GT",
    brand: "BENTLEY",
    price: "245,000,000",
    monthlyPrice: "3.2M/mo",
    mileage: "5,400 miles",
    year: "2022",
    fuel: "Benzin",
    transmission: "Auto",
    image: "/images/card/card-26.jpg",
    badge: "Grand Tourer",
    imagesCount: 11,
    videoCount: 1,
    details: {
      "Condition": "Certified Pre-Owned",
      "Power": "626 HP",
      "Engine": "6.0L W12",
      "Top Speed": "207 mph",
      "Style": "Mulliner"
    }
  },
  {
    id: 9,
    name: "McLaren Senna",
    brand: "MCLAREN",
    price: "1,200,000,000",
    monthlyPrice: "POA",
    mileage: "240 miles",
    year: "2020",
    fuel: "Benzin",
    transmission: "DCT",
    image: "/images/card/card-17.png",
    badge: "Track Ready",
    imagesCount: 22,
    videoCount: 4,
    details: {
      "Condition": "Race Tuned",
      "Power": "789 HP",
      "Downforce": "800 kg",
      "0-60 mph": "2.8s",
      "Weight": "1,198 kg"
    }
  },
  {
    id: 10,
    name: "Bugatti Chiron Pur Sport",
    brand: "BUGATTI",
    price: "4,500,000,000",
    monthlyPrice: "POA",
    mileage: "12 miles",
    year: "2024",
    fuel: "Benzin",
    transmission: "DCT",
    image: "/images/card/card-18.png",
    badge: "Masterpiece",
    imagesCount: 30,
    videoCount: 6,
    details: {
      "Condition": "Factory New",
      "Power": "1479 HP",
      "Engine": "8.0L W16 Quad-Turbo",
      "0-60 mph": "2.3s",
      "Top Speed": "217 mph"
    }
  },
  {
    id: 11,
    name: "Pagani Huayra BC",
    brand: "PAGANI",
    price: "3,800,000,000",
    monthlyPrice: "POA",
    mileage: "65 miles",
    year: "2023",
    fuel: "Benzin",
    transmission: "Auto-Sequential",
    image: "/images/card/card-19.png",
    badge: "Art on Wheels",
    imagesCount: 18,
    videoCount: 3,
    details: {
      "Condition": "Collector",
      "Power": "740 HP",
      "Engine": "6.0L V12 Twin-Turbo",
      "Weight": "1,218 kg",
      "Craftsmanship": "Manual"
    }
  },
  {
    id: 12,
    name: "Koenigsegg Jesko",
    brand: "KOENIGSEGG",
    price: "3,200,000,000",
    monthlyPrice: "POA",
    mileage: "5 miles",
    year: "2024",
    fuel: "E85/Benzin",
    transmission: "9-Speed LST",
    image: "/images/card/card-20.png",
    badge: "Speed King",
    imagesCount: 20,
    videoCount: 4,
    details: {
      "Condition": "Factory Delivery",
      "Power": "1600 HP (E85)",
      "Engine": "5.0L V8 Twin-Turbo",
      "Max RPM": "8500",
      "Transmission": "Light Speed"
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
      className={`relative cursor-pointer group rounded-4xl overflow-hidden border transition-all duration-700 bg-bg-surface/40 backdrop-blur-xl ${
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
           <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-bg-base text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
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
    <section className="relative w-full min-h-screen bg-bg-base flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* ── BACKGROUND AMBIENCE ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
         <GridBackground 
            type="dot"
            dotColor="rgba(255, 255, 255, 0.15)"
            maskSize="ellipse 60% 60% at 50% 50%"
         />
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
        
        {/* ── VIEW ALL CTA ─────────────────────────────────────────── */}
        <div className="mt-16 flex justify-center">
           <motion.button 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="group relative px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-full shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-6"
           >
             View All Inventory
             <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={14} className="text-black" />
             </div>
           </motion.button>
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
              <div className="bg-bg-elevated/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 md:p-16 shadow-[0_60px_120px_rgba(0,0,0,1)] relative">
                
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
