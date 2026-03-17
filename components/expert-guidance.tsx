"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "2025 BMW 5 Series Priced From 59,375; i5 EV From 68,275",
    category: "NEWS",
    author: "Admin",
    date: "Aug. 5, 2025",
    image: "/card/card-10.jpg"
  },
  {
    title: "2025 BMW 5 Series Priced From 59,375; i5 EV From 68,275",
    category: "Expert Review",
    author: "Admin",
    date: "Aug. 5, 2025",
    image: "/card/card-11.jpg"
  },
  {
    title: "2025 BMW 5 Series Priced From 59,375; i5 EV From 68,275",
    category: "Expert Review",
    author: "Admin",
    date: "Aug. 5, 2025",
    image: "/card/card-12.jpg"
  }
];

export function ExpertGuidance() {
  return (
    <section className="py-32 bg-bg-surface relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="mono-md text-gold-vivid block mb-4 uppercase tracking-widest text-xs">Expert Guidance</span>
            <h2 className="display-md text-white italic mb-6">Receive insights from our automotive specialists</h2>
            <p className="body-md text-text-secondary">
               on the latest luxury releases, market trends, and buying advice.
            </p>
          </div>
          <Button variant="link" className="text-white/60 hover:text-white p-0 flex items-center gap-2 group text-xs uppercase tracking-widest font-mono">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={`${article.title}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl mb-6">
                <div className="absolute top-4 left-4 z-10 bg-bg-base/80 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full">
                  {article.category}
                </div>
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              
              <div className="flex items-center gap-6 text-sm text-white/40 mb-4 uppercase tracking-widest font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gold-vivid" />
                  <span>by {article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gold-vivid" />
                  <span>{article.date}</span>
                </div>
              </div>
              
              <h3 className="text-xl text-white font-medium leading-tight group-hover:text-gold-vivid transition-colors">
                {article.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
