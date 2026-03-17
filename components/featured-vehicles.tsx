"use client";

import React, { useRef } from "react";
import { ArrowUpRight, Gauge, Calendar, Fuel, Settings2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const vehicles = [
  { name: "Audi A6 Avant E-Tron", image: "/card/card-1.jpg", price: "62,860,000", miles: "32,500", year: "2022", fuel: "EV", transmission: "Manual", tag: "Special" },
  { name: "2024 Hyundai Elantra", image: "/card/card-2.jpg", price: "59,920,000", miles: "89,300", year: "2018", fuel: "Benzin", transmission: "Auto", tag: "Great Price" },
  { name: "Kia EV9 2024", image: "/card/card-3.jpg", price: "63,700,000", miles: "76,400", year: "2020", fuel: "Diesel", transmission: "Auto", tag: "" },
  { name: "Chevrolet Camaro 2020", image: "/card/card-4.jpg", price: "49,700,000", miles: "45,800", year: "2023", fuel: "Benzin", transmission: "Auto", tag: "" },
  { name: "Audi R8", image: "/card/card-5.jpg", price: "63,700,000", miles: "97,200", year: "2022", fuel: "EV", transmission: "Manual", tag: "Special" },
  { name: "Genesis Electrified G80", image: "/card/card-6.jpg", price: "34,860,000", miles: "51,600", year: "2021", fuel: "Diesel", transmission: "Auto", tag: "Special" },
  { name: "2015 Ford Mustang EcoBoost", image: "/card/card-7.jpg", price: "62,860,000", miles: "84,500", year: "2022", fuel: "EV", transmission: "Manual", tag: "Special" },
  { name: "Mercedes-AMG C-Class", image: "/card/card-8.jpg", price: "34,300,000", miles: "84,500", year: "2022", fuel: "Benzin", transmission: "Auto", tag: "Great Price" },
];

export function FeaturedVehicles() {
  const containerRef = useRef<HTMLElement>(null);
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !slideWrapperRef.current) return;

    const sections = gsap.utils.toArray(".horizontal-item");
    
    // Calculate total scroll distance
    const totalWidth = slideWrapperRef.current.scrollWidth;
    const scrollDistance = totalWidth - window.innerWidth;

    const horizontalTween = gsap.to(slideWrapperRef.current, {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, // Smooth scrub
        end: () => `+=${scrollDistance}`, // The duration of the pin
      }
    });

    // Inner Image Parallax
    sections.forEach((section: any) => {
      const img = section.querySelector(".parallax-img");
      if (img) {
        gsap.to(img, {
          xPercent: 20, // Move the image 20% to the right
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: horizontalTween, // Link it to the horizontal scroll
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      }
    });

    // Header Fade-out Animation
    gsap.to(headerRef.current, {
      opacity: 0,
      x: -100,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "top -20%", // Fade out quickly
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-bg-base relative z-10 border-b border-white/5 overflow-hidden h-screen flex flex-col justify-center">
      <div ref={headerRef} className="absolute top-12 left-0 w-full max-w-7xl mx-auto px-6 z-20 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pointer-events-auto">
          <div>
            <span className="mono-md text-white/50 block mb-4 uppercase tracking-[0.3em] text-[10px]">
              Inventory
            </span>
            <h2 className="display-md text-white uppercase tracking-tighter">Featured Vehicles</h2>
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="outline" className="border-[0.5px] border-white/20 text-white/70 hover:bg-white hover:text-black hover:border-white rounded-full px-6 py-5 text-[10px] tracking-widest uppercase font-medium transition-all duration-300">New Cars</Button>
            <Button variant="outline" className="border-[0.5px] border-white/20 text-white/70 hover:bg-white hover:text-black hover:border-white rounded-full px-6 py-5 text-[10px] tracking-widest uppercase font-medium transition-all duration-300">Used Cars</Button>
            <Button variant="link" className="text-white/40 hover:text-white group px-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium">
              View All <ArrowUpRight size={14} strokeWidth={1} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div className="mt-56 md:mt-32 flex items-center h-[65vh]">
        <div ref={slideWrapperRef} className="flex gap-6 px-6 md:px-[10vw]">
          {vehicles.map((v, i) => (
            <div 
              key={`${v.name}-${i}`}
              className="horizontal-item w-[85vw] md:w-[400px] shrink-0 bg-bg-surface/30 backdrop-blur-md border-[0.5px] border-white/5 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-700 relative flex flex-col"
            >
              <div className="relative h-[300px] w-full overflow-hidden bg-white/2">
                {v.tag && (
                  <div className="absolute top-4 left-4 z-20 bg-white text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
                    {v.tag}
                  </div>
                )}
                
                {/* Image darkens on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-10 group-hover:opacity-60 transition-opacity duration-700 z-10" />
                
                {/* Parallax Image Wrapper - requires scale to prevent gaps when sliding */}
                <div className="absolute inset-0 w-full h-full scale-[1.25]">
                  <img 
                    src={v.image} 
                    alt={v.name} 
                    className="parallax-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>

                {/* Hidden Specs that reveal on hover */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-white/90 text-[10px] font-mono tracking-widest uppercase">
                    <div className="flex items-center gap-2">
                      <Gauge size={14} strokeWidth={1} className="text-white/60" />
                      <span>{v.miles} mi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} strokeWidth={1} className="text-white/60" />
                      <span>{v.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel size={14} strokeWidth={1} className="text-white/60" />
                      <span>{v.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings2 size={14} strokeWidth={1} className="text-white/60" />
                      <span>{v.transmission}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 relative z-30 bg-bg-surface/50 backdrop-blur-md flex-1 flex flex-col justify-between border-t-[0.5px] border-white/5">
                <div>
                  <h3 className="text-xl text-white/90 font-medium mb-1 group-hover:text-white transition-colors duration-500 line-clamp-1 tracking-wide">{v.name}</h3>
                  <div className="text-[10px] text-white/40 font-mono tracking-widest uppercase mb-4">Stock #X{Math.floor(Math.random() * 9000) + 1000}</div>
                </div>
                
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/10">
                  <div className="text-xl text-white font-bold tracking-tight">
                    <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase mr-2 align-middle">Price</span>
                    ${v.price}
                  </div>
                  <Button variant="ghost" size="icon" className="border-[0.5px] border-white/20 text-white hover:bg-white hover:text-black hover:border-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500 w-10 h-10">
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
