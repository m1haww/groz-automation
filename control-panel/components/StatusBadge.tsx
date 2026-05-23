import { AgentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<
  AgentStatus,
  { dot: string; text: string; bg: string; label: string; glow: string }
> = {
  running: {
    dot: "bg-red-500",
    text: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
    label: "Running",
    glow: "shadow-[0_0_10px_rgba(239,68,68,0.9)]",
  },
  idle: {
    dot: "bg-white/40",
    text: "text-white/55",
    bg: "bg-white/5 border-white/10",
    label: "Idle",
    glow: "",
  },
  paused: {
    dot: "bg-orange-400",
    text: "text-orange-300",
    bg: "bg-orange-500/10 border-orange-500/30",
    label: "Paused",
    glow: "shadow-[0_0_8px_rgba(251,146,60,0.7)]",
  },
  failed: {
    dot: "bg-red-600",
    text: "text-red-500",
    bg: "bg-red-700/15 border-red-700/40",
    label: "Failed",
    glow: "shadow-[0_0_10px_rgba(220,38,38,0.9)]",
  },
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  const s = styles[status];
  return (
    <span className={cn("badge border", s.bg, s.text)}>
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          s.dot,
          s.glow,
          status === "running" && "animate-pulse"
        )}
      />
      {s.label}
    </span>
  );
}
