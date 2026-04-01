"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import GridBackground from "@/components/ui/grid-background"

const REVIEWS = [
  {
    name: "Emeka O.",
    location: "Lagos",
    role: "Business Owner",
    text: "I was scared of buying a tokunbo car because of hidden faults, but they let me drive it for 20 minutes before I paid anything. No pressure at all. I bought the 2018 Honda Accord and it's still running perfectly.",
    bg: "/images/luxury/porsche_911_rimlit.png",
  },
  {
    name: "Blessing A.",
    location: "Abuja",
    role: "Salaried Worker",
    text: "They showed me three cars within my budget and gave me time to think. No one was rushing me to pay. I bought the 2019 Toyota Camry and I've never regretted it. Very honest people.",
    bg: "/images/luxury/merc_amg_one.png",
  },
  {
    name: "Tunde S.",
    location: "Lagos",
    role: "Contractor",
    text: "I thought buying online was a scam, but I called them on WhatsApp and they sent me a video of the engine running. I went to their lot, drove the car, and paid. I'm happy with my 2017 Lexus ES350.",
    bg: "/images/luxury/lambo_revuelto.png",
  },
  {
    name: "Funke O.",
    location: "Ibadan",
    role: "Fashion Designer",
    text: "My last car was a nightmare, so I was very careful this time. They showed me the inspection report and even recommended a mechanic to check it for me. I bought the 2020 Toyota Corolla and it's a dream.",
    bg: "/images/luxury/ferrari_sf90_moody.png",
  },
  {
    name: "Chinedu U.",
    location: "Lagos",
    role: "Trader",
    text: "No hidden charges. The price I saw on the site was the price I paid. They even helped me with the paper work. I bought a 2015 Toyota Sienna for my business and it's been a workhorse.",
    bg: "/images/luxury/merc_amg_one.png",
  },
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
                  What Our Customers Say
                </span>
              </div>
              <h2 className="mb-2 text-3xl leading-tight font-black tracking-tighter text-white uppercase italic md:text-5xl">
                Real Stories{" "}
                <span className="text-white/40 md:text-white/20">
                  From Real Buyers.
                </span>
              </h2>
              <span className="text-xl font-light tracking-tight text-white/70 md:text-2xl md:text-white/60">
                See how we've helped others find their car.
              </span>
            </div>
            <p className="mx-auto max-w-xs border-l border-white/10 pb-2 pl-8 text-[10px] leading-loose font-bold tracking-[0.3em] text-white/70 uppercase md:mx-0 md:text-white/30">
              We don't just sell cars, we build trust with every family we serve in Lagos and beyond.
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
