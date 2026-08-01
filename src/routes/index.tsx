import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  Headphones,
  IndianRupee,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Star,
  Timer,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceCard } from "@/components/site/ServiceCard";
import { allServices, categories, faqs, testimonials } from "@/components/site/data";
import { openWhatsApp } from "@/lib/whatsapp";
import { BUSINESS_CONFIG } from "@/config/business";
import heroImage from "@/assets/hero.jpg";
import providerImage from "@/assets/provider-cta.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BookYourService — Book Verified Home Services in Bengaluru" },
      {
        name: "description",
        content:
          "Discover, compare and book verified local professionals for cleaning, repairs, salon, painting and more. Transparent pricing, secure payments, real reviews.",
      },
      { property: "og:title", content: "BookYourService — Book Verified Home Services in Bengaluru" },
      {
        property: "og:description",
        content:
          "Discover, compare and book verified local professionals for cleaning, repairs, salon, painting and more. Transparent pricing, secure payments, real reviews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const trustStats = [
  { value: "1,800+", label: "Verified providers" },
  { value: "120+", label: "Services listed" },
  { value: "4.8/5", label: "Average rating" },
  { value: "60 sec", label: "Median booking time" },
];

const steps = [
  {
    icon: Search,
    title: "Tell us what you need",
    text: "Search a service or browse categories. Filter by price, availability, ratings and distance.",
  },
  {
    icon: UserCheck,
    title: "Compare verified providers",
    text: "Review portfolios, transparent pricing, response times and genuine customer feedback.",
  },
  {
    icon: CalendarCheck,
    title: "Pick a slot that suits you",
    text: "Choose a date and time window, add notes, and confirm your saved address in a tap.",
  },
  {
    icon: Wallet,
    title: "Pay securely, track live",
    text: "Pay online or on service. Follow every booking status update from confirmed to completed.",
  },
];

const guarantees = [
  {
    icon: BadgeCheck,
    title: "Identity-verified providers",
    text: "Documents, background details and skills are reviewed before a provider can accept bookings.",
  },
  {
    icon: IndianRupee,
    title: "Transparent pricing",
    text: "See base price, add-ons and visit charges up front. On-site changes need your approval.",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    text: "UPI, cards, netbanking, wallets or cash on service — with invoices stored in your account.",
  },
  {
    icon: Headphones,
    title: "Responsive support",
    text: "Reschedule, raise an issue or request a refund from your booking timeline at any time.",
  },
];

function Rating({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <Star className="size-4 fill-accent text-accent" />
      <span className="font-semibold text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-muted-foreground">({reviews.toLocaleString("en-IN")})</span>
      )}
    </span>
  );
}

const featuredServices = allServices.slice(0, 6);

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Bengaluru");

  const matches = query.trim()
    ? allServices
        .filter(
          (s) =>
            s.title.toLowerCase().includes(query.trim().toLowerCase()) ||
            s.category.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];

  const findServices = () => {
    if (matches.length === 1) {
      navigate({ to: "/service/$slug", params: { slug: matches[0].slug } });
      return;
    }
    navigate({ to: "/search", search: { q: query.trim() } });
  };

  const focusSearch = () => {
    const el = document.getElementById("search");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    (el?.querySelector("input") as HTMLInputElement | null)?.focus();
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="surface-canvas relative overflow-hidden">
          <div className="section-shell grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground backdrop-blur">
                <Sparkles className="size-3.5 text-accent" />
                Now serving {BUSINESS_CONFIG.city}
              </span>

              <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold text-ink sm:text-5xl lg:text-6xl">
                Verified professionals for every service your home needs.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Compare transparent prices, read genuine reviews, and book a trusted provider in
                minutes. One account for cleaning, repairs, salon, painting, moving and more.
              </p>

              <div
                id="search"
                className="card-premium relative mt-8 grid gap-3 p-3 sm:grid-cols-[1fr_10rem] lg:grid-cols-[1fr_9rem_auto]"
              >
                <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-secondary/60 px-3.5 py-3">
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    aria-label="Search for a service"
                    placeholder="Search AC service, deep cleaning…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && findServices()}
                    className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-secondary/60 px-3.5 py-3">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    aria-label="Your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={findServices}
                  className="sm:col-span-2 lg:col-span-1 lg:px-7"
                >
                  Find services
                </Button>

                {matches.length > 0 && (
                  <div className="card-premium absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden p-2">
                    {matches.map((s) => (
                      <Link
                        key={s.slug}
                        to="/service/$slug"
                        params={{ slug: s.slug }}
                        className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                      >
                        <span className="truncate text-foreground">{s.title}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{s.category}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="hero" size="lg" onClick={focusSearch}>
                  Book a service
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/services">
                    Explore services <ArrowRight />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="size-4 text-success" /> Background-checked pros
                </span>
                <span className="inline-flex items-center gap-2">
                  <Timer className="size-4 text-success" /> Same-day slots
                </span>
                <span className="inline-flex items-center gap-2">
                  <CreditCard className="size-4 text-success" /> Secure payments
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-elevate)]">
                <img
                  src={heroImage}
                  alt="Verified BookYourService professional arriving at a customer's home"
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="card-premium absolute -bottom-6 left-4 hidden w-64 p-4 sm:block">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="grid size-8 place-items-center rounded-lg bg-success-soft text-success">
                    <BadgeCheck className="size-4" />
                  </span>
                  Booking confirmed
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Deep cleaning · Today, 4:00–6:00 PM · Provider on the way
                </p>
              </div>

              <div className="card-premium absolute -top-5 -right-2 hidden p-3 md:block">
                <Rating value={4.8} reviews={12480} />
              </div>
            </div>
          </div>

          <div className="border-y border-border/70 bg-card/50">
            <div className="section-shell grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
              {trustStats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="section-shell py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Browse services by category
              </h2>
              <p className="mt-3 text-muted-foreground">
                Hundreds of services organised into clear categories, so you always know exactly
                what you are booking.
              </p>
            </div>
            <Button variant="glass" size="lg" asChild>
              <Link to="/services">
                View all categories <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="card-premium lift-hover group block overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={`${cat.name} service in progress`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    {cat.services} services
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {cat.blurb}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      From ₹{cat.from.toLocaleString("en-IN")}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Explore <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular services */}
        <section id="services" className="border-y border-border bg-card/40 py-20">
          <div className="section-shell">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Popular this week in Bengaluru
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real listings from verified providers, with upfront prices and honest ratings.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredServices.map((svc) => (
                <ServiceCard key={svc.slug} svc={svc} />
              ))}
            </div>

            <div className="mt-10">
              <Button variant="glass" size="lg" asChild>
                <Link to="/services">
                  See all services <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="section-shell py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Booking takes four simple steps
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every stage is tracked with clear status updates, timestamps and notifications.
            </p>
          </div>

          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="card-premium lift-hover p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <step.icon className="size-5" />
                </span>
                <p className="mt-5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Trust */}
        <section className="border-y border-border bg-card/40 py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Built around trust, not promises
              </h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                BookYourService is a marketplace: we do not perform the work ourselves. What we do
                is verify providers, keep pricing transparent, secure your payment, and stay
                available if something goes wrong.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {guarantees.map((item) => (
                <div key={item.title} className="card-premium p-6">
                  <span className="grid size-10 place-items-center rounded-xl bg-success-soft text-success">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-shell py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              What customers say after the job is done
            </h2>
            <p className="mt-3 text-muted-foreground">
              Reviews can only be left for completed bookings made through the platform.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card-premium lift-hover flex h-full flex-col p-6">
                <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < t.rating ? "size-4 fill-accent text-accent" : "size-4 text-border"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.area}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Provider CTA */}
        <section id="providers" className="section-shell pb-20">
          <div className="card-premium grid overflow-hidden lg:grid-cols-2">
            <div className="order-2 p-8 sm:p-12 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-3.5 py-1.5 text-xs font-semibold text-accent-foreground">
                For service providers
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Grow your business with professional tools
              </h2>
              <p className="mt-4 text-muted-foreground">
                Publish your services, manage availability and bookings, send quotes, track
                earnings, and build a public portfolio backed by verified reviews.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Verified business profile",
                  "Calendar & availability control",
                  "Quotes and custom pricing",
                  "Earnings & payout dashboard",
                  "Customer messaging",
                  "Performance analytics",
                ].map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() =>
                    openWhatsApp({
                      serviceName: "Provider Registration",
                      notes: "I want to join BookYourService as a verified service provider.",
                    })
                  }
                >
                  Become a provider <ArrowRight />
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() =>
                    openWhatsApp({
                      serviceName: "Provider Verification Query",
                      notes: "Please explain how provider verification works.",
                    })
                  }
                >
                  See how verification works
                </Button>
              </div>
            </div>

            <div className="order-1 min-h-64 lg:order-2">
              <img
                src={providerImage}
                alt="Independent service professional managing bookings on a tablet"
                width={1200}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-border bg-card/40 py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Still unsure? Our support team responds through chat, email and phone.
              </p>
              <Button
                variant="glass"
                size="lg"
                className="mt-6"
                onClick={() =>
                  openWhatsApp({
                    serviceName: "Customer Support",
                    notes: "I need help with a booking.",
                  })
                }
              >
                <MessageCircle /> Contact support
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
