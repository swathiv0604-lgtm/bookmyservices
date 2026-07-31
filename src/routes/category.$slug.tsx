import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceCard } from "@/components/site/ServiceCard";
import { getCategoryBySlug, getServicesByCategory } from "@/components/site/data";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category, services: getServicesByCategory(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found — BookYourService" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} Services in Bengaluru — BookYourService`;
    const description = `${category.blurb}. Book verified ${category.name.toLowerCase()} professionals in Bengaluru from ₹${category.from}.`;
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
  component: CategoryPage,
});

function CategoryPage() {
  const { category, services } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="surface-canvas border-b border-border">
          <div className="section-shell grid items-center gap-10 py-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <nav className="text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
                {" / "}
                <Link to="/services" className="hover:text-foreground">
                  Services
                </Link>
                {" / "}
                <span className="text-foreground">{category.name}</span>
              </nav>
              <h1 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">
                {category.name}
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">{category.blurb}. Verified professionals across Bengaluru, starting from ₹{category.from.toLocaleString("en-IN")}.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => openWhatsApp({ serviceName: category.name, category: category.name })}
                >
                  <MessageCircle /> Order on WhatsApp
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/services">All categories</Link>
                </Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-elevate)]">
              <img src={category.image} alt={`${category.name} professional at work`} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <section className="section-shell py-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {services.length} services available
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((svc) => (
              <ServiceCard key={svc.slug} svc={svc} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
