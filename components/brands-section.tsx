"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Calendar, Database, ArrowRight } from "lucide-react";
import ShapeGrid from "@/components/ui/shape-grid";

const BRANDS = [
  { 
    id: "01", 
    name: "BMW", 
    est: "1916", 
    origin: "Munich", 
    ref: "BM_01", 
    logo: "/images/brand/brand-1.png", 
    image: "/images/luxury/porsche_911_rimlit.png",
    description: "The ultimate driving machine, defined by precision engineering and a legacy of performance excellence."
  },
  { 
    id: "02", 
    name: "Mercedes", 
    est: "1926", 
    origin: "Stuttgart", 
    ref: "ME_02", 
    logo: "/images/brand/brand-2.png", 
    image: "/images/luxury/merc_amg_one.png",
    description: "The pinnacle of luxury and innovation, setting the global standard for automotive elegance."
  },
  { 
    id: "03", 
    name: "Audi", 
    est: "1909", 
    origin: "Ingolstadt", 
    ref: "AU_03", 
    logo: "/images/brand/brand-3.png", 
    image: "/images/luxury/porsche_911_rimlit.png",
    description: "Vorsprung durch Technik. A relentless pursuit of progress through sophisticated technology."
  },
  { 
    id: "04", 
    name: "Lexus", 
    est: "1989", 
    origin: "Nagoya", 
    ref: "LE_04", 
    logo: "/images/brand/brand-4.png", 
    image: "/images/luxury/lambo_revuelto.png",
    description: "Experience Amazing. A masterclass in craftsmanship, reliability, and quiet refinement."
  },
  { 
    id: "05", 
    name: "Toyota", 
    est: "1937", 
    origin: "Toyota City", 
    ref: "TO_05", 
    logo: "/images/brand/brand-5.png", 
    image: "/images/luxury/ferrari_sf90_moody.png",
    description: "A global leader in mobility, pioneered by a philosophy of continuous improvement."
  },
  { 
    id: "06", 
    name: "Tesla", 
    est: "2003", 
    origin: "Austin", 
    ref: "TE_06", 
    logo: "/images/brand/brand-6.png", 
    image: "/images/luxury/merc_amg_one.png",
    description: "Accelerating the world's transition to sustainable energy through radical innovation."
  },
];

export function BrandsSection() {
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  return (
    <section className="py-24 md:py-48 bg-bg-base border-t border-white/5 relative overflow-hidden">
      
      {/* Background Shape Grid Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <ShapeGrid 
          speed={0.4}
          squareSize={60}
          direction='diagonal'
          borderColor='rgba(255,255,255,0.2)'
          hoverFillColor='rgba(255,255,255,0.1)'
          shape='circle'
          hoverTrailAmount={10}
        />
      </div>
      
      {/* Cinematic Background Transitions */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            key={selectedBrand.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <img 
              src={selectedBrand.image} 
              alt="" 
              className="w-full h-full object-cover grayscale blur-[20px] scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-b from-bg-base via-transparent to-bg-base" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-12 mb-16 md:mb-32">
           <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-white/20" />
                <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-black">Archive / Global Manufacturers</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-white font-black uppercase tracking-tight md:tracking-tighter leading-tight">
                Luxury Vehicles, <br className="block md:hidden" /><span className="italic text-white/20">Curated for You.</span>
              </h2>
           </div>
           <p className="max-w-xs text-[10px] text-white/50 md:text-white/30 leading-loose uppercase tracking-[0.3em] font-bold border-l border-white/10 pl-8">
             Explore top-tier vehicles from world-class manufacturers. From BMW to Mercedes-Benz, Audi to Toyota, Ignite Luxury brings premium automobiles to your fingertips.
           </p>
        </div>

        {/* Minimalist Showroom Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {BRANDS.map((brand) => (
            <motion.button
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.3)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-32 md:h-48 bg-white/3 border border-white/10 rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden shadow-2xl"
            >
              {/* Subtle radial glow behind logo */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-12 h-12 md:w-20 md:h-20 object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 brightness-110" 
              />
              
              <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="text-[8px] text-white font-black uppercase tracking-[0.2em] whitespace-nowrap">Explore Archive</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Expert Guidance Section */}
        <div className="mt-16 md:mt-24 p-8 md:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-black block mb-4">Expert Guidance</span>
            <p className="text-lg md:text-xl text-white font-light leading-relaxed">
              "Receive insights from our automotive specialists to simplify your purchase."
            </p>
          </div>
          <button className="w-full md:w-auto px-12 py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-white/90 transition-all">
            Get Specialized Advice
          </button>
        </div>
      </div>

      {/* Technical Archive Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBrand(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-100 cursor-zoom-out"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] bg-bg-surface border-t border-white/10 z-101 rounded-t-[4rem] overflow-hidden shadow-2xl"
            >
              <div className="h-full flex flex-col">
                {/* Modal Header */}
                <div className="p-6 md:p-12 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                     <span className="text-white/20 font-black text-xl md:text-2xl italic">ARCHIVE // 2024</span>
                     <div className="hidden md:block w-px h-8 bg-white/10" />
                     <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">{selectedBrand.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedBrand(null)}
                    className="absolute top-6 right-6 md:static w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-20">
                  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                    
                    {/* Column 1: Identity & Description */}
                    <div className="space-y-12">
                      <div className="group relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                        <img 
                          src={selectedBrand.image} 
                          alt={selectedBrand.name} 
                          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-bg-surface to-transparent opacity-60" />
                      </div>
                      
                      <div className="space-y-6">
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.6em]">Manufacturer Intent</span>
                        <p className="text-3xl text-white font-light leading-snug italic">
                          "{selectedBrand.description}"
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Technical Specification */}
                    <div className="flex flex-col justify-center gap-8">
                       <div className="grid grid-cols-1 gap-4">
                          {[
                            { label: "Origin Network", value: selectedBrand.origin, icon: Globe },
                            { label: "Establishment", value: `EST. ${selectedBrand.est}`, icon: Calendar },
                            { label: "Archive Reference", value: selectedBrand.ref, icon: Database },
                          ].map((item, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-8 flex items-center justify-between hover:bg-white/10 hover:border-white/20 transition-all group">
                               <div className="flex items-center gap-6">
                                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                     <item.icon size={20} />
                                  </div>
                                  <div>
                                     <span className="block text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">{item.label}</span>
                                     <span className="block text-xl text-white font-bold uppercase tracking-widest">{item.value}</span>
                                  </div>
                               </div>
                               <ArrowRight size={20} className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all" />
                            </div>
                          ))}
                       </div>

                       <div className="pt-12 mt-12 border-t border-white/5">
                          <button className="w-full py-8 bg-white text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-4">
                             View Inventory Collection <ArrowRight size={20} />
                          </button>
                       </div>
                    </div>

                  </div>
                </div>

                {/* Modal Footer Decorative */}
                <div className="p-8 border-t border-white/5 flex items-center justify-center gap-8 opacity-20">
                   <div className="w-24 h-px bg-white" />
                   <span className="text-[8px] font-black uppercase tracking-[1em] whitespace-nowrap">Technical Data Verified</span>
                   <div className="w-24 h-px bg-white" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </section>
  );
}
