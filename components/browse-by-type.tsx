"use client"

import { ArrowRight, Zap, CarFront, Car, Shield, Gauge } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const carTypes = [
  { name: "Electric", icon: Zap, count: "12 Cars" },
  { name: "Sedan", icon: CarFront, count: "24 Cars" },
  { name: "SUV", icon: Shield, count: "18 Cars" },
  { name: "Coupe", icon: Gauge, count: "8 Cars" },
  { name: "Wagon", icon: Car, count: "4 Cars" },
]

export function BrowseByType() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Header reveal
      gsap.from(".browse-header-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      })

      // Cards reveal
      gsap.from(".type-card", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      })

      // Tilt Effect
      const cards = containerRef.current.querySelectorAll<HTMLElement>(".type-card-inner")
      cards.forEach((card: HTMLElement) => {
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = (y - centerY) / 8
          const rotateY = (centerX - x) / 8

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          })
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative z-10 overflow-hidden border-b border-white/5 bg-bg-base px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="browse-header-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="mono-md mb-4 block text-[10px] tracking-[0.3em] text-white/50 uppercase">
              Categories
            </span>
            <h2 className="display-md tracking-tighter text-white uppercase">
              Browse By Type
            </h2>
          </div>
          <Button
            variant="link"
            className="group flex items-center gap-2 p-0 text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase transition-colors hover:text-white"
          >
            Check All Car Type{" "}
            <ArrowRight
              size={14}
              strokeWidth={1}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {carTypes.map((type) => (
            <div
              key={type.name}
              className="type-card"
              style={{ perspective: "1000px" }}
            >
              <Link
                href={`#${type.name.toLowerCase()}`}
                className="group block"
              >
                <div
                  className="type-card-inner relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border-[0.5px] border-white/5 bg-bg-surface/30 p-8 backdrop-blur-md transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/5"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/40 shadow-none transition-all duration-700 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <type.icon size={32} strokeWidth={1} />
                  </div>
                  <div
                    className="relative z-10 text-center"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <h3 className="mb-1 font-medium tracking-wide text-white/80 transition-colors duration-300 group-hover:text-white">
                      {type.name}
                    </h3>
                    <p className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                      {type.count}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
