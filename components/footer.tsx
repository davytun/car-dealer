"use client"

import Link from "next/link"
import { ArrowUp, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Cars", href: "/listing" },
  { label: "Car Tips", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "WhatsApp Us", href: "https://wa.me/2347077195098?text=Hi, I saw your cars online and I'd love to find something within my budget. Can you help me?" },
]

const SOCIALS = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "X / Twitter", href: "#", icon: Twitter },
  { label: "YouTube", href: "#", icon: Youtube },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-bg-base border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* ── TOP SECTION: BRAND & NEWSLETTER ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="mb-8 block font-serif text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-white uppercase italic leading-none"
            >
              IGNITE
            </Link>
            <p className="text-[14px] leading-loose text-text-secondary max-w-md mb-12 uppercase tracking-widest font-bold opacity-60">
              Find a car you can count on. No stress, no hidden charges. 
              We help you drive with peace of mind.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-white/5 bg-white/2 group-hover:bg-white group-hover:text-black transition-all">
                  <Phone size={14} strokeWidth={1.5} />
                </div>
                <span className="mono-md text-[11px] text-white/40 group-hover:text-white transition-colors">+234 707 719 5098</span>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="h-10 w-10 flex items-center justify-center rounded-full border border-white/5 bg-white/2 group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin size={14} strokeWidth={1.5} />
                </div>
                <span className="mono-md text-[11px] text-white/40 group-hover:text-white transition-colors leading-relaxed uppercase">
                  Altair Attic Limited, Abeokuta, Nigeria
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-12">
            <div>
               <span className="mono-md text-white/10 mb-8 block font-black tracking-[0.4em] uppercase text-[9px]">Quick Links</span>
               <ul className="space-y-4">
                 {NAV_LINKS.map((link) => (
                   <li key={link.label}>
                     <Link
                       href={link.href}
                       className="text-xs font-bold tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase"
                     >
                       {link.label}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <span className="mono-md text-white/10 mb-8 block font-black tracking-[0.4em] uppercase text-[9px]">Get Notified</span>
            <p className="text-[11px] text-text-secondary mb-8 leading-loose uppercase tracking-widest">
              Send us your email and we will tell you whenever we get a new car on our lot.
            </p>
            
            <form className="group relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                className="w-full bg-white/2 border border-white/5 rounded-full py-5 px-8 text-[9px] text-white tracking-[0.3em] font-black focus:border-white/20 focus:bg-white/5 focus:outline-hidden transition-all placeholder:text-white/20"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-24 rounded-full bg-white text-black text-[9px] font-black tracking-widest uppercase hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* ── BOTTOM SECTION: SOCIAL & LEGAL ─────────────────────────────── */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Social Links */}
          <div className="flex items-center gap-12 order-2 md:order-1">
            {SOCIALS.map((soc) => (
              <Link 
                key={soc.label} 
                href={soc.href}
                className="text-white/20 hover:text-white transition-all transform hover:-translate-y-1"
                aria-label={soc.label}
              >
                <soc.icon size={18} strokeWidth={1.5} />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left order-3 md:order-2">
            <p className="mono-md text-[9px] text-white/20 uppercase tracking-[0.3em]">
              &copy; 2026 Ignite Cars. Built for you in Lagos.
            </p>
          </div>

          {/* Back to Top */}
          <div className="order-1 md:order-3">
             <MagneticButton 
               onClick={scrollToTop}
               className="h-14 w-14 rounded-full border border-white/5 bg-white/2 text-white/30 hover:text-black transition-all"
             >
                <ArrowUp size={20} strokeWidth={1.2} />
             </MagneticButton>
          </div>
        </div>

      </div>
    </footer>
  )
}
