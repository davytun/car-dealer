"use client"

import { motion } from "framer-motion"
import { HeroAnimation } from "@/components/hero-animation"
import { BrandsSection } from "@/components/brands-section"
import { LuxuryFeaturedVehicles } from "@/components/luxury-featured-vehicles"
import { ClientsReviews } from "@/components/clients-reviews"
import { ModernNarrative } from "@/components/modern-narrative"

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-10 mix-blend-screen">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-slate-400 opacity-20 blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.03, 0.07, 0.03],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-slate-800 blur-[100px]"
      />
    </div>
  )
}


export default function Page() {
  return (
    <main className="relative w-full">
      <AmbientBackground />
      <HeroAnimation />

      <div className="relative z-10 flex flex-col gap-0 bg-[#020202] shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
        <LuxuryFeaturedVehicles />
        <ClientsReviews />
        <BrandsSection />
        <ModernNarrative />
      </div>
    </main>
  )
}
