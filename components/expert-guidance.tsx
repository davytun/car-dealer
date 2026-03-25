"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const articles = [
  {
    title: "2025 BMW 5 Series Priced From 59,375; i5 EV From 68,275",
    category: "NEWS",
    author: "Admin",
    date: "Aug. 5, 2025",
    image: "/card/card-10.jpg",
  },
  {
    title: "2025 BMW 5 Series Priced From 59,375; i5 EV From 68,275",
    category: "Expert Review",
    author: "Admin",
    date: "Aug. 5, 2025",
    image: "/card/card-11.jpg",
  },
  {
    title: "2025 BMW 5 Series Priced From 59,375; i5 EV From 68,275",
    category: "Expert Review",
    author: "Admin",
    date: "Aug. 5, 2025",
    image: "/card/card-12.jpg",
  },
]

export function ExpertGuidance() {
  return (
    <section className="relative z-10 border-b border-white/5 bg-bg-surface py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="mono-md text-gold-vivid mb-4 block text-xs tracking-widest uppercase">
              Expert Guidance
            </span>
            <h2 className="display-md mb-6 text-white italic">
              Receive insights from our automotive specialists
            </h2>
            <p className="body-md text-text-secondary">
              on the latest luxury releases, market trends, and buying advice.
            </p>
          </div>
          <Button
            variant="link"
            className="group flex items-center gap-2 p-0 font-mono text-xs tracking-widest text-white/60 uppercase hover:text-white"
          >
            View All{" "}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div
              key={`${article.title}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative mb-6 aspect-4/3 overflow-hidden rounded-2xl">
                <div className="absolute top-4 left-4 z-10 rounded-full border border-white/10 bg-bg-base/80 px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                  {article.category}
                </div>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="mb-4 flex items-center gap-6 font-mono text-sm text-[10px] tracking-widest text-white/40 uppercase">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gold-vivid" />
                  <span>by {article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gold-vivid" />
                  <span>{article.date}</span>
                </div>
              </div>

              <h3 className="group-hover:text-gold-vivid text-xl leading-tight font-medium text-white transition-colors">
                {article.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
