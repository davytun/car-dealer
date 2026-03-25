import { Search, ChevronDown, Check } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ListingSidebarProps {
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedBrand: string
  setSelectedBrand: (b: string) => void
  brands: string[]
  minYear: string
  setMinYear: (y: string) => void
  maxYear: string
  setMaxYear: (y: string) => void
  maxPrice: string
  setMaxPrice: (p: string) => void
  maxMiles: string
  setMaxMiles: (m: string) => void
}

export function ListingSidebar({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  brands,
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  maxPrice,
  setMaxPrice,
  maxMiles,
  setMaxMiles,
}: ListingSidebarProps) {
  const [isBrandsOpen, setIsBrandsOpen] = useState(true)

  return (
    <div className="sticky top-24 flex w-full flex-col gap-8">
      {/* Search Module */}
      <div>
        <h3 className="mb-4 text-xs font-black tracking-widest text-white uppercase">
          Search
        </h3>
        <div className="group relative">
          <Search
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-white"
            size={16}
          />
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/2 py-3 pr-4 pl-12 text-sm text-white transition-all placeholder:text-white/30 focus:border-white/30 focus:bg-white/4 focus:outline-none"
          />
        </div>
      </div>

      {/* Brands Accordion */}
      <div className="border-t border-white/5 pt-6">
        <button
          onClick={() => setIsBrandsOpen(!isBrandsOpen)}
          className="group mb-4 flex w-full items-center justify-between text-xs font-black tracking-widest text-white uppercase"
        >
          Categories / Marques
          <ChevronDown
            size={14}
            className={`text-white/40 transition-transform duration-300 group-hover:text-white ${isBrandsOpen ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isBrandsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="modern-scrollbar flex max-h-[400px] flex-col gap-1 overflow-y-auto pt-2 pr-2">
                <button
                  onClick={() => setSelectedBrand("All")}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold tracking-widest uppercase transition-all ${
                    selectedBrand === "All"
                      ? "bg-white text-black"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>All Marques</span>
                  {selectedBrand === "All" && <Check size={14} />}
                </button>

                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-bold tracking-widest uppercase transition-all ${
                      selectedBrand === brand
                        ? "bg-white text-black"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{brand}</span>
                    {selectedBrand === brand && <Check size={14} />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Other placeholders for scalable filters (Year, Price, etc) */}
      <div className="border-t border-white/5 pt-6">
        <h3 className="mb-4 text-xs font-black tracking-widest text-white uppercase">
          Year
        </h3>
        <div className="flex w-full gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="w-1/2 [appearance:textfield] rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-center text-sm text-white transition-all placeholder:text-white/30 focus:border-white/30 focus:bg-white/4 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="mb-1 flex items-center font-bold text-white/30">
            -
          </span>
          <input
            type="number"
            placeholder="Max"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            className="w-1/2 [appearance:textfield] rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-center text-sm text-white transition-all placeholder:text-white/30 focus:border-white/30 focus:bg-white/4 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* Max Price Filter */}
      <div className="border-t border-white/5 pt-6">
        <h3 className="mb-4 text-xs font-black tracking-widest text-white uppercase">
          Max Price ($)
        </h3>
        <input
          type="number"
          placeholder="e.g. 500000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full [appearance:textfield] rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-center text-sm text-white transition-all placeholder:text-white/30 focus:border-white/30 focus:bg-white/4 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      {/* Max Miles Filter */}
      <div className="border-t border-white/5 pt-6">
        <h3 className="mb-4 text-xs font-black tracking-widest text-white uppercase">
          Max Mileage (mi)
        </h3>
        <input
          type="number"
          placeholder="e.g. 10000"
          value={maxMiles}
          onChange={(e) => setMaxMiles(e.target.value)}
          className="w-full [appearance:textfield] rounded-xl border border-white/10 bg-white/2 px-4 py-3 text-center text-sm text-white transition-all placeholder:text-white/30 focus:border-white/30 focus:bg-white/4 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    </div>
  )
}
