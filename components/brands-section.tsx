"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Globe, Calendar, Database, ArrowRight } from "lucide-react"
import ShapeGrid from "@/components/ui/shape-grid"

type Brand = {
  id: string
  name: string
  est: string
  origin: string
  ref: string
  logo: string
  image: string
  description: string
}

const BRANDS: Brand[] = [
  {
    id: "01",
    name: "BMW",
    est: "1916",
    origin: "Munich",
    ref: "BM_01",
    logo: "/images/brand/brand-1.png",
    image: "/images/luxury/porsche_911_rimlit.png",
    description:
      "The ultimate driving machine, defined by precision engineering and a legacy of performance excellence.",
  },
  {
    id: "02",
    name: "Mercedes",
    est: "1926",
    origin: "Stuttgart",
    ref: "ME_02",
    logo: "/images/brand/brand-2.png",
    image: "/images/luxury/merc_amg_one.png",
    description:
      "The pinnacle of luxury and innovation, setting the global standard for automotive elegance.",
  },
  {
    id: "03",
    name: "Audi",
    est: "1909",
    origin: "Ingolstadt",
    ref: "AU_03",
    logo: "/images/brand/brand-3.png",
    image: "/images/luxury/porsche_911_rimlit.png",
    description:
      "Vorsprung durch Technik. A relentless pursuit of progress through sophisticated technology.",
  },
  {
    id: "04",
    name: "Lexus",
    est: "1989",
    origin: "Nagoya",
    ref: "LE_04",
    logo: "/images/brand/brand-4.png",
    image: "/images/luxury/lambo_revuelto.png",
    description:
      "Experience Amazing. A masterclass in craftsmanship, reliability, and quiet refinement.",
  },
  {
    id: "05",
    name: "Toyota",
    est: "1937",
    origin: "Toyota City",
    ref: "TO_05",
    logo: "/images/brand/brand-5.png",
    image: "/images/luxury/ferrari_sf90_moody.png",
    description:
      "A global leader in mobility, pioneered by a philosophy of continuous improvement.",
  },
  {
    id: "06",
    name: "Tesla",
    est: "2003",
    origin: "Austin",
    ref: "TE_06",
    logo: "/images/brand/brand-6.png",
    image: "/images/luxury/merc_amg_one.png",
    description:
      "Accelerating the world's transition to sustainable energy through radical innovation.",
  },
]

export function BrandsSection() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-base py-24 md:py-48">
      {/* Background Shape Grid Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <ShapeGrid
          speed={0.4}
          squareSize={60}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.2)"
          hoverFillColor="rgba(255,255,255,0.1)"
          shape="circle"
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
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src={selectedBrand.image}
              alt=""
              fill
              className="scale-110 object-cover blur-[20px] grayscale"
            />
            <div className="absolute inset-0 bg-linear-to-b from-bg-base via-transparent to-bg-base" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:mb-32 md:flex-row md:gap-12">
          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
                Archive / Global Manufacturers
              </span>
            </div>
            <h2 className="text-3xl leading-tight font-black tracking-tight text-white uppercase md:text-5xl md:tracking-tighter">
              Luxury Vehicles, <br className="block md:hidden" />
              <span className="text-white/20 italic">Curated for You.</span>
            </h2>
          </div>
          <p className="max-w-xs border-l border-white/10 pl-8 text-[10px] leading-loose font-bold tracking-[0.3em] text-white/50 uppercase md:text-white/30">
            Explore top-tier vehicles from world-class manufacturers. From BMW
            to Mercedes-Benz, Audi to Toyota, Ignite Luxury brings premium
            automobiles to your fingertips.
          </p>
        </div>

        {/* Minimalist Showroom Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {BRANDS.map((brand) => (
            <motion.button
              key={brand.id}
              onClick={() => setSelectedBrand(brand)}
              whileHover={{
                y: -8,
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-4 shadow-2xl transition-all duration-500 md:h-48 md:p-6"
            >
              {/* Subtle radial glow behind logo */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="h-12 w-12 object-contain opacity-60 brightness-110 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 md:h-20 md:w-20"
              />

              <div className="absolute right-0 bottom-4 left-0 text-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <span className="text-[8px] font-black tracking-[0.2em] whitespace-nowrap text-white uppercase">
                  Explore Archive
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Expert Guidance Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:mt-24 md:flex-row md:items-start md:gap-12 md:p-12">
          <div className="max-w-xl text-center md:text-left">
            <span className="mb-4 block text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
              Expert Guidance
            </span>
            <p className="text-lg leading-relaxed font-light text-white md:text-xl">
              &ldquo;Receive insights from our automotive specialists to simplify your
              purchase.&rdquo;
            </p>
          </div>
          <button className="w-full rounded-full bg-white px-12 py-5 text-[10px] font-black tracking-[0.4em] text-black uppercase transition-all hover:bg-white/90 md:w-auto">
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
              className="fixed inset-0 z-100 cursor-zoom-out bg-black/80 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed right-0 bottom-0 left-0 z-101 h-[85vh] overflow-hidden rounded-t-[4rem] border-t border-white/10 bg-bg-surface shadow-2xl"
            >
              <div className="flex h-full flex-col">
                {/* Modal Header */}
                <div className="flex flex-col items-start justify-between gap-8 border-b border-white/5 p-6 md:flex-row md:items-center md:p-12">
                  <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
                    <span className="text-xl font-black text-white/20 italic md:text-2xl">
                      ARCHIVE // 2024
                    </span>
                    <div className="hidden h-8 w-px bg-white/10 md:block" />
                    <h3 className="text-3xl leading-none font-black tracking-tighter text-white uppercase md:text-6xl">
                      {selectedBrand.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white/10 md:static md:h-16 md:w-16"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-20">
                  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-20 md:grid-cols-2">
                    {/* Column 1: Identity & Description */}
                    <div className="space-y-12">
                      <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10">
                        <Image
                          src={selectedBrand.image}
                          alt={selectedBrand.name}
                          fill
                          className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-bg-surface to-transparent opacity-60" />
                      </div>

                      <div className="space-y-6">
                        <span className="text-[10px] font-bold tracking-[0.6em] text-white/40 uppercase">
                          Manufacturer Intent
                        </span>
                        <p className="text-3xl leading-snug font-light text-white italic">
                          "{selectedBrand.description}"
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Technical Specification */}
                    <div className="flex flex-col justify-center gap-8">
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          {
                            label: "Origin Network",
                            value: selectedBrand.origin,
                            icon: Globe,
                          },
                          {
                            label: "Establishment",
                            value: `EST. ${selectedBrand.est}`,
                            icon: Calendar,
                          },
                          {
                            label: "Archive Reference",
                            value: selectedBrand.ref,
                            icon: Database,
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-8 transition-all hover:border-white/20 hover:bg-white/10"
                          >
                            <div className="flex items-center gap-6">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-colors group-hover:text-white">
                                <item.icon size={20} />
                              </div>
                              <div>
                                <span className="mb-1 block text-[8px] font-black tracking-widest text-white/20 uppercase">
                                  {item.label}
                                </span>
                                <span className="block text-xl font-bold tracking-widest text-white uppercase">
                                  {item.value}
                                </span>
                              </div>
                            </div>
                            <ArrowRight
                              size={20}
                              className="text-white/20 transition-all group-hover:translate-x-2 group-hover:text-white"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 border-t border-white/5 pt-12">
                        <button className="flex w-full items-center justify-center gap-4 rounded-2xl bg-white py-8 font-black tracking-[0.4em] text-black uppercase transition-all hover:bg-white/90">
                          View Inventory Collection <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Decorative */}
                <div className="flex items-center justify-center gap-8 border-t border-white/5 p-8 opacity-20">
                  <div className="h-px w-24 bg-white" />
                  <span className="text-[8px] font-black tracking-[1em] whitespace-nowrap uppercase">
                    Technical Data Verified
                  </span>
                  <div className="h-px w-24 bg-white" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
