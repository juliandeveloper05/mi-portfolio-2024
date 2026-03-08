import { cn } from "@/utils/cn";

export default function HeroBackground() {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full",
        "overflow-hidden",
        "pointer-events-none"
      )}
      aria-hidden="true"
    >
      {/* Primary arc glow */}
      <div className="hero-arc hero-arc--primary" />
      {/* Secondary softer outer glow for depth */}
      <div className="hero-arc hero-arc--secondary" />
    </div>
  );
}
