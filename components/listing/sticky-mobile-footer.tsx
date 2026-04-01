"use client"

import React from "react"
import { MessageSquare } from "lucide-react"

interface StickyMobileFooterProps {
  vehicle: {
    name: string
    year: number | string
    price: string
  }
}

export function StickyMobileFooter({ vehicle }: StickyMobileFooterProps) {
  const handleContact = () => {
    const el = document.getElementById("inquire")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-[#020617]/95 p-2 pb-4 backdrop-blur-2xl lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col select-none">
          <span className="text-[7px] font-black tracking-[0.2em] text-emerald-400 uppercase opacity-70">
            Fixed & Fair Price
          </span>
          <div className="text-xl font-black tracking-tight text-white">
            {vehicle.price}
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <button
            onClick={handleContact}
            className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3.5 text-[9px] font-black tracking-widest text-white uppercase transition-all active:scale-[0.98]"
          >
            Contact
          </button>
          <a
            href={`https://wa.me/2347077195098?text=Hi, I saw your cars online and I'd love to find something within my budget. Can you help me?`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-black shadow-xl shadow-emerald-500/10 transition-all active:scale-[0.98]"
          >
            <MessageSquare size={16} strokeWidth={3} />
          </a>
        </div>
      </div>
    </div>
  )
}
