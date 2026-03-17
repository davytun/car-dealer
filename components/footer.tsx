"use client";

import Link from "next/link";
import { MoveRight, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-bg-base border-t border-white/5 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-3xl italic tracking-tighter text-white mb-6 block">
              IGNITE
            </Link>
            <p className="body-md text-text-secondary max-w-sm mb-8">
              Ignite Luxury is redefining the automotive marketplace for discerning buyers. Our platform combines a curated inventory with expert guidance.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-text-secondary body-md">
                 <Phone size={18} className="text-gold-vivid mt-1 shrink-0" />
                 <span>+234 707 719 5098</span>
              </div>
              <div className="flex items-start gap-4 text-text-secondary body-md">
                 <MapPin size={18} className="text-gold-vivid mt-1 shrink-0" />
                 <span>Abeokuta, Ogun State,<br/> Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <span className="mono-md text-gold-vivid block mb-8">Quick Links</span>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "#about" },
                { label: "Inventory & Listings", href: "#listing" },
                { label: "Financing & Tools", href: "#financing" },
                { label: "Blog & Insights", href: "#blog" },
                { label: "Contact Us", href: "#contact" },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="body-md text-text-secondary hover:text-gold-vivid transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="mono-md text-gold-vivid block mb-8">Opening Hours</span>
            <ul className="space-y-4 body-md text-text-secondary">
              <li>Monday-Friday</li>
              <li className="text-white">8:00 AM - 8:00 PM</li>
              <li className="pt-4">Saturday & Sunday</li>
              <li className="text-white/40">Closed</li>
            </ul>
          </div>
          
          <div>
            <span className="mono-md text-gold-vivid block mb-8">Newsletter</span>
            <p className="body-md text-text-secondary mb-6">
              Get the latest car deals, tips & updates straight to your inbox.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-bg-surface border border-white/10 rounded-full py-4 pl-6 pr-16 text-white text-sm focus:outline-hidden focus:border-gold-vivid/50 transition-colors"
                required
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-1 top-1 bottom-1 h-auto rounded-full bg-gold-vivid text-bg-base hover:bg-white transition-colors"
              >
                <MoveRight size={18} />
              </Button>
            </form>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="mono-md text-white/40 text-[10px]">
            © 2026 Built with 💚 by Altair Attic.
          </span>
          <div className="flex gap-8">
             {["Instagram", "Facebook", "LinkedIn", "YouTube"].map(tag => (
               <Link href="#" key={tag} className="mono-md text-white/30 hover:text-gold-vivid text-[9px] uppercase tracking-widest transition-colors">{tag}</Link>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
