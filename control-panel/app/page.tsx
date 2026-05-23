import { mockAgents, mockActivity, mockStats } from "@/lib/mock-data";
import { AgentCard } from "@/components/AgentCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { StatCard } from "@/components/StatCard";
import {
  Zap,
  Bug,
  Hammer,
  CircleDollarSign,
  Pause,
  RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
  const { budget, builds, bugs } = mockStats;
  const budgetPct = (budget.usedToday / budget.capToday) * 100;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-sm text-groz-muted mt-1.5">
            GROZ Automation — multi-agent QA system pentru iOS
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="btn">
            <Pause className="w-4 h-4" />
            Pause all
          </button>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={CircleDollarSign}
          label="Budget today"
          value={`${budget.usedToday}/${budget.capToday}`}
          sub={`${Math.round(budgetPct)}% used`}
          progress={budgetPct}
          accent="primary"
        />
        <StatCard
          icon={Hammer}
          label="Builds today"
          value={builds.today}
          sub={`${builds.successRate}% success · avg ${builds.avgDuration}`}
          accent="bright"
        />
        <StatCard
          icon={Bug}
          label="Bugs today"
          value={bugs.foundToday}
          sub={`${bugs.openTotal} open · ${bugs.fixedThisWeek} fixed`}
          accent="dim"
        />
        <StatCard
          icon={Zap}
          label="Active agents"
          value={mockAgents.filter((a) => a.status === "running").length}
          sub={`${mockAgents.length} total in system`}
          accent="neutral"
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-red-400 to-red-700" />
            Agents
          </h2>
          <a
            href="/agents"
            className="text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      <section>
        <ActivityFeed events={mockActivity} />
      </section>
    </div>
  );
}
