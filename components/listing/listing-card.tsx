"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Heart,
  Navigation,
  Loader2,
  Gauge,
  Zap,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LUXURY_INVENTORY } from "@/lib/data/inventory"

interface ListingCardProps {
  vehicle: (typeof LUXURY_INVENTORY)[0]
  index: number
  onClick?: () => void
}

export function ListingCard({ vehicle, index, onClick }: ListingCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={() => {
        if (onClick) onClick()
        router.push(`/listing/${vehicle.slug}`)
      }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/5 bg-bg-surface/40 transition-all duration-700 hover:border-white/20 hover:shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
    >
      {/* ── IMAGE SECTION ────────────────────────────────────────── */}
      <div className="relative block aspect-4/3 overflow-hidden rounded-t-3xl border-b border-white/5">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-black tracking-widest text-bg-base uppercase shadow-lg backdrop-blur-md">
            {vehicle.badge}
          </span>
        </div>

        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
        >
          <motion.div animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}>
            <Heart
              size={16}
              fill={isLiked ? "currentColor" : "none"}
              strokeWidth={2.5}
            />
          </motion.div>
        </button>

        {/* Media Counts & Brand */}
        <div className="pointer-events-none absolute right-4 bottom-4 left-4 z-20 flex items-center justify-between">
          <span className="rounded-lg border border-white/10 bg-bg-base/60 px-3 py-1 text-[8px] font-black tracking-[0.2em] text-white/90 backdrop-blur-md">
            {vehicle.brand}
          </span>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-bg-base/60 px-2 py-1 text-[9px] font-bold text-white/90 backdrop-blur-md">
              <Navigation size={10} /> {vehicle.imagesCount}
            </div>
            <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[9px] font-bold text-white/90 backdrop-blur-md">
              <Loader2 size={10} className="animate-spin-slow" />{" "}
              {vehicle.videoCount}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT SECTION ──────────────────────────────────────── */}
      <div className="relative z-20 flex flex-1 flex-col bg-bg-base/70 px-6 py-6">
        <h3 className="mb-5 line-clamp-1 text-lg font-black tracking-tight text-white uppercase transition-transform group-hover:translate-x-1">
          {vehicle.name}
        </h3>

        {/* Specs Grid */}
        <div className="mt-auto mb-6 grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-center gap-2 text-white/40">
            <Gauge size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.mileage}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Navigation size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.year}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Zap size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.fuel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Loader2 size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.transmission}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-5 h-px w-full bg-white/10" />

        {/* Price & Action */}
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[9px] font-black tracking-[0.2em] text-white/40 uppercase">
                Market Price
              </span>
              <div className="text-2xl font-black tracking-tighter text-white">
                {vehicle.price}
              </div>
            </div>
          </div>

          {/* Modern Button */}
          <Link
            href={`/listing/${vehicle.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[11px] font-black tracking-widest text-white uppercase transition-all duration-300 hover:border-white/20 hover:bg-white hover:text-black active:scale-[0.985]"
          >
            VIEW DETAILS
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
