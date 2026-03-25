import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react"

interface ListingFiltersProps {
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedBrand: string
  setSelectedBrand: (b: string) => void
  brands: string[]
}

export function ListingFilters({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  brands,
}: ListingFiltersProps) {
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsBrandDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative z-30 mb-10 flex w-full flex-col gap-4 border-b border-white/5 pt-8 pb-6 lg:flex-row">
      {/* Search Bar */}
      <div className="group relative flex-1">
        <Search
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-white"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by model, specs or features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-3.5 pr-10 pl-12 text-sm text-white transition-all placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-white/30 hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters Group */}
      <div className="flex items-center gap-3">
        {/* Advanced Filters Button (Placeholder for future) */}
        <button className="flex hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-xs font-bold tracking-widest text-white/70 uppercase transition-colors hover:bg-white/[0.06] sm:flex">
          <SlidersHorizontal size={14} />
          Filters
        </button>

        {/* Scalable Brand Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
            className={`flex w-[200px] items-center justify-between rounded-xl border px-5 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors ${
              isBrandDropdownOpen || selectedBrand !== "All"
                ? "border-white/30 bg-white/[0.06] text-white"
                : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.06]"
            }`}
          >
            <span className="truncate">
              {selectedBrand === "All" ? "All Marques" : selectedBrand}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isBrandDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isBrandDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="modern-scrollbar absolute top-full right-0 z-50 mt-2 max-h-[400px] w-64 overflow-x-hidden overflow-y-auto rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl"
              >
                <div className="flex flex-col p-2">
                  {/* Option: All */}
                  <button
                    onClick={() => {
                      setSelectedBrand("All")
                      setIsBrandDropdownOpen(false)
                    }}
                    className={`rounded-lg px-4 py-3 text-left text-xs font-bold tracking-widest uppercase transition-colors ${
                      selectedBrand === "All"
                        ? "bg-white text-black"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    All Marques
                  </button>

                  {/* Search within dropdown if there are many options */}
                  {brands.length > 8 && (
                    <div className="my-2 px-2">
                      <div className="mb-2 h-px w-full bg-white/5" />
                      <span className="mb-2 ml-2 block text-[9px] tracking-widest text-white/30 uppercase">
                        Marques ({brands.length})
                      </span>
                    </div>
                  )}

                  {/* Options: Brands */}
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand)
                        setIsBrandDropdownOpen(false)
                      }}
                      className={`rounded-lg px-4 py-3 text-left text-xs font-bold tracking-widest uppercase transition-colors ${
                        selectedBrand === brand
                          ? "bg-white text-black"
                          : "text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
