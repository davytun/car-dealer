"use client";

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroAnimation } from "@/components/hero-animation"
import { BrandsSection } from "@/components/brands-section"
import { LuxuryFeaturedVehicles } from "@/components/luxury-featured-vehicles"
import { Footer } from "@/components/footer"
import { ClientsReviews } from "@/components/clients-reviews"
import { ModernNarrative } from "@/components/modern-narrative"
import { ArrowRight } from "lucide-react"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { MagneticButton } from "@/components/magnetic-button"

function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-10">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-slate-400 opacity-20 blur-[80px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.03, 0.07, 0.03],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-slate-800 blur-[100px]"
      />
    </div>
  )
}

function ScanningLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.06]">
      <div 
        className="w-full h-full" 
        style={{ 
          background: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 41px)",
          animation: "scan 20s linear infinite"
        }} 
      />
      <style jsx global>{`
        @keyframes scan {
          from { transform: translateY(0); }
          to { transform: translateY(40px); }
        }
      `}</style>
    </div>
  )
}

export default function Page() {
  return (
    <main className="w-full relative">
      <AmbientBackground />
      <HeroAnimation />
      
      <div className="relative z-10 flex flex-col gap-0 shadow-[0_-50px_100px_rgba(0,0,0,0.8)] bg-[#020202]">
        <LuxuryFeaturedVehicles />
        <ClientsReviews />
        <BrandsSection />
        <ModernNarrative />
      </div>

      <Footer />
    </main>
  )
}
