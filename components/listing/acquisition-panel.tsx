"use client"

import { useState } from "react"
import { Heart, Share2, ShieldCheck, CalendarDays, Award, MessageSquare, Car, CheckCircle } from "lucide-react"
import { InquiryForm } from "./inquiry-form"
import { TestDriveForm } from "./test-drive-form"

interface AcquisitionPanelProps {
  vehicle: {
    id: number
    name: string
    price: string
    priceRaw: number
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
    <div id="inquire" className="sticky top-32 flex flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0F172A]/40 shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-[60px]" />

      <div className="relative z-10 border-b border-white/5 p-8 pb-10">
        <div className="mb-6 flex items-center gap-3">
           <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black tracking-[0.22em] text-emerald-400/60 uppercase">Authenticated Offering</span>
        </div>
        <div className="mb-6 flex items-baseline gap-2">
           <div className="text-4xl font-black tracking-tighter text-white md:text-5xl lg:text-5xl">
            {vehicle.price}
          </div>
        </div>
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em]">Auth ID</span>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">IGN-VER-0442</span>
             </div>
             <div className="h-1 w-1 rounded-full bg-white/5" />
          </div>
      </div>

      <div className="relative z-10 flex gap-1 border-b border-white/5 px-4 pt-4">
        {(
          [
            { id: "inquire" as Tab, label: "Help", icon: MessageSquare },
            { id: "testdrive" as Tab, label: "Visit", icon: Car },
          ] as const
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`relative flex flex-1 items-center justify-center gap-2 rounded-t-xl px-2 py-4 text-sm font-black tracking-widest uppercase transition-all ${
              tab === id
                ? "bg-white/5 text-white"
                : "text-white/20 hover:text-white/40 hover:bg-white/2"
            }`}
          >
            <Icon size={14} className={tab === id ? "text-emerald-400" : ""} />
            {label}
            {tab === id && (
              <div className="absolute bottom-[-1px] left-4 right-4 h-0.5 bg-emerald-500/80" />
            )}
          </button>
        ))}
      </div>

      <div className="relative z-10 p-8">
        {tab === "inquire" ? (
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-black tracking-[0.2em] text-white/10 uppercase">Connect Securely</p>
                <div className="h-px w-6 bg-white/5" />
              </div>
              <div className="mb-2 flex items-center gap-2 text-emerald-400">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-[10px] leading-none font-black tracking-widest uppercase">
                  Inspected · Test Drive Available · No Hidden Charges
                </span>
              </div>
              <a
                href={`https://wa.me/2347077195098?text=Hi, I saw your cars online and I'd love to find something within my budget. Can you help me?`}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-white px-8 py-5 text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3">
                   <MessageSquare size={16} strokeWidth={3} className="text-black" />
                   <span className="text-xs font-black tracking-[0.15em] text-black uppercase">Start WhatsApp</span>
                </div>
              </a>
              <p className="text-[11px] text-center text-white/20 leading-relaxed font-bold uppercase tracking-widest">
                High Interest This Week. <br />Available 24/7.
              </p>
            </div>

            <div className="relative">
               <div className="h-px w-full bg-white/5" />
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020617] px-4 text-[9px] font-black tracking-[0.3em] text-white/10 uppercase">
                 OR FORM
               </div>
            </div>

            <div>
              <InquiryForm carId={vehicle.id} carName={vehicle.name} />
            </div>
          </div>
        ) : (
          <TestDriveForm carId={vehicle.id} carName={vehicle.name} />
        )}
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-3 border-t border-white/5 p-8">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSaved((s) => !s)}
            className={`flex items-center justify-center gap-2 rounded-2xl border py-3.5 text-[9px] font-black tracking-widest uppercase transition-all ${
              saved
                ? "border-red-500/20 bg-red-500/5 text-red-300"
                : "border-white/5 bg-white/2 text-white/20 hover:border-white/10 hover:bg-white/5"
            }`}
          >
            <Heart size={12} className={saved ? "fill-red-400" : ""} />
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/2 py-3.5 text-xs font-black tracking-[0.1em] text-white/20 uppercase transition-all hover:border-white/10 hover:bg-white/5"
          >
            <Share2 size={12} />
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 border-t border-white/5 p-8">
        {[
          {
            icon: ShieldCheck,
            title: "Verified Docs",
            desc: "100% legal clearance guaranteed.",
          },
          {
            icon: CalendarDays,
            title: "Engine Logs",
            desc: "Full technical report included.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/2">
              <Icon size={14} className="text-white/30" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black tracking-[0.1em] text-white/60 uppercase">
                {title}
              </h4>
              <p className="text-[11px] font-medium leading-relaxed text-white/20">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
