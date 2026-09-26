import { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, MessageSquarePlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { listReviews, type PublicReview } from "@/lib/reviews.functions";
import { cn } from "@/lib/utils";
import { StarsDisplay } from "./StarRatingInput";
import { WriteReviewDialog } from "./WriteReviewDialog";

function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <figure className="card-premium flex h-full min-w-0 flex-col p-6">
      <StarsDisplay value={review.rating} />
      <figcaption className="mt-3">
        <p className="text-sm font-semibold text-foreground">{review.displayName}</p>
        {review.serviceName && <p className="text-xs text-primary">{review.serviceName}</p>}
      </figcaption>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed break-words whitespace-pre-line text-foreground">
        “{review.body}”
      </blockquote>
      {review.photos.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {review.photos.map((src, i) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <img
                src={src}
                alt={`Photo ${i + 1} from ${review.displayName}'s review`}
                loading="lazy"
                width={80}
                height={80}
                className="size-20 rounded-lg border border-border object-cover"
              />
            </a>
          ))}
        </div>
      )}
      <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        {new Date(review.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </figure>
  );
}

export function ReviewsSection({
  serviceSlug,
  className,
}: {
  serviceSlug?: string;
  className?: string;
}) {
  const fetchReviews = useServerFn(listReviews);
  const qc = useQueryClient();
  const [rating, setRating] = useState<number | undefined>();
  const [open, setOpen] = useState(false);
  const key = ["reviews", serviceSlug ?? "all", rating ?? 0];

  const q = useInfiniteQuery({
    queryKey: key,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchReviews({ data: { serviceSlug, rating, offset: pageParam } }),
    getNextPageParam: (last, pages) =>
      last.hasMore ? pages.reduce((n, p) => n + p.reviews.length, 0) : undefined,
    staleTime: 60_000,
  });

  // Newly approved reviews appear without a page refresh.
  useEffect(() => {
    const ch = supabase
      .channel(`reviews-${serviceSlug ?? "all"}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "reviews" }, () => {
        qc.invalidateQueries({ queryKey: ["reviews"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [qc, serviceSlug]);

  const summary = q.data?.pages[0]?.summary;
  const reviews = q.data?.pages.flatMap((p) => p.reviews) ?? [];
  const total = summary?.total ?? 0;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className={cn("section-shell py-20", className)}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">Customer reviews</p>
          <h2 id="reviews-title" className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Share your experience
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real experiences from customers who booked through BookYourServiceConnect.
          </p>

          <div className="card-premium mt-6 p-5">
            {q.isPending ? (
              <div className="h-28 animate-pulse rounded-lg bg-secondary" aria-label="Loading rating summary" />
            ) : total > 0 && summary ? (
              <>
                <div className="flex items-end gap-3">
                  <span className="font-display text-4xl font-semibold text-ink">
                    {summary.average.toFixed(1)}
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">/ 5</span>
                </div>
                <StarsDisplay value={summary.average} size="size-5" />
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on {total.toLocaleString("en-IN")} review{total === 1 ? "" : "s"}
                </p>
                <ul className="mt-4 grid gap-1.5">
                  {([5, 4, 3, 2, 1] as const).map((n) => {
                    const c = summary.distribution[n];
                    return (
                      <li key={n} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-6">{n}★</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                          <span
                            className="block h-full rounded-full bg-accent"
                            style={{ width: `${total ? (c / total) * 100 : 0}%` }}
                          />
                        </span>
                        <span className="w-8 text-right">{c}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <div>
                <p className="font-semibold text-foreground">No customer reviews yet.</p>
                <p className="mt-1 text-sm text-muted-foreground">Be the first to share your experience.</p>
              </div>
            )}
            <Button variant="hero" size="lg" className="mt-5 w-full" onClick={() => setOpen(true)}>
              <MessageSquarePlus /> Write a review
            </Button>
          </div>
        </div>

        <div className="min-w-0">
          {total > 0 && (
            <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by rating">
              {[undefined, 5, 4, 3, 2, 1].map((r) => (
                <button
                  key={r ?? "all"}
                  type="button"
                  aria-pressed={rating === r}
                  onClick={() => setRating(r)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    rating === r
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary",
                  )}
                >
                  {r ? (
                    <>
                      {r} <Star className="size-3.5" />
                    </>
                  ) : (
                    "All"
                  )}
                </button>
              ))}
            </div>
          )}

          {q.isError ? (
            <div role="alert" className="card-premium p-6 text-sm text-muted-foreground">
              Reviews couldn't be loaded right now.{" "}
              <button className="font-semibold text-primary underline" onClick={() => q.refetch()}>
                Try again
              </button>
            </div>
          ) : q.isPending ? (
            <div className="grid gap-5 md:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="card-premium h-48 animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="card-premium grid place-items-center p-10 text-center">
              <p className="font-semibold text-foreground">
                {rating ? `No ${rating}-star reviews yet.` : "No customer reviews yet."}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Be the first to share your experience.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                {reviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
              {q.hasNextPage && (
                <div className="mt-6 text-center">
                  <Button variant="glass" onClick={() => q.fetchNextPage()} disabled={q.isFetchingNextPage}>
                    {q.isFetchingNextPage && <Loader2 className="animate-spin" />} Load more reviews
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <WriteReviewDialog open={open} onOpenChange={setOpen} serviceSlug={serviceSlug} />
    </section>
  );
}
