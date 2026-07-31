import { BUSINESS_CONFIG } from "@/config/business";

export interface BookingIntent {
  serviceName: string;
  category?: string;
  customerName?: string;
  customerMobile?: string;
  preferredDate?: string;
  preferredTime?: string;
  location?: string;
  notes?: string;
}

export function buildWhatsAppMessage(intent: BookingIntent): string {
  const lines = [
    `Hello ${BUSINESS_CONFIG.name}, I'd like to book a service:`,
    ``,
    `Service: ${intent.serviceName}`,
  ];
  if (intent.category) lines.push(`Category: ${intent.category}`);
  if (intent.customerName) lines.push(`Name: ${intent.customerName}`);
  if (intent.customerMobile) lines.push(`Mobile: ${intent.customerMobile}`);
  if (intent.location) lines.push(`Location: ${intent.location}`);
  if (intent.preferredDate) lines.push(`Preferred Date: ${intent.preferredDate}`);
  if (intent.preferredTime) lines.push(`Preferred Time: ${intent.preferredTime}`);
  if (intent.notes) lines.push(`Notes: ${intent.notes}`);
  lines.push(``, `Please confirm availability. Thank you!`);
  return lines.join("\n");
}

export function buildWhatsAppUrl(intent: BookingIntent): string {
  const message = buildWhatsAppMessage(intent);
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(intent: BookingIntent) {
  window.open(buildWhatsAppUrl(intent), "_blank");
}
