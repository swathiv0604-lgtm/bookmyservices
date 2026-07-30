import { ShieldCheck } from "lucide-react";

const columns = [
  {
    title: "Customers",
    links: ["Browse categories", "Popular services", "Request a quote", "Booking help", "Refunds"],
  },
  {
    title: "Providers",
    links: [
      "Join as a provider",
      "Verification process",
      "Pricing & payouts",
      "Provider app",
      "Growth resources",
    ],
  },
  {
    title: "Company",
    links: ["About BookYourService", "Careers", "Press", "Trust & safety", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Cancellation policy", "Cookie preferences"],
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
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
