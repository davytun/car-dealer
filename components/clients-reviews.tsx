"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import GridBackground from "@/components/ui/grid-background"

const REVIEWS = [
  {
    name: "Chinedu A.",
    location: "Lagos",
    role: "Entrepreneur",
    text: "Ignite Luxury made finding my dream SUV a smooth and worry-free experience. The detailed listings and expert guidance gave me full confidence in my purchase. Truly premium service in Nigeria!",
    bg: "/images/luxury/porsche_911_rimlit.png",
  },
  {
    name: "Funke O.",
    location: "Abuja",
    role: "Business Owner",
    text: "I never imagined buying a luxury car online could be this easy. The financing calculator and comparison tools helped me make the right choice without any stress. Highly recommend Ignite Luxury!",
    bg: "/images/luxury/merc_amg_one.png",
  },
  {
    name: "Tunde S.",
    location: "Port Harcourt",
    role: "Executive",
    text: "From start to finish, Ignite Luxury showed professionalism and transparency. I was able to compare multiple vehicles, get expert advice, and drive away in my new car within days.",
    bg: "/images/luxury/lambo_revuelto.png",
  },
  {
    name: "Aisha M.",
    location: "Lagos",
    role: "Fashion Entrepreneur",
    text: "Their curated inventory and verified dealers made me feel safe buying a high-end vehicle online. Ignite Luxury is setting a new standard for luxury car sales in Nigeria.",
    bg: "/images/luxury/ferrari_sf90_moody.png",
  },
  {
    name: "Emeka U.",
    location: "Abuja",
    role: "Investor",
    text: "Transparent pricing, quick process, and personal guidance – everything I needed as a busy professional. Ignite Luxury made purchasing my Mercedes a seamless experience.",
    bg: "/images/luxury/merc_amg_one.png",
  },
]

const STATS = [
  { label: "Luxury Vehicles", value: "18k+" },
  { label: "Daily Visitors", value: "8k+" },
  { label: "Dealer Reviews", value: "4.5k+" },
  { label: "Verified Dealers", value: "3.5k+" },
]

const MARQUEE_ITEMS = [...REVIEWS, ...REVIEWS, ...REVIEWS]

export function ClientsReviews() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const marqueeTween = useRef<gsap.core.Tween | null>(null)

  useGSAP(
    () => {
      if (!trackRef.current) return

      marqueeTween.current = gsap.to(trackRef.current, {
        xPercent: -33.333,
        ease: "none",
        duration: 45,
        repeat: -1,
      })
    },
    { scope: containerRef }
  )

  const handleMouseEnter = () => marqueeTween.current?.pause()
  const handleMouseLeave = () => marqueeTween.current?.play()

  return (
    <section
      ref={containerRef}
      className="relative z-10 overflow-hidden border-b border-white/5 bg-bg-base py-24 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <GridBackground
          type="grid"
          gridColor="rgba(255, 255, 255, 0.05)"
          maskSize="ellipse 80% 80% at 50% 50%"
        />
        <Quote size={400} className="absolute -top-20 -left-20 text-white/1" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto mb-16 max-w-7xl px-6 text-center md:mb-24 md:text-left">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-8 flex items-center justify-center gap-4 md:justify-start">
                <div className="h-px w-12 bg-white/20" />
                <span className="text-[10px] font-black tracking-[0.6em] text-white/40 uppercase">
                  Testimonials / Archive
                </span>
              </div>
              <h2 className="mb-2 text-3xl leading-tight font-black tracking-tighter text-white uppercase italic md:text-5xl">
                Modern{" "}
                <span className="text-white/40 md:text-white/20">
                  Dialogues.
                </span>
              </h2>
              <span className="text-xl font-light tracking-tight text-white/70 md:text-2xl md:text-white/60">
                Client experiences
              </span>
            </div>
            <p className="mx-auto max-w-xs border-l border-white/10 pb-2 pl-8 text-[10px] leading-loose font-bold tracking-[0.3em] text-white/70 uppercase md:mx-0 md:text-white/30">
              Documenting the journey of discerning collectors who value
              precision and archival transparency.
            </p>
          </div>
        </div>

        <div
          className="group/marquee relative flex cursor-crosshair overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={trackRef} className="flex gap-6 whitespace-nowrap">
            {MARQUEE_ITEMS.map((review, i) => (
              <div
                key={i}
                className="group/card relative flex aspect-4/3 w-[260px] shrink-0 flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-bg-surface p-6 shadow-2xl transition-all duration-1000 hover:scale-[1.02] hover:border-white/20 md:w-[380px] md:p-10"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover/card:opacity-[0.15]">
                  <Image
                    src={review.bg}
                    alt=""
                    fill
                    className="scale-110 object-cover blur-sm grayscale transition-transform duration-2000 group-hover/card:scale-100"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/3 to-transparent" />
                <div className="absolute -inset-px bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05)_0%,transparent_50%)] opacity-0 transition-opacity duration-1000 group-hover/card:opacity-100" />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex gap-1.5 text-white/10 transition-colors duration-700 group-hover/card:text-white/60">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={7}
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <p className="line-clamp-4 text-lg leading-relaxed font-light tracking-tight whitespace-normal text-white italic md:text-xl">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                <div className="relative z-10 mt-auto flex items-center gap-4 border-t border-white/5 pt-8 transition-transform duration-700 group-hover/card:translate-x-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-serif text-lg text-white/20 transition-all duration-700 group-hover/card:bg-white/10 group-hover/card:text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden text-left">
                    <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors group-hover/card:text-white">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2 opacity-20 transition-opacity group-hover/card:opacity-50">
                      <span className="text-[7px] font-black tracking-[0.3em] uppercase">
                        {review.role}
                      </span>
                      <div className="h-0.5 w-0.5 rounded-full bg-white/40" />
                      <span className="text-[7px] font-black tracking-[0.3em] uppercase">
                        {review.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 opacity-0 blur-[60px] transition-opacity duration-1000 group-hover/card:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-linear-to-r from-bg-base via-bg-base/80 to-transparent md:w-64" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-linear-to-l from-bg-base via-bg-base/80 to-transparent md:w-64" />
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl grid-cols-2 gap-4 px-6 md:mt-32 md:gap-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:border-white/20 md:rounded-3xl md:p-8"
          >
            <span className="mb-1 text-3xl font-black text-white md:mb-2 md:text-5xl">
              {stat.value}
            </span>
            <span className="text-center text-[8px] font-black tracking-[0.4em] text-white/40 uppercase md:text-[10px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 flex max-w-7xl animate-in justify-center px-6 opacity-0 delay-500 duration-1000 fill-mode-forwards fade-in">
        <div className="flex items-center gap-4 opacity-10">
          <div className="h-px w-16 bg-white" />
          <span className="pl-4 text-[7px] font-black tracking-[1.5em] whitespace-nowrap uppercase">
            Continuous Playback
          </span>
          <div className="h-px w-16 bg-white" />
        </div>
      </div>
    </section>
  )
}
