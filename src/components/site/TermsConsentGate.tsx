import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { hasCurrentConsent, recordConsent, TERMS_VERSION } from "@/lib/consent";

/** Routes the user must always be able to read before accepting. */
const LEGAL_PATHS = ["/terms-of-service", "/privacy-policy"];

export function TermsConsentGate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [accepted, setAccepted] = useState(true); // assume accepted until checked on client
  const [checked, setChecked] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAccepted(hasCurrentConsent());
  }, []);

  const onLegalPage = LEGAL_PATHS.some((p) => pathname.startsWith(p));
  const open = !accepted && !onLegalPage;

  // Block scroll, trap focus, swallow Escape while the gate is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>("input")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const focusables = node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-consent-title"
        aria-describedby="terms-consent-description"
        className="my-auto w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-2xl sm:p-7"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2
          id="terms-consent-title"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Terms &amp; Conditions
        </h2>
        <p id="terms-consent-description" className="mt-2 text-sm leading-6 text-muted-foreground">
          Please review and accept our Terms and Conditions to continue.
        </p>

        <div className="mt-5 flex items-start gap-3 rounded-lg border border-border bg-card/60 p-3">
          <input
            id="terms-consent-checkbox"
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
          <label
            htmlFor="terms-consent-checkbox"
            className="cursor-pointer text-sm leading-6 text-foreground"
          >
            I accept the{" "}
            <Link
              to="/terms-of-service"
              className="font-medium text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Terms and Conditions
            </Link>
          </label>
        </div>

        <Button
          type="button"
          variant="hero"
          className="mt-5 w-full"
          disabled={!checked}
          onClick={() => {
            if (!checked) return;
            recordConsent();
            setAccepted(true);
          }}
        >
          Accept &amp; Continue
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Terms version {TERMS_VERSION} ·{" "}
          <Link
            to="/privacy-policy"
            className="underline underline-offset-4 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
