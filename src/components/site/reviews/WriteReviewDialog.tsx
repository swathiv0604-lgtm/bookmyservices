import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ImagePlus, Loader2, X } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { allServices } from "@/components/site/data";
import { REVIEW_LIMITS, submitReview } from "@/lib/reviews.functions";
import { StarRatingInput } from "./StarRatingInput";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_ORIGINAL = 10 * 1024 * 1024;

const formSchema = z.object({
  name: z.string().trim().min(REVIEW_LIMITS.nameMin, "Please enter your name.").max(REVIEW_LIMITS.nameMax),
  rating: z.number().min(1, "Please choose a star rating."),
  body: z
    .string()
    .trim()
    .min(REVIEW_LIMITS.bodyMin, `Please write at least ${REVIEW_LIMITS.bodyMin} characters.`)
    .max(REVIEW_LIMITS.bodyMax),
  serviceSlug: z.string().min(1, "Please choose the service you booked."),
});

type Photo = { id: string; dataUrl: string; name: string };

async function compress(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

export function WriteReviewDialog({
  open,
  onOpenChange,
  serviceSlug,
  onSubmitted,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  serviceSlug?: string;
  onSubmitted?: () => void;
}) {
  const submit = useServerFn(submitReview);
  const fileRef = useRef<HTMLInputElement>(null);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [slug, setSlug] = useState(serviceSlug ?? "");
  const [website, setWebsite] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "processing" | "submitting" | "done">("idle");
  const [formError, setFormError] = useState("");

  const reset = () => {
    setRating(0);
    setName("");
    setBody("");
    setSlug(serviceSlug ?? "");
    setPhotos([]);
    setErrors({});
    setFormError("");
    setStatus("idle");
  };

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setFormError("");
    const room = REVIEW_LIMITS.maxPhotos - photos.length;
    const picked = Array.from(files).slice(0, room);
    if (files.length > room) setFormError(`You can add up to ${REVIEW_LIMITS.maxPhotos} photos.`);
    setStatus("processing");
    const next: Photo[] = [];
    for (const f of picked) {
      if (!ACCEPTED.includes(f.type)) {
        setFormError("Only JPG, PNG or WEBP photos are allowed.");
        continue;
      }
      if (f.size > MAX_ORIGINAL) {
        setFormError("Each photo must be under 10 MB.");
        continue;
      }
      try {
        next.push({ id: crypto.randomUUID(), dataUrl: await compress(f), name: f.name });
      } catch {
        setFormError("One photo couldn't be read. Please try another.");
      }
    }
    setPhotos((p) => [...p, ...next]);
    setStatus("idle");
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const parsed = formSchema.safeParse({ name, rating, body, serviceSlug: slug });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    const svc = allServices.find((s) => s.slug === slug);
    try {
      const res = await submit({
        data: {
          name,
          rating,
          body,
          serviceSlug: svc?.slug ?? null,
          serviceName: svc?.title ?? null,
          photos: photos.map((p) => p.dataUrl),
          website,
        },
      });
      if (!res.ok) {
        setFormError(res.error);
        setStatus("idle");
        return;
      }
      setStatus("done");
      onSubmitted?.();
    } catch {
      setFormError("Something went wrong. Your review is still here — please try again.");
      setStatus("idle");
    }
  };

  const remaining = REVIEW_LIMITS.bodyMax - body.length;
  const busy = status === "submitting" || status === "processing";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (busy) return;
        onOpenChange(o);
        if (!o && status === "done") reset();
      }}
    >
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        {status === "done" ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <DialogTitle className="mt-4 font-display text-2xl">
              Thank you for sharing your experience!
            </DialogTitle>
            <DialogDescription className="mt-2">
              Your review has been submitted and will appear publicly after approval.
            </DialogDescription>
            <Button
              variant="hero"
              className="mt-6"
              onClick={() => {
                onOpenChange(false);
                reset();
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Write a review</DialogTitle>
              <DialogDescription>
                Tell other customers about your experience. Reviews are checked before they appear.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={onSubmit} noValidate className="mt-2 grid gap-5">
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-foreground">Your rating *</legend>
                <StarRatingInput value={rating} onChange={setRating} invalid={!!errors.rating} />
                {errors.rating && <p className="mt-1 text-sm text-destructive">{errors.rating}</p>}
              </fieldset>

              <div>
                <label htmlFor="rv-service" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Service booked *
                </label>
                <select
                  id="rv-service"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  disabled={!!serviceSlug}
                  aria-invalid={!!errors.serviceSlug || undefined}
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-80"
                >
                  <option value="">Choose a service…</option>
                  {allServices.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
                {errors.serviceSlug && <p className="mt-1 text-sm text-destructive">{errors.serviceSlug}</p>}
              </div>

              <div>
                <label htmlFor="rv-name" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Your name *
                </label>
                <input
                  id="rv-name"
                  value={name}
                  maxLength={REVIEW_LIMITS.nameMax}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name || undefined}
                  aria-describedby="rv-name-hint"
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                <p id="rv-name-hint" className="mt-1 text-xs text-muted-foreground">
                  Only your first name and last initial are shown publicly.
                </p>
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="rv-body" className="mb-1.5 block text-sm font-semibold text-foreground">
                  Your review *
                </label>
                <textarea
                  id="rv-body"
                  rows={5}
                  value={body}
                  maxLength={REVIEW_LIMITS.bodyMax}
                  onChange={(e) => setBody(e.target.value)}
                  aria-invalid={!!errors.body || undefined}
                  aria-describedby="rv-body-count"
                  placeholder="What went well? How was the professional, timing and quality of work?"
                  className="w-full rounded-xl border border-input bg-background p-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                />
                <p id="rv-body-count" className="mt-1 text-right text-xs text-muted-foreground">
                  {remaining} characters left
                </p>
                {errors.body && <p className="text-sm text-destructive">{errors.body}</p>}
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-semibold text-foreground">
                  Photos <span className="font-normal text-muted-foreground">(optional, up to {REVIEW_LIMITS.maxPhotos})</span>
                </span>
                <div className="flex flex-wrap gap-3">
                  {photos.map((p, i) => (
                    <div key={p.id} className="relative size-20 overflow-hidden rounded-xl border border-border">
                      <img src={p.dataUrl} alt={`Selected photo ${i + 1}`} className="size-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotos((ps) => ps.filter((x) => x.id !== p.id))}
                        aria-label={`Remove photo ${i + 1}`}
                        className="absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-card/90 text-foreground shadow"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                  {photos.length < REVIEW_LIMITS.maxPhotos && (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={busy}
                      className="grid size-20 place-items-center rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {status === "processing" ? (
                        <Loader2 className="size-5 animate-spin" />
                      ) : (
                        <span className="grid place-items-center gap-1 text-xs">
                          <ImagePlus className="size-5" /> Add
                        </span>
                      )}
                    </button>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="sr-only"
                  aria-label="Upload review photos"
                  onChange={(e) => addFiles(e.target.files)}
                />
              </div>

              {/* Honeypot for bots — hidden from people and screen readers */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
              />

              {formError && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {formError}
                </p>
              )}

              <Button type="submit" variant="hero" size="lg" disabled={busy}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit review"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
