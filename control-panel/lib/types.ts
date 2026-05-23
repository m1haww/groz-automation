export type AgentStatus = "running" | "idle" | "paused" | "failed";

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  lastRun: string;
  nextRun?: string;
  cron: string;
  runsToday: number;
  successRate: number;
  description: string;
};

export type Task = {
  id: string;
  title: string;
  status: "inbox" | "in_progress" | "completed" | "blocked";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
};

export type ActivityEvent = {
  id: string;
  timestamp: string;
  agent: string;
  event: string;
  level: "info" | "success" | "warning" | "error";
  link?: string;
};

export type BugReport = {
  id: string;
  title: string;
  severity: "critical" | "major" | "minor" | "nitpick";
  buildId: string;
  foundBy: string;
  createdAt: string;
  status: "open" | "in_progress" | "fixed" | "wontfix";
};
