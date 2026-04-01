"use client"

import React from "react"
import Image from "next/image"
import { ShieldCheck, Zap, CheckCircle, Search, AlertCircle, TrendingUp } from "lucide-react"
import GridBackground from "@/components/ui/grid-background"
import { motion } from "framer-motion"

const PROTOCOLS = [
  {
    id: "reality",
    title: "Lagos Reality",
    heading: "Car Stress.",
    description:
      "Most used cars in Lagos have hidden faults or fake papers. You pay for a car today, and start spending money at the mechanic tomorrow.",
    icon: AlertCircle,
    color: "red",
  },
  {
    id: "protocol",
    title: "Our Trust",
    heading: "150-Point Check.",
    description:
      "We check the engine, gear, and history for you. If it's not 100% clean, we don't sell it. No stories, just the truth.",
    icon: Search,
    color: "emerald",
  },
  {
    id: "result",
    title: "The Result",
    heading: "Test Drive First.",
    description:
      "You verify everything yourself. Test drive for as long as you want. You only pay when you are 100% happy with the car.",
    icon: CheckCircle,
    color: "blue",
  },
]

const EXECUTIVE_TEAM = [
  {
    name: "John Adeola",
    role: "Founder",
    image: "/images/pages/sale-agent-1.jpg",
  },
  {
    name: "Kevin Peace",
    role: "Operations Manager",
    image: "/images/pages/sale-agent-2.jpg",
  },
  {
    name: "Tosin S.",
    role: "Lead Engineer",
    image: "/images/pages/sale-agent-3.jpg",
  },
  {
    name: "Kristin Johnson",
    role: "Finance Manager",
    image: "/images/pages/sale-agent-4.jpg",
  },
]

export function ModernNarrative() {
  return (
    <section className="relative z-10 w-full border-t border-white/5 bg-bg-base">
      <GridBackground
        type="grid"
        gridColor="rgba(255, 255, 255, 0.02)"
        maskSize="ellipse 40% 80% at 0% 50%"
      />

      <div className="mx-auto flex max-w-7xl flex-col items-end justify-between gap-12 px-6 py-20 text-center md:flex-row md:py-32 md:text-left">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center justify-center gap-4 md:justify-start">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-xs font-black tracking-[0.2em] text-white/40 uppercase">
              How we protect you
            </span>
          </div>
          <h2 className="text-3xl leading-none font-black tracking-tighter text-white uppercase md:text-6xl">
            Our Trust <br />
            <span className="font-light text-white/40 italic">
              Protocol.
            </span>
          </h2>
        </div>
        <p className="mx-auto max-w-sm border-l border-white/10 pl-8 text-xs leading-loose font-bold tracking-[0.15em] text-white/60 uppercase md:mx-0 md:text-white/40">
          Clean Cars. Full Papers. No Long Stories. <br /> 
          Verified inventory for professionals in Lagos.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-32 md:grid-cols-3 md:gap-8">
        {PROTOCOLS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/2 p-8 transition-all hover:bg-white/5 md:p-12"
          >
            <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-500 group-hover:scale-110">
               <item.icon className={`h-8 w-8 text-${item.color}-400 brightness-150`} />
            </div>
            
            <div className="relative z-10 space-y-4">
              <span className={`text-xs font-black tracking-[0.2em] text-${item.color}-400 uppercase opacity-60`}>
                {item.title}
              </span>
              <h3 className="text-3xl font-black tracking-tighter text-white uppercase">
                {item.heading}
              </h3>
              <p className="text-xs leading-loose font-medium tracking-[0.1em] text-white/40 uppercase">
                {item.description}
              </p>
            </div>

            {/* Subtle Gradient Glow */}
            <div className={`pointer-events-none absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-${item.color}-500/10 blur-[80px] transition-opacity duration-1000 opacity-20 group-hover:opacity-60`} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 border-t border-white/5 bg-bg-base/50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
            <div className="max-w-xs">
              <span className="mb-4 block text-xs font-black tracking-[0.2em] text-white/40 uppercase">
                THE PEOPLE BEHIND THIS
              </span>
              <p className="text-xs leading-relaxed font-medium tracking-[0.1em] text-white/40 uppercase">
                We are a team of car lovers who want to make it easy for you to buy a good car in Nigeria.
              </p>
            </div>

            <div className="grid w-full flex-1 grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
              {EXECUTIVE_TEAM.map((member) => (
                <div key={member.name} className="group flex flex-col">
                  <div className="relative mb-6 aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/5 bg-bg-surface">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                  <span className="mb-1 text-xs font-black tracking-tight text-white uppercase md:text-sm">
                    {member.name}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
