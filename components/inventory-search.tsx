"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  ArrowRight,
  X,
} from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import GridBackground from "@/components/ui/grid-background"

const FILTER_CATEGORIES = [
  {
    id: "brand",
    label: "Brand",
    options: [
      "All Brands",
      "Porsche",
      "Ferrari",
      "Lamborghini",
      "Audi",
      "BMW",
      "Mercedes",
    ],
  },
  {
    id: "body",
    label: "Body Type",
    options: ["All Types", "Coupe", "Sedan", "SUV", "Convertible", "Hatchback"],
  },
  {
    id: "price",
    label: "Price Range",
    options: [
      "Any Price",
      "$50k - $100k",
      "$100k - $250k",
      "$250k - $500k",
      "$500k+",
    ],
  },
  {
    id: "transmission",
    label: "Transmission",
    options: ["All", "Automatic", "Manual", "Semi-Auto"],
  },
]

export function InventorySearch({
  onFilterChange,
  onExplore,
}: {
  onFilterChange?: (filters: Record<string, string>) => void
  onExplore?: (filters: Record<string, string>) => void
} = {}) {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({
    brand: "All Brands",
    body: "All Types",
    price: "Any Price",
    transmission: "All",
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      gsap.from(".filter-item", {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
      })
    },
    { scope: containerRef }
  )

  const toggleFilter = (id: string) => {
    setActiveFilter(activeFilter === id ? null : id)
  }

  const handleSelect = (category: string, value: string) => {
    const newFilters = { ...selectedValues, [category]: value }
    setSelectedValues(newFilters)
    setActiveFilter(null)
    if (onFilterChange) onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters = {
      brand: "All Brands",
      body: "All Types",
      price: "Any Price",
      transmission: "All",
    }
    setSelectedValues(defaultFilters)
    setActiveFilter(null)
    if (onFilterChange) onFilterChange(defaultFilters)
  }

  const handleExplore = () => {
    if (onExplore) {
      onExplore(selectedValues)
    } else {
      const params = new URLSearchParams()
      if (selectedValues.brand !== "All Brands")
        params.set("brand", selectedValues.brand)
      router.push(`/listing?${params.toString()}`)
    }
  }

  const totalActiveFilters = Object.values(selectedValues).filter(
    (v) => !["All Brands", "All Types", "Any Price", "All"].includes(v)
  ).length

  return (
    <div
      ref={containerRef}
      className="relative z-40 mx-auto mb-12 w-full max-w-7xl px-4"
    >
      <div className="relative hidden md:block">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-bg-surface/40 p-2 shadow-[0_24px_48px_rgba(0,0,0,0.6)] backdrop-blur-3xl md:p-3">
          <div className="flex flex-1 items-center px-4">
            {FILTER_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="filter-item relative min-w-0 flex-1 border-r border-white/5 last:border-r-0 md:min-w-[100px] xl:min-w-[140px]"
              >
                <button
                  onClick={() => toggleFilter(cat.id)}
                  className="group flex w-full flex-col justify-center px-2 py-3 text-left transition-all xl:px-4"
                >
                  <span className="mb-1 w-full truncate text-[8px] font-black tracking-[0.2em] text-white/30 uppercase transition-colors group-hover:text-white/50 xl:text-[9px]">
                    {cat.label}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-2 text-[11px] font-bold text-white xl:text-[13px]">
                      {selectedValues[cat.id]}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-white/20 transition-transform duration-500 ${activeFilter === cat.id ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {activeFilter === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 z-50 mt-4 w-56 overflow-hidden rounded-2xl border border-white/10 bg-bg-elevated shadow-2xl backdrop-blur-xl"
                    >
                      <div className="space-y-1 p-2">
                        {cat.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(cat.id, opt)}
                            className={`w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold transition-all ${
                              selectedValues[cat.id] === opt
                                ? "bg-white text-black"
                                : "text-white/50 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 pr-2">
            <button
              onClick={clearFilters}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 text-white/30 transition-all hover:bg-white/5 hover:text-white xl:h-12 xl:w-12"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleExplore}
              className="group flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[9px] font-black tracking-widest text-black uppercase shadow-xl transition-all hover:bg-[#F0F0F0] active:scale-95 xl:h-14 xl:gap-4 xl:px-8 xl:text-[10px] xl:tracking-[0.2em]"
            >
              <Search size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Explore</span>
              <div className="hidden h-6 w-6 items-center justify-center rounded-full bg-black/5 transition-transform group-hover:translate-x-1 lg:flex">
                <ArrowRight size={12} className="text-black" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex w-full items-center justify-between rounded-full border border-white/10 bg-bg-surface/60 p-4 shadow-lg backdrop-blur-3xl transition-all active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40">
              <Search size={18} />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">
                Search Inventory
              </span>
              <span className="text-sm font-bold text-white">
                {totalActiveFilters > 0
                  ? `${totalActiveFilters} Filters Applied`
                  : "Find your ideal car"}
              </span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md">
            <SlidersHorizontal size={18} />
          </div>
        </button>

        <AnimatePresence>
          {isMobileDrawerOpen && (
            <div className="fixed inset-0 z-100 flex items-end justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileDrawerOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-[2.5rem] border-t border-white/10 bg-bg-elevated"
              >
                <div className="flex w-full justify-center pt-4 pb-2">
                  <div className="h-1 w-12 rounded-full bg-white/10" />
                </div>

                <div className="flex items-center justify-between border-b border-white/5 px-8 py-6">
                  <h3 className="text-xl font-black tracking-tight text-white uppercase">
                    FILTERS
                  </h3>
                  <button
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/40"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="custom-scrollbar flex-1 space-y-10 overflow-y-auto px-8 py-6 pb-32">
                  {FILTER_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black tracking-[0.3em] text-white/10 uppercase">
                          {cat.label}
                        </span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleSelect(cat.id, opt)}
                            className={`rounded-xl border px-5 py-2.5 text-[10px] font-bold transition-all ${
                              selectedValues[cat.id] === opt
                                ? "border-white bg-white text-black shadow-[0_8px_20px_rgba(255,255,255,0.2)]"
                                : "border-white/5 bg-white/3 text-white/30 hover:border-white/10 hover:text-white"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute right-0 bottom-0 left-0 flex items-center gap-4 border-t border-white/5 bg-linear-to-t from-bg-elevated via-bg-elevated to-transparent p-8">
                  <button
                    onClick={clearFilters}
                    className="h-16 rounded-full border border-white/10 px-8 text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-white/5"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileDrawerOpen(false)
                      handleExplore()
                    }}
                    className="flex h-16 flex-1 items-center justify-center gap-4 rounded-full bg-white text-xs font-black tracking-widest text-black uppercase shadow-2xl transition-all active:scale-95"
                  >
                    Explore Inventory
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 -z-10 hidden rounded-full bg-white/5 opacity-50 blur-3xl md:block" />

      <div className="absolute inset-0 -z-20 opacity-30">
        <GridBackground
          type="dot"
          dotColor="rgba(255, 255, 255, 0.1)"
          maskSize="ellipse 100% 100% at 50% 50%"
        />
      </div>
    </div>
  )
}
