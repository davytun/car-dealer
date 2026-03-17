"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHAPTERS = [
  {
    id: "process",
    title: "Quick Process",
    heading: "Streamlined experience.",
    description: "Our platform ensures a seamless transition from search to purchase, valuing your time as much as your choice in mobility.",
    image: "/images/luxury/porsche_911_rimlit.png",
    tag: "Efficiency"
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    heading: "Honest, upfront value.",
    description: "We provide clear, upfront pricing without hidden fees, ensuring total transparency in every high-end transaction.",
    image: "/images/luxury/lambo_revuelto.png",
    tag: "Integrity"
  },
  {
    id: "guidance",
    title: "Expert Guidance",
    heading: "Personalized advice.",
    description: "Receive insights from our automotive specialists to simplify your purchase and ensure you're driving away with confidence.",
    image: "/images/luxury/ferrari_sf90_moody.png",
    tag: "Expertise"
  }
];

const EXECUTIVE_TEAM = [
  { name: "John Adeola", role: "President & CEO", image: "/images/pages/sale-agent-1.jpg" },
  { name: "Kevin Peace", role: "Chief Operating Officer", image: "/images/pages/sale-agent-2.jpg" },
  { name: "Adeleke Adebayo", role: "Chief Revenue Officer", image: "/images/pages/sale-agent-3.jpg" },
  { name: "Kristin Johnson", role: "Chief Financial Officer", image: "/images/pages/sale-agent-4.jpg" }
];

export function ModernNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const count = CHAPTERS.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${count * 60}%`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      }
    });

    const images = gsap.utils.toArray<HTMLElement>(".image-slide");
    const texts = gsap.utils.toArray<HTMLElement>(".text-slide");
    const navItems = gsap.utils.toArray<HTMLElement>(".nav-item");

    // Initialize states
    gsap.set(images[0], { autoAlpha: 1, scale: 1 });
    gsap.set(texts[0], { autoAlpha: 1, y: 0 });
    gsap.set(navItems[0], { color: "#ffffff", x: 10, opacity: 1 });
    
    for (let i = 1; i < count; i++) {
        gsap.set(images[i], { autoAlpha: 0, scale: 1.05 });
        gsap.set(texts[i], { autoAlpha: 0, y: 30 });
        gsap.set(navItems[i], { color: "rgba(255,255,255,0.3)", x: 0, opacity: 0.6 });
    }

    const dotSpacing = 64; // Distance between items in pixels (h-16 = 64px)

    for(let i = 0; i < count; i++) {
        const nextIndex = i + 1;
        
        // Pause at current slide
        tl.to({}, { duration: 0.8 });

        if (nextIndex < count) {
            const label = `transition${i}`;
            
            tl.addLabel(label)
              // Fade OUT current
              .to(navItems[i], { color: "rgba(255,255,255,0.3)", opacity: 0.6, x: 0, duration: 1, ease: "power2.inOut" }, label)
              .to(images[i], { autoAlpha: 0, scale: 0.95, duration: 1, ease: "power2.inOut" }, label)
              .to(texts[i], { autoAlpha: 0, y: -30, duration: 1, ease: "power2.inOut" }, label)
              
              // Fade IN next
              .to(navItems[nextIndex], { color: "#ffffff", opacity: 1, x: 10, duration: 1, ease: "power2.inOut" }, label)
              .to(images[nextIndex], { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.inOut" }, label)
              .to(texts[nextIndex], { autoAlpha: 1, y: 0, duration: 1, ease: "power2.inOut" }, label)
              
              // Move dot
              .to(dotRef.current, { y: nextIndex * dotSpacing, duration: 1, ease: "power2.inOut" }, label);
        }
    }
  }, { scope: sectionRef });

  return (
    <section className="bg-[#020202] w-full relative z-10 border-t border-white/5">
      
      {/* ── INTRO HEADER ── */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-black">Corporate Identity</span>
          </div>
          <h2 className="text-3xl md:text-6xl text-white font-black uppercase tracking-tighter leading-none">
            Luxury, <br />
            <span className="italic text-white/40 font-light">Transparency,</span><br />
            and Expertise.
          </h2>
        </div>
        <p className="max-w-sm text-[11px] text-white/60 md:text-white/40 leading-loose uppercase tracking-[0.3em] font-bold border-l border-white/10 pl-8 mx-auto md:mx-0">
          Ignite Luxury is redefining the automotive marketplace for discerning buyers. Our platform combines a curated inventory with expert guidance.
        </p>
      </div>

      {/* ── MOBILE LIST (Simple Cards) ── */}
      <div className="md:hidden px-8 py-20 pb-32 flex flex-col gap-24">
        {CHAPTERS.map((chapter, idx) => (
          <div key={chapter.id} className="flex flex-col gap-8">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5 bg-[#111] shadow-2xl">
              <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover grayscale opacity-80" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{chapter.title}</h3>
              </div>
            </div>

            <div className="flex flex-col gap-8 items-start">
              <p className="text-white/60 text-[10px] leading-loose font-medium uppercase tracking-[0.2em]">
                {chapter.description}
              </p>
              <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-black uppercase tracking-widest text-[9px] transition-colors hover:bg-white/10">
                {chapter.tag}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── PINNED SCROLL (Desktop Only) ── */}
      <div ref={sectionRef} className="hidden md:flex h-screen w-full relative flex-col justify-center overflow-hidden">
        
        {/* Cinematic atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between h-[85vh] md:h-[60vh] relative z-10 gap-8">
          
          {/* LEFT: Nav List (Desktop labels or Mobile Counter) */}
          <div className="w-full md:w-[25%] flex flex-col items-center md:items-start justify-center relative md:pl-8">
            
            {/* Nav Track Line (hidden on mobile) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-[200px] md:h-[300px] bg-white/10 hidden md:block" />
            
            <div className="relative h-12 md:h-[192px] w-full flex flex-col items-center md:items-start justify-center">
                {/* Nav Dot (hidden on mobile) */}
                <div 
                  ref={dotRef} 
                  className="absolute left-[-4px] top-[28px] w-2 h-2 bg-white rounded-full hidden md:block shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                />

                <div className="flex flex-col md:flex-col items-center md:items-start gap-4 md:gap-0">
                  {CHAPTERS.map((chapter) => (
                    <div key={chapter.id} className="nav-item md:h-16 flex items-center md:pl-8 whitespace-nowrap">
                        {/* Desktop Label (Hidden on mobile) */}
                        <span className="hidden md:block text-xl font-black uppercase tracking-tighter">{chapter.title}</span>
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* CENTER: Image */}
          <div className="w-full md:w-[45%] h-[40vh] md:h-full relative rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-[#111]">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.id} className="image-slide absolute inset-0 w-full h-full opacity-0">
                <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>

          {/* RIGHT: Text & Button */}
          <div className="w-full md:w-[25%] h-40 md:h-full relative flex flex-col items-center md:items-start justify-center">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.id} className="text-slide absolute inset-0 flex flex-col justify-center items-center md:items-start text-center md:text-left opacity-0 pointer-events-none pr-0 md:pr-4">
                <p className="text-white text-[10px] md:text-sm leading-relaxed font-light mb-4 md:mb-8 max-w-[300px] md:max-w-none">
                  {chapter.description}
                </p>
                <div className="pointer-events-auto">
                    <button className="px-6 py-2.5 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[8px] md:text-[9px] transition-colors hover:bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    {chapter.tag}
                    </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── EXECUTIVE TEAM ── */}
      <div className="border-t border-white/5 relative z-10 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
            <div className="max-w-xs">
                 <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-black mb-4 block">Executive</span>
                 <p className="text-white/40 text-[10px] font-medium leading-relaxed uppercase tracking-widest">Guided by industry veterans committed to transforming the high-end automotive acquisition experience.</p>
            </div>
            
            <div className="flex-1 w-full grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {EXECUTIVE_TEAM.map((member) => (
                <div key={member.name} className="flex flex-col group">
                  <div className="relative aspect-4/5 w-full rounded-3xl overflow-hidden mb-6 bg-[#111] border border-white/5">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                  </div>
                  <span className="text-xs md:text-sm font-black text-white uppercase tracking-tight mb-1">{member.name}</span>
                  <span className="text-[8px] md:text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
