import { mockTasks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const statusStyles = {
  inbox: "text-white/60 bg-white/5 border-white/10",
  in_progress: "text-red-300 bg-red-500/10 border-red-500/30",
  completed: "text-red-400 bg-red-600/10 border-red-600/30",
  blocked: "text-red-500 bg-red-700/15 border-red-700/40",
};

const statusLabels = {
  inbox: "Inbox",
  in_progress: "In progress",
  completed: "Completed",
  blocked: "Blocked",
};

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Tasks</span>
          </h1>
          <p className="text-sm text-groz-muted mt-1.5">
            Inbox-ul GROZ — tot ce așteaptă agenții
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          New task
        </button>
      </header>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="text-xs text-groz-muted border-b border-white/5">
            <tr>
              <th className="text-left p-4 font-medium uppercase tracking-wider text-[10px]">
                ID
              </th>
              <th className="text-left p-4 font-medium uppercase tracking-wider text-[10px]">
                Title
              </th>
              <th className="text-left p-4 font-medium uppercase tracking-wider text-[10px]">
                Status
              </th>
              <th className="text-left p-4 font-medium uppercase tracking-wider text-[10px]">
                Assigned to
              </th>
              <th className="text-left p-4 font-medium uppercase tracking-wider text-[10px]">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors"
              >
                <td className="p-4 font-mono text-xs text-groz-muted">
                  {task.id}
                </td>
                <td className="p-4 text-white/90">{task.title}</td>
                <td className="p-4">
                  <span
                    className={cn("badge border", statusStyles[task.status])}
                  >
                    {statusLabels[task.status]}
                  </span>
                </td>
                <td className="p-4 text-groz-muted">
                  {task.assignedTo || "—"}
                </td>
                <td className="p-4 text-xs text-groz-muted">
                  {task.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
