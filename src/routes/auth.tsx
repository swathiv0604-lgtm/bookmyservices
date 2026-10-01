import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Team sign in — BookYourServiceConnect" },
      { name: "description", content: "Sign in for BookYourServiceConnect team members." },
      { property: "og:title", content: "Team sign in — BookYourServiceConnect" },
      { property: "og:description", content: "Sign in for BookYourServiceConnect team members." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
      else navigate({ to: "/admin/reviews" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin/reviews` },
      });
      setMsg(error ? error.message : "Check your email to confirm your account, then sign in.");
    }
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="section-shell grid place-items-center py-16">
        <div className="card-premium w-full max-w-sm p-6">
          <h1 className="font-display text-2xl font-semibold text-ink">
            {mode === "in" ? "Team sign in" : "Create team account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">For review approval only. Customers don't need an account.</p>
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {msg && <p role="status" className="text-sm text-muted-foreground">{msg}</p>}
            <Button type="submit" variant="hero" disabled={busy}>
              {busy && <Loader2 className="animate-spin" />} {mode === "in" ? "Sign in" : "Create account"}
            </Button>
            <Button
              type="button"
              variant="glass"
              onClick={() => lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" })}
            >
              Continue with Google
            </Button>
          </form>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-primary underline"
            onClick={() => setMode(mode === "in" ? "up" : "in")}
          >
            {mode === "in" ? "Need an account? Create one" : "Have an account? Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
}
