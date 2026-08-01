import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { openWhatsApp, type BookingIntent } from "@/lib/whatsapp";

type Props = {
  intent: BookingIntent;
  children?: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

/** Opens WhatsApp with a pre-filled message and then shows an in-app confirmation screen. */
export function OrderNowButton({
  intent,
  children,
  variant = "hero",
  size = "sm",
  className,
}: Props) {
  const [done, setDone] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => {
          openWhatsApp(intent);
          setDone(true);
        }}
      >
        {children ?? (
          <>
            <MessageCircle className="size-4" /> Order now
          </>
        )}
      </Button>

      <Dialog open={done} onOpenChange={setDone}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-success-soft text-success">
              <CheckCircle2 className="size-7" />
            </span>
            <DialogTitle className="font-display text-xl">Your request has been sent</DialogTitle>
            <DialogDescription>
              We&apos;ve opened WhatsApp with your details for {intent.serviceName} — we&apos;ll
              confirm shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Button variant="hero" size="lg" onClick={() => openWhatsApp(intent)}>
              Reopen WhatsApp
            </Button>
            <Button variant="glass" size="lg" asChild onClick={() => setDone(false)}>
              <Link to="/services">Continue browsing</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
