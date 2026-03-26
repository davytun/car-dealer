import { ListingHero } from "@/components/listing/listing-hero"
import { ListingClient } from "@/components/listing/listing-client"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export default function ListingPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#020617]">
      <ListingHero />
      <div className="relative z-10 bg-[#020617]">
        <Suspense
          fallback={
            <div className="flex min-h-screen flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-white/20" />
              <p className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">
                Loading Inventory…
              </p>
            </div>
          }
        >
          <ListingClient />
        </Suspense>
      </div>
    </main>
  )
}
