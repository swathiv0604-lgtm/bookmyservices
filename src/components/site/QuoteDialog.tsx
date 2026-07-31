import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { openWhatsApp } from "@/lib/whatsapp";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  category?: string;
};

export function QuoteDialog({ open, onOpenChange, serviceName, category }: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name";
    if (!/^[0-9]{10}$/.test(mobile.trim())) next.mobile = "Enter a valid 10-digit mobile number";
    if (description.trim().length < 10) next.description = "Please describe the work (min 10 characters)";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    openWhatsApp({
      serviceName,
      category,
      customerName: name.trim(),
      customerMobile: mobile.trim(),
      notes: `Quote request — ${description.trim()}${imageName ? ` | Reference image: ${imageName} (will share on WhatsApp)` : ""}`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Request a quote</DialogTitle>
          <DialogDescription>{serviceName}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="q-name">Your name</Label>
            <Input id="q-name" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="q-mobile">Mobile number</Label>
            <Input
              id="q-mobile"
              inputMode="numeric"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            />
            {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="q-desc">Describe the work</Label>
            <Textarea
              id="q-desc"
              rows={4}
              maxLength={800}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="q-img">Reference image (optional)</Label>
            <Input
              id="q-img"
              type="file"
              accept="image/*"
              onChange={(e) => setImageName(e.target.files?.[0]?.name ?? "")}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="hero" size="lg" className="w-full" onClick={submit}>
            Submit & open WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
