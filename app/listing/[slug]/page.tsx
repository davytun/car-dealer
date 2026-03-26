import { getCarById, getCars, extractIdFromSlug, generateCarSlug, getAssetUrl } from "@/lib/api"
import { Car } from "@/lib/api/types"
import {
  ArrowLeft,
  Gauge,
  Zap,
  CalendarDays,
  Check,
  Palette,
  Car as CarIcon,
  Hash,
  Star,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { AcquisitionPanel } from "@/components/listing/acquisition-panel"
import { VehicleGallery } from "@/components/listing/vehicle-gallery"

const fmt = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price)

export default async function ListingDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const id = extractIdFromSlug(slug)
  if (!id) notFound()

  let vehicleResponse
  try {
    vehicleResponse = await getCarById(id)
  } catch {
    notFound()
  }

  if (!vehicleResponse?.success || !vehicleResponse.data) notFound()

  const car: Car = vehicleResponse.data

  const images: string[] =
    car.images && car.images.length > 0
      ? car.images.map((img) => getAssetUrl(img.url || img.image_path))
      : car.primary_image || car.image
      ? [getAssetUrl((car.primary_image || car.image) as string)]
      : ["/images/card/card-1.jpg"]

  const vehicle = {
    id: car.id,
    slug: generateCarSlug(car),
    name: `${car.make} ${car.model}`,
    brand: car.make.toUpperCase(),
    price: fmt(car.price),
    priceRaw: car.price,
    monthlyPrice: fmt(Math.round(car.price / 60)) + "/mo",
    mileage:
      car.mileage != null
        ? typeof car.mileage === "number"
          ? car.mileage.toLocaleString() + " mi"
          : car.mileage
        : "N/A",
    year: car.year.toString(),
    fuel: car.fuel_type || "Petrol",
    transmission: car.transmission || "Automatic",
    color: car.color || null,
    bodyType: car.body_type || null,
    vin: car.vin || null,
    condition: car.condition || null,
    description: car.description || null,
    status: car.status || "Available",
    badge: car.featured ? "Featured" : car.status || "Available",
    images,
  }

  let related: Car[] = []
  try {
    const res = await getCars({ make: car.make, per_page: 4 })
    if (res.success && res.data) {
      related = res.data.filter((c) => c.id !== car.id).slice(0, 3)
    }
  } catch { }


  const specs = [
    { icon: Gauge, label: "Odometer", value: vehicle.mileage },
    { icon: CalendarDays, label: "Year", value: vehicle.year },
    { icon: Zap, label: "Powertrain", value: vehicle.fuel },
    { icon: CarIcon, label: "Transmission", value: vehicle.transmission },
    ...(vehicle.color ? [{ icon: Palette, label: "Exterior Color", value: vehicle.color }] : []),
    ...(vehicle.bodyType ? [{ icon: CarIcon, label: "Body Style", value: vehicle.bodyType }] : []),
    ...(vehicle.condition ? [{ icon: Star, label: "Condition", value: vehicle.condition }] : []),
    ...(vehicle.vin
      ? [{ icon: Hash, label: "VIN", value: vehicle.vin.slice(0, 8) + "…" }]
      : []),
  ]

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-white/20">
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
            Collection
          </span>
        </Link>
      </div>

      <section className="relative h-[88vh] w-full overflow-hidden">
        <VehicleGallery images={vehicle.images} alt={vehicle.name} />

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-6 pb-10 md:px-12 md:pb-14">
          <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 md:flex-row md:items-end">
            {/* Left — name */}
            <div>
              <span className="mb-3 block text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">
                {vehicle.brand} · {vehicle.badge} · {vehicle.year}
              </span>
              <h1 className="text-5xl leading-[0.85] font-black tracking-tighter text-white uppercase md:text-7xl lg:text-[6.5rem]">
                {vehicle.name.replace(new RegExp(`^${car.make}\\s*`, "i"), "").trim() || vehicle.name}
              </h1>
            </div>
            {/* Right — price (desktop only) */}
            <div className="hidden flex-col items-end text-right lg:flex">
              <span className="mb-2 text-[9px] font-black tracking-[0.3em] text-white/30 uppercase">
                Asking Price
              </span>
              <span className="text-4xl font-black tracking-tighter text-white lg:text-5xl">
                {vehicle.price}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-6 mb-20 max-w-[1600px] px-6 md:px-12">
        <div
          className={`grid gap-4 ${
            specs.length <= 4
              ? "grid-cols-2 md:grid-cols-4"
              : "grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
          }`}
        >
          {specs.map((spec, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-[#0F172A]/60 p-6 shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1 md:p-7"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70">
                <spec.icon size={16} strokeWidth={2.5} />
              </div>
              <div>
                <div className="mb-1 text-[8px] font-black tracking-[0.25em] text-white/30 uppercase">
                  {spec.label}
                </div>
                <div className="text-base font-black tracking-tight text-white md:text-lg">
                  {spec.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-20 mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 pb-32 md:px-12 lg:grid-cols-12 lg:gap-24">
        <div className="flex flex-col gap-20 lg:col-span-8">

          {vehicle.description && (
            <div>
              <SectionHeader title="About This" accent="Vehicle" />
              <p className="text-base leading-loose text-white/50 md:text-lg">
                {vehicle.description}
              </p>
            </div>
          )}

          <div>
            <SectionHeader title="Technical" accent="Specifications" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { key: "Make", val: car.make },
                { key: "Model", val: car.model },
                { key: "Year", val: vehicle.year },
                { key: "Fuel Type", val: vehicle.fuel },
                { key: "Transmission", val: vehicle.transmission },
                ...(vehicle.color ? [{ key: "Color", val: vehicle.color }] : []),
                ...(vehicle.bodyType ? [{ key: "Body Type", val: vehicle.bodyType }] : []),
                ...(vehicle.condition ? [{ key: "Condition", val: vehicle.condition }] : []),
                ...(vehicle.vin ? [{ key: "VIN", val: vehicle.vin }] : []),
                { key: "Mileage", val: vehicle.mileage },
                { key: "Status", val: vehicle.status },
              ].map(({ key, val }, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/2 p-7 transition-colors hover:bg-white/5"
                >
                  <div className="pointer-events-none absolute top-0 right-0 p-5 text-5xl font-black tracking-tighter text-white/4 transition-colors group-hover:text-white/8">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="mb-2 text-[9px] font-black tracking-[0.3em] text-white/30 uppercase">
                    {key}
                  </span>
                  <span className="text-xl font-black tracking-tight text-white capitalize">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          <div>
            <SectionHeader title="Concierge" accent="Benefits" />
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  className="flex gap-4 rounded-3xl border border-white/5 bg-gradient-to-br from-white/3 to-transparent p-6"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <Check size={15} strokeWidth={3} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-black tracking-widest text-white uppercase">
                      {item.title}
                    </span>
                    <span className="text-xs leading-relaxed text-white/40">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 && (
            <>
              <div className="h-px w-full bg-white/5" />
              <div>
                <SectionHeader title="More From" accent={vehicle.brand} />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((rel) => {
                    const relSlug = generateCarSlug(rel)
                    const relImg =
                      rel.images && rel.images.length > 0
                        ? getAssetUrl(rel.images[0].image_path)
                        : getAssetUrl(rel.image)
                    return (
                      <Link
                        key={rel.id}
                        href={`/listing/${relSlug}`}
                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/3 transition-all hover:border-white/15 hover:-translate-y-1"
                      >
                        <div className="relative h-40 w-full overflow-hidden">
                          <Image
                            src={relImg}
                            alt={`${rel.make} ${rel.model}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-[#020617]/80 to-transparent" />
                        </div>
                        <div className="p-5">
                          <div className="mb-1 text-[9px] font-black tracking-[0.25em] text-white/30 uppercase">
                            {rel.year} · {rel.fuel_type || "Petrol"}
                          </div>
                          <div className="mb-3 text-sm font-black tracking-tight text-white">
                            {rel.make} {rel.model}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-white/80">
                              {fmt(rel.price)}
                            </span>
                            <ChevronRight
                              size={14}
                              className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white"
                            />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative lg:col-span-4">
          <AcquisitionPanel vehicle={vehicle} />
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#020617]/90 p-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] font-black tracking-[0.2em] text-white/30 uppercase">
              Price
            </span>
            <span className="text-lg font-black tracking-tighter text-white">
              {vehicle.price}
            </span>
          </div>
          <a
            href="#inquire"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-4 text-[10px] font-black tracking-[0.2em] text-black uppercase shadow-xl transition-all hover:bg-[#f0f0f0] active:scale-[0.98]"
          >
            Inquire to Purchase
            <ChevronRight size={14} strokeWidth={3} />
          </a>
        </div>
      </div>
    </main>
  )
}

// Section header sub-component
function SectionHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="mb-10 flex items-center gap-6">
      <h2 className="text-2xl font-black tracking-tighter uppercase md:text-4xl">
        {title}
        <br />
        <span className="text-white/25">{accent}</span>
      </h2>
      <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
    </div>
  )
}
