"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/data/blog";
import { getAssetUrl } from "@/lib/api";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="group flex flex-col gap-6"
    >
      <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden rounded-sm bg-bg-surface">
        <Image
          src={getAssetUrl(post.image)}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
        
        <div className="absolute top-4 left-4">
          <span className="mono-md bg-bg-base/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] border border-white/5">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="mono-md text-text-muted">{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-text-muted/30" />
          <span className="mono-md text-text-muted">{post.readTime}</span>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="heading-h3 text-text-primary group-hover:text-white transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="body-md text-text-secondary line-clamp-2">
          {post.excerpt}
        </p>

        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 mt-2 font-mono text-[10px] font-bold tracking-[0.2em] text-white uppercase group/link"
        >
          Read Article
          <motion.span
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="transition-transform duration-300"
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}
