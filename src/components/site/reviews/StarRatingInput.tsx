import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

export function StarRatingInput({
  value,
  onChange,
  invalid,
}: {
  value: number;
  onChange: (v: number) => void;
  invalid?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Your rating"
        aria-invalid={invalid || undefined}
        className="flex gap-1"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            onChange(Math.min(5, (value || 0) + 1));
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            onChange(Math.max(1, (value || 2) - 1));
          }
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""} — ${labels[n]}`}
            tabIndex={value === n || (!value && n === 1) ? 0 : -1}
            onClick={() => onChange(n)}
            className="grid size-11 place-items-center rounded-lg transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Star
              className={cn(
                "size-7 transition-colors",
                n <= value ? "fill-accent text-accent" : "text-muted-foreground/40",
              )}
            />
          </button>
        ))}
      </div>
      <span className="text-sm font-medium text-muted-foreground" aria-live="polite">
        {value ? `${value}/5 · ${labels[value]}` : "Select a rating"}
      </span>
    </div>
  );
}

export function StarsDisplay({ value, size = "size-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(size, n <= Math.round(value) ? "fill-accent text-accent" : "text-border")}
        />
      ))}
    </span>
  );
}
