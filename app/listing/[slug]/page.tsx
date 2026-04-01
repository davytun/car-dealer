import {
  getCarById,
  getCars,
  extractIdFromSlug,
  generateCarSlug,
  getAssetUrl,
} from "@/lib/api"
import { Car } from "@/lib/api/types"
import {
  ArrowLeft,
  Gauge,
  Zap,
  Palette,
  Car as CarIcon,
  Hash,
  Star,
  ChevronRight,
  MessageSquare,
  CheckCircle,
  ShieldCheck,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { AcquisitionPanel } from "@/components/listing/acquisition-panel"
import { VehicleGallery } from "@/components/listing/vehicle-gallery"
import { StickyMobileFooter } from "@/components/listing/sticky-mobile-footer"
import { MotionDiv, MotionSpan } from "@/components/motion-wrappers"

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
  } catch {}

  const specs = [
    { icon: Gauge, label: "Mileage", value: vehicle.mileage },
    { icon: Calendar, label: "Year", value: vehicle.year },
    { icon: Zap, label: "Fuel Type", value: vehicle.fuel },
    { icon: CarIcon, label: "Gearbox", value: vehicle.transmission },
    ...(vehicle.color
      ? [{ icon: Palette, label: "Exterior Color", value: vehicle.color }]
      : []),
    ...(vehicle.bodyType
      ? [{ icon: CarIcon, label: "Body Style", value: vehicle.bodyType }]
      : []),
    ...(vehicle.condition
      ? [{ icon: Star, label: "Condition", value: vehicle.condition }]
      : []),
    ...(vehicle.vin
      ? [{ icon: Hash, label: "VIN", value: vehicle.vin.slice(0, 8) + "…" }]
      : []),
  ]

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020617] text-white selection:bg-white/20">
      <div className="fixed top-8 left-6 z-50 md:left-12">
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

      <section className="relative h-[70vh] w-full overflow-hidden md:h-[88vh]">
        <VehicleGallery images={vehicle.images} alt={vehicle.name} />

        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 px-6 pb-10 md:px-12 md:pb-14">
          <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 md:flex-row md:items-end">
            {/* Left — name *            {/* Ghost Background Title — 10x Cinematic Feel */}
            {/* Optional Ghost Watermark — Desktop only, subtle */}
            <div className="pointer-events-none absolute top-1/2 -left-12 z-0 hidden -translate-y-1/2 opacity-[0.03] select-none lg:block">
              <h2 className="text-[12rem] leading-none font-black tracking-tighter whitespace-nowrap text-white uppercase">
                {vehicle.brand}
              </h2>
            </div>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 max-w-2xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/10 bg-emerald-500/5 px-3 py-1.5 backdrop-blur-md">
                  <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">
                    Certified Quality
                  </span>
                </div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <span className="block text-lg font-black tracking-tighter text-white/40 uppercase md:text-2xl lg:text-3xl">
                  {vehicle.year} · {vehicle.brand}
                </span>
                <h1 className="text-3xl leading-none font-black tracking-normal text-white uppercase drop-shadow-2xl md:text-5xl lg:text-7xl xl:text-8xl">
                  {vehicle.name
                    .replace(new RegExp(`^${car.make}\\s*`, "i"), "")
                    .trim() || vehicle.name}
                </h1>
              </div>
            </MotionDiv>
            {/* Right — price (desktop only) */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="hidden flex-col items-end text-right lg:flex"
            >
              <div className="mb-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_32px_64px_rgba(0,0,0,0.4)] backdrop-blur-3xl">
                <span className="mb-2 block text-xs font-black tracking-[0.2em] text-emerald-400 uppercase">
                  Fixed & Fair Price
                </span>
                <span className="text-3xl font-black tracking-tighter text-white md:text-4xl lg:text-5xl">
                  {vehicle.price}
                </span>
                <div className="mt-4 flex items-center justify-end gap-2 text-emerald-400">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-[10px] leading-none font-black tracking-widest uppercase">
                    Inspected · Test Drive Available · No Hidden Charges
                  </span>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      <section className="relative z-30 mx-auto mb-12 max-w-[1600px] px-6 md:px-12 lg:-mt-12">
        <section className="group relative overflow-hidden rounded-4xl border border-white/10 bg-[#0F172A]/90 shadow-[0_32px_64px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
          {/* Shimmer Effect */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
          </div>
          <div className="relative z-10 grid grid-cols-2 divide-x divide-y divide-white/5 sm:grid-cols-3 lg:flex lg:flex-nowrap lg:items-stretch lg:justify-between lg:divide-y-0">
            {specs.map((spec, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                className="group/item flex flex-col items-center justify-center gap-2 p-4 text-center transition-all duration-500 hover:bg-white/3 md:p-6 lg:flex-1 lg:p-8"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/40 transition-all duration-500 group-hover/item:scale-110 group-hover/item:bg-emerald-500/10 group-hover/item:text-emerald-400 group-hover/item:shadow-[0_0_30px_rgba(16,185,129,0.2)] md:h-12 md:w-12">
                  <spec.icon size={16} strokeWidth={2} className="md:size-[20px]" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-black tracking-[0.2em] text-white/20 uppercase transition-colors group-hover/item:text-white/40">
                    {spec.label}
                  </div>
                  <div className="text-xs font-black tracking-tighter text-white transition-transform duration-500 group-hover/item:scale-105 md:text-base lg:text-lg">
                    {spec.value}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </section>
      </section>

      {/* Step 1 — DESIRE: Emotional Connection (Cinematic Open Layout) */}
      <section className="relative z-30 mx-auto mt-24 mb-24 max-w-[1600px] px-6 md:px-12 lg:mt-32">
        <div className="relative mx-auto max-w-5xl text-center md:text-left">
           {/* Cinematic Glow Backgrounds */}
           <div className="pointer-events-none absolute -top-[50%] -left-[20%] h-[200%] w-full rounded-full bg-emerald-500/5 blur-[120px]" />
           
           <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-4">
                 <div className="h-0.5 w-12 bg-linear-to-r from-emerald-500 to-transparent" />
                 <span className="text-xs font-black tracking-[0.2em] text-emerald-400 uppercase">The Experience</span>
              </div>
              <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl">
                Imagine dropping your <br className="hidden md:block" />
                kids at school yourself. <br />
                <span className="bg-linear-to-r from-emerald-400 to-emerald-100 bg-clip-text text-transparent">Visiting your clients <br className="hidden md:block" /> without stress.</span>
              </h2>
              <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/40 md:text-2xl md:leading-loose">
                Going anywhere, anytime, on your own terms. This {vehicle.year} {vehicle.name} isn't just a car; it's the freedom you've worked hard for. No more waiting for rides, no more Lagos road stress.
              </p>
           </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 pb-24 md:px-12 lg:grid-cols-12 lg:gap-24">
        <div className="flex flex-col gap-32 lg:col-span-8">
          {/* Step 2 — PROBLEM: Naming the Fear (Cinematic Open) */}
          <div className="relative">
            <div className="pointer-events-none absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-red-500/5 blur-[120px]" />
            
            <div className="relative z-10 space-y-12">
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 shadow-[0_15px_30px_rgba(239,68,68,0.15)]">
                     <Zap size={22} />
                  </div>
                  <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
                  <span className="text-xs font-black tracking-[0.2em] text-red-400/60 uppercase">The Reality of Used Cars</span>
               </div>
               
               <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                  <div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl">
                      We know the <br />
                      Lagos market <br />
                      <span className="text-red-400">is scary.</span>
                    </h2>
                  </div>
                  <div className="flex flex-col justify-center space-y-8">
                    <p className="text-xl leading-relaxed text-white/40 md:leading-loose">
                      You've heard the stories. Bad engines covered with thick oil. Hidden faults that show up two days later. Dealers who disappear the moment they collect your money. 
                    </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Step 3 — SOLUTION: The Answer (Cinematic Open) */}
          <div className="relative">
            <div className="pointer-events-none absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
            
            <div className="relative z-10 space-y-12">
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 shadow-[0_15px_30px_rgba(16,185,129,0.15)]">
                     <ShieldCheck size={22} />
                  </div>
                  <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
                  <span className="text-xs font-black tracking-[0.2em] text-emerald-400/60 uppercase">Our Commitment</span>
               </div>
               
               <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                  <div className="space-y-8">
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-5xl">
                      We believe you <br />
                      deserve <br />
                      <span className="text-white/30 tracking-widest">ABSOLUTE CERTAINTY.</span>
                    </h2>
                    <p className="text-xl leading-relaxed text-white/50 md:leading-loose">
                      Every car we sell is inspected by our lead engineers. Every price is final with no hidden charges. Most importantly, you test drive and verify everything before you pay a single Naira.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        title: "Legal Certainty",
                        desc: "Verified customs docs.",
                        icon: ShieldCheck,
                      },
                      {
                        title: "Mechanical Truth",
                        desc: "No hidden faults.",
                        icon: CheckCircle,
                      },
                      {
                        title: "Fixed Pride",
                        desc: "Fair, no-haggle prices.",
                        icon: Star,
                      },
                      {
                        title: "Lagos Clearance",
                        desc: "Original papers.",
                        icon: ShieldCheck,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-6 rounded-4xl border border-white/5 bg-white/2 p-6 transition-all hover:bg-white/5"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-emerald-400">
                          <item.icon size={20} strokeWidth={2} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black tracking-[0.2em] text-white uppercase">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-white/30">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          <div className="relative">
            <div className="mb-8 md:mb-10">
              <SectionHeader title="The Ignite" accent="Protocol" />
              <h3 className="mt-2 text-xl font-black tracking-tighter text-white uppercase md:mt-4 md:text-3xl lg:text-4xl">
                Acquire With <br />
                <span className="hidden text-white/60 sm:inline">
                  Absolute Certainty.
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Request Live Tour",
                  benefit: "The Evidence",
                  desc: "Request a live video of the engine and AC. We show you the truth before you leave your house.",
                  cta: "Message for Video",
                  href: `https://wa.me/2347077195098?text=Hi! I saw the ${vehicle.name} and I want to see a live video of the engine and AC. No stories, just truth!`,
                },
                {
                  step: "02",
                  title: "Physical Check",
                  benefit: "The Proof",
                  desc: "Visit our Lagos facility with your mechanic. Take the car for a spin and feel the quality yourself.",
                  cta: "Book Inspection",
                  href: `https://wa.me/2347077195098?text=Hi! I'd like to book a physical inspection for the ${vehicle.name}. I'll be bringing my mechanic.`,
                },
                {
                  step: "03",
                  title: "Secure Handover",
                  benefit: "The Action",
                  desc: "Secure bank transfer. We handle all customs and registration in 24 hours. Drive home with peace of mind.",
                  cta: "Get Started",
                  href: `https://wa.me/2347077195098?text=Hi! I'm ready to move forward with the ${vehicle.name}. Please send the secure payment details.`,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={`https://wa.me/2347077195098?text=Hi, I saw your cars online and I'd love to find something within my budget. Can you help me?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2 p-8 text-left transition-all hover:bg-white/5"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">
                        {item.benefit}
                      </div>
                      <div className="text-2xl font-black text-white/5 transition-colors group-hover:text-emerald-500/10">
                        {item.step}
                      </div>
                    </div>
                    <h4 className="mb-3 text-xl font-black tracking-tighter text-white uppercase">
                      {item.title}
                    </h4>
                    <p className="mb-8 text-sm leading-relaxed text-white/40">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-white/40 uppercase transition-colors group-hover:text-emerald-400">
                    <span>{item.cta}</span>
                    <ChevronRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Vehicle Health Certificate */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0F172A] p-6 shadow-2xl lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/2 to-transparent" />

            <div className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
              <div className="flex flex-col items-center gap-8 text-center md:items-start md:text-left">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 shadow-inner">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="mb-2 text-2xl font-black tracking-tighter text-white uppercase">
                    Quality Endorsement
                  </h4>
                  <p className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
                    Verified for Immediate Sale
                  </p>
                </div>
              </div>

              <div className="w-full max-w-sm flex-1">
                <div className="space-y-4 rounded-2xl border border-white/5 bg-white/2 p-6 md:p-8">
                  {[
                    { label: "Mechanical Integrity", value: "Verified" },
                    { label: "Engine Compression", value: "Optimal (98%)" },
                    { label: "Lagos Clearance", value: "Verified Docs" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-left text-xs font-black tracking-widest text-white/30 uppercase">
                        {row.label}
                      </span>
                      <span className="text-right text-xs font-black text-white uppercase">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <h5 className="mb-3 text-xs font-black tracking-[0.2em] text-emerald-400 uppercase">
                  Ignite Payment Protocol
                </h5>
                <p className="text-[11px] leading-relaxed text-white/50">
                  We only accept transfers to our **Official Corporate Bank
                  Account**. Customs documents (Original Lagos Cleared) handed
                  over in your name within 24 hours. No stories.
                </p>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="text-left">
                    <p className="text-xs font-black text-white uppercase">
                      S. Balogun
                    </p>
                    <p className="text-[10px] font-bold tracking-widest text-white/20 uppercase">
                      Lead Quality Engineer
                    </p>
                  </div>
                  <div className="font-serif text-sm text-white/10 italic select-none">
                    Verified Signature
                  </div>
                </div>

                  <a
                    href={`https://wa.me/2347077195098?text=Hi, I saw your cars online and I'd love to find something within my budget. Can you help me?`}
                    className="group flex items-center justify-between rounded-full border border-white/5 bg-white/3 px-8 py-5 transition-all hover:bg-white hover:text-black"
                  >
                  <div className="flex items-center gap-4">
                    <MessageSquare
                      size={16}
                      className="opacity-40 group-hover:opacity-100"
                    />
                    <span className="text-xs font-black tracking-[0.2em] uppercase">
                      Request Technical Logs
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="opacity-20 transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Step 4 — PROOF (Minimalist Strips) */}
          <div className="relative space-y-16">
            <div className="flex items-center gap-6">
                <SectionHeader title="Trusted by" accent="Our Community" />
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {[
                {
                  name: "Mr. Emeka, Lekki",
                  comment: "I was scared of buying a 'tokunbo' car. Ignite showed me technical logs before I visited. It's been 6 months and it's perfect.",
                  car: "Toyota Camry 2014"
                },
                {
                  name: "Mrs. Adebayo, Ikeja",
                  comment: "No hidden charges, no long stories. What I saw online was what I got. The WhatsApp help was amazing for my budget.",
                  car: "Lexus RX350"
                }
              ].map((testimonial, i) => (
                <div key={i} className="group relative border-l-2 border-emerald-500/10 pl-8 transition-colors hover:border-emerald-500/40">
                  <div className="mb-4 flex items-center gap-1 text-emerald-400">
                    {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                  </div>
                  <p className="mb-6 text-xl italic leading-relaxed text-white/50">"{testimonial.comment}"</p>
                  <div className="flex items-center gap-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-base font-black text-white/40">
                      {testimonial.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">{testimonial.name}</h4>
                      <p className="text-xs font-bold tracking-[0.1em] text-white/20 uppercase">{testimonial.car}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Stats Strip — Minimalist & Cinematic */}
            <div className="relative flex flex-wrap items-center justify-between gap-12 border-y border-white/5 py-12">
               <div className="group relative flex flex-1 flex-col items-center gap-2">
                  <span className="text-4xl font-black tracking-tighter text-white transition-transform group-hover:scale-110">450+</span>
                  <span className="text-xs font-black tracking-[0.2em] text-emerald-400/40 uppercase">Cars Sold</span>
               </div>
               <div className="h-10 w-px bg-white/5" />
               <div className="group relative flex flex-1 flex-col items-center gap-2">
                  <span className="text-4xl font-black tracking-tighter text-white transition-transform group-hover:scale-110">100%</span>
                  <span className="text-xs font-black tracking-[0.2em] text-emerald-400/40 uppercase">Verified Papers</span>
               </div>
               <div className="h-10 w-px bg-white/5" />
               <div className="group relative flex flex-1 flex-col items-center gap-2">
                  <span className="text-4xl font-black tracking-tighter text-white transition-transform group-hover:scale-110">Lagos</span>
                  <span className="text-xs font-black tracking-[0.2em] text-emerald-400/40 uppercase">Port Cleared</span>
               </div>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-4">
          <AcquisitionPanel vehicle={vehicle} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-6 pb-20 md:px-12">
          <div className="mb-16 h-px w-full bg-white/5" />
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
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/3 transition-all hover:-translate-y-1 hover:border-white/15"
                  >
                    <div className="relative h-32 w-full overflow-hidden md:h-40">
                      <Image
                        src={relImg}
                        alt={`${rel.make} ${rel.model}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-white/2 via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="mb-1 text-xs font-black tracking-[0.1em] text-white/30 uppercase">
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
        </section>
      )}

      <StickyMobileFooter
        vehicle={{
          name: vehicle.name,
          year: vehicle.year,
          price: vehicle.price,
        }}
      />
    </main>
  )
}

// Section header sub-component
function SectionHeader({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 md:mb-12 md:gap-6">
      <h2 className="text-lg font-black tracking-tighter uppercase md:text-2xl lg:text-3xl">
        {title}
        <br />
        <span className="text-white/60">{accent}</span>
      </h2>
      <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
    </div>
  )
}
