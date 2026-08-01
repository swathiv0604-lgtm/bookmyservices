import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <button
      type="button"
      aria-label="Chat with BookYourService on WhatsApp"
      onClick={() => openWhatsApp({ serviceName: "General Inquiry" })}
      className="fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-success text-success-foreground ring-4 ring-primary/25 shadow-[var(--shadow-elevate)] transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-6" />
    </button>
  );
}
