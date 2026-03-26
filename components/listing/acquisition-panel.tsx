"use client"

import React, { useState } from "react"
import { Heart, Share2, ShieldCheck, CalendarDays, Award, MessageSquare, Car } from "lucide-react"
import { InquiryForm } from "./inquiry-form"
import { TestDriveForm } from "./test-drive-form"

interface AcquisitionPanelProps {
  vehicle: {
    id: number
    name: string
    price: string
    priceRaw: number
    monthlyPrice: string
  }
}

type Tab = "inquire" | "testdrive"

export function AcquisitionPanel({ vehicle }: AcquisitionPanelProps) {
  const [tab, setTab] = useState<Tab>("inquire")
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="sticky top-32 flex flex-col rounded-[2.5rem] border border-white/10 bg-[#0F172A]/90 shadow-[0_32px_64px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-white/5 blur-[60px]" />

      <div className="relative z-10 border-b border-white/5 p-8 pb-6 md:p-10 md:pb-6">
        <span className="mb-3 block text-[9px] font-black tracking-[0.35em] text-white/30 uppercase">
          Acquisition Value
        </span>
        <div className="mb-3 text-4xl font-black tracking-tighter text-white lg:text-5xl">
          {vehicle.price}
        </div>
        {vehicle.priceRaw > 0 && (
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-white/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            Finance from {vehicle.monthlyPrice}
          </div>
        )}
      </div>

      <div className="relative z-10 flex gap-1 border-b border-white/5 px-4 pt-4">
        {(
          [
            { id: "inquire" as Tab, label: "Inquire", icon: MessageSquare },
            { id: "testdrive" as Tab, label: "Test Drive", icon: Car },
          ] as const
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`relative flex flex-1 items-center justify-center gap-2 rounded-t-2xl px-4 py-3 text-[10px] font-black tracking-widest uppercase transition-all ${
              tab === id
                ? "bg-white/8 text-white"
                : "text-white/30 hover:text-white/60"
            }`}
          >
            <Icon size={13} />
            {label}
            {tab === id && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>

      <div className="relative z-10 p-6 md:p-8">
        {tab === "inquire" ? (
          <InquiryForm carId={vehicle.id} carName={vehicle.name} />
        ) : (
          <TestDriveForm carId={vehicle.id} carName={vehicle.name} />
        )}
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-white/5 px-6 pb-4 pt-4 md:px-8">
        <button
          onClick={() => setSaved((s) => !s)}
          className={`flex items-center justify-center gap-2 rounded-full border py-3.5 text-[9px] font-black tracking-widest uppercase transition-all ${
            saved
              ? "border-red-500/30 bg-red-500/10 text-red-400"
              : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10"
          }`}
        >
          <Heart size={13} className={saved ? "fill-red-400" : ""} />
          {saved ? "Saved" : "Save"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-3.5 text-[9px] font-black tracking-widest text-white/50 uppercase transition-all hover:border-white/20 hover:bg-white/10"
        >
          <Share2 size={13} />
          {copied ? "Copied!" : "Share"}
        </button>
      </div>

      <div className="relative z-10 flex flex-col gap-4 border-t border-white/5 px-6 py-6 md:px-8">
        {[
          {
            icon: ShieldCheck,
            title: "Secure Transaction",
            desc: "Bank-level encryption on all payments and personal data.",
          },
          {
            icon: CalendarDays,
            title: "Test Drive Available",
            desc: "Book a private viewing at a time that suits you.",
          },
          {
            icon: Award,
            title: "Certified Vehicle",
            desc: "150-point inspection by our factory-trained technicians.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5">
              <Icon size={15} className="text-white/50" />
            </div>
            <div>
              <h4 className="mb-0.5 text-[9px] font-black tracking-[0.2em] text-white/70 uppercase">
                {title}
              </h4>
              <p className="text-[10px] leading-relaxed text-white/30">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
