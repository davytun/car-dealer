"use client";

import { ArrowRight, Zap, CarFront, Car, Shield, Gauge } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const carTypes = [
  { name: "Electric", icon: Zap, count: "12 Cars" },
  { name: "Sedan", icon: CarFront, count: "24 Cars" },
  { name: "SUV", icon: Shield, count: "18 Cars" },
  { name: "Coupe", icon: Gauge, count: "8 Cars" },
  { name: "Wagon", icon: Car, count: "4 Cars" },
];

export function BrowseByType() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header reveal
    gsap.from(".browse-header-reveal", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    // Cards reveal
    gsap.from(".type-card", {
      scale: 0.9,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // Tilt Effect
    const cards = containerRef.current.querySelectorAll(".type-card-inner");
    cards.forEach((card: any) => {
      card.addEventListener("mousemove", (e: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-10 bg-bg-base py-32 px-6 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 browse-header-reveal">
          <div>
            <span className="mono-md text-white/50 block mb-4 uppercase tracking-[0.3em] text-[10px]">Categories</span>
            <h2 className="display-md text-white uppercase tracking-tighter">Browse By Type</h2>
          </div>
          <Button variant="link" className="text-white/40 hover:text-white p-0 flex items-center gap-2 group text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">
            Check All Car Type <ArrowRight size={14} strokeWidth={1} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {carTypes.map((type, index) => (
            <div key={type.name} className="type-card" style={{ perspective: "1000px" }}>
              <Link href={`#${type.name.toLowerCase()}`} className="block group">
                <div className="type-card-inner bg-bg-surface/30 backdrop-blur-md border-[0.5px] border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 group-hover:bg-white/5 group-hover:border-white/20 transition-all duration-500 overflow-hidden relative" style={{ transformStyle: "preserve-3d" }}>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700 shadow-none group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] relative z-10" style={{ transform: "translateZ(40px)" }}>
                    <type.icon size={32} strokeWidth={1} />
                  </div>
                  <div className="text-center relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="text-white/80 font-medium mb-1 group-hover:text-white transition-colors duration-300 tracking-wide">{type.name}</h3>
                    <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">{type.count}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
