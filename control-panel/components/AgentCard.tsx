import { Agent } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { Play, Pause, Settings as SettingsIcon } from "lucide-react";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="card group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-sm text-white/95">{agent.name}</h3>
          <p className="text-xs text-groz-muted mt-1">{agent.role}</p>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <p className="text-xs text-groz-muted leading-relaxed mb-4 line-clamp-2">
        {agent.description}
      </p>

      <div className="grid grid-cols-2 gap-3 text-xs mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
        <div>
          <div className="text-groz-muted mb-0.5 text-[10px] uppercase tracking-wider">
            Last run
          </div>
          <div className="text-white/90">{agent.lastRun}</div>
        </div>
        <div>
          <div className="text-groz-muted mb-0.5 text-[10px] uppercase tracking-wider">
            Schedule
          </div>
          <div className="font-mono text-[11px] text-white/90">{agent.cron}</div>
        </div>
        <div>
          <div className="text-groz-muted mb-0.5 text-[10px] uppercase tracking-wider">
            Runs today
          </div>
          <div className="text-white/90 font-medium">{agent.runsToday}</div>
        </div>
        <div>
          <div className="text-groz-muted mb-0.5 text-[10px] uppercase tracking-wider">
            Success
          </div>
          <div className="text-red-400 font-medium">
            {agent.successRate}%
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary text-xs flex-1 justify-center">
          <Play className="w-3 h-3" />
          Trigger
        </button>
        <button className="btn text-xs">
          <Pause className="w-3 h-3" />
        </button>
        <button className="btn text-xs">
          <SettingsIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
