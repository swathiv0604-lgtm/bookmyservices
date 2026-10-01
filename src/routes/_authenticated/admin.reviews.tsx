import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StarsDisplay } from "@/components/site/reviews/StarRatingInput";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin, listModerationQueue, moderateReview } from "@/lib/reviews.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Review approvals — BookYourServiceConnect" },
      { name: "description", content: "Approve or reject customer reviews." },
      { property: "og:title", content: "Review approvals — BookYourServiceConnect" },
      { property: "og:description", content: "Approve or reject customer reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminReviews,
});

type Status = "pending" | "approved" | "rejected";

function AdminReviews() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [status, setStatus] = useState<Status>("pending");
  const isAdminFn = useServerFn(checkIsAdmin);
  const listFn = useServerFn(listModerationQueue);
  const modFn = useServerFn(moderateReview);

  const admin = useQuery({ queryKey: ["is-admin"], queryFn: () => isAdminFn() });
  const list = useQuery({
    queryKey: ["moderation", status],
    queryFn: () => listFn({ data: { status } }),
    enabled: admin.data?.isAdmin === true,
  });
  const mod = useMutation({
    mutationFn: (v: { id: string; action: "approve" | "reject" | "delete" }) => modFn({ data: v }),
    onSuccess: (_d, v) => {
      toast.success(v.action === "approve" ? "Review approved" : v.action === "reject" ? "Review rejected" : "Review deleted");
      qc.invalidateQueries({ queryKey: ["moderation"] });
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => toast.error("Action failed. Please try again."),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="section-shell py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-semibold text-ink">Review approvals</h1>
          <Button variant="glass" size="sm" onClick={signOut}>Sign out</Button>
        </div>

        {admin.isPending ? (
          <Loader2 className="mt-10 animate-spin text-primary" />
        ) : !admin.data?.isAdmin ? (
          <div className="card-premium mt-8 p-6 text-sm text-muted-foreground">
            This account doesn't have permission to approve reviews.
          </div>
        ) : (
          <>
            <div className="mt-6 flex gap-2 overflow-x-auto" role="group" aria-label="Filter by status">
              {(["pending", "approved", "rejected"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={status === s}
                  onClick={() => setStatus(s)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-1.5 text-sm capitalize",
                    status === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            {list.isPending ? (
              <Loader2 className="mt-10 animate-spin text-primary" />
            ) : list.isError ? (
              <p className="mt-8 text-sm text-muted-foreground">Couldn't load reviews.</p>
            ) : list.data.length === 0 ? (
              <div className="card-premium mt-8 p-6 text-sm text-muted-foreground">No {status} reviews.</div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {list.data.map((r) => (
                  <article key={r.id} className="card-premium flex min-w-0 flex-col p-5">
                    <StarsDisplay value={r.rating} />
                    <p className="mt-2 text-sm font-semibold text-foreground">{r.displayName}</p>
                    <p className="text-xs text-primary">{r.serviceName ?? "No service selected"}</p>
                    <p className="mt-3 flex-1 text-sm break-words whitespace-pre-line text-foreground">{r.body}</p>
                    {r.photos.length > 0 && (
                      <div className="mt-3 flex gap-2 overflow-x-auto">
                        {r.photos.map((src, i) => (
                          <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="shrink-0">
                            <img src={src} alt={`Customer photo ${i + 1}`} className="size-20 rounded-lg border border-border object-cover" />
                          </a>
                        ))}
                      </div>
                    )}
                    <p className="mt-3 text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleString("en-IN")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                      {r.status !== "approved" && (
                        <Button size="sm" variant="hero" disabled={mod.isPending} onClick={() => mod.mutate({ id: r.id, action: "approve" })}>
                          <Check /> Approve
                        </Button>
                      )}
                      {r.status !== "rejected" && (
                        <Button size="sm" variant="glass" disabled={mod.isPending} onClick={() => mod.mutate({ id: r.id, action: "reject" })}>
                          <X /> Reject
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={mod.isPending}
                        onClick={() => confirm("Delete this review permanently?") && mod.mutate({ id: r.id, action: "delete" })}
                      >
                        <Trash2 /> Delete
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
