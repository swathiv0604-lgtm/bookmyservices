import cleaning from "@/assets/cat-cleaning.jpg";
import electrical from "@/assets/cat-electrical.jpg";
import plumbing from "@/assets/cat-plumbing.jpg";
import appliance from "@/assets/cat-appliance.jpg";
import painting from "@/assets/cat-painting.jpg";
import beauty from "@/assets/cat-beauty.jpg";
import carpentry from "@/assets/cat-carpentry.jpg";
import pest from "@/assets/cat-pest.jpg";
import moving from "@/assets/cat-moving.jpg";

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
