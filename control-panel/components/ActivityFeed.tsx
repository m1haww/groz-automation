import { ActivityEvent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, XCircle } from "lucide-react";

const levelStyles = {
  info: {
    icon: Info,
    color: "text-white/70",
    bg: "bg-white/5 border-white/10",
  },
  success: {
    icon: CheckCircle2,
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/30",
  },
  warning: {
    icon: AlertCircle,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/30",
  },
  error: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-600/15 border-red-600/40",
  },
};

export function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  return (
    <div className="card">
      <h2 className="font-semibold text-sm text-white/95 mb-4 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gradient-to-b from-red-400 to-red-700" />
        Recent activity
      </h2>
      <div className="space-y-1">
        {events.map((event) => {
          const { icon: Icon, color, bg } = levelStyles[event.level];
          return (
            <div
              key={event.id}
              className="flex items-start gap-3 text-sm p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 backdrop-blur-sm",
                  bg
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-groz-muted mb-0.5">
                  <span className="font-mono">{event.timestamp}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-white/70">{event.agent}</span>
                </div>
                <div className="text-sm text-white/90">{event.event}</div>
              </div>
              {event.link && (
                <a
                  href={event.link}
                  className="text-xs text-red-400 hover:text-red-300 shrink-0 mt-0.5 transition-colors"
                >
                  view →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
