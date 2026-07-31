import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Check, CreditCard, FileText, MessageCircle, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceCard } from "@/components/site/ServiceCard";
import { PaymentModal } from "@/components/site/PaymentModal";
import { QuoteDialog } from "@/components/site/QuoteDialog";
import { BookingDialog } from "@/components/site/BookingDialog";
import {
  getServiceBySlug,
  getServicesByCategory,
  type CatalogService,
} from "@/components/site/data";
import { BUSINESS_CONFIG } from "@/config/business";
import { openWhatsApp } from "@/lib/whatsapp";
import { isMobileDevice, payNow } from "@/lib/payment";

export const Route = createFileRoute("/service/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    const related = getServicesByCategory(service.categorySlug).filter(
      (s) => s.slug !== service.slug,
    );
    return { service, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found — BookYourService" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    const title = `${service.title} — BookYourService Bengaluru`;
    const description = service.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service, related } = Route.useLoaderData() as {
    service: CatalogService;
    related: CatalogService[];
  };
  const [payOpen, setPayOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const hasPrice = !service.quoteBased && service.price > 0;

  const handlePay = () => {
    if (isMobileDevice()) payNow(service.price, `Payment for ${service.title}`);
    setPayOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      <SiteHeader />
      <main className="section-shell py-10">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          {" / "}
          <Link to="/category/$slug" params={{ slug: service.categorySlug }} className="hover:text-foreground">
            {service.category}
          </Link>
          {" / "}
          <span className="text-foreground">{service.title}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-elevate)]">
              <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
            </div>

            <h1 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {service.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" />
                <span className="font-semibold text-foreground">{service.rating.toFixed(1)}</span> (
                {service.reviews.toLocaleString("en-IN")} reviews)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Timer className="size-4" /> {service.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                {service.provider}
                {service.verified && <BadgeCheck className="size-4 text-success" />}
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{service.description}</p>

            <h2 className="mt-10 font-display text-2xl font-semibold text-ink">What's included</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="inline-flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop sticky booking panel */}
          <aside className="hidden lg:block">
            <div className="card-premium sticky top-24 p-6">
              {hasPrice ? (
                <>
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="font-display text-3xl font-semibold text-ink">
                    ₹{service.price.toLocaleString("en-IN")}
                  </p>
                </>
              ) : (
                <p className="font-display text-2xl font-semibold text-ink">Custom quote</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">{BUSINESS_CONFIG.city}</p>

              <div className="mt-6 grid gap-2">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() =>
                    openWhatsApp({
                      serviceName: service.title,
                      category: service.category,
                      location: BUSINESS_CONFIG.city,
                    })
                  }
                >
                  <MessageCircle /> Order now
                </Button>
                {hasPrice && (
                  <Button variant="gold" size="lg" onClick={handlePay}>
                    <CreditCard /> Pay now
                  </Button>
                )}
                {!hasPrice && (
                  <Button variant="gold" size="lg" onClick={() => setQuoteOpen(true)}>
                    <FileText /> Request a quote
                  </Button>
                )}
                <Button variant="glass" size="lg" onClick={() => setBookOpen(true)}>
                  Schedule a booking
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              More in {service.category}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((svc) => (
                <ServiceCard key={svc.slug} svc={svc} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">{service.title}</p>
            <p className="font-display text-base font-semibold text-ink">
              {hasPrice ? `₹${service.price.toLocaleString("en-IN")}` : "Custom quote"}
            </p>
          </div>
          {hasPrice ? (
            <Button variant="gold" size="sm" onClick={handlePay}>
              Pay now
            </Button>
          ) : (
            <Button variant="gold" size="sm" onClick={() => setQuoteOpen(true)}>
              Get quote
            </Button>
          )}
          <Button
            variant="hero"
            size="sm"
            onClick={() =>
              openWhatsApp({
                serviceName: service.title,
                category: service.category,
                location: BUSINESS_CONFIG.city,
              })
            }
          >
            Order now
          </Button>
        </div>
      </div>

      <PaymentModal
        open={payOpen}
        onOpenChange={setPayOpen}
        amount={service.price}
        serviceName={service.title}
        category={service.category}
      />
      <QuoteDialog
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        serviceName={service.title}
        category={service.category}
      />
      <BookingDialog
        open={bookOpen}
        onOpenChange={setBookOpen}
        serviceName={service.title}
        category={service.category}
      />

      <SiteFooter />
    </div>
  );
}
