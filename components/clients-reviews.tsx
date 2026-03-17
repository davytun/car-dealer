"use client";

import React, { useRef } from "react";
import { Star, Quote } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GridBackground from "@/components/ui/grid-background";

const REVIEWS = [
  {
    name: "Chinedu A.",
    location: "Lagos",
    role: "Entrepreneur",
    text: "Ignite Luxury made finding my dream SUV a smooth and worry-free experience. The detailed listings and expert guidance gave me full confidence in my purchase. Truly premium service in Nigeria!",
    bg: "/images/luxury/porsche_911_rimlit.png"
  },
  {
    name: "Funke O.",
    location: "Abuja",
    role: "Business Owner",
    text: "I never imagined buying a luxury car online could be this easy. The financing calculator and comparison tools helped me make the right choice without any stress. Highly recommend Ignite Luxury!",
    bg: "/images/luxury/merc_amg_one.png"
  },
  {
    name: "Tunde S.",
    location: "Port Harcourt",
    role: "Executive",
    text: "From start to finish, Ignite Luxury showed professionalism and transparency. I was able to compare multiple vehicles, get expert advice, and drive away in my new car within days.",
    bg: "/images/luxury/lambo_revuelto.png"
  },
  {
    name: "Aisha M.",
    location: "Lagos",
    role: "Fashion Entrepreneur",
    text: "Their curated inventory and verified dealers made me feel safe buying a high-end vehicle online. Ignite Luxury is setting a new standard for luxury car sales in Nigeria.",
    bg: "/images/luxury/ferrari_sf90_moody.png"
  },
  {
    name: "Emeka U.",
    location: "Abuja",
    role: "Investor",
    text: "Transparent pricing, quick process, and personal guidance – everything I needed as a busy professional. Ignite Luxury made purchasing my Mercedes a seamless experience.",
    bg: "/images/luxury/merc_amg_one.png"
  }
];

const STATS = [
  { label: "Luxury Vehicles", value: "18k+" },
  { label: "Daily Visitors", value: "8k+" },
  { label: "Dealer Reviews", value: "4.5k+" },
  { label: "Verified Dealers", value: "3.5k+" }
];

// Duplicate for seamless loop
const MARQUEE_ITEMS = [...REVIEWS, ...REVIEWS, ...REVIEWS];

export function ClientsReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    // GSAP Marquee Loop
    marqueeTween.current = gsap.to(trackRef.current, {
      xPercent: -33.333,
      ease: "none",
      duration: 45,
      repeat: -1,
    });

  }, { scope: containerRef });

  const handleMouseEnter = () => marqueeTween.current?.pause();
  const handleMouseLeave = () => marqueeTween.current?.play();

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-bg-base relative z-10 border-b border-white/5 overflow-hidden">
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <GridBackground 
          type="grid"
          gridColor="rgba(255, 255, 255, 0.05)"
          maskSize="ellipse 80% 80% at 50% 50%"
        />
        <Quote size={400} className="absolute -top-20 -left-20 text-white/1" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                <div className="w-12 h-px bg-white/20" />
                <span className="text-[10px] text-white/40 uppercase tracking-[0.6em] font-black">Testimonials / Archive</span>
              </div>
              <h2 className="text-3xl md:text-5xl text-white font-black uppercase tracking-tighter leading-tight italic mb-2">
                Modern <span className="text-white/40 md:text-white/20">Dialogues.</span>
              </h2>
              <span className="text-xl md:text-2xl font-light tracking-tight text-white/70 md:text-white/60">Client experiences</span>
            </div>
            <p className="max-w-xs text-[10px] text-white/70 md:text-white/30 uppercase tracking-[0.3em] leading-loose font-bold pb-2 border-l border-white/10 pl-8 mx-auto md:mx-0">
              Documenting the journey of discerning collectors who value precision and archival transparency.
            </p>
          </div>
        </div>

        {/* Marquee Container */}
        <div 
          className="relative flex overflow-hidden cursor-crosshair group/marquee"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={trackRef}
            className="flex gap-6 whitespace-nowrap"
          >
            {MARQUEE_ITEMS.map((review, i) => (
              <div
                key={i}
                className="w-[260px] md:w-[380px] shrink-0 aspect-4/3 relative bg-bg-surface border border-white/5 rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-1000 group/card hover:scale-[1.02] hover:border-white/20 shadow-2xl"
              >
                {/* Emotional Texture & Background */}
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-[0.15] transition-opacity duration-1000 pointer-events-none">
                  <img src={review.bg} alt="" className="w-full h-full object-cover grayscale blur-sm scale-110 group-hover/card:scale-100 transition-transform duration-2000" />
                </div>
                
                {/* Inner Glow overlays */}
                <div className="absolute inset-0 bg-linear-to-b from-white/3 to-transparent pointer-events-none" />
                <div className="absolute -inset-px bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05)_0%,transparent_50%)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />

                <div className="relative z-10 flex flex-col gap-6">
                   <div className="flex gap-1.5 text-white/10 group-hover/card:text-white/60 transition-colors duration-700">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={7} fill="currentColor" strokeWidth={0} />
                      ))}
                   </div>
                   <p className="text-lg md:text-xl text-white font-light leading-relaxed tracking-tight whitespace-normal line-clamp-4 italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 pt-8 border-t border-white/5 mt-auto transition-transform duration-700 group-hover/card:translate-x-2">
                   <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 font-serif text-lg group-hover/card:bg-white/10 group-hover/card:text-white transition-all duration-700 shrink-0">
                      {review.name.charAt(0)}
                   </div>
                   <div className="text-left overflow-hidden">
                      <h4 className="text-white font-bold text-xs tracking-[0.2em] uppercase transition-colors group-hover/card:text-white">{review.name}</h4>
                      <div className="flex items-center gap-2 opacity-20 group-hover/card:opacity-50 transition-opacity">
                        <span className="text-[7px] uppercase tracking-[0.3em] font-black">{review.role}</span>
                        <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
                        <span className="text-[7px] uppercase tracking-[0.3em] font-black">{review.location}</span>
                      </div>
                   </div>
                </div>
                
                {/* Decorative Bloom Overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[60px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
              </div>
            ))}
          </div>
        </div>

        {/* Linear Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-64 bg-linear-to-r from-bg-base via-bg-base/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-64 bg-linear-to-l from-bg-base via-bg-base/80 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Company Stats Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {STATS.map((stat, i) => (
          <div key={i} className="flex flex-col items-center p-6 md:p-8 bg-white/5 border border-white/5 rounded-2xl md:rounded-3xl group hover:border-white/20 transition-all">
            <span className="text-3xl md:text-5xl text-white font-black mb-1 md:mb-2">{stat.value}</span>
            <span className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.4em] font-black text-center">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Modern Scrolling Indicator */}
      <div className="max-w-7xl mx-auto px-6 mt-20 flex justify-center opacity-0 animate-in fade-in duration-1000 delay-500 fill-mode-forwards">
        <div className="flex items-center gap-4 opacity-10">
          <div className="w-16 h-px bg-white" />
          <span className="text-[7px] font-black uppercase tracking-[1.5em] whitespace-nowrap pl-4">Continuous Playback</span>
          <div className="w-16 h-px bg-white" />
        </div>
      </div>
    </section>
  );
}
