"use client"

import React, { useState, useCallback, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ListingSidebar } from "./listing-sidebar"
import { ListingCard } from "./listing-card"
import { getCars, Car, generateCarSlug, getAssetUrl } from "@/lib/api"
import {
  CheckCircle,
  ChevronDown,
  Clock,
  LayoutGrid,
  Loader2,
  MessageSquare,
  Rows,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"

const fmtPrice = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n)

const fmtMileage = (m: number | string | undefined) => {
  if (!m) return "N/A"
  if (typeof m === "string") return m.includes("mi") ? m : `${m} mi`
  return `${m.toLocaleString()} mi`
}

const SORT_OPTIONS = [
  { label: "Our Recommendations", sort: undefined, dir: undefined },
  { label: "Budget-Friendly First", sort: "price", dir: "asc" as const },
  { label: "Premium Selection", sort: "price", dir: "desc" as const },
  { label: "Fresh Arrivals", sort: "year", dir: "desc" as const },
  { label: "Lowest Mileage", sort: "mileage", dir: "asc" as const },
]

export function ListingClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Filter state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  )
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("make") || "All"
  )
  const [minYear, setMinYear] = useState(searchParams.get("minYear") || "")
  const [maxYear, setMaxYear] = useState(searchParams.get("maxYear") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [maxMiles, setMaxMiles] = useState(searchParams.get("maxMiles") || "")
  const [fuelType, setFuelType] = useState(searchParams.get("fuel") || "All")
  const [condition, setCondition] = useState(
    searchParams.get("condition") || "All"
  )

  const [sortIndex, setSortIndex] = useState(0)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const [vehicles, setVehicles] = useState<ReturnType<typeof mapCar>[]>([])
  const [allBrands, setAllBrands] = useState<string[]>([])
  const [allFuels, setAllFuels] = useState<string[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const sortOpt = SORT_OPTIONS[sortIndex]

  const fetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params: Parameters<typeof getCars>[0] = {
        per_page: 60,
        ...(sortOpt.sort && { sort: sortOpt.sort, direction: sortOpt.dir }),
        ...(searchQuery && { search: searchQuery }),
        ...(selectedBrand !== "All" && { make: selectedBrand }),
        ...(maxPrice && { max_price: Number(maxPrice) }),
        ...(fuelType !== "All" && { fuel_type: fuelType }),
        ...(condition !== "All" && { condition }),
      }

      const res = await getCars(params)

      if (res.success) {
        let cars = res.data.map(mapCar)

        // Client-side year filtering (API may not support it)
        if (minYear)
          cars = cars.filter((c) => Number(c.year) >= Number(minYear))
        if (maxYear)
          cars = cars.filter((c) => Number(c.year) <= Number(maxYear))

        // Client-side mileage filter
        if (maxMiles) {
          cars = cars.filter((c) => {
            const m = parseInt(c.mileage.replace(/[^0-9]/g, ""))
            return isNaN(m) || m <= Number(maxMiles)
          })
        }

        setVehicles(cars)
        setTotalCount(res.meta?.total ?? cars.length)

        // Derive filter options from full dataset if brands not yet loaded
        if (allBrands.length === 0) {
          const allRes = await getCars({ per_page: 200 })
          if (allRes.success) {
            setAllBrands([
              "All",
              ...Array.from(
                new Set(allRes.data.map((c) => c.make.toUpperCase()))
              ),
            ])
            setAllFuels([
              "All",
              ...Array.from(
                new Set(allRes.data.map((c) => c.fuel_type || "Petrol"))
              ),
            ])
          }
        }
      }
    } catch (e) {
      console.error(e)
      setError("Unable to load collection. Please try again.")
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchQuery,
    selectedBrand,
    maxPrice,
    fuelType,
    condition,
    minYear,
    maxYear,
    maxMiles,
    sortIndex,
  ])

  useEffect(() => {
    fetch()
  }, [fetch])

  useEffect(() => {
    const p = new URLSearchParams()
    if (searchQuery) p.set("search", searchQuery)
    if (selectedBrand !== "All") p.set("make", selectedBrand)
    if (minYear) p.set("minYear", minYear)
    if (maxYear) p.set("maxYear", maxYear)
    if (maxPrice) p.set("maxPrice", maxPrice)
    if (maxMiles) p.set("maxMiles", maxMiles)
    if (fuelType !== "All") p.set("fuel", fuelType)
    if (condition !== "All") p.set("condition", condition)
    router.replace(`${pathname}?${p.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchQuery,
    selectedBrand,
    minYear,
    maxYear,
    maxPrice,
    maxMiles,
    fuelType,
    condition,
  ])

  const hasActiveFilters =
    !!searchQuery ||
    selectedBrand !== "All" ||
    !!minYear ||
    !!maxYear ||
    !!maxPrice ||
    !!maxMiles ||
    fuelType !== "All" ||
    condition !== "All"

  const resetAll = () => {
    setSearchQuery("")
    setSelectedBrand("All")
    setMinYear("")
    setMaxYear("")
    setMaxPrice("")
    setMaxMiles("")
    setFuelType("All")
    setCondition("All")
  }

  return (
    <section className="relative z-10 w-full px-6 pt-8 pb-32 md:px-8">
      {/* Sales Machine Trust Bar */}
      <div className="mx-auto mb-12 max-w-[1400px] rounded-3xl border border-white/5 bg-white/2 p-8 md:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle size={20} />
            </div>
            <div>
              <h4 className="mb-1 text-xs font-black tracking-widest text-white uppercase">
                Verified History
              </h4>
              <p className="text-[10px] leading-relaxed font-medium text-white/30">
                Every car is checked for hidden mechanical faults. We don&apos;t
                sell &lsquo;problem&rsquo; cars.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="mb-1 text-xs font-black tracking-widest text-white uppercase">
                Ready To Go
              </h4>
              <p className="text-[10px] leading-relaxed font-medium text-white/30">
                Papers are in order, engine is serviced. Pick your car and drive
                it home today.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
              <MessageSquare size={20} />
            </div>
            <div>
              <h4 className="mb-1 text-xs font-black tracking-widest text-white uppercase">
                Full Transparency
              </h4>
              <p className="text-[10px] leading-relaxed font-medium text-white/30">
                Ask any question on WhatsApp. We will tell you exactly what you
                need to know.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 lg:flex-row">
        <aside className="hidden w-72 shrink-0 lg:block">
          <ListingSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            brands={allBrands}
            minYear={minYear}
            setMinYear={setMinYear}
            maxYear={maxYear}
            setMaxYear={setMaxYear}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            maxMiles={maxMiles}
            setMaxMiles={setMaxMiles}
            fuelType={fuelType}
            setFuelType={setFuelType}
            fuels={allFuels}
            condition={condition}
            setCondition={setCondition}
            hasActiveFilters={hasActiveFilters}
            onReset={resetAll}
          />
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-6 flex items-center gap-3 border-b border-white/5 pb-5">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-black tracking-widest text-white uppercase lg:hidden"
            >
              <SlidersHorizontal size={13} />
              Filters
              {hasActiveFilters && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-black text-black">
                  !
                </span>
              )}
            </button>

            <span className="hidden text-[10px] font-bold tracking-widest text-white/40 uppercase sm:block">
              {isLoading ? "Loading…" : `${vehicles.length} vehicles`}
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetAll}
                className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black tracking-widest text-white/50 uppercase transition-all hover:text-white lg:flex"
              >
                <X size={10} /> Clear Filters
              </button>
            )}

            <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 lg:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center justify-center rounded-lg p-2 transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center justify-center rounded-lg p-2 transition-all ${
                  viewMode === "list"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <Rows size={14} />
              </button>
            </div>

            <div className="relative z-40 ml-auto">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[10px] font-black tracking-widest text-white uppercase transition-all hover:bg-white/8"
              >
                Sort By: {sortOpt.label}
                <ChevronDown
                  size={13}
                  className={`text-white/40 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1a] shadow-2xl"
                  >
                    {SORT_OPTIONS.map((opt, i) => (
                      <button
                        key={opt.label}
                        onClick={() => {
                          setSortIndex(i)
                          setIsSortOpen(false)
                        }}
                        className={`w-full px-5 py-3.5 text-left text-[10px] font-black tracking-widest uppercase transition-colors ${
                          i === sortIndex
                            ? "bg-white/8 text-white"
                            : "text-white/40 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {isLoading ? (
            <div className="flex w-full flex-col items-center justify-center py-40">
              <Loader2 className="h-10 w-10 animate-spin text-white/20" />
              <p className="mt-4 text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">
                Accessing Archive…
              </p>
            </div>
          ) : error ? (
            <div className="flex w-full flex-col items-center justify-center py-40 text-center">
              <p className="text-2xl font-black tracking-tighter text-white uppercase">
                Archive Offline
              </p>
              <p className="mt-2 text-xs text-white/30">{error}</p>
              <button
                onClick={fetch}
                className="mt-6 rounded-full border border-white/10 px-6 py-2 text-[10px] font-black tracking-widest text-white/50 uppercase hover:text-white"
              >
                Retry
              </button>
            </div>
          ) : vehicles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex w-full flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/2 px-6 py-40 text-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <Search size={32} className="text-white/20" />
              </div>
              <p className="text-2xl font-black tracking-tighter text-white uppercase">
                Don&apos;t worry, we can find it.
              </p>
              <p className="mt-4 max-w-sm text-xs leading-relaxed font-medium text-white/35">
                If the exact car you want isn&apos;t here, we will find it for
                you from our trusted sources. No stories, no mechanical
                surprises.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/2347077195098?text=I'm looking for a specific car that isn't on your site. Can you help me find a reliable one?"
                  className="rounded-full bg-white px-8 py-3.5 text-[10px] font-black tracking-widest text-black uppercase transition-all hover:bg-white/90"
                >
                  Tell Us On WhatsApp
                </a>
                {hasActiveFilters && (
                  <button
                    onClick={resetAll}
                    className="rounded-full border border-white/10 px-8 py-3.5 text-[10px] font-black tracking-widest text-white/50 uppercase hover:text-white"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={
                viewMode === "list"
                  ? "flex flex-col gap-4"
                  : "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              }
            >
              <AnimatePresence>
                {vehicles.map((v, i) => (
                  <ListingCard
                    key={v.id}
                    vehicle={v}
                    index={i}
                    view={viewMode}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-[#0a0f1a] p-6 shadow-2xl lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-black tracking-widest text-white uppercase">
                  Filters
                </span>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-white/40 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <ListingSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                brands={allBrands}
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                maxMiles={maxMiles}
                setMaxMiles={setMaxMiles}
                fuelType={fuelType}
                setFuelType={setFuelType}
                fuels={allFuels}
                condition={condition}
                setCondition={setCondition}
                hasActiveFilters={hasActiveFilters}
                onReset={resetAll}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

function mapCar(car: Car) {
  const primaryImg =
    car.images && car.images.length > 0
      ? (car.images.find((i) => i.is_primary)?.url ??
        car.images.find((i) => i.is_primary)?.image_path ??
        car.images[0].url ??
        car.images[0].image_path)
      : car.primary_image || car.image || "/images/card/card-1.jpg"

  return {
    id: car.id,
    slug: generateCarSlug(car),
    name: `${car.make} ${car.model}`,
    brand: car.make.toUpperCase(),
    price: fmtPrice(car.price),
    mileage: fmtMileage(car.mileage),
    year: car.year.toString(),
    fuel: car.fuel_type || "Petrol",
    transmission: car.transmission || "Automatic",
    image: getAssetUrl(primaryImg),
    badge: car.featured ? "Featured" : car.status || "Available",
    featured: !!car.featured,
    color: car.color ?? null,
    bodyType: car.body_type ?? null,
    condition: car.condition ?? null,
    status: car.status ?? null,
    vin: car.vin ?? null,
    description: car.description ?? null,
    imagesCount: car.images?.length ?? (car.image ? 1 : 0),
  }
}
