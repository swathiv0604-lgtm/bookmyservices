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
  {
    slug: "ac-appliances",
    name: "AC & Appliances",
    blurb: "Repair, installation and maintenance for your home appliances.",
    image: acImg,
    from: 349,
    services: 12,
  },
  {
    slug: "automobile",
    name: "Automobile Services",
    blurb: "Reliable vehicle care, repair, washing and roadside assistance.",
    image: automobile,
    from: 299,
    services: 11,
  },
  {
    slug: "tutoring",
    name: "Tutoring & Education",
    blurb: "Find skilled tutors for school, college and professional learning.",
    image: tutoring,
    from: 399,
    services: 10,
  },
  {
    slug: "events",
    name: "Events & Organizing",
    blurb: "Plan and organize memorable events with trusted professionals.",
    image: events,
    from: 2499,
    services: 9,
  },
  {
    slug: "security",
    name: "Security Services",
    blurb: "Professional private security and safety support.",
    image: security,
    from: 999,
    services: 7,
  },
  {
    slug: "pet-services",
    name: "Pet Services",
    blurb: "Trusted care, grooming and support for your pets.",
    image: pets,
    from: 499,
    services: 8,
  },
  {
    slug: "government-documentation",
    name: "Government Documentation",
    blurb: "Private assistance with forms, applications and documentation.",
    image: documents,
    from: 199,
    services: 8,
  },
  {
    slug: "child-care",
    name: "Child Care & Support",
    blurb: "Reliable childcare and family support services.",
    image: childcare,
    from: 399,
    services: 6,
  },
  {
    slug: "food-catering",
    name: "Food & Catering",
    blurb: "Home food, tiffin, catering and event food services.",
    image: food,
    from: 149,
    services: 10,
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

  { categorySlug: "ac-appliances", title: "Split AC Installation", price: 1499, rating: 4.7, reviews: 318, duration: "2 hrs", provider: "CoolLine Technicians" },
  { categorySlug: "ac-appliances", title: "AC Repair & Diagnostics", price: 449, rating: 4.6, reviews: 486, duration: "60 min", provider: "CoolLine Technicians" },
  { categorySlug: "ac-appliances", title: "AC Gas Refill (Split/Window)", price: 2199, rating: 4.5, reviews: 204, duration: "90 min", provider: "ChillPoint Services" },
  { categorySlug: "ac-appliances", title: "Deep AC Cleaning & Jet Service", price: 799, strikePrice: 999, rating: 4.7, reviews: 372, duration: "75 min", provider: "ChillPoint Services" },
  { categorySlug: "ac-appliances", title: "Microwave & Oven Repair", price: 349, rating: 4.4, reviews: 129, duration: "45 min", provider: "HomeTech Repairs" },
  { categorySlug: "ac-appliances", title: "Annual Appliance Maintenance Plan", price: 0, rating: 4.6, reviews: 88, duration: "Yearly", provider: "HomeTech Repairs", quoteBased: true },

  { categorySlug: "automobile", title: "Car Service & Maintenance", price: 2499, strikePrice: 2999, rating: 4.7, reviews: 412, duration: "4 hrs", provider: "AutoCare Garage" },
  { categorySlug: "automobile", title: "Bike Service at Doorstep", price: 599, rating: 4.6, reviews: 356, duration: "90 min", provider: "RideFix Bengaluru" },
  { categorySlug: "automobile", title: "Car Wash & Detailing", price: 899, rating: 4.7, reviews: 289, duration: "2 hrs", provider: "ShineDrive Detailing" },
  { categorySlug: "automobile", title: "Battery Replacement & Jumpstart", price: 499, rating: 4.5, reviews: 174, duration: "45 min", provider: "AutoCare Garage" },
  { categorySlug: "automobile", title: "Tyre Change & Puncture Assistance", price: 299, rating: 4.4, reviews: 231, duration: "40 min", provider: "RoadReady Assist" },
  { categorySlug: "automobile", title: "Emergency Roadside Assistance", price: 0, rating: 4.6, reviews: 118, duration: "On call", provider: "RoadReady Assist", quoteBased: true },
  { categorySlug: "automobile", title: "Vehicle Reselling Assistance", price: 0, rating: 4.5, reviews: 64, duration: "3–7 days", provider: "DriveDeal Partners", quoteBased: true },
  { categorySlug: "automobile", title: "Vehicle Documentation Assistance", price: 0, rating: 4.4, reviews: 52, duration: "2–5 days", provider: "DriveDeal Partners", quoteBased: true },

  { categorySlug: "tutoring", title: "Class 10 Mathematics Tutor", price: 599, rating: 4.8, reviews: 246, duration: "Per hour", provider: "BrightPath Tutors" },
  { categorySlug: "tutoring", title: "Science Tutoring (Class 6–10)", price: 549, rating: 4.7, reviews: 198, duration: "Per hour", provider: "BrightPath Tutors" },
  { categorySlug: "tutoring", title: "Computer Science & Programming", price: 799, rating: 4.8, reviews: 163, duration: "Per hour", provider: "CodeMentor Bengaluru" },
  { categorySlug: "tutoring", title: "Spoken English & Communication", price: 449, rating: 4.6, reviews: 221, duration: "Per hour", provider: "FluentEdge Academy" },
  { categorySlug: "tutoring", title: "Competitive Exam Coaching", price: 0, rating: 4.7, reviews: 97, duration: "Course", provider: "RankUp Classes", quoteBased: true },
  { categorySlug: "tutoring", title: "Homework & Assignment Help", price: 399, rating: 4.5, reviews: 142, duration: "Per session", provider: "BrightPath Tutors" },

  { categorySlug: "events", title: "Birthday Party Organization", price: 4999, rating: 4.7, reviews: 186, duration: "Full day", provider: "Celebra Events" },
  { categorySlug: "events", title: "Balloon & Theme Decoration", price: 2499, rating: 4.8, reviews: 254, duration: "3 hrs", provider: "Decor Studio 9" },
  { categorySlug: "events", title: "Wedding Planning Assistance", price: 0, rating: 4.7, reviews: 74, duration: "Custom", provider: "Celebra Events", quoteBased: true },
  { categorySlug: "events", title: "Corporate Event Management", price: 0, rating: 4.6, reviews: 58, duration: "Custom", provider: "Meridian Event Co.", quoteBased: true },
  { categorySlug: "events", title: "Event Photography Coordination", price: 0, rating: 4.7, reviews: 91, duration: "Per event", provider: "FrameWorks Studio", quoteBased: true },
  { categorySlug: "events", title: "Event Setup & Cleanup Crew", price: 3499, rating: 4.5, reviews: 63, duration: "6 hrs", provider: "Meridian Event Co." },

  { categorySlug: "security", title: "Residential Security Guard (12 hr)", price: 1299, rating: 4.6, reviews: 112, duration: "12 hrs", provider: "Sentinel Security" },
  { categorySlug: "security", title: "Event Security Personnel", price: 0, rating: 4.6, reviews: 67, duration: "Per event", provider: "Sentinel Security", quoteBased: true },
  { categorySlug: "security", title: "Office & Commercial Security", price: 0, rating: 4.5, reviews: 49, duration: "Monthly", provider: "GuardLine Services", quoteBased: true },
  { categorySlug: "security", title: "CCTV Installation Coordination", price: 1999, rating: 4.6, reviews: 138, duration: "3 hrs", provider: "SecureView Systems" },
  { categorySlug: "security", title: "CCTV Maintenance Visit", price: 599, rating: 4.5, reviews: 84, duration: "60 min", provider: "SecureView Systems" },
  { categorySlug: "security", title: "Security Consultation & Audit", price: 0, rating: 4.7, reviews: 31, duration: "2 hrs", provider: "GuardLine Services", quoteBased: true },

  { categorySlug: "pet-services", title: "Dog Grooming at Home", price: 999, strikePrice: 1199, rating: 4.8, reviews: 302, duration: "90 min", provider: "PawPerfect Grooming" },
  { categorySlug: "pet-services", title: "Daily Dog Walking", price: 499, rating: 4.7, reviews: 187, duration: "Per week", provider: "HappyTails Care" },
  { categorySlug: "pet-services", title: "Pet Sitting & Day Care", price: 799, rating: 4.7, reviews: 146, duration: "Per day", provider: "HappyTails Care" },
  { categorySlug: "pet-services", title: "Pet Boarding (Overnight)", price: 1199, rating: 4.6, reviews: 98, duration: "Per night", provider: "Cozy Paws Boarding" },
  { categorySlug: "pet-services", title: "Cat Grooming & Basic Care", price: 899, rating: 4.6, reviews: 77, duration: "60 min", provider: "PawPerfect Grooming" },
  { categorySlug: "pet-services", title: "Pet Transportation", price: 0, rating: 4.5, reviews: 42, duration: "Per trip", provider: "Cozy Paws Boarding", quoteBased: true },

  { categorySlug: "government-documentation", title: "Form Filling Assistance", price: 199, rating: 4.6, reviews: 214, duration: "30 min", provider: "DocuHelp Assist" },
  { categorySlug: "government-documentation", title: "Certificate Application Assistance", price: 399, rating: 4.5, reviews: 168, duration: "Per application", provider: "DocuHelp Assist" },
  { categorySlug: "government-documentation", title: "Online Portal & Appointment Help", price: 299, rating: 4.5, reviews: 121, duration: "45 min", provider: "eSeva Support" },
  { categorySlug: "government-documentation", title: "Document Preparation & Review", price: 349, rating: 4.6, reviews: 96, duration: "60 min", provider: "eSeva Support" },
  { categorySlug: "government-documentation", title: "Printing, Scanning & Digital Copies", price: 149, rating: 4.4, reviews: 133, duration: "20 min", provider: "DocuHelp Assist" },

  { categorySlug: "child-care", title: "Babysitting (Hourly)", price: 399, rating: 4.7, reviews: 176, duration: "Per hour", provider: "LittleStar Care" },
  { categorySlug: "child-care", title: "After-School Care & Supervision", price: 899, rating: 4.6, reviews: 104, duration: "Per day", provider: "LittleStar Care" },
  { categorySlug: "child-care", title: "Homework Assistance for Kids", price: 499, rating: 4.6, reviews: 88, duration: "Per session", provider: "BrightPath Tutors" },
  { categorySlug: "child-care", title: "Day Care Assistance", price: 0, rating: 4.5, reviews: 51, duration: "Monthly", provider: "SunnyKids Daycare", quoteBased: true },
  { categorySlug: "child-care", title: "Child Activity & Play Supervision", price: 599, rating: 4.7, reviews: 63, duration: "3 hrs", provider: "SunnyKids Daycare" },

  { categorySlug: "food-catering", title: "Daily Tiffin Service", price: 149, rating: 4.7, reviews: 428, duration: "Per meal", provider: "GharKa Kitchen" },
  { categorySlug: "food-catering", title: "Party Catering (25+ Guests)", price: 0, rating: 4.7, reviews: 156, duration: "Per event", provider: "Spice Route Caterers", quoteBased: true },
  { categorySlug: "food-catering", title: "Corporate Lunch Catering", price: 0, rating: 4.6, reviews: 82, duration: "Per day", provider: "Spice Route Caterers", quoteBased: true },
  { categorySlug: "food-catering", title: "Home Chef Meal Preparation", price: 799, rating: 4.8, reviews: 191, duration: "3 hrs", provider: "GharKa Kitchen" },
  { categorySlug: "food-catering", title: "Bakery & Custom Cakes", price: 899, rating: 4.8, reviews: 267, duration: "1–2 days", provider: "ButterLeaf Bakery" },
  { categorySlug: "food-catering", title: "Snacks & Live Counters", price: 0, rating: 4.6, reviews: 74, duration: "Per event", provider: "ButterLeaf Bakery", quoteBased: true },
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
