"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Youtube, ArrowUpRight } from "lucide-react"
import { ContactForm } from "@/components/contact/contact-form"
import Link from "next/link"

export default function ContactPage() {
  return (
    <SmoothScroll>
      <Header />
      <main className="bg-bg-base min-h-screen text-white">
        
        {/* ── HERO SECTION ────────────────────────────────────────────────── */}
        <section className="relative px-6 pt-32 pb-16 text-center md:pt-48 md:pb-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                Talk To Us Directly
              </h1>
              <p className="mx-auto max-w-2xl text-base text-text-secondary md:text-lg">
                Whether you want to ask about a price or book a test drive, we are ready to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CONTACT INFORMATION ─────────────────────────────────────────── */}
        <section className="px-6 py-12 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
              
              {/* Left Column: Core Details */}
              <div className="space-y-12 md:space-y-16">
                <div>
                  <h2 className="mb-8 text-xs font-bold tracking-[0.3em] text-white/40 uppercase md:mb-10">Location & Details</h2>
                  <div className="space-y-10 md:space-y-12">
                    {/* Address */}
                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/40">
                        <MapPin size={20} />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">Business Address</span>
                        <p className="text-sm leading-relaxed text-white/80 md:text-base">
                          3rd floor, Opposite Cathedral of St. Peter Ang. Sec. Sch, <br className="hidden md:block" />
                          Along Oba Ademola Maternity Hospital, Ake, Abeokuta.
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/40">
                        <Phone size={20} />
                      </div>
                      <div className="space-y-6 md:space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">Telephone</span>
                          <a href="tel:+2347077195098" className="block text-xl font-serif italic text-white hover:text-white/60 transition-colors md:text-2xl">+234 707 719 5098</a>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">Email</span>
                          <a href="mailto:hello@altair-attic.com" className="block text-lg text-white/80 hover:text-white/40 transition-colors md:text-xl">hello@altair-attic.com</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Availability & Network */}
              <div className="space-y-12 md:space-y-16">
                <div>
                  <h2 className="mb-8 text-xs font-bold tracking-[0.3em] text-white/40 uppercase md:mb-10">Availability</h2>
                  <div className="rounded-2xl border border-white/5 bg-white/2 p-6 md:p-8">
                    <div className="flex items-start gap-4 md:items-center md:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/40">
                        <Clock size={20} />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between border-b border-white/5 pb-4">
                          <span className="text-xs text-white/60 md:text-sm">Week-Day</span>
                          <span className="text-xs font-bold text-white md:text-sm">8:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-xs text-white/60 md:text-sm">Sunday</span>
                          <span className="text-xs font-bold text-white/40 md:text-sm">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-6 text-xs font-bold tracking-[0.3em] text-white/40 uppercase md:mb-8">Social Media</h2>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {[
                      { name: "Instagram", icon: Instagram },
                      { name: "Facebook", icon: Facebook },
                      { name: "LinkedIn", icon: Linkedin },
                      { name: "YouTube", icon: Youtube },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold tracking-widest text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white md:gap-3 md:px-6 md:py-3 md:text-xs"
                      >
                        <social.icon size={12} className="md:size-[14px]" />
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CONTACT FORM SECTION ────────────────────────────────────────── */}
        <section className="px-6 py-12 md:py-24 border-t border-white/5">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mb-4">Tell Us What You Need</h2>
               <p className="text-text-secondary">Send us a message and we will call or WhatsApp you shortly.</p>
            </div>

            <ContactForm />
          </div>
        </section>

        {/* ── MAP SECTION ──────────────────────────────────────────────────── */}
        <section className="px-6 py-12 pb-24 md:py-20 md:pb-40">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl md:rounded-3xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.4022429527813!2d3.3502442!3d7.1625584999999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2f066d9045503e87%3A0x47e6d38a503aa08e!2sAltair%20Attic%20Limited!5e1!3m2!1sen!2sng!4v1774452814817!5m2!1sen!2sng"
                width="100%"
                height="450"
                style={{ border: 0, filter: 'grayscale(1) contrast(1.1) brightness(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ignite Luxury Location"
                className="h-[300px] md:h-[450px]"
              />
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-8 text-center md:mt-12 md:flex-row md:pt-12 md:text-left">
               <div className="space-y-2">
                  <h3 className="text-lg font-serif italic text-white md:text-xl">Interested in visiting our showroom?</h3>
                  <p className="text-sm text-text-secondary md:text-base">Walk-ins are welcome during business hours.</p>
               </div>
               <Link
              href="/listing"
              className="group flex items-center gap-3 text-[10px] font-black tracking-[0.2em] text-white/40 uppercase transition-colors hover:text-white"
            >
              BROWSE COLLECTION
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </div>
            </Link>
            </div>
          </div>
        </section>

      </main>
    </SmoothScroll>
  )
}
