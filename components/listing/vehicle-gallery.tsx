"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Expand, CheckCircle } from "lucide-react"

interface VehicleGalleryProps {
  images: string[]
  alt: string
}

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const safeImages = images.length > 0 ? images : ["/images/card/card-1.jpg"]

  const prev = () =>
    setActiveIndex((i) => (i - 1 + safeImages.length) % safeImages.length)
  const next = () =>
    setActiveIndex((i) => (i + 1) % safeImages.length)

  return (
    <>
      <div className="relative flex h-full w-full flex-col">
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={safeImages[activeIndex]}
                alt={`${alt} — image ${activeIndex + 1}`}
                fill
                className="object-cover"
                priority={activeIndex === 0}
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-[#020617]/60 via-transparent to-transparent" />

          {/* Premium Trust Badge overlay */}
          {/* Gallery controls removed for brevity or kept as needed */}

          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-md transition-all hover:bg-white hover:text-black"
          >
            <Expand size={16} />
          </button>

          {safeImages.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all hover:bg-white hover:text-black"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all hover:bg-white hover:text-black"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {safeImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-white/60 uppercase backdrop-blur-md">
              {activeIndex + 1} / {safeImages.length}
            </div>
          )}
        </div>

        {safeImages.length > 1 && (
          <div className="relative z-20 flex gap-2 overflow-x-auto px-6 py-4 pb-0 md:px-12">
            {safeImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  i === activeIndex
                    ? "border-white opacity-100"
                    : "border-white/0 opacity-40 hover:opacity-70"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-black/95"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative h-[80vh] w-[90vw] max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={safeImages[activeIndex]}
                alt={alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
              {safeImages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
