"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientsReviews } from "@/components/clients-reviews"
import { BrandsSection } from "@/components/brands-section"
import { SmoothScroll } from "@/components/smooth-scroll"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { ArrowRight, MoveUpRight } from "lucide-react"
import Image from "next/image"

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1]

const TEAM = [
  {
    name: "John Adeola",
    role: "President & CEO",
    image: "/images/pages/sale-agent-1.jpg",
  },
  {
    name: "Kevin Peace",
    role: "Chief Operating Officer",
    image: "/images/pages/sale-agent-2.jpg",
  },
  {
    name: "Adeleke Adebayo",
    role: "Chief Revenue Officer",
    image: "/images/pages/sale-agent-3.jpg",
  },
  {
    name: "Kristin Johnson",
    role: "Chief Financial Officer",
    image: "/images/pages/sale-agent-4.jpg",
  },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <SmoothScroll>
      <Header />
      <main className="bg-bg-base transition-colors duration-1000">
        {/* ── SECTION 01: IDENTITY ────────────────────────────────────────── */}
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20 md:pt-32">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-white/5 blur-[80px] md:h-[500px] md:w-[500px] md:blur-[100px]" />
          </div>

          <div className="relative z-10 w-full px-6">
            <div className="mb-8 h-32 w-full sm:h-48 md:mb-12 md:h-64 lg:h-96">
              <TextHoverEffect text="IGNITE" duration={0.8} />
            </div>

            <div className="mx-auto max-w-5xl text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: EASE }}
                className="flex flex-col items-baseline justify-between gap-12 lg:flex-row"
              >
                <h1 className="display-md max-w-2xl text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] tracking-tighter text-white">
                  Redefining the <br />
                  <span className="text-white/20 italic">Archival</span>{" "}
                  Automotive <br />
                  Marketplace.
                </h1>

                <div className="max-w-xs border-l border-white/5 pl-8 text-left md:max-w-sm">
                  <p className="body-md text-[clamp(0.875rem,1.5vw,1.125rem)] leading-relaxed text-text-secondary">
                    Ignite Luxury provides the discerning collector with a
                    vetted, high-end experience, where transparency is the only
                    standard.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <div className="h-px w-px rounded-full bg-white p-[2px] shadow-[0_0_10px_2px_rgba(255,255,255,0.5)]" />
          </div>
        </section>

        {/* ── SECTION 02: THE DOSSIER ──────────────────────────────────────── */}
        <section className="relative w-full border-t border-white/5 py-24 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
              {/* Left: Cinematic Key Visual */}
              <div className="relative lg:col-span-7">
                <div className="group relative aspect-16/10 overflow-hidden rounded-2xl border border-white/5 bg-white/2 shadow-2xl">
                  <Image
                    src="/images/luxury/porsche_911_rimlit.png"
                    alt="The Aesthetic"
                    fill
                    className="object-cover brightness-75 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg-base via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                    <span className="font-serif text-lg tracking-widest text-white italic md:text-xl">
                      The Ignite Experience
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-12 text-left sm:grid-cols-2 md:mt-12 md:pr-24">
                  <div>
                    <h3 className="mb-4 text-xs font-bold tracking-widest text-white uppercase md:text-sm">
                      Quick Process
                    </h3>
                    <p className="text-[10px] leading-relaxed tracking-widest text-text-secondary uppercase md:text-xs">
                      Streamlined from search to purchase. Valuing time,
                      ensuring precision.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xs font-bold tracking-widest text-white uppercase md:text-sm">
                      Transparent Pricing
                    </h3>
                    <p className="text-[10px] leading-relaxed tracking-widest text-text-secondary uppercase md:text-xs">
                      Honest, upfront, and devoid of hidden agendas. Total
                      clarity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Technical Narrative */}
              <div className="flex flex-col gap-12 lg:sticky lg:top-32 lg:col-span-5 lg:gap-16">
                <div className="space-y-6 md:space-y-8">
                  <h2 className="display-sm text-[clamp(2rem,5vw,3.5rem)] text-white">
                    Expert <br />{" "}
                    <span className="text-white/20 italic">Guidance.</span>
                  </h2>
                  <p className="body-lg text-[clamp(1rem,1.2vw,1.25rem)] text-text-secondary">
                    Our platform combines a curated inventory with expert
                    guidance, ensuring a seamless experience. We operate at the
                    intersection of expertise and luxury.
                  </p>
                </div>

                <div className="space-y-6 border-t border-white/5 pt-10 md:pt-12">
                  <div className="group flex cursor-pointer items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase transition-colors group-hover:text-white md:text-xs">
                      Verified Dealers Across Nigeria
                    </span>
                    <MoveUpRight
                      size={14}
                      className="transform text-white/20 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                    />
                  </div>
                  <div className="group flex cursor-pointer items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase transition-colors group-hover:text-white md:text-xs">
                      Inventory Collective 2026
                    </span>
                    <MoveUpRight
                      size={14}
                      className="transform text-white/20 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-8 rounded-2xl border border-white/5 bg-white/2 p-6 transition-all hover:border-white/20 md:mt-8 md:gap-12 md:p-8">
                  <div className="text-left">
                    <span className="mb-2 block text-[7px] font-black tracking-widest text-white/30 uppercase md:text-[8px]">
                      Technical Questions?
                    </span>
                    <span className="font-serif text-lg tracking-widest text-white italic md:text-xl">
                      +234 707 719 5098
                    </span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all group-hover:bg-white group-hover:text-black md:h-12 md:w-12">
                    <ArrowRight size={18} strokeWidth={1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 03: LEADERSHIP ─────────────────────────────────────── */}
        <section className="border-t border-white/5 bg-bg-base py-24 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 flex flex-col items-start justify-between gap-8 md:mb-24 md:flex-row md:items-end">
              <div className="max-w-xl">
                <span className="mono-md mb-4 block text-xs text-white/40 md:text-sm">
                  Our Team
                </span>
                <h2 className="display-sm text-[clamp(2rem,5vw,3.5rem)] text-white">
                  Executive{" "}
                  <span className="text-white/20 italic">Leadership.</span>
                </h2>
              </div>
              <p className="max-w-xs border-l border-white/10 pl-6 text-[9px] leading-loose font-bold tracking-[0.2em] text-white/30 uppercase md:pl-8 md:text-[10px] md:tracking-[0.3em]">
                Guided by industry veterans committed to transforming the
                automotive acquisition experience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1, ease: EASE }}
                  className="group"
                >
                  <div className="relative mb-6 aspect-3/4 overflow-hidden rounded-3xl border border-white/5 bg-white/2 md:mb-8">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-bg-base/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <h4 className="mb-2 font-serif text-lg text-white italic md:text-xl">
                    {member.name}
                  </h4>
                  <span className="text-[8px] font-black tracking-[0.2em] text-white/20 uppercase transition-colors group-hover:text-white/60 md:text-[9px] md:tracking-[0.3em]">
                    {member.role}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <ClientsReviews />
        <BrandsSection />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
