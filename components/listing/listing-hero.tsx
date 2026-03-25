"use client"

export function ListingHero() {
  return (
    <section className="relative z-20 w-full border-b border-white/5 bg-bg-base pt-32 pb-8">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col gap-2">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-[2px] w-8 bg-white" />
            <span className="text-[10px] font-black tracking-[0.3em] text-white/50 uppercase">
              Inventory
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase md:text-5xl">
            Available Vehicles
          </h1>
        </div>
      </div>
    </section>
  )
}
