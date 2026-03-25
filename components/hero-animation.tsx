"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import LightRays from "@/components/ui/light-rays"

// ── MAIN HERO COMPONENT ──────────────────────────────────────────

export function HeroAnimation() {
  const router = useRouter()

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-base pt-24 pb-12">
      {/* ── BACKGROUND LAYER ───────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero2.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlay (Subtle) */}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
        {/* Light Rays Effect */}
        <div className="absolute inset-0 z-10">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.2}
            lightSpread={1.0}
            rayLength={3.0}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.03}
            distortion={0.15}
            pulsating={true}
            saturation={1.2}
          />
        </div>
      </div>

      {/* ── CONTENT AREA ───────────────────────────────────────────── */}
      <div className="relative z-20 flex w-full max-w-7xl flex-col items-center px-6 md:px-12">
        {/* Editorial Heading */}
        <div className="mb-16 space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="mb-6 text-[10px] font-black tracking-[1em] text-white/30 uppercase">
              Ignite Luxury Collection 2026
            </span>
            <h1 className="flex flex-col items-center text-[10vw] leading-[0.9] font-extralight tracking-tight text-white uppercase md:text-[6vw]">
              Find Your Dream
              <span className="font-black tracking-normal text-white italic md:tracking-tighter">
                Luxury Vehicle Today
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-[11px] leading-loose font-bold tracking-[0.3em] text-white/40 uppercase md:text-xs"
          >
            Discover exclusive new and pre-owned vehicles with ease,{" "}
            <br className="hidden md:block" /> transparency, and expert
            guidance.
          </motion.p>
        </div>

        {/* ── SIMPLE CTA INSTEAD OF SEARCH ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex w-full justify-center"
        >
          <button
            onClick={() => {
              // Scroll to the features section or go to listing
              router.push("/listing")
            }}
            className="group flex h-16 items-center justify-center gap-4 rounded-full bg-white px-12 text-xs font-black tracking-[0.3em] text-black uppercase shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:bg-[#F0F0F0] active:scale-95"
          >
            Explore Inventory
            <ArrowRight
              size={16}
              strokeWidth={3}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-2%, -2%);
          }
          20% {
            transform: translate(-5%, 3%);
          }
          30% {
            transform: translate(3%, -5%);
          }
          40% {
            transform: translate(-3%, 7%);
          }
          50% {
            transform: translate(-5%, 3%);
          }
          60% {
            transform: translate(7%, 0);
          }
          70% {
            transform: translate(0, 5%);
          }
          80% {
            transform: translate(-7%, 0);
          }
          90% {
            transform: translate(5%, 3%);
          }
        }
        .animate-grain {
          background-image: url("https://grainy-gradients.vercel.app/noise.svg");
          background-repeat: repeat;
          animation: grain 15s steps(15) infinite;
        }
      `}</style>
    </div>
  )
}
