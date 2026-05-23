import { mockActivity, mockBugs } from "@/lib/mock-data";
import { ActivityFeed } from "@/components/ActivityFeed";
import { cn } from "@/lib/utils";

const severityStyles = {
  critical: "text-red-500 bg-red-700/15 border-red-700/40",
  major: "text-red-400 bg-red-500/10 border-red-500/30",
  minor: "text-red-300 bg-red-400/10 border-red-400/30",
  nitpick: "text-white/60 bg-white/5 border-white/10",
};

const statusStyles = {
  open: "text-red-500",
  in_progress: "text-orange-400",
  fixed: "text-red-300",
  wontfix: "text-white/40",
};

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="gradient-text">Activity</span>
        </h1>
        <p className="text-sm text-groz-muted mt-1.5">
          Tot ce s-a întâmplat în sistem — evenimente și bug-uri găsite
        </p>
      </header>

      <ActivityFeed events={mockActivity} />

      <div className="card">
        <h2 className="font-semibold text-sm text-white/95 mb-4 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-gradient-to-b from-red-400 to-red-700" />
          Bug reports
        </h2>
        <div className="space-y-2">
          {mockBugs.map((bug) => (
            <div
              key={bug.id}
              className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <span
                className={cn("badge border", severityStyles[bug.severity])}
              >
                {bug.severity}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white/90">{bug.title}</div>
                <div className="text-xs text-groz-muted mt-0.5">
                  build {bug.buildId} · găsit de {bug.foundBy} · {bug.createdAt}
                </div>
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  statusStyles[bug.status]
                )}
              >
                {bug.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
