"use client"

import React, { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import LightRays from "@/components/ui/light-rays"



export function HeroAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && videoRef.current) {
      const playVideo = () => {
        videoRef.current?.play().catch(error => {
          console.error("Autoplay was prevented:", error)
        })
      }
      playVideo()
    }
  }, [isMounted])

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-base pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        {isMounted && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={() => {
              videoRef.current?.play()
            }}
            onEnded={() => {
              videoRef.current?.play()
            }}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
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

      <div className="relative z-20 flex w-full max-w-7xl flex-col items-center px-6 md:px-12">
        <div className="mb-16 space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="mb-6 text-xs font-black tracking-[1em] text-white/95 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              RELIABLE CARS FOR EVERYDAY NIGERIANS
            </span>
            <h1 className="flex flex-col items-center text-[10vw] leading-[0.9] font-black tracking-tighter text-white uppercase md:text-[6vw]">
              Reliable Cars. 
              <span className="font-extralight tracking-tight text-white italic md:tracking-normal">
                No Long Stories.
              </span>
            </h1>
          </motion.div>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-2xl text-xs leading-loose font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)] md:text-sm"
          >
            Inspected. Fairly Priced. Road Ready. <br className="hidden md:block" /> 
            You Test Drive Before You Pay.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => {
              router.push("/listing")
            }}
            className="group flex h-16 w-full items-center justify-center gap-4 rounded-full bg-white px-12 text-xs font-black tracking-[0.3em] text-black uppercase shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:bg-[#F0F0F0] active:scale-95 sm:w-auto"
          >
            See Our Cars
            <ArrowRight
              size={16}
              strokeWidth={3}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <a
            href="https://wa.me/2347077195098?text=Hi, I saw your cars online and I'd love to find something within my budget. Can you help me?"
            className="group flex h-16 w-full items-center justify-center gap-4 rounded-full border border-white/20 bg-transparent px-12 text-xs font-black tracking-[0.3em] text-white uppercase backdrop-blur-md transition-all hover:bg-white/5 active:scale-95 sm:w-auto"
          >
            WhatsApp Us Now
          </a>
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
