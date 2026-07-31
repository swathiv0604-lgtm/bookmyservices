import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildUpiLink, isMobileDevice, payNow } from "@/lib/payment";
import { openWhatsApp } from "@/lib/whatsapp";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  serviceName: string;
  category?: string;
};

export function PaymentModal({ open, onOpenChange, amount, serviceName, category }: Props) {
  const [copied, setCopied] = useState(false);
  const note = `Payment for ${serviceName}`;
  const link = buildUpiLink(amount, note);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_CONFIG.upiId);
    } catch {
      const el = document.createElement("textarea");
      el.value = BUSINESS_CONFIG.upiId;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Pay ₹{amount.toLocaleString("en-IN")}</DialogTitle>
          <DialogDescription>{serviceName}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <QRCodeSVG value={link} size={188} />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Scan with any UPI app (GPay, PhonePe, Paytm) or pay directly on mobile.
          </p>

          <div className="flex w-full items-center justify-between gap-3 rounded-xl bg-secondary/60 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">UPI ID</p>
              <p className="truncate text-sm font-semibold text-foreground">{BUSINESS_CONFIG.upiId}</p>
            </div>
            <Button variant="glass" size="sm" onClick={copyUpi}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy UPI ID"}
            </Button>
          </div>

          <div className="grid w-full gap-2">
            <Button
              variant="hero"
              size="lg"
              onClick={() => {
                if (isMobileDevice()) payNow(amount, note);
                else window.location.href = link;
              }}
            >
              <Smartphone /> Pay now in UPI app
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() =>
                openWhatsApp({
                  serviceName,
                  category,
                  notes: "I have completed payment, please confirm my booking.",
                })
              }
            >
              Already paid? Confirm on WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
