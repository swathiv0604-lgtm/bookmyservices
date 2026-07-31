import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

type FooterLink = { label: string; to?: "/" | "/services"; wa?: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Customers",
    links: [
      { label: "Browse categories", to: "/services" },
      { label: "Popular services", to: "/services" },
      { label: "Request a quote", wa: "I'd like a custom quote." },
      { label: "Booking help", wa: "I need help with my booking." },
      { label: "Refunds", wa: "I have a question about a refund." },
    ],
  },
  {
    title: "Providers",
    links: [
      { label: "Join as a provider", wa: "I want to join as a service provider." },
      { label: "Verification process", wa: "How does provider verification work?" },
      { label: "Pricing & payouts", wa: "Tell me about provider pricing and payouts." },
      { label: "Provider app", wa: "Tell me about the provider app." },
      { label: "Growth resources", wa: "Share provider growth resources." },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About BookYourService", to: "/" },
      { label: "Careers", wa: "I'm interested in careers at BookYourService." },
      { label: "Press", wa: "Press enquiry." },
      { label: "Trust & safety", wa: "I have a trust & safety question." },
      { label: "Contact", wa: "Hello, I'd like to get in touch." },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", wa: "Please share your terms of service." },
      { label: "Privacy policy", wa: "Please share your privacy policy." },
      { label: "Cancellation policy", wa: "Please share your cancellation policy." },
      { label: "Cookie preferences", wa: "I have a question about cookie preferences." },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="section-shell grid gap-12 py-16 lg:grid-cols-[1.3fr_2.7fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <span className="font-display text-lg font-semibold text-ink">
              BookYour<span className="text-gradient-primary">Service</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A marketplace that connects customers with verified local service providers. Discover,
            compare, book, and manage every home or business service in one place.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Launching in Bengaluru, Karnataka · expanding city by city.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          openWhatsApp({ serviceName: link.label, notes: link.wa })
                        }
                        className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} BookYourService. All rights reserved.</p>
          <p>Secure payments · Verified providers · Transparent pricing</p>
        </div>
      </div>
    </footer>
  );
}
