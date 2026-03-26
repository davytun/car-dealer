"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  Gauge,
  Zap,
  CalendarDays,
  Settings2,
  ArrowRight,
  Images,
  Star,
  Palette,
  Car,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react"

export interface ListingCardVehicle {
  id: number
  slug: string
  name: string
  brand: string
  price: string
  monthlyPrice: string
  mileage: string
  year: string
  fuel: string
  transmission: string
  image: string
  badge: string
  featured: boolean
  color: string | null
  bodyType: string | null
  condition: string | null
  imagesCount: number
  vin?: string | null
  status?: string | null
  description?: string | null
}

interface ListingCardProps {
  vehicle: ListingCardVehicle
  index: number
  view?: "grid" | "list"
}


const conditionStyle = (c: string | null) => {
  if (!c) return "border-white/10 text-white/40"
  const l = c.toLowerCase()
  if (l === "new") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
  if (l.includes("certified")) return "border-blue-400/30 bg-blue-400/10 text-blue-300"
  return "border-white/10 bg-white/5 text-white/50"
}

const statusStyle = (s: string | null) => {
  if (!s) return { dot: "bg-green-400", label: "Available" }
  const l = s.toLowerCase()
  if (l === "sold") return { dot: "bg-red-400", label: "Sold" }
  if (l === "reserved") return { dot: "bg-amber-400", label: "Reserved" }
  return { dot: "bg-green-400", label: "Available" }
}

export function ListingCard({ vehicle, index, view = "grid" }: ListingCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imgError, setImgError] = useState(false)
  const status = statusStyle(vehicle.status ?? null)
  const isFeatured = vehicle.featured

  if (view === "list") {
    return <ListCardHorizontal vehicle={vehicle} index={index} isLiked={isLiked} setIsLiked={setIsLiked} status={status} />
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      layout
      transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.25) }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/6 bg-[#0c1220] transition-all duration-500 hover:border-white/15 hover:shadow-[0_28px_56px_rgba(0,0,0,0.6)]"
    >
      <Link href={`/listing/${vehicle.slug}`} className="relative block overflow-hidden">
        <div className="relative aspect-16/10 w-full overflow-hidden">
          <Image
            src={imgError ? "/images/card/card-1.jpg" : vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-[#0c1220]/30 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={`/listing/${vehicle.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[10px] font-black tracking-[0.2em] text-black uppercase shadow-2xl transition-transform hover:scale-105"
          >
            View Details <ArrowRight size={13} strokeWidth={3} />
          </Link>
          <Link
            href={`/listing/${vehicle.slug}#inquire`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-[10px] font-black tracking-[0.2em] text-white uppercase backdrop-blur-md transition-all hover:bg-white/20"
          >
            <MessageSquare size={12} /> Inquire
          </Link>
        </div>

        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {isFeatured && (
            <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[8px] font-black tracking-[0.15em] text-black uppercase shadow-lg">
              <Star size={8} className="fill-black" /> Featured
            </span>
          )}
          {vehicle.condition && (
            <span className={`rounded-full border px-2.5 py-1 text-[8px] font-black tracking-[0.15em] uppercase backdrop-blur-md ${conditionStyle(vehicle.condition)}`}>
              {vehicle.condition}
            </span>
          )}
        </div>

        <button
          aria-label="Save vehicle"
          onClick={(e) => { e.preventDefault(); setIsLiked((l) => !l) }}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
        >
          <Heart size={14} className={isLiked ? "fill-red-400 text-red-400" : ""} strokeWidth={2} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
          <span className="rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-black tracking-[0.2em] text-white/80 uppercase backdrop-blur-md">
            {vehicle.brand}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-bold text-white/70 backdrop-blur-md`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            {vehicle.imagesCount > 1 && (
              <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 text-[8px] font-bold text-white/70 backdrop-blur-md">
                <Images size={9} /> {vehicle.imagesCount}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 pt-4">

        <div className="mb-1 text-[8px] font-black tracking-[0.3em] text-white/30 uppercase">
          {vehicle.brand} · {vehicle.year}
        </div>
        <Link href={`/listing/${vehicle.slug}`}>
          <h3 className="mb-3 line-clamp-1 text-lg font-black tracking-tight text-white transition-colors group-hover:text-white/90 uppercase">
            {vehicle.name}
          </h3>
        </Link>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {vehicle.bodyType && (
            <Chip icon={Car} label={vehicle.bodyType} />
          )}
          {vehicle.color && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[8px] font-black tracking-widest text-white/40 uppercase">
              <span
                className="inline-block h-2 w-2 shrink-0 rounded-full border border-white/20"
                style={{ backgroundColor: vehicle.color.split(" ").pop()?.toLowerCase() ?? "#888" }}
              />
              {vehicle.color}
            </span>
          )}
          {vehicle.vin && (
            <Chip icon={CheckCircle} label={`VIN ···${vehicle.vin.slice(-6)}`} />
          )}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
          <Spec icon={Gauge} label="Odometer" value={vehicle.mileage} />
          <Spec icon={CalendarDays} label="Year" value={vehicle.year} />
          <Spec icon={Zap} label="Fuel" value={vehicle.fuel} />
          <Spec icon={Settings2} label="Gearbox" value={vehicle.transmission} />
        </div>

        {vehicle.description && (
          <p className="mb-4 line-clamp-2 text-[10px] leading-relaxed text-white/30">
            {vehicle.description}
          </p>
        )}

        <div className="mt-auto">
          <div className="mb-4 h-px w-full bg-white/5" />

          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="mb-0.5 text-[8px] font-black tracking-[0.2em] text-white/25 uppercase">Market Price</div>
              <div className="text-2xl font-black tracking-tighter text-white">{vehicle.price}</div>
            </div>
            <div className="text-right">
              <div className="mb-0.5 text-[8px] text-white/20 uppercase tracking-widest font-black">Finance from</div>
              <div className="text-sm font-black text-white/40">{vehicle.monthlyPrice}</div>
            </div>
          </div>

          <Link
            href={`/listing/${vehicle.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 text-[10px] font-black tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-transparent hover:bg-white hover:text-black active:scale-[0.98]"
          >
            View Full Details
            <ArrowRight size={13} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

function ListCardHorizontal({
  vehicle, index, isLiked, setIsLiked, status,
}: {
  vehicle: ListingCardVehicle
  index: number
  isLiked: boolean
  setIsLiked: (v: boolean) => void
  status: { dot: string; label: string }
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      layout
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2) }}
      className="group relative flex overflow-hidden rounded-2xl border border-white/6 bg-[#0c1220] transition-all duration-500 hover:border-white/15 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
    >
      {/* Image */}
      <Link href={`/listing/${vehicle.slug}`} className="relative w-52 shrink-0 overflow-hidden md:w-64 lg:w-72">
        <Image
          src={imgError ? "/images/card/card-1.jpg" : vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="280px"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0c1220]" />
        {/* Badges */}
        {vehicle.condition && (
          <span className={`absolute top-3 left-3 rounded-full border px-2.5 py-1 text-[8px] font-black tracking-widest uppercase backdrop-blur-md ${conditionStyle(vehicle.condition)}`}>
            {vehicle.condition}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-1 flex items-start justify-between gap-2">
            <div>
              <div className="mb-0.5 text-[8px] font-black tracking-[0.3em] text-white/30 uppercase">
                {vehicle.brand} · {vehicle.year}
              </div>
              <Link href={`/listing/${vehicle.slug}`}>
                <h3 className="text-xl font-black tracking-tight text-white uppercase hover:text-white/80">
                  {vehicle.name}
                </h3>
              </Link>
            </div>
            <button
              aria-label="Save"
              onClick={() => setIsLiked(!isLiked)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black"
            >
              <Heart size={14} className={isLiked ? "fill-red-400 text-red-400" : ""} />
            </button>
          </div>

          {/* Chips */}
          <div className="mt-2 mb-3 flex flex-wrap gap-1.5">
            {vehicle.bodyType && <Chip icon={Car} label={vehicle.bodyType} />}
            {vehicle.color && (
              <span className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[8px] font-black tracking-widest text-white/40 uppercase">
                <Palette size={8} /> {vehicle.color}
              </span>
            )}
            {vehicle.vin && <Chip icon={CheckCircle} label={`VIN ···${vehicle.vin.slice(-6)}`} />}
            <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-black tracking-widest uppercase border-white/10 bg-white/4 text-white/40`}>
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />{status.label}
            </span>
          </div>

          {/* Description */}
          {vehicle.description && (
            <p className="mb-3 line-clamp-2 text-[10px] leading-relaxed text-white/30">
              {vehicle.description}
            </p>
          )}

          {/* Specs row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <SpecInline icon={Gauge} label={vehicle.mileage} />
            <SpecInline icon={Zap} label={vehicle.fuel} />
            <SpecInline icon={Settings2} label={vehicle.transmission} />
            {vehicle.imagesCount > 1 && <SpecInline icon={Images} label={`${vehicle.imagesCount} photos`} />}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <div className="mb-0.5 text-[8px] font-black tracking-[0.2em] text-white/25 uppercase">Market Price</div>
            <div className="text-2xl font-black tracking-tighter text-white">{vehicle.price}</div>
            <div className="text-[9px] text-white/30">Finance from {vehicle.monthlyPrice}</div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/listing/${vehicle.slug}#inquire`}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[9px] font-black tracking-widest text-white/60 uppercase hover:bg-white/10 hover:text-white transition-all"
            >
              <Clock size={11} /> Test Drive
            </Link>
            <Link
              href={`/listing/${vehicle.slug}`}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[9px] font-black tracking-widest text-black uppercase shadow-lg hover:bg-white/90 transition-all"
            >
              View <ArrowRight size={11} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function Chip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[8px] font-black tracking-widest text-white/40 uppercase">
      <Icon size={8} /> {label}
    </span>
  )
}

function Spec({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 text-white/25">
        <Icon size={11} />
        <span className="text-[7px] font-black tracking-widest text-white/25 uppercase">{label}</span>
      </div>
      <span className="text-[11px] font-bold text-white/70">{value}</span>
    </div>
  )
}

function SpecInline({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-white/40">
      <Icon size={11} className="shrink-0 text-white/25" />
      <span className="text-[10px] font-bold text-white/50">{label}</span>
    </div>
  )
}
