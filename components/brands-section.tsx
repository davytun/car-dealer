"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"

import ShapeGrid from "@/components/ui/shape-grid"
import { AdviceInquiryForm } from "@/components/advice-inquiry-form"

type Brand = {
  id: string
  name: string
  logo: string
}


const BRANDS: Brand[] = [
  {
    id: "01",
    name: "BMW",
    logo: "/images/brand/brand-1.png",
  },
  {
    id: "02",
    name: "Mercedes",
    logo: "/images/brand/brand-2.png",
  },
  {
    id: "03",
    name: "Audi",
    logo: "/images/brand/brand-3.png",
  },
  {
    id: "04",
    name: "Lexus",
    logo: "/images/brand/brand-4.png",
  },
  {
    id: "05",
    name: "Toyota",
    logo: "/images/brand/brand-5.png",
  },
  {
    id: "06",
    name: "Tesla",
    logo: "/images/brand/brand-6.png",
  },
]


export function BrandsSection() {

  const [showAdviceForm, setShowAdviceForm] = useState(false)

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-bg-base py-24 md:py-48">
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


      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:mb-32 md:flex-row md:gap-12">
          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
                WE SELL THESE BRANDS
              </span>
            </div>
            <h2 className="text-3xl leading-tight font-black tracking-tight text-white uppercase md:text-5xl md:tracking-tighter">
              Cars You Can Trust <br className="block md:hidden" />
              <span className="text-white/20 italic">From Brands You Know.</span>
            </h2>
          </div>
          <p className="max-w-xs border-l border-white/10 pl-8 text-[10px] leading-loose font-bold tracking-[0.3em] text-white/50 uppercase md:text-white/30">
            Whether you want a Toyota for your family or a Lexus for business, we have the right car for you at a fair price.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {BRANDS.map((brand) => (
            <motion.div
              key={brand.id}
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
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="h-12 w-12 object-contain opacity-60 brightness-110 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 md:h-20 md:w-20"
              />
            </motion.div>

          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:mt-24 md:p-12">
          <AnimatePresence mode="wait">
            {!showAdviceForm ? (
              <motion.div
                key="guidance-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start md:gap-12"
              >
                <div className="max-w-xl text-center md:text-left">
                  <span className="mb-4 block text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
                    Need Help Choosing?
                  </span>
                  <p className="text-lg leading-relaxed font-light text-white md:text-xl">
                    &ldquo;Not sure which car is best for Nigerian roads? Talk to us. We will help you pick a car that won't give you trouble.&rdquo;
                  </p>
                </div>
                <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                  <button 
                    onClick={() => setShowAdviceForm(true)}
                    className="w-full shrink-0 rounded-full border border-white/10 bg-white/5 px-12 py-5 text-[10px] font-black tracking-widest text-white uppercase transition-all hover:bg-white/10 md:w-auto"
                  >
                    Send Us A Message
                  </button>
                  <a 
                    href="https://wa.me/2347077195098?text=Hi, I saw your cars online and I'd love to find something within my budget. Can you help me?"
                    className="w-full shrink-0 rounded-full bg-white px-12 py-5 text-[10px] font-black items-center justify-center flex tracking-widest text-black uppercase transition-all hover:bg-white/90 md:w-auto"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="advice-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-4xl"
              >
                <div className="mb-12 flex items-center justify-between gap-8">
                  <div>
                    <span className="mb-4 block text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
                      Concierge Service
                    </span>
                    <h3 className="text-3xl font-black tracking-tighter text-white uppercase md:text-5xl">
                      Specialized Advice
                    </h3>
                  </div>
                  <button 
                    onClick={() => setShowAdviceForm(false)}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>
                <AdviceInquiryForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  )
}
