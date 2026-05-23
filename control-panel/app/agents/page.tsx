import { mockAgents } from "@/lib/mock-data";
import { AgentCard } from "@/components/AgentCard";

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="gradient-text">Agents</span>
        </h1>
        <p className="text-sm text-groz-muted mt-1.5">
          Toți agenții GROZ — status, configurare și control.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
