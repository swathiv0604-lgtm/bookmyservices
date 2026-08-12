import cleaning from "@/assets/cat-cleaning.jpg";
import electrical from "@/assets/cat-electrical.jpg";
import plumbing from "@/assets/cat-plumbing.jpg";
import appliance from "@/assets/cat-appliance.jpg";
import painting from "@/assets/cat-painting.jpg";
import beauty from "@/assets/cat-beauty.jpg";
import carpentry from "@/assets/cat-carpentry.jpg";
import pest from "@/assets/cat-pest.jpg";
import moving from "@/assets/cat-moving.jpg";
import acImg from "@/assets/cat-ac.jpg";
import automobile from "@/assets/cat-automobile.jpg";
import tutoring from "@/assets/cat-tutoring.jpg";
import events from "@/assets/cat-events.jpg";
import security from "@/assets/cat-security.jpg";
import pets from "@/assets/cat-pets.jpg";
import documents from "@/assets/cat-documents.jpg";
import childcare from "@/assets/cat-childcare.jpg";
import food from "@/assets/cat-food.jpg";

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  from: number;
  services: number;
};

export const categories: Category[] = [
  {
    slug: "home-cleaning",
    name: "Home Cleaning",
    blurb: "Deep cleaning, kitchen, bathroom & sofa care",
    image: cleaning,
    from: 499,
    services: 24,
  },
  {
    slug: "electrical",
    name: "Electrical",
    blurb: "Wiring, fittings, switchboards & fan installation",
    image: electrical,
    from: 199,
    services: 18,
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    blurb: "Leak repair, taps, drainage & bathroom fittings",
    image: plumbing,
    from: 249,
    services: 21,
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    blurb: "AC service, refrigerator, washing machine & more",
    image: appliance,
    from: 399,
    services: 16,
  },
  {
    slug: "painting",
    name: "Painting",
    blurb: "Interior, exterior, texture & waterproofing",
    image: painting,
    from: 2999,
    services: 12,
  },
  {
    slug: "salon-at-home",
    name: "Salon at Home",
    blurb: "Facials, grooming, spa & wellness sessions",
    image: beauty,
    from: 599,
    services: 27,
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    blurb: "Furniture repair, assembly & custom woodwork",
    image: carpentry,
    from: 349,
    services: 15,
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    blurb: "Cockroach, termite & general disinfection",
    image: pest,
    from: 899,
    services: 9,
  },
  {
    slug: "home-shifting",
    name: "Home Shifting",
    blurb: "Packers, movers, loading & safe transport",
    image: moving,
    from: 3499,
    services: 8,
  },
];

export type Service = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  strikePrice?: number;
  rating: number;
  reviews: number;
  duration: string;
  provider: string;
  verified: boolean;
  featured?: boolean;
};

export const popularServices: Service[] = [
  {
    id: "svc-1",
    title: "Full Home Deep Cleaning (2 BHK)",
    category: "Home Cleaning",
    image: cleaning,
    price: 2899,
    strikePrice: 3599,
    rating: 4.8,
    reviews: 1284,
    duration: "4–5 hrs",
    provider: "SparkleCare Services",
    verified: true,
    featured: true,
  },
  {
    id: "svc-2",
    title: "Split AC Service & Gas Check",
    category: "Appliance Repair",
    image: appliance,
    price: 649,
    strikePrice: 799,
    rating: 4.7,
    reviews: 942,
    duration: "60–90 min",
    provider: "CoolLine Technicians",
    verified: true,
  },
  {
    id: "svc-3",
    title: "Tap, Mixer & Leak Repair Visit",
    category: "Plumbing",
    image: plumbing,
    price: 299,
    rating: 4.6,
    reviews: 651,
    duration: "45 min",
    provider: "AquaFix Bengaluru",
    verified: true,
  },
  {
    id: "svc-4",
    title: "Fan, Light & Switchboard Fitting",
    category: "Electrical",
    image: electrical,
    price: 249,
    rating: 4.7,
    reviews: 738,
    duration: "30–60 min",
    provider: "VoltPro Electricals",
    verified: true,
  },
  {
    id: "svc-5",
    title: "Signature Facial & Spa at Home",
    category: "Salon at Home",
    image: beauty,
    price: 1299,
    strikePrice: 1599,
    rating: 4.9,
    reviews: 1103,
    duration: "75 min",
    provider: "Aura Home Studio",
    verified: true,
    featured: true,
  },
  {
    id: "svc-6",
    title: "1 BHK Interior Painting Package",
    category: "Painting",
    image: painting,
    price: 8999,
    strikePrice: 10499,
    rating: 4.5,
    reviews: 214,
    duration: "2–3 days",
    provider: "FineFinish Painters",
    verified: true,
  },
];

export const testimonials = [
  {
    name: "Ananya Rao",
    area: "Indiranagar, Bengaluru",
    quote:
      "Booked a deep clean at 9pm for the next morning. The team arrived on time, shared a checklist, and the invoice matched the quote exactly.",
    rating: 5,
  },
  {
    name: "Vikram Shetty",
    area: "HSR Layout, Bengaluru",
    quote:
      "The AC technician was verified, carried ID, and explained the gas top-up before charging. Payment and warranty details were all in the app.",
    rating: 5,
  },
  {
    name: "Meera Krishnan",
    area: "Whitefield, Bengaluru",
    quote:
      "I compared three painters, checked their portfolios and reviews, then scheduled in two minutes. Support followed up until the job closed.",
    rating: 4,
  },
];

export const faqs = [
  {
    q: "How are service providers verified?",
    a: "Every provider completes identity verification, document checks, and a skill review before going live. Verified badges are shown on profiles and can be revoked after repeated policy violations.",
  },
  {
    q: "How is pricing decided?",
    a: "Providers publish transparent base prices, add-ons, and visit charges. You see the full breakdown before confirming, and any change on-site needs your in-app approval.",
  },
  {
    q: "What if I need to reschedule or cancel?",
    a: "You can reschedule or cancel from your booking timeline. Free cancellation windows are shown on each service, and refunds follow the published refund policy.",
  },
  {
    q: "Which payment methods are supported?",
    a: "UPI, cards, netbanking, wallets, and cash on service where the provider allows it. Receipts and invoices are stored in your payment history.",
  },
];

/* ---------------- Catalog: slugged services for every category ---------------- */

export type CatalogService = Service & {
  slug: string;
  categorySlug: string;
  description: string;
  quoteBased?: boolean;
  includes: string[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const catBySlug = (slug: string) => categories.find((c) => c.slug === slug)!;

const extraServices: Array<{
  categorySlug: string;
  title: string;
  price: number;
  strikePrice?: number;
  rating: number;
  reviews: number;
  duration: string;
  provider: string;
  quoteBased?: boolean;
}> = [
  { categorySlug: "home-cleaning", title: "Bathroom Deep Cleaning", price: 599, strikePrice: 749, rating: 4.7, reviews: 512, duration: "60 min", provider: "SparkleCare Services" },
  { categorySlug: "home-cleaning", title: "Sofa & Carpet Shampooing", price: 899, rating: 4.6, reviews: 288, duration: "90 min", provider: "FreshNest Cleaners" },
  { categorySlug: "electrical", title: "Full House Wiring Inspection", price: 799, rating: 4.6, reviews: 191, duration: "2 hrs", provider: "VoltPro Electricals" },
  { categorySlug: "electrical", title: "Inverter & Stabiliser Installation", price: 549, rating: 4.5, reviews: 143, duration: "60 min", provider: "PowerLine Experts" },
  { categorySlug: "plumbing", title: "Bathroom Fittings Installation", price: 749, rating: 4.6, reviews: 233, duration: "2 hrs", provider: "AquaFix Bengaluru" },
  { categorySlug: "plumbing", title: "Drainage & Blockage Clearing", price: 499, rating: 4.4, reviews: 176, duration: "60 min", provider: "PipeCare Pros" },
  { categorySlug: "appliance-repair", title: "Washing Machine Repair Visit", price: 349, rating: 4.5, reviews: 402, duration: "45 min", provider: "HomeTech Repairs" },
  { categorySlug: "appliance-repair", title: "Refrigerator Service & Gas Refill", price: 899, rating: 4.6, reviews: 265, duration: "90 min", provider: "CoolLine Technicians" },
  { categorySlug: "painting", title: "Full Home Painting (Custom Quote)", price: 0, rating: 4.6, reviews: 121, duration: "3–6 days", provider: "FineFinish Painters", quoteBased: true },
  { categorySlug: "painting", title: "Waterproofing & Texture Work", price: 0, rating: 4.5, reviews: 87, duration: "2–4 days", provider: "ShieldCoat Solutions", quoteBased: true },
  { categorySlug: "salon-at-home", title: "Men's Grooming & Haircut", price: 449, rating: 4.7, reviews: 620, duration: "45 min", provider: "Aura Home Studio" },
  { categorySlug: "salon-at-home", title: "Bridal Makeup Package", price: 0, rating: 4.9, reviews: 96, duration: "3 hrs", provider: "Glow Atelier", quoteBased: true },
  { categorySlug: "carpentry", title: "Furniture Assembly & Fixing", price: 399, rating: 4.6, reviews: 310, duration: "60 min", provider: "WoodWorks Bengaluru" },
  { categorySlug: "carpentry", title: "Custom Wardrobe (Site Quote)", price: 0, rating: 4.7, reviews: 64, duration: "5–10 days", provider: "Craftline Interiors", quoteBased: true },
  { categorySlug: "pest-control", title: "Cockroach & Ant Treatment", price: 899, rating: 4.5, reviews: 421, duration: "60 min", provider: "SafeHome Pest Care" },
  { categorySlug: "pest-control", title: "Termite Control Treatment", price: 2499, rating: 4.6, reviews: 158, duration: "3 hrs", provider: "SafeHome Pest Care" },
  { categorySlug: "home-shifting", title: "Local Home Shifting (2 BHK)", price: 0, rating: 4.5, reviews: 142, duration: "6–8 hrs", provider: "MoveEasy Packers", quoteBased: true },
  { categorySlug: "home-shifting", title: "Bike & Vehicle Transport", price: 0, rating: 4.4, reviews: 73, duration: "1–3 days", provider: "MoveEasy Packers", quoteBased: true },
];

export const allServices: CatalogService[] = [
  ...popularServices.map((s) => {
    const cat = categories.find((c) => c.name === s.category)!;
    return {
      ...s,
      slug: slugify(s.title),
      categorySlug: cat.slug,
      description: `${s.title} delivered by ${s.provider}, a verified ${cat.name.toLowerCase()} partner in Bengaluru. Transparent pricing, trained professionals and a satisfaction check after every job.`,
      includes: [
        "Verified, background-checked professional",
        "All tools and materials brought on site",
        "Transparent pricing confirmed before work starts",
        "Post-service quality check and support",
      ],
    } satisfies CatalogService;
  }),
  ...extraServices.map((s) => {
    const cat = catBySlug(s.categorySlug);
    return {
      id: slugify(s.title),
      title: s.title,
      category: cat.name,
      image: cat.image,
      price: s.price,
      strikePrice: s.strikePrice,
      rating: s.rating,
      reviews: s.reviews,
      duration: s.duration,
      provider: s.provider,
      verified: true,
      slug: slugify(s.title),
      categorySlug: cat.slug,
      quoteBased: s.quoteBased,
      description: `${s.title} by ${s.provider}. ${cat.blurb}. Serving all major neighbourhoods across Bengaluru with verified professionals.`,
      includes: [
        "Verified, background-checked professional",
        "Upfront estimate before work begins",
        "Quality materials and proper equipment",
        "Support on WhatsApp until the job is closed",
      ],
    } satisfies CatalogService;
  }),
];

export const getServiceBySlug = (slug: string) => allServices.find((s) => s.slug === slug);
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const getServicesByCategory = (slug: string) =>
  allServices.filter((s) => s.categorySlug === slug);
