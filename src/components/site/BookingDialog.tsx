import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS_CONFIG } from "@/config/business";
import { openWhatsApp, type BookingIntent } from "@/lib/whatsapp";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  category?: string;
};

export function BookingDialog({ open, onOpenChange, serviceName, category }: Props) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const intent = (): BookingIntent => ({
    serviceName,
    category,
    customerName: form.name.trim(),
    customerMobile: form.mobile.trim(),
    location: form.address.trim() || BUSINESS_CONFIG.city,
    preferredDate: form.date,
    preferredTime: form.time,
    notes: form.notes.trim() || undefined,
  });

  const confirm = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!/^[0-9]{10}$/.test(form.mobile.trim())) next.mobile = "Enter a valid 10-digit mobile number";
    if (form.address.trim().length < 8) next.address = "Please enter a full service address";
    if (!form.date) next.date = "Choose a preferred date";
    if (!form.time) next.time = "Choose a preferred time";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    openWhatsApp(intent());
    setSent(true);
  };

  const close = (value: boolean) => {
    onOpenChange(value);
    if (!value) setTimeout(() => setSent(false), 200);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        {sent ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-success-soft text-success">
              <CheckCircle2 className="size-7" />
            </span>
            <DialogTitle className="font-display text-xl">Request sent</DialogTitle>
            <DialogDescription>
              We've sent your request via WhatsApp — we'll confirm shortly.
            </DialogDescription>
            <Button variant="hero" size="lg" onClick={() => openWhatsApp(intent())}>
              Reopen WhatsApp
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Confirm your booking</DialogTitle>
              <DialogDescription>{serviceName}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="b-name">Full name</Label>
                <Input id="b-name" maxLength={80} value={form.name} onChange={(e) => set("name")(e.target.value)} />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="b-mobile">Mobile number</Label>
                <Input
                  id="b-mobile"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) => set("mobile")(e.target.value.replace(/\D/g, ""))}
                />
                {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="b-address">Service address</Label>
                <Textarea
                  id="b-address"
                  rows={2}
                  maxLength={300}
                  value={form.address}
                  onChange={(e) => set("address")(e.target.value)}
                />
                {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="b-date">Preferred date</Label>
                  <Input id="b-date" type="date" value={form.date} onChange={(e) => set("date")(e.target.value)} />
                  {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="b-time">Preferred time</Label>
                  <Input id="b-time" type="time" value={form.time} onChange={(e) => set("time")(e.target.value)} />
                  {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="b-notes">Notes (optional)</Label>
                <Textarea
                  id="b-notes"
                  rows={3}
                  maxLength={500}
                  value={form.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                />
              </div>

              <Button variant="hero" size="lg" onClick={confirm}>
                Confirm booking on WhatsApp
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
