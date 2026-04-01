"use client"

import React, { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Gauge,
  Zap,
  Navigation,
  Loader2,
  Heart,
  ShieldCheck,
} from "lucide-react"
import { getCars, Car, generateCarSlug, getAssetUrl } from "@/lib/api"
import { InventorySearch } from "./inventory-search"
import GridBackground from "@/components/ui/grid-background"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price)
}

const formatMileage = (miles: number | string | undefined) => {
  if (!miles) return "0 miles"
  if (typeof miles === "string") return miles.includes("miles") ? miles : `${miles} miles`
  return `${miles.toLocaleString()} miles`
}

interface LuxuryMappedVehicle {
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
}

const VehicleCard = ({
  vehicle,
  index,
}: {
  vehicle: LuxuryMappedVehicle
  index: number
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={() => router.push(`/listing/${vehicle.slug}`)}
      className="group relative cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0F172A]/40 backdrop-blur-3xl transition-all duration-700 hover:border-white/20 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
    >
      <div className="relative m-3 aspect-4/3 overflow-hidden rounded-3xl">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-[10px] font-black tracking-widest text-emerald-400 uppercase shadow-lg backdrop-blur-md transition-all group-hover:bg-emerald-500/10">
              <ShieldCheck size={11} className="text-emerald-500" />
              100% Verified
            </span>
        </div>

        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
        >
          <motion.div animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}>
            <Heart
              size={16}
              fill={isLiked ? "currentColor" : "none"}
              strokeWidth={2.5}
            />
          </motion.div>
        </button>

        {/* Charging Effect (Subtle Line) */}
        <div className="absolute bottom-0 left-0 z-30 h-1 w-0 bg-white/40 transition-all duration-1000 group-hover:w-full" />
      </div>

      <div className="px-7 pt-2 pb-8">
        <h3 className="mb-4 text-xl font-black tracking-tight text-white uppercase transition-transform group-hover:translate-x-1">
          {vehicle.name}
        </h3>

        {/* Specs Grid */}
        <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-center gap-3 text-white/40">
            <Gauge size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.mileage}
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <Navigation size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.year}
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <Zap size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.fuel}
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <Loader2 size={14} className="shrink-0" />
            <span className="text-[11px] font-bold tracking-tight text-white/70">
              {vehicle.transmission}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px w-full bg-white/5" />

        {/* Price & Action */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="mb-1 text-xs font-black tracking-[0.1em] text-white/30 uppercase">
              Price
            </span>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white">
                {vehicle.price}
              </span>
              <div className="flex items-center gap-2 text-emerald-400">
                <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  No Hidden Charges
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="group/btn flex items-center gap-2 text-xs font-black text-emerald-400/60 transition-colors group-hover:text-emerald-400">
              VIEW DETAILS{" "}
              <ArrowRight
                size={12}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </div>
          </div>
        </div>
          <a
            href={`https://wa.me/2347077195098?text=Hi, I saw the ${vehicle.year} ${vehicle.name} on your site and I'd love to find something within my budget. Can you help me?`}
            onClick={(e) => e.stopPropagation()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black"
          >
            Ask About This Car
          </a>
      </div>
    </motion.div>
  )
}

export function LuxuryFeaturedVehicles() {
  const router = useRouter()
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    brand: "All Brands",
    body: "All Types",
    price: "Any Price",
    transmission: "All",
  })

  const [items, setItems] = useState<LuxuryMappedVehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadFeatured() {
      setIsLoading(true)
      try {
        const response = await getCars({ featured: 1 })
        if (response.success) {
          const mapped = response.data.map((car: Car) => ({
            id: car.id,
            slug: generateCarSlug(car),
            name: `${car.make} ${car.model}`,
            brand: car.make.toUpperCase(),
            price: formatPrice(car.price),
            monthlyPrice: formatPrice(Math.round(car.price / 60)) + "/mo",
            mileage: formatMileage(car.mileage),
            year: car.year.toString(),
            fuel: car.fuel_type || "Petrol",
            transmission: car.transmission || "Automatic",
            image: getAssetUrl(car.primary_image || car.image),
            badge: "High Interest This Week",
          }))
          setItems(mapped)
        }
      } catch (err) {
        console.error("Failed to fetch featured cars:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadFeatured()
  }, [])

  const filteredInventory = useMemo(() => {
    return items.filter((vehicle) => {
      const matchesBrand =
        activeFilters.brand === "All Brands" ||
        vehicle.brand.toUpperCase() === activeFilters.brand.toUpperCase()
      const matchesTransmission =
        activeFilters.transmission === "All" ||
        vehicle.transmission
          .toLowerCase()
          .includes(activeFilters.transmission.toLowerCase())
      return matchesBrand && matchesTransmission
    })
  }, [items, activeFilters])

  const handleExplore = (filters: Record<string, string>) => {
    const params = new URLSearchParams()
    if (filters.brand !== "All Brands") params.set("brand", filters.brand)
    router.push(`/listing?${params.toString()}`)
  }

  return (
    <section id="catalog" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-base px-4 py-32 md:px-8">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <GridBackground
          type="dot"
          dotColor="rgba(255, 255, 255, 0.15)"
          maskSize="ellipse 60% 60% at 50% 50%"
        />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[150px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-7xl flex-col gap-6 px-8">
        <div className="mb-4 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div>
            <span className="mb-4 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
              Hand-Picked Quality
            </span>
            <h2 className="text-4xl leading-tight font-black tracking-tighter text-white uppercase md:text-5xl">
              Our Best <br /> Cars.
            </h2>
          </div>
          <p className="mt-8 hidden max-w-sm text-right text-sm font-bold tracking-widest text-white/40 uppercase md:block">
            Every car we sell is inspected and ready to drive. No surprises.
          </p>
        </div>

        <div className="mb-12">
          <InventorySearch
            onFilterChange={setActiveFilters}
            onExplore={handleExplore}
          />
        </div>

        <div className="flex min-h-[400px] flex-wrap justify-center gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] w-full animate-pulse rounded-4xl bg-white/5" />
            ))
          ) : filteredInventory.length > 0 ? (
            filteredInventory
              .slice(0, 4)
              .map((v, idx) => (
                <div key={v.id} className="w-full max-w-[340px]">
                  <VehicleCard vehicle={v} index={idx} />
                </div>
              ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center py-20 text-white/30">
              <p className="text-xl font-black tracking-widest uppercase">
                No vehicles found
              </p>
              <p className="mt-2 text-sm font-medium">
                Try adjusting your filters.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 flex justify-center">
          <motion.button
            onClick={() => handleExplore(activeFilters)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="group relative flex items-center gap-6 rounded-full bg-white px-12 py-5 text-xs font-black tracking-[0.1em] text-black uppercase shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95"
          >
            See All Cars
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 transition-transform group-hover:translate-x-1">
              <ArrowRight size={14} className="text-black" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
