import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ServiceCard } from "@/components/site/ServiceCard";
import { allServices } from "@/components/site/data";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search services in Bengaluru — BookYourService" },
      {
        name: "description",
        content:
          "Search verified home services in Bengaluru — cleaning, AC repair, plumbing, salon, painting and more, with transparent prices.",
      },
      { property: "og:title", content: "Search services — BookYourService" },
      {
        property: "og:description",
        content: "Find and book verified home service professionals across Bengaluru.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const results = term
    ? allServices.filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          s.category.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term),
      )
    : allServices;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="section-shell py-12">
        <nav className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          {" / "}
          <span className="text-foreground">Search</span>
        </nav>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {q ? `Results for “${q}”` : "All services"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {results.length} service{results.length === 1 ? "" : "s"} available in Bengaluru.
        </p>

        {results.length === 0 ? (
          <div className="card-premium mt-10 flex flex-col items-center gap-4 p-10 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
              <SearchX className="size-7" />
            </span>
            <h2 className="font-display text-xl font-semibold text-ink">No matching services</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Try a different keyword, or browse every category we cover.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">Explore all services</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((svc) => (
              <ServiceCard key={svc.slug} svc={svc} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
