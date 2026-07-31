import { BUSINESS_CONFIG } from "@/config/business";

export function buildUpiLink(amount: number, note: string): string {
  const params = new URLSearchParams({
    pa: BUSINESS_CONFIG.upiId,
    pn: BUSINESS_CONFIG.upiPayeeName,
    am: amount.toFixed(2),
    cu: "INR",
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}

export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function payNow(amount: number, note: string) {
  const link = buildUpiLink(amount, note);
  if (isMobileDevice()) {
    window.location.href = link; // opens installed UPI app chooser
  }
  return link;
}
