import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceCard } from "@/components/site/ServiceCard";
import { allServices, categories } from "@/components/site/data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "All Services & Categories — BookYourService Bengaluru" },
      {
        name: "description",
        content:
          "Browse every home service category on BookYourService — cleaning, plumbing, electrical, appliance repair, painting, salon at home, pest control and shifting.",
      },
      { property: "og:title", content: "All Services & Categories — BookYourService Bengaluru" },
      {
        property: "og:description",
        content:
          "Browse every home service category on BookYourService and book a verified professional in Bengaluru in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="surface-canvas border-b border-border">
          <div className="section-shell py-14">
            <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
              All services in Bengaluru
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Pick a category to see verified providers, or order any service instantly on WhatsApp.
            </p>
          </div>
        </section>

        <section className="section-shell py-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Categories</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    {cat.services} services
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{cat.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{cat.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Explore <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-card/40 py-14">
          <div className="section-shell">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Every service we offer
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {allServices.map((svc) => (
                <ServiceCard key={svc.slug} svc={svc} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
