"use client"

import React from "react"
import { motion } from "framer-motion"
import { Shield, Sparkles, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const articles = [
  {
    title: "Sports Cars vs. Luxury Cars",
    description:
      "Discover which high-performance vehicle type suits your lifestyle and driving preferences in our deep-dive analysis.",
    icon: Sparkles,
  },
  {
    title: "Car Resale Value Tips",
    description:
      "Top 5 professional tips for maintaining your luxury vehicle's value, from maintenance schedules to storage solutions.",
    icon: Shield,
  },
  {
    title: "2025 BMW 5 Series",
    description:
      "The latest 5 Series has arrived, priced from $59,375. Explore the performance upgrades and luxury features of this icon.",
    icon: Zap,
  },
]

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-bg-surface py-64">
      {/* Structural Elements */}
      <div className="absolute top-0 right-0 h-full w-px bg-white/5" />
      <div className="absolute top-[20%] left-0 h-px w-full bg-white/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-48">
          <span className="mono-md text-gold-vivid mb-10 block">
            Content & Insights
          </span>
          <h2 className="text-4xl leading-tight font-black tracking-tighter text-white uppercase italic md:text-5xl">
            Stay Informed, <br />
            Drive Smart.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-32 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={cn(
                "group hover:border-gold-vivid/40 relative border border-white/5 bg-white/2 p-12 transition-all duration-700"
              )}
            >
              <div className="mb-12 flex items-start justify-between">
                <div className="group-hover:bg-gold-vivid/10 border border-white/10 bg-white/5 p-4 backdrop-blur-3xl transition-colors">
                  <article.icon size={28} className="text-gold-vivid" />
                </div>
              </div>

              <h3 className="display-md mb-6 text-white transition-all duration-500 group-hover:italic">
                {article.title}
              </h3>
              <p className="body-md mb-10 text-text-secondary transition-colors group-hover:text-white">
                {article.description}
              </p>

              <Link
                href="#"
                className="group/link inline-flex items-center gap-4"
              >
                <span className="mono-md text-gold-vivid">Read_More</span>
                <ArrowRight
                  size={14}
                  className="text-gold-vivid transition-transform group-hover/link:translate-x-2"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Archival Note */}
        <div className="mt-80 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-12 md:flex-row">
          <div className="max-w-md">
            <span className="mono-md mb-4 block text-white/40">
              {"// ARCHIVAL_DIRECTIVE_NOTE_04 //"}
            </span>
            <p className="body-md leading-relaxed text-text-secondary italic">
              All services are delivered through our bespoke sovereign
              framework, ensuring absolute privacy and engineering excellence
              for the archival collector.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {["Bespoke", "archival", "sovereign", "legacy"].map((tag) => (
              <span
                key={tag}
                className="mono-md hover:text-gold-vivid cursor-default border border-white/10 bg-white/5 px-4 py-2 text-white/40 transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
