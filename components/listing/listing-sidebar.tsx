"use client"

import { Search, ChevronDown, Check, RotateCcw } from "lucide-react"
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
  fuelType: string
  setFuelType: (f: string) => void
  fuels: string[]
  condition: string
  setCondition: (c: string) => void
  hasActiveFilters: boolean
  onReset: () => void
}

const CONDITIONS = ["All", "New", "Used", "Certified Pre-Owned"]

export function ListingSidebar({
  searchQuery, setSearchQuery,
  selectedBrand, setSelectedBrand,
  brands,
  minYear, setMinYear,
  maxYear, setMaxYear,
  maxPrice, setMaxPrice,
  maxMiles, setMaxMiles,
  fuelType, setFuelType,
  fuels,
  condition, setCondition,
  hasActiveFilters, onReset,
}: ListingSidebarProps) {
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [fuelOpen, setFuelOpen] = useState(false)
  const [condOpen, setCondOpen] = useState(false)

  return (
    <div className="sticky top-24 flex w-full flex-col gap-6">

      <div className="group relative">
        <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-white" size={15} />
        <input
          type="text"
          placeholder="Search make, model…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/8 bg-white/3 py-3 pr-4 pl-11 text-sm text-white transition-all placeholder:text-white/25 focus:border-white/20 focus:bg-white/5 focus:outline-none"
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 text-[9px] font-black tracking-widest text-white/50 uppercase transition-all hover:border-white/20 hover:text-white"
        >
          <RotateCcw size={10} />
          Reset All Filters
        </button>
      )}

      <FilterSection label="Make / Marque" isOpen={brandsOpen} setOpen={setBrandsOpen}>
        <div className="flex max-h-56 flex-col gap-0.5 overflow-y-auto pr-1 custom-scrollbar">
          {(brands.length ? brands : ["All"]).map((b) => (
            <FilterOption
              key={b}
              label={b === "All" ? "All Marques" : b}
              active={selectedBrand === b}
              onClick={() => setSelectedBrand(b)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Fuel Type" isOpen={fuelOpen} setOpen={setFuelOpen}>
        <div className="flex flex-col gap-0.5">
          {(fuels.length ? fuels : ["All"]).map((f) => (
            <FilterOption
              key={f}
              label={f === "All" ? "All Types" : f}
              active={fuelType === f}
              onClick={() => setFuelType(f)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection label="Condition" isOpen={condOpen} setOpen={setCondOpen}>
        <div className="flex flex-col gap-0.5">
          {CONDITIONS.map((c) => (
            <FilterOption
              key={c}
              label={c}
              active={condition === c}
              onClick={() => setCondition(c)}
            />
          ))}
        </div>
      </FilterSection>

      <div className="border-t border-white/5 pt-5">
        <h3 className="mb-3 text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">Year</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="w-1/2 [appearance:textfield] rounded-xl border border-white/8 bg-white/3 px-3 py-2.5 text-center text-xs text-white placeholder:text-white/25 focus:border-white/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-white/20">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            className="w-1/2 [appearance:textfield] rounded-xl border border-white/8 bg-white/3 px-3 py-2.5 text-center text-xs text-white placeholder:text-white/25 focus:border-white/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      <div className="border-t border-white/5 pt-5">
        <h3 className="mb-3 text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">Max Price (₦)</h3>
        <input
          type="number"
          placeholder="e.g. 500,000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full [appearance:textfield] rounded-xl border border-white/8 bg-white/3 px-4 py-2.5 text-center text-xs text-white placeholder:text-white/25 focus:border-white/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>

      <div className="border-t border-white/5 pt-5">
        <h3 className="mb-3 text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">Max Mileage (mi)</h3>
        <input
          type="number"
          placeholder="e.g. 50,000"
          value={maxMiles}
          onChange={(e) => setMaxMiles(e.target.value)}
          className="w-full [appearance:textfield] rounded-xl border border-white/8 bg-white/3 px-4 py-2.5 text-center text-xs text-white placeholder:text-white/25 focus:border-white/20 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    </div>
  )
}

function FilterSection({
  label, isOpen, setOpen, children,
}: {
  label: string
  isOpen: boolean
  setOpen: (v: boolean) => void
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-white/5 pt-5">
      <button
        onClick={() => setOpen(!isOpen)}
        className="group mb-3 flex w-full items-center justify-between"
      >
        <span className="text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">{label}</span>
        <ChevronDown
          size={13}
          className={`text-white/30 transition-transform duration-300 group-hover:text-white ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterOption({
  label, active, onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all ${
        active
          ? "bg-white text-black"
          : "text-white/50 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="truncate">{label}</span>
      {active && <Check size={12} />}
    </button>
  )
}
