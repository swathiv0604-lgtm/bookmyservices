import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Search, ShieldCheck, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Popular services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "For providers", href: "#providers" },
  { label: "Support", href: "#faq" },
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="section-shell flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elevate)]">
            <ShieldCheck className="size-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            BookYour<span className="text-gradient-primary">Service</span>
          </span>
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
            className="hidden sm:inline-flex"
          >
            <Search />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button variant="glass" size="sm" className="hidden xl:inline-flex">
            Sign in
          </Button>
          <Button variant="hero" size="sm" className="hidden md:inline-flex">
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
              <Button variant="glass" className="flex-1">
                Sign in
              </Button>
              <Button variant="hero" className="flex-1">
                Book a service
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
