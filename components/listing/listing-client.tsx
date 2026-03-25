"use client"

import React, { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ListingSidebar } from "./listing-sidebar"
import { ListingCard } from "./listing-card"
import { LUXURY_INVENTORY } from "@/lib/data/inventory"
import { ChevronDown } from "lucide-react"

const parsePrice = (priceStr: string) => {
  if (priceStr.toUpperCase() === "POA") return 9999999999
  return parseInt(priceStr.replace(/[$,]/g, ""), 10) || 0
}

export function ListingClient() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  )
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "All"
  )

  const [minYear, setMinYear] = useState<string>(
    searchParams.get("minYear") || ""
  )
  const [maxYear, setMaxYear] = useState<string>(
    searchParams.get("maxYear") || ""
  )
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") || ""
  )
  const [maxMiles, setMaxMiles] = useState<string>(
    searchParams.get("maxMiles") || ""
  )
  const [condition] = useState<string>(
    searchParams.get("condition") || "All"
  )

  // Sorting state
  const [sortBy, setSortBy] = useState("Recommended")
  const [isSortOpen, setIsSortOpen] = useState(false)

  const brands = useMemo(() => {
    const uniqueBrands = new Set(LUXURY_INVENTORY.map((v) => v.brand))
    return Array.from(uniqueBrands)
  }, [])

  const filteredInventory = useMemo(() => {
    const result = LUXURY_INVENTORY.filter((vehicle) => {
      // Combine searchable fields into one easy string to support checking Categories like 'SUV', 'Electric', 'Sedan'
      const searchTarget =
        `${vehicle.name} ${vehicle.brand} ${vehicle.fuel || ""} ${vehicle.details?.Body || ""} ${vehicle.badge || ""} ${vehicle.details?.Condition || ""}`.toLowerCase()
      const matchesSearch =
        !searchQuery || searchTarget.includes(searchQuery.toLowerCase())

      const matchesBrand =
        selectedBrand === "All" ||
        vehicle.brand.toLowerCase() === selectedBrand.toLowerCase()

      let matchesCondition = true
      if (condition && condition !== "All") {
        const condType = vehicle.details?.Condition || ""
        const isNew =
          condType.toLowerCase().includes("new") ||
          condType.toLowerCase().includes("delivery")
        if (condition === "new") {
          matchesCondition = isNew
        } else if (condition === "pre-owned") {
          matchesCondition = !isNew
        }
      }

      let matchesMinYear = true
      if (minYear) {
        matchesMinYear = parseInt(vehicle.year) >= parseInt(minYear)
      }

      let matchesMaxYear = true
      if (maxYear) {
        matchesMaxYear = parseInt(vehicle.year) <= parseInt(maxYear)
      }

      let matchesMaxPrice = true
      if (maxPrice) {
        matchesMaxPrice = parsePrice(vehicle.price) <= parseInt(maxPrice)
      }

      let matchesMaxMiles = true
      if (maxMiles) {
        const vehicleMiles = parseInt(vehicle.mileage.replace(/[^0-9]/g, ""))
        const parsedVehicleMiles = isNaN(vehicleMiles) ? 0 : vehicleMiles
        matchesMaxMiles = parsedVehicleMiles <= parseInt(maxMiles)
      }

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCondition &&
        matchesMinYear &&
        matchesMaxYear &&
        matchesMaxPrice &&
        matchesMaxMiles
      )
    })

    if (sortBy === "Price: High to Low") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    } else if (sortBy === "Price: Low to High") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    } else if (sortBy === "Newest Arrivals") {
      result.sort((a, b) => parseInt(b.year) - parseInt(a.year))
    }

    return result
  }, [
    searchQuery,
    selectedBrand,
    sortBy,
    minYear,
    maxYear,
    maxPrice,
    maxMiles,
    condition,
  ])

  return (
    <section className="relative z-10 w-full pt-8 pb-32">
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-12 px-6 lg:flex-row">
        {/* ── SIDEBAR FILTERS ──────────────────────────────────────── */}
        <aside className="w-full shrink-0 lg:w-72">
          <ListingSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            brands={brands}
            minYear={minYear}
            setMinYear={setMinYear}
            maxYear={maxYear}
            setMaxYear={setMaxYear}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            maxMiles={maxMiles}
            setMaxMiles={setMaxMiles}
          />
        </aside>

        {/* ── GRID & RESULTS ────────────────────────────────────────── */}
        <main className="min-w-0 flex-1">
          <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
            <span className="hidden text-xs font-bold tracking-widest text-white/50 uppercase sm:inline-block">
              Showing {filteredInventory.length} Vehicles
            </span>

            {/* Custom Sort Dropdown */}
            <div className="relative z-40 ml-auto sm:ml-0">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-[10px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-white/6 sm:text-xs"
              >
                <span>Sort: {sortBy}</span>
                <ChevronDown
                  size={14}
                  className={`text-white/50 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
                  >
                    {[
                      "Recommended",
                      "Price: High to Low",
                      "Price: Low to High",
                      "Newest Arrivals",
                    ].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option)
                          setIsSortOpen(false)
                        }}
                        className={`w-full px-5 py-3.5 text-left text-xs font-bold tracking-widest uppercase transition-colors ${
                          sortBy === option
                            ? "bg-white/5 text-white"
                            : "text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            layout
            className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence>
              {filteredInventory.map((vehicle, index) => (
                <ListingCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredInventory.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex w-full flex-col items-center justify-center py-32 text-center font-black tracking-widest text-white/30 uppercase"
            >
              <p className="text-xl">No vehicles found</p>
              <p className="mt-2 text-xs font-medium tracking-normal text-white/20">
                Try adjusting your filters or search query.
              </p>
            </motion.div>
          )}
        </main>
      </div>
    </section>
  )
}
