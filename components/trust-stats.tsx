"use client"

import React from "react"
import { motion } from "framer-motion"

const STATS = [
  { label: "Cars Sold", value: "500+" },
  { label: "Happy Families", value: "450+" },
  { label: "Years In Lagos", value: "12" },
  { label: "Inspected Cars", value: "100%" },
]

export function TrustStats() {
  return (
    <section className="relative z-10 w-full bg-bg-base">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-12 md:py-16 md:gap-8 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/2 p-6 transition-all hover:bg-white/5 md:rounded-3xl md:p-10"
          >
            <span className="mb-1 text-3xl font-black text-white md:mb-2 md:text-6xl">
              {stat.value}
            </span>
            <span className="text-center text-[10px] font-black tracking-[0.3em] text-white/40 uppercase md:text-[11px]">
              {stat.label}
            </span>
            
            {/* Subtle highlight dot */}
            <div className="mt-4 h-1 w-1 rounded-full bg-emerald-500/0 transition-all group-hover:bg-emerald-500/80 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
