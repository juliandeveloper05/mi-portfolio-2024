// src/components/grain-effect.tsx
import { cn } from "@/utils/utils";

export default function GrainEffect() {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full",
        "before:absolute before:inset-0",
        "before:w-[calc(100%+20rem)] before:h-[calc(100%+20rem)]",
        "before:-top-40 before:-left-40",
        "before:bg-grain before:opacity-15",
        "before:animate-noisy-bg",
        "pointer-events-none"
      )}
      style={{
        willChange: "transform",
      }}
    />
  );
}
