import logoAsset from "@/assets/logo.jpg.asset.json";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Book Your Service.com logo"
      width={512}
      height={512}
      className={cn("h-11 w-auto object-contain", className)}
    />
  );
}
