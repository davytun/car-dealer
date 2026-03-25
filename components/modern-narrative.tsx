"use client"

import React, { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import GridBackground from "@/components/ui/grid-background"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const CHAPTERS = [
  {
    id: "process",
    title: "Quick Process",
    heading: "Streamlined experience.",
    description:
      "Our platform ensures a seamless transition from search to purchase, valuing your time as much as your choice in mobility.",
    image: "/images/luxury/porsche_911_rimlit.png",
    tag: "Efficiency",
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    heading: "Honest, upfront value.",
    description:
      "We provide clear, upfront pricing without hidden fees, ensuring total transparency in every high-end transaction.",
    image: "/images/luxury/lambo_revuelto.png",
    tag: "Integrity",
  },
  {
    id: "guidance",
    title: "Expert Guidance",
    heading: "Personalized advice.",
    description:
      "Receive insights from our automotive specialists to simplify your purchase and ensure you're driving away with confidence.",
    image: "/images/luxury/ferrari_sf90_moody.png",
    tag: "Expertise",
  },
]

const EXECUTIVE_TEAM = [
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

export function ModernNarrative() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const count = CHAPTERS.length

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${count * 60}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })

      const images = gsap.utils.toArray<HTMLElement>(".image-slide")
      const texts = gsap.utils.toArray<HTMLElement>(".text-slide")
      const navItems = gsap.utils.toArray<HTMLElement>(".nav-item")

      // Initialize states
      gsap.set(images[0], { autoAlpha: 1, scale: 1 })
      gsap.set(texts[0], { autoAlpha: 1, y: 0 })
      gsap.set(navItems[0], { color: "#ffffff", x: 10, opacity: 1 })

      for (let i = 1; i < count; i++) {
        gsap.set(images[i], { autoAlpha: 0, scale: 1.05 })
        gsap.set(texts[i], { autoAlpha: 0, y: 30 })
        gsap.set(navItems[i], {
          color: "rgba(255,255,255,0.3)",
          x: 0,
          opacity: 0.6,
        })
      }

      const dotSpacing = 64 // Distance between items in pixels (h-16 = 64px)

      for (let i = 0; i < count; i++) {
        const nextIndex = i + 1

        // Pause at current slide
        tl.to({}, { duration: 0.8 })

        if (nextIndex < count) {
          const label = `transition${i}`

          tl.addLabel(label)
            // Fade OUT current
            .to(
              navItems[i],
              {
                color: "rgba(255,255,255,0.3)",
                opacity: 0.6,
                x: 0,
                duration: 1,
                ease: "power2.inOut",
              },
              label
            )
            .to(
              images[i],
              { autoAlpha: 0, scale: 0.95, duration: 1, ease: "power2.inOut" },
              label
            )
            .to(
              texts[i],
              { autoAlpha: 0, y: -30, duration: 1, ease: "power2.inOut" },
              label
            )

            // Fade IN next
            .to(
              navItems[nextIndex],
              {
                color: "#ffffff",
                opacity: 1,
                x: 10,
                duration: 1,
                ease: "power2.inOut",
              },
              label
            )
            .to(
              images[nextIndex],
              { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.inOut" },
              label
            )
            .to(
              texts[nextIndex],
              { autoAlpha: 1, y: 0, duration: 1, ease: "power2.inOut" },
              label
            )

            // Move dot
            .to(
              dotRef.current,
              { y: nextIndex * dotSpacing, duration: 1, ease: "power2.inOut" },
              label
            )
        }
      }
    },
    { scope: sectionRef }
  )

  return (
    <section className="relative z-10 w-full border-t border-white/5 bg-bg-base">
      <GridBackground
        type="grid"
        gridColor="rgba(255, 255, 255, 0.02)"
        maskSize="ellipse 40% 80% at 0% 50%"
      />

      {/* ── INTRO HEADER ── */}
      <div className="mx-auto flex max-w-7xl flex-col items-end justify-between gap-12 px-6 py-20 text-center md:flex-row md:py-32 md:text-left">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center justify-center gap-4 md:justify-start">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
              Corporate Identity
            </span>
          </div>
          <h2 className="text-3xl leading-none font-black tracking-tighter text-white uppercase md:text-6xl">
            Luxury, <br />
            <span className="font-light text-white/40 italic">
              Transparency,
            </span>
            <br />
            and Expertise.
          </h2>
        </div>
        <p className="mx-auto max-w-sm border-l border-white/10 pl-8 text-[11px] leading-loose font-bold tracking-[0.3em] text-white/60 uppercase md:mx-0 md:text-white/40">
          Ignite Luxury is redefining the automotive marketplace for discerning
          buyers. Our platform combines a curated inventory with expert
          guidance.
        </p>
      </div>

      {/* ── MOBILE LIST (Simple Cards) ── */}
      <div className="flex flex-col gap-24 px-8 py-20 pb-32 md:hidden">
        {CHAPTERS.map((chapter) => (
          <div key={chapter.id} className="flex flex-col gap-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-bg-surface shadow-2xl">
                <Image
                src={chapter.image}
                alt={chapter.title}
                fill
                className="object-cover opacity-80 grayscale"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-black tracking-tighter text-white uppercase">
                  {chapter.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-start gap-8">
              <p className="text-[10px] leading-loose font-medium tracking-[0.2em] text-white/60 uppercase">
                {chapter.description}
              </p>
              <button className="rounded-xl border border-white/10 bg-white/5 px-10 py-4 text-[9px] font-black tracking-widest text-white uppercase transition-colors hover:bg-white/10">
                {chapter.tag}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── PINNED SCROLL (Desktop Only) ── */}
      <div
        ref={sectionRef}
        className="relative hidden h-screen w-full flex-col justify-center overflow-hidden md:flex"
      >
        {/* Cinematic atmospheric glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[60vw] max-h-[800px] w-[60vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[100px]" />

        <div className="relative z-10 mx-auto flex h-[85vh] w-full max-w-7xl flex-col items-center justify-between gap-8 px-6 md:h-[60vh] md:flex-row">
          {/* LEFT: Nav List (Desktop labels or Mobile Counter) */}
          <div className="relative flex w-full flex-col items-center justify-center md:w-[25%] md:items-start md:pl-8">
            {/* Nav Track Line (hidden on mobile) */}
            <div className="absolute top-1/2 left-0 hidden h-[200px] w-px -translate-y-1/2 bg-white/10 md:block md:h-[300px]" />

            <div className="relative flex h-12 w-full flex-col items-center justify-center md:h-[192px] md:items-start">
              {/* Nav Dot (hidden on mobile) */}
              <div
                ref={dotRef}
                className="absolute top-[28px] left-[-4px] hidden h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] md:block"
              />

              <div className="flex flex-col items-center gap-4 md:flex-col md:items-start md:gap-0">
                {CHAPTERS.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="nav-item flex items-center whitespace-nowrap md:h-16 md:pl-8"
                  >
                    {/* Desktop Label (Hidden on mobile) */}
                    <span className="hidden text-xl font-black tracking-tighter uppercase md:block">
                      {chapter.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: Image */}
          <div className="relative h-[40vh] w-full overflow-hidden rounded-3xl bg-bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.5)] md:h-full md:w-[45%]">
            {CHAPTERS.map((chapter) => (
              <div
                key={chapter.id}
                className="image-slide absolute inset-0 h-full w-full opacity-0"
              >
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover opacity-90 grayscale transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>

          {/* RIGHT: Text & Button */}
          <div className="relative flex h-40 w-full flex-col items-center justify-center md:h-full md:w-[25%] md:items-start">
            {CHAPTERS.map((chapter) => (
              <div
                key={chapter.id}
                className="text-slide pointer-events-none absolute inset-0 flex flex-col items-center justify-center pr-0 text-center opacity-0 md:items-start md:pr-4 md:text-left"
              >
                <p className="mb-4 max-w-[300px] text-[10px] leading-relaxed font-light text-white md:mb-8 md:max-w-none md:text-sm">
                  {chapter.description}
                </p>
                <div className="pointer-events-auto">
                  <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-2.5 text-[8px] font-black tracking-widest text-white uppercase shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-colors hover:bg-white/10 md:px-8 md:py-4 md:text-[9px]">
                    {chapter.tag}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXECUTIVE TEAM ── */}
      <div className="relative z-10 border-t border-white/5 bg-bg-base/50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
            <div className="max-w-xs">
              <span className="mb-4 block text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
                Executive
              </span>
              <p className="text-[10px] leading-relaxed font-medium tracking-widest text-white/40 uppercase">
                Guided by industry veterans committed to transforming the
                high-end automotive acquisition experience.
              </p>
            </div>

            <div className="grid w-full flex-1 grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
              {EXECUTIVE_TEAM.map((member) => (
                <div key={member.name} className="group flex flex-col">
                  <div className="relative mb-6 aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/5 bg-bg-surface">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                  <span className="mb-1 text-xs font-black tracking-tight text-white uppercase md:text-sm">
                    {member.name}
                  </span>
                  <span className="text-[8px] font-bold tracking-[0.3em] text-white/30 uppercase md:text-[9px]">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
