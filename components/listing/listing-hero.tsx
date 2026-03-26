"use client"

export function ListingHero() {
  return (
    <section className="relative z-20 w-full border-b border-white/5 bg-[#020617] pt-32 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[2px] w-6 bg-white/40" />
              <span className="text-[9px] font-black tracking-[0.4em] text-white/40 uppercase">
                Ignite Luxury · Vehicle Inventory
              </span>
            </div>
            <h1 className="text-4xl font-black leading-none tracking-tighter text-white uppercase md:text-6xl">
              The Collection
            </h1>
          </div>

          <p className="max-w-xs text-xs leading-relaxed text-white/30 md:text-right">
            Curated acquisitions, rigorously inspected and ready for immediate ownership.
          </p>
        </div>
      </div>
    </section>
  )
}
