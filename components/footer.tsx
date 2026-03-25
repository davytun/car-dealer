"use client"

import Link from "next/link"
import { MoveRight, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-base px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-32 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-6 block font-serif text-3xl tracking-tighter text-white italic"
            >
              IGNITE
            </Link>
            <p className="body-md mb-8 max-w-sm text-text-secondary">
              Ignite Luxury is redefining the automotive marketplace for
              discerning buyers. Our platform combines a curated inventory with
              expert guidance.
            </p>
            <div className="space-y-4">
              <div className="body-md flex items-start gap-4 text-text-secondary">
                <Phone size={18} className="text-gold-vivid mt-1 shrink-0" />
                <span>+234 707 719 5098</span>
              </div>
              <div className="body-md flex items-start gap-4 text-text-secondary">
                <MapPin size={18} className="text-gold-vivid mt-1 shrink-0" />
                <span>
                  Abeokuta, Ogun State,
                  <br /> Nigeria
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className="mono-md text-gold-vivid mb-8 block">
              Quick Links
            </span>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "#about" },
                { label: "Inventory & Listings", href: "#listing" },
                { label: "Financing & Tools", href: "#financing" },
                { label: "Blog & Insights", href: "#blog" },
                { label: "Contact Us", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="body-md hover:text-gold-vivid text-text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="mono-md text-gold-vivid mb-8 block">
              Opening Hours
            </span>
            <ul className="body-md space-y-4 text-text-secondary">
              <li>Monday-Friday</li>
              <li className="text-white">8:00 AM - 8:00 PM</li>
              <li className="pt-4">Saturday & Sunday</li>
              <li className="text-white/40">Closed</li>
            </ul>
          </div>

          <div>
            <span className="mono-md text-gold-vivid mb-8 block">
              Newsletter
            </span>
            <p className="body-md mb-6 text-text-secondary">
              Get the latest car deals, tips & updates straight to your inbox.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="focus:border-gold-vivid/50 w-full rounded-full border border-white/10 bg-bg-surface py-4 pr-16 pl-6 text-sm text-white transition-colors focus:outline-hidden"
                required
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gold-vivid absolute top-1 right-1 bottom-1 h-auto rounded-full text-bg-base transition-colors hover:bg-white"
              >
                <MoveRight size={18} />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <span className="mono-md text-[10px] text-white/40">
            © 2026 Built with 💚 by Altair Attic.
          </span>
          <div className="flex gap-8">
            {["Instagram", "Facebook", "LinkedIn", "YouTube"].map((tag) => (
              <Link
                href="#"
                key={tag}
                className="mono-md hover:text-gold-vivid text-[9px] tracking-widest text-white/30 uppercase transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
