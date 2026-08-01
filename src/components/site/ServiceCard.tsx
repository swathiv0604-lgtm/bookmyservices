import { Link } from "@tanstack/react-router";
import { BadgeCheck, Heart, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CatalogService } from "@/components/site/data";
import { OrderNowButton } from "@/components/site/OrderNowButton";

export function ServiceCard({ svc }: { svc: CatalogService }) {
  return (
    <article className="card-premium lift-hover group flex flex-col overflow-hidden">
      <Link
        to="/service/$slug"
        params={{ slug: svc.slug }}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <img
          src={svc.image}
          alt={svc.title}
          width={800}
          height={500}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          {svc.category}
        </span>
        {svc.featured && (
          <span className="absolute top-3 right-12 rounded-full bg-[image:var(--gradient-gold)] px-3 py-1 text-xs font-semibold text-accent-foreground">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm">
            <Star className="size-4 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{svc.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({svc.reviews.toLocaleString("en-IN")})</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Timer className="size-3.5" /> {svc.duration}
          </span>
        </div>

        <h3 className="mt-3 text-lg leading-snug font-semibold text-foreground">{svc.title}</h3>

        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          {svc.provider}
          {svc.verified && <BadgeCheck className="size-4 text-success" />}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <div>
              {svc.quoteBased || svc.price === 0 ? (
                <span className="font-display text-lg font-semibold text-ink">Custom quote</span>
              ) : (
                <>
                  <span className="font-display text-xl font-semibold text-ink">
                    ₹{svc.price.toLocaleString("en-IN")}
                  </span>
                  {svc.strikePrice && (
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      ₹{svc.strikePrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </>
              )}
            </div>
            <Heart className="size-4 text-muted-foreground" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="glass" size="sm" asChild>
              <Link to="/service/$slug" params={{ slug: svc.slug }}>
                View details
              </Link>
            </Button>
            <OrderNowButton intent={{ serviceName: svc.title, category: svc.category }} />
          </div>
        </div>
      </div>
    </article>
  );
}
