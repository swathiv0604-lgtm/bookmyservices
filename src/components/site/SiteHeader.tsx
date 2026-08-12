import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Instagram, Menu, Moon, Search, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/site/BrandLogo";
import { BUSINESS_CONFIG } from "@/config/business";

const navLinks = [
  { label: "Categories", href: "/services" },
  { label: "Popular services", href: "/#services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For providers", href: "/#providers" },
  { label: "Support", href: "/#faq" },
];

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("bys-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("bys-theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const goToSearch = () => {
    setOpen(false);
    if (pathname === "/") {
      const el = document.getElementById("search");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el.querySelector("input") as HTMLInputElement | null)?.focus();
        return;
      }
    }
    navigate({ to: "/", hash: "search" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="section-shell flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" aria-label="Book Your Service.com home" className="flex items-center">
          <BrandLogo className="h-10 sm:h-12" />
        </Link>

        <nav className="hidden shrink-0 items-center gap-6 lg:flex xl:gap-7" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search services"
            onClick={goToSearch}
            className="hidden sm:inline-flex"
          >
            <Search />
          </Button>
          {BUSINESS_CONFIG.instagramUrl && (
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram (opens in a new tab)"
              className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-safe:hover:scale-110"
            >
              <Instagram className="size-5" />
            </a>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button variant="glass" size="sm" className="hidden xl:inline-flex" asChild>
            <Link to="/services">Browse services</Link>
          </Button>
          <Button variant="hero" size="sm" className="hidden md:inline-flex" onClick={goToSearch}>
            Book a service
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <nav className="section-shell flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <Button variant="glass" className="flex-1" asChild>
                <Link to="/services" onClick={() => setOpen(false)}>
                  Browse services
                </Link>
              </Button>
              <Button variant="hero" className="flex-1" onClick={goToSearch}>
                Book a service
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
