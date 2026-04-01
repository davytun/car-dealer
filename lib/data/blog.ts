export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  mainCategory: "Scam Alert" | "Lagos Survival" | "Paperwork" | "Expert Reviews";
  excerpt: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "flooded-car-warning-signs",
    title: "How to Spot a Flooded Car (Don't Buy a Sinking Ship)",
    category: "SCAM ALERT",
    mainCategory: "Scam Alert",
    excerpt: "Lagos rains are unforgiving. We show you the 5 hidden signs that a car has been submerged in water—saving you millions in repairs.",
    author: "Lead Engineer",
    date: "Aug. 21, 2025",
    image: "/images/blog/post-14.jpg",
    readTime: "6 min read",
    tags: ["Scam Alert", "Lagos Rain", "Inspection"],
  },
  {
    id: "2",
    slug: "custom-papers-verification-guide",
    title: "Custom Papers 101: How to Verify Your Car's Papers in 10 Minutes",
    category: "PAPERWORK",
    mainCategory: "Paperwork",
    excerpt: "Don't fall for fake custom papers. Follow our simple checklist to verify any car's documentation with the Nigerian Customs Service.",
    author: "Expert Guide",
    date: "Aug. 21, 2025",
    image: "/images/blog/suv_comparison.png",
    readTime: "5 min read",
    tags: ["Customs", "Verification", "Legal"],
  },
  {
    id: "3",
    slug: "toyota-vs-honda-lagos-roads",
    title: "Toyota vs. Honda: Which Brand Survives Lagos Potholes Better?",
    category: "LAGOS SURVIVAL",
    mainCategory: "Lagos Survival",
    excerpt: "We compare the suspension and maintenance costs of Nigeria's two favorite brands to see which one actually handles the Lagos terrain better.",
    author: "Lead Engineer",
    date: "Aug. 21, 2025",
    image: "/images/blog/post-10.jpg",
    readTime: "7 min read",
    tags: ["Toyota", "Honda", "Lagos Roads"],
  },
  {
    id: "4",
    slug: "the-2015-secret-golden-year",
    title: "The 2015 Secret: Why this is the 'Golden Year' for Used Cars",
    category: "EXPERT ADVICE",
    mainCategory: "Expert Reviews",
    excerpt: "Why is everyone looking for 2015 models? We reveal why this specific year offers the best balance of technology and reliability in Nigeria.",
    author: "The Inspector",
    date: "Aug. 21, 2025",
    image: "/images/blog/post-12.jpg",
    readTime: "5 min read",
    tags: ["Used Cars", "Nigeria Market", "Toyota"],
  },
  {
    id: "5",
    slug: "check-engine-light-reality",
    title: "Maintenance Reality: Why Your 'Check Engine' Light isn't Always a Disaster",
    category: "LAGOS SURVIVAL",
    mainCategory: "Lagos Survival",
    excerpt: "Don't panic. Sometimes it's just a loose gas cap. We break down which engine codes you should fear and which ones are just minor Lagos dust.",
    author: "Lead Engineer",
    date: "Aug. 21, 2025",
    image: "/images/blog/post-33.jpg",
    readTime: "4 min read",
    tags: ["Maintenance", "Check Engine", "Lagos Survival"],
  },
  {
    id: "6",
    slug: "vin-check-importance",
    title: "The Power of the VIN: How to Unlock a Car's Entire Secret History",
    category: "EXPERT REVIEWS",
    mainCategory: "Expert Reviews",
    excerpt: "A simple 17-digit code can tell you if a car was ever in a major crash or used as a taxi in the US. Learn how to use it like a pro.",
    author: "The Inspector",
    date: "Aug. 21, 2025",
    image: "/images/blog/ice_vs_ev.png",
    readTime: "8 min read",
    tags: ["VIN", "History", "Transparency"],
  },
  {
    id: "7",
    slug: "ac-system-maintenance-nigeria",
    title: "Lagos Heat: How to Keep Your AC Freezing cold all year round",
    category: "LAGOS SURVIVAL",
    mainCategory: "Lagos Survival",
    excerpt: "Nothing is worse than a car with bad AC in Lagos traffic. Here are the 3 simple habits that will save your compressor from burning out.",
    author: "Lead Engineer",
    date: "Aug. 21, 2025",
    image: "/images/blog/post-34.jpg",
    readTime: "6 min read",
    tags: ["AC", "Lagos Heat", "Maintenance"],
  },
  {
    id: "8",
    slug: "resale-value-tips-nigeria",
    title: "Resale Value: How to Sell Your Car for a Great Price in 3 Years",
    category: "EXPERT ADVICE",
    mainCategory: "Expert Reviews",
    excerpt: "Buying a car is an investment. We show you the brands and habits that ensure you get your money back when it's time to upgrade.",
    author: "Expert Guide",
    date: "Aug. 21, 2025",
    image: "/images/blog/post-35.jpg",
    readTime: "5 min read",
    tags: ["Investment", "Resale", "Lagos Market"],
  },
];
