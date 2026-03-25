import { LUXURY_INVENTORY } from "@/lib/data/inventory"
import {
  ArrowLeft,
  Gauge,
  Zap,
  Loader2,
  CalendarDays,
  Heart,
  Share2,
  ShieldCheck,
  Check,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ListingDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Find vehicle by slug
  const vehicle = LUXURY_INVENTORY.find((v) => v.slug === slug)

  if (!vehicle) {
    notFound()
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-bg-base pt-20 text-white selection:bg-white/20">
      {/* ── TOP NAVIGATION ────────────────────────────────────────────── */}
      <div className="fixed top-24 left-6 z-50 md:left-12">
        <Link
          href="/listing"
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-white/70 shadow-2xl backdrop-blur-xl transition-all hover:bg-white hover:text-black"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">
            Return to Collection
          </span>
        </Link>
      </div>

      {/* ── IMMERSIVE PARALLAX HERO ────────────────────────────────────── */}
      <section className="relative flex h-[90vh] w-full items-end pb-32">
        <div className="absolute inset-0 z-0">
          {/* Fixed attachment for native CSS parallax */}
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat lg:bg-fixed"
            style={{ backgroundImage: `url(${vehicle.image})` }}
          />
          {/* Gradient Overlays for readability and mood */}
          <div className="absolute inset-0 z-10 bg-linear-to-t from-bg-base via-bg-base/60 to-transparent" />
          <div className="absolute inset-0 z-10 bg-black/20" />
          <div className="absolute inset-0 z-10 bg-linear-to-b from-bg-base/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-20 mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-8 px-6 md:flex-row md:items-end md:px-12">
          <div className="flex flex-col">
            <span className="mb-4 inline-block text-[11px] font-black tracking-[0.4em] text-white/50 uppercase">
              {vehicle.brand} • {vehicle.badge} • {vehicle.year}
            </span>
            <h1 className="text-5xl leading-[0.85] font-black tracking-tighter text-white uppercase md:text-7xl lg:text-[7rem]">
              {vehicle.name.replace(vehicle.brand, "").trim()}
            </h1>
          </div>

          {/* Quick Price display in hero on large screens */}
          <div className="hidden flex-col items-end text-right lg:flex">
            <span className="mb-2 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
              Asking Price
            </span>
            <span className="text-4xl font-black tracking-tighter text-white lg:text-5xl">
              {vehicle.price}
            </span>
          </div>
        </div>
      </section>

      {/* ── BENTO BOX SPECS GRID ──────────────────────────────────────── */}
      <section className="relative z-20 mx-auto -mt-16 mb-24 max-w-[1600px] px-6 md:px-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[
            { icon: Gauge, label: "Odometer", value: vehicle.mileage },
            { icon: CalendarDays, label: "Model Year", value: vehicle.year },
            { icon: Zap, label: "Powertrain", value: vehicle.fuel },
            {
              icon: Loader2,
              label: "Transmission",
              value: vehicle.transmission,
            },
          ].map((spec, i) => (
            <div
              key={i}
              className="flex transform flex-col gap-4 rounded-4xl border border-white/5 bg-bg-surface/40 p-6 shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-2 md:p-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white">
                <spec.icon size={18} strokeWidth={2.5} />
              </div>
              <div>
                <div className="mb-1 text-[9px] font-black tracking-[0.2em] text-white/30 uppercase">
                  {spec.label}
                </div>
                <div className="text-lg font-black tracking-tight text-white md:text-xl">
                  {spec.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL CONTENT LAYOUT ───────────────────────────────────── */}
      <section className="relative z-20 mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 pb-32 md:px-12 lg:grid-cols-12 lg:gap-24">
        {/* Left Column: Details & Technicals */}
        <div className="flex flex-col gap-24 lg:col-span-8">
          {/* Engineering & Performance Specs */}
          <div>
            <div className="mb-12 flex items-center gap-6">
              <h2 className="text-3xl font-black tracking-tighter uppercase md:text-5xl">
                Technical
                <br />
                <span className="text-white/30">Specifications</span>
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(vehicle.details).map(([key, val], i) => (
                <div
                  key={i}
                  className="group relative flex flex-col overflow-hidden rounded-4xl border border-white/5 bg-bg-surface/20 p-8 transition-colors hover:bg-white/5"
                >
                  <div className="pointer-events-none absolute top-0 right-0 p-6 text-6xl font-black tracking-tighter text-white/5 transition-colors group-hover:text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="relative z-10 mb-3 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
                    {key}
                  </span>
                  <span className="relative z-10 text-2xl font-black tracking-tight text-white">
                    {val as string}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-white/5"></div>

          {/* Premium Features & Certification */}
          <div>
            <div className="mb-12 flex items-center gap-6">
              <h2 className="text-3xl font-black tracking-tighter uppercase md:text-5xl">
                Concierge
                <br />
                <span className="text-white/30">Benefits</span>
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent"></div>
            </div>

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                {
                  title: "150-Point Inspection",
                  desc: "Rigorous mechanical and cosmetic evaluation by certified technicians.",
                },
                {
                  title: "Clean Title & History",
                  desc: "Fully vetted provenance with comprehensive documentation.",
                },
                {
                  title: "Extended Warranty",
                  desc: "Available bespoke protection plans for complete peace of mind.",
                },
                {
                  title: "White-Glove Delivery",
                  desc: "Nationwide enclosed transport directly to your residence.",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-5 rounded-4xl border border-white/5 bg-linear-to-br from-white/2 to-transparent p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-black tracking-widest text-white uppercase">
                      {item.title}
                    </span>
                    <span className="text-xs leading-relaxed font-medium text-white/50">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Acquisition Panel */}
        <div className="relative lg:col-span-4">
          <div className="sticky top-32 flex flex-col rounded-[2.5rem] border border-white/10 bg-bg-surface/80 p-8 shadow-[0_32px_64px_rgba(0,0,0,0.8)] backdrop-blur-3xl md:p-10">
            <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-[50px]" />

            {/* Price Header */}
            <div className="relative z-10 mb-10">
              <span className="mb-3 block text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
                Acquisition Value
              </span>
              <div className="mb-2 text-5xl font-black tracking-tighter text-white lg:text-6xl">
                {vehicle.price}
              </div>
              {vehicle.monthlyPrice !== "POA" && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/70">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  Finance from {vehicle.monthlyPrice}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="relative z-10 flex flex-col gap-4">
              <button className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-xs font-black tracking-[0.2em] text-black uppercase shadow-xl transition-all duration-300 hover:bg-[#f0f0f0] active:scale-[0.98]">
                Inquire to Purchase
                <ChevronRight
                  size={16}
                  strokeWidth={3}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-[10px] font-black tracking-widest text-white uppercase transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-lg">
                  <Heart size={14} /> Save
                </button>
                <button className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-[10px] font-black tracking-widest text-white uppercase transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-lg">
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="relative z-10 mt-12 flex flex-col gap-6 border-t border-white/5 pt-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <ShieldCheck size={18} className="text-white/70" />
                </div>
                <div>
                  <h4 className="mb-1.5 text-[10px] font-black tracking-[0.2em] text-white uppercase">
                    Secure Transaction
                  </h4>
                  <p className="text-[11px] leading-relaxed font-medium text-white/40">
                    Your payment and personal information are protected by
                    bank-level encryption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
