"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Zap, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const articles = [
  {
    title: "Sports Cars vs. Luxury Cars",
    description: "Discover which high-performance vehicle type suits your lifestyle and driving preferences in our deep-dive analysis.",
    icon: Sparkles,
  },
  {
    title: "Car Resale Value Tips",
    description: "Top 5 professional tips for maintaining your luxury vehicle's value, from maintenance schedules to storage solutions.",
    icon: Shield,
  },
  {
    title: "2025 BMW 5 Series",
    description: "The latest 5 Series has arrived, priced from $59,375. Explore the performance upgrades and luxury features of this icon.",
    icon: Zap,
  },
];

export function ServicesSection() {
  return (
    <section className="py-64 bg-bg-surface relative overflow-hidden">
      {/* Structural Elements */}
      <div className="absolute top-0 right-0 w-px h-full bg-white/5" />
      <div className="absolute top-[20%] left-0 w-full h-px bg-white/5" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-48">
          <span className="mono-md text-gold-vivid block mb-10">Content & Insights</span>
          <h2 className="text-4xl md:text-5xl text-white font-black uppercase tracking-tighter leading-tight italic">
            Stay Informed, <br />Drive Smart.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={cn(
                "group relative p-12 bg-white/2 border border-white/5 hover:border-gold-vivid/40 transition-all duration-700"
              )}
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 bg-white/5 backdrop-blur-3xl border border-white/10 group-hover:bg-gold-vivid/10 transition-colors">
                  <article.icon size={28} className="text-gold-vivid" />
                </div>
              </div>
              
              <h3 className="display-md text-white mb-6 group-hover:italic transition-all duration-500">
                {article.title}
              </h3>
              <p className="body-md text-text-secondary mb-10 group-hover:text-white transition-colors">
                {article.description}
              </p>
              
              <Link href="#" className="inline-flex items-center gap-4 group/link">
                <span className="mono-md text-gold-vivid">Read_More</span>
                <ArrowRight size={14} className="text-gold-vivid group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Archival Note */}
        <div className="mt-80 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <span className="mono-md text-white/40 block mb-4">// ARCHIVAL_DIRECTIVE_NOTE_04 //</span>
            <p className="body-md text-text-secondary leading-relaxed italic">
              All services are delivered through our bespoke sovereign framework, ensuring absolute privacy and engineering excellence for the archival collector.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
             {["Bespoke", "archival", "sovereign", "legacy"].map(tag => (
               <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 mono-md text-white/40 hover:text-gold-vivid transition-all cursor-default">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
