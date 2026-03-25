"use client"

import { ListingHero } from "@/components/listing/listing-hero"
import { ListingClient } from "@/components/listing/listing-client"
import { Suspense } from "react"

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-bg-base">
      <ListingHero />
      <div className="relative z-10 flex flex-col gap-0 bg-bg-base shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
        <Suspense
          fallback={
            <div className="min-h-screen py-32 text-center text-xs font-bold tracking-widest text-white/50 uppercase">
              Loading Inventory...
            </div>
          }
        >
          <ListingClient />
        </Suspense>
      </div>
    </main>
  )
}
