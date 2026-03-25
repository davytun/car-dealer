"use client"

import React, { useRef } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  Gauge,
  Calendar,
  Fuel,
  Settings2,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const vehicles = [
  {
    name: "Audi A6 Avant E-Tron",
    image: "/card/card-1.jpg",
    price: "62,860,000",
    miles: "32,500",
    year: "2022",
    fuel: "EV",
    transmission: "Manual",
    tag: "Special",
  },
  {
    name: "2024 Hyundai Elantra",
    image: "/card/card-2.jpg",
    price: "59,920,000",
    miles: "89,300",
    year: "2018",
    fuel: "Benzin",
    transmission: "Auto",
    tag: "Great Price",
  },
  {
    name: "Kia EV9 2024",
    image: "/card/card-3.jpg",
    price: "63,700,000",
    miles: "76,400",
    year: "2020",
    fuel: "Diesel",
    transmission: "Auto",
    tag: "",
  },
  {
    name: "Chevrolet Camaro 2020",
    image: "/card/card-4.jpg",
    price: "49,700,000",
    miles: "45,800",
    year: "2023",
    fuel: "Benzin",
    transmission: "Auto",
    tag: "",
  },
  {
    name: "Audi R8",
    image: "/card/card-5.jpg",
    price: "63,700,000",
    miles: "97,200",
    year: "2022",
    fuel: "EV",
    transmission: "Manual",
    tag: "Special",
  },
  {
    name: "Genesis Electrified G80",
    image: "/card/card-6.jpg",
    price: "34,860,000",
    miles: "51,600",
    year: "2021",
    fuel: "Diesel",
    transmission: "Auto",
    tag: "Special",
  },
  {
    name: "2015 Ford Mustang EcoBoost",
    image: "/card/card-7.jpg",
    price: "62,860,000",
    miles: "84,500",
    year: "2022",
    fuel: "EV",
    transmission: "Manual",
    tag: "Special",
  },
  {
    name: "Mercedes-AMG C-Class",
    image: "/card/card-8.jpg",
    price: "34,300,000",
    miles: "84,500",
    year: "2022",
    fuel: "Benzin",
    transmission: "Auto",
    tag: "Great Price",
  },
]

export function FeaturedVehicles() {
  const containerRef = useRef<HTMLElement>(null)
  const slideWrapperRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !slideWrapperRef.current) return

      const sections = gsap.utils.toArray<HTMLElement>(".horizontal-item")

      // Calculate total scroll distance
      const totalWidth = slideWrapperRef.current.scrollWidth
      const scrollDistance = totalWidth - window.innerWidth

      const horizontalTween = gsap.to(slideWrapperRef.current, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          end: () => `+=${scrollDistance}`, // The duration of the pin
        },
      })

      // Inner Image Parallax
      sections.forEach((section: HTMLElement) => {
        const img = section.querySelector(".parallax-img")
        if (img) {
          gsap.to(img, {
            xPercent: 20, // Move the image 20% to the right
            ease: "none",
            scrollTrigger: {
              trigger: section,
              containerAnimation: horizontalTween, // Link it to the horizontal scroll
              start: "left right",
              end: "right left",
              scrub: true,
            },
          })
        }
      })

      // Header Fade-out Animation
      gsap.to(headerRef.current, {
        opacity: 0,
        x: -100,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "top -20%", // Fade out quickly
          scrub: true,
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative z-10 flex h-screen flex-col justify-center overflow-hidden border-b border-white/5 bg-bg-base"
    >
      <div
        ref={headerRef}
        className="pointer-events-none absolute top-12 left-0 z-20 mx-auto w-full max-w-7xl px-6"
      >
        <div className="pointer-events-auto flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="mono-md mb-4 block text-[10px] tracking-[0.3em] text-white/50 uppercase">
              Inventory
            </span>
            <h2 className="display-md tracking-tighter text-white uppercase">
              Featured Vehicles
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-full border-[0.5px] border-white/20 px-6 py-5 text-[10px] font-medium tracking-widest text-white/70 uppercase transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              New Cars
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-[0.5px] border-white/20 px-6 py-5 text-[10px] font-medium tracking-widest text-white/70 uppercase transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Used Cars
            </Button>
            <Button
              variant="link"
              className="group flex items-center gap-2 px-4 text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase hover:text-white"
            >
              View All{" "}
              <ArrowUpRight
                size={14}
                strokeWidth={1}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div className="mt-56 flex h-[65vh] items-center md:mt-32">
        <div ref={slideWrapperRef} className="flex gap-6 px-6 md:px-[10vw]">
          {vehicles.map((v, i) => {
            return (
            <div
              key={`${v.name}-${i}`}
              className="horizontal-item group relative flex w-[85vw] shrink-0 flex-col overflow-hidden rounded-2xl border-[0.5px] border-white/5 bg-bg-surface/30 backdrop-blur-md transition-all duration-700 hover:border-white/20 md:w-[400px]"
            >
              <div className="relative h-[300px] w-full overflow-hidden bg-white/2">
                {v.tag && (
                  <div className="absolute top-4 left-4 z-20 rounded-full bg-white px-4 py-1.5 text-[9px] font-bold tracking-[0.2em] text-black uppercase shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
                    {v.tag}
                  </div>
                )}

                {/* Image darkens on hover */}
                <div className="absolute inset-0 z-10 bg-black/50 opacity-10 transition-opacity duration-700 group-hover:opacity-60" />

                {/* Parallax Image Wrapper - requires scale to prevent gaps when sliding */}
                <div className="absolute inset-0 h-full w-full scale-[1.25]">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="parallax-img object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </div>

                {/* Hidden Specs that reveal on hover */}
                <div className="absolute inset-0 z-20 flex translate-y-8 flex-col justify-end p-6 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-3 font-mono text-[10px] tracking-widest text-white/90 uppercase">
                    <div className="flex items-center gap-2">
                      <Gauge
                        size={14}
                        strokeWidth={1}
                        className="text-white/60"
                      />
                      <span>{v.miles} mi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={14}
                        strokeWidth={1}
                        className="text-white/60"
                      />
                      <span>{v.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel
                        size={14}
                        strokeWidth={1}
                        className="text-white/60"
                      />
                      <span>{v.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings2
                        size={14}
                        strokeWidth={1}
                        className="text-white/60"
                      />
                      <span>{v.transmission}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-30 flex flex-1 flex-col justify-between border-t-[0.5px] border-white/5 bg-bg-surface/50 p-6 backdrop-blur-md">
                <div>
                  <h3 className="mb-1 line-clamp-1 text-xl font-medium tracking-wide text-white/90 transition-colors duration-500 group-hover:text-white">
                    {v.name}
                  </h3>
                  <div className="mb-4 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    Stock #X{String(1000 + (i * 137 + 47) % 9000).padStart(4, "0")}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="text-xl font-bold tracking-tight text-white">
                    <span className="mr-2 align-middle font-mono text-[10px] tracking-widest text-white/40 uppercase">
                      Price
                    </span>
                    ${v.price}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full border-[0.5px] border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:border-white hover:bg-white hover:text-black"
                  >
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}
