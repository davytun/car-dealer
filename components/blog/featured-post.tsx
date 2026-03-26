"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/data/blog";
import { getAssetUrl } from "@/lib/api";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full overflow-hidden rounded-sm bg-bg-surface md:aspect-[21/9] aspect-[16/10]"
    >
      <Image
        src={getAssetUrl(post.image)}
        alt={post.title}
        fill
        priority
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/40 to-transparent" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="mono-md bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-bold">
              FEATURED
            </span>
            <span className="mono-md text-white/60">{post.category}</span>
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h2 className="display-md text-white group-hover:text-white/90 transition-colors duration-300">
              {post.title}
            </h2>
          </Link>
          
          <p className="body-lg text-text-secondary line-clamp-2 md:line-clamp-none max-w-2xl">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-3">
              <span className="mono-md text-white/50">{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="mono-md text-white/50">{post.readTime}</span>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-3 font-mono text-[11px] font-bold tracking-[0.25em] text-white uppercase group/link"
            >
              Continue Reading
              <motion.span
                animate={{ x: 0 }}
                whileHover={{ x: 6 }}
                className="transition-transform duration-300"
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
