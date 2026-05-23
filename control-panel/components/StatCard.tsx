import { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  progress,
  accent = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  progress?: number;
  accent?: "primary" | "dim" | "bright" | "neutral";
}) {
  const accentGradients = {
    primary: "from-red-500 to-red-700",
    dim: "from-red-700 to-red-900",
    bright: "from-red-400 to-red-600",
    neutral: "from-white/40 to-white/20",
  };

  const iconBgs = {
    primary: "bg-red-500/15 text-red-400 border-red-500/30",
    dim: "bg-red-700/15 text-red-300 border-red-700/30",
    bright: "bg-red-400/15 text-red-300 border-red-400/30",
    neutral: "bg-white/5 text-white/60 border-white/10",
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-groz-muted uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`w-8 h-8 rounded-lg border flex items-center justify-center backdrop-blur-sm ${iconBgs[accent]}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1 tracking-tight">
        {value}
      </div>
      {sub && <div className="text-xs text-groz-muted">{sub}</div>}
      {progress !== undefined && (
        <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div
            className={`h-full bg-gradient-to-r ${accentGradients[accent]} transition-all duration-500`}
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: `0 0 14px rgba(239, 68, 68, 0.6)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
