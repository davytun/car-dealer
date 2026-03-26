"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost, blogPosts } from "@/lib/data/blog";
import { FeaturedPost } from "@/components/blog/featured-post";
import { CategoryFilter } from "@/components/blog/category-filter";
import { BlogCard } from "@/components/blog/blog-card";

export function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = Array.from(
    new Set(blogPosts.map((post) => post.mainCategory))
  );

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.mainCategory === activeCategory);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Featured Section */}
      <AnimatePresence mode="wait">
        {activeCategory === "All" && featuredPost && (
          <section key="featured">
             <FeaturedPost post={featuredPost} />
          </section>
        )}
      </AnimatePresence>

      {/* Filter & Grid */}
      <section className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
          <div className="flex flex-col gap-4">
            <span className="mono-md text-accent-primary">Browse by Topic</span>
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
          <div className="mono-md text-text-muted">
            Showing {filteredPosts.length} Articles
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {(activeCategory === "All" ? remainingPosts : filteredPosts).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredPosts.length === 0 && (
          <div className="py-24 text-center">
            <p className="body-lg text-text-muted">No articles found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
