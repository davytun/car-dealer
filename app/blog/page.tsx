import { Metadata } from "next";
import { BlogClient } from "./blog-client";

export const metadata: Metadata = {
  title: "The Archive | Insights & Reviews",
  description: "Explore our curated collection of automotive insights, expert reviews, and industry news.",
};

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-bg-base">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-soft rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent-soft rounded-full blur-[100px] opacity-10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 flex flex-col gap-16 md:gap-24">
        {/* Page Header */}
        <header className="flex flex-col gap-6 max-w-4xl">
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-accent-primary" />
            <span className="mono-md text-accent-primary tracking-[0.3em]">EDITORIAL</span>
          </div>
          <h1 className="display-lg text-white">
            THE <span className="italic font-light text-text-secondary">ARCHIVE</span>
          </h1>
          <p className="body-lg text-text-secondary max-w-2xl">
            In-depth analysis, expert reviews, and the latest trends from the pinnacle of automotive excellence.
          </p>
        </header>

        {/* Blog Content */}
        <BlogClient />
      </div>

      {/* Footer Newsletter Placeholder or CTA can be added here */}
    </div>
  );
}
