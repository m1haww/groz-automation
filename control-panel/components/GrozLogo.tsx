import { cn } from "@/lib/utils";

export function GrozLogo({
  size = "md",
  showApps = true,
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  showApps?: boolean;
  className?: string;
}) {
  const textSize = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-extrabold tracking-tight",
        textSize,
        className
      )}
    >
      <span>GRO</span>
      <svg
        viewBox="0 0 30 40"
        aria-hidden="true"
        className="inline-block w-[0.75em] h-[1em] mx-[1px]"
        fill="currentColor"
        stroke="none"
        style={{
          filter: "drop-shadow(0 0 12px rgba(239, 68, 68, 0.6))",
        }}
      >
        <path d="M23 0L5 18H18L0 40L25 22H12L30 0H23Z" />
      </svg>
      {showApps && <span>&nbsp;APPS</span>}
    </span>
  );
}
