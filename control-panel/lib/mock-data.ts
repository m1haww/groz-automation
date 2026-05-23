import { Agent, Task, ActivityEvent, BugReport } from "./types";

export const mockAgents: Agent[] = [
  {
    id: "orchestrator",
    name: "GROZ Orchestrator",
    role: "Dirijor — decide cine rulează",
    status: "running",
    lastRun: "2 min ago",
    nextRun: "in 28 min",
    cron: "*/30 * * * *",
    runsToday: 48,
    successRate: 100,
    description:
      "Citește starea sistemului și declanșează agenții potriviți prin API trigger.",
  },
  {
    id: "proposer",
    name: "GROZ Proposer",
    role: "Generează specs și idei",
    status: "idle",
    lastRun: "1h ago",
    cron: "on-demand",
    runsToday: 3,
    successRate: 100,
    description:
      "Primește brief-uri, cercetează best practices, scrie spec documents pentru features noi.",
  },
  {
    id: "builder",
    name: "GROZ Builder",
    role: "Implementează cod Swift / Dart",
    status: "running",
    lastRun: "5 min ago",
    cron: "on-demand",
    runsToday: 7,
    successRate: 86,
    description:
      "Citește spec-uri, scrie cod, deschide PR-uri pe GitHub cu teste incluse.",
  },
  {
    id: "critic",
    name: "GROZ Critic",
    role: "Review și challenge",
    status: "idle",
    lastRun: "20 min ago",
    cron: "on-demand",
    runsToday: 5,
    successRate: 100,
    description:
      "Analizează PR-uri, identifică probleme, lasă review comments cu scoring.",
  },
  {
    id: "qa-tester",
    name: "GROZ QA Tester",
    role: "Analiză UI/UX cu vision",
    status: "running",
    lastRun: "1 min ago",
    cron: "post-build",
    runsToday: 12,
    successRate: 92,
    description:
      "Rulează după fiecare build Codemagic. Compară screenshots cu Figma, raportează bug-uri vizuale.",
  },
];

export const mockTasks: Task[] = [
  {
    id: "t-001",
    title: "Adaugă dark mode pe Settings screen",
    status: "in_progress",
    assignedTo: "GROZ Builder",
    createdAt: "2026-05-23 09:14",
    updatedAt: "2026-05-23 14:02",
  },
  {
    id: "t-002",
    title: "Verifică regresia vizuală pe iPhone SE",
    status: "completed",
    assignedTo: "GROZ QA Tester",
    createdAt: "2026-05-23 11:00",
    updatedAt: "2026-05-23 11:23",
  },
  {
    id: "t-003",
    title: "Cercetează cum integrăm Apple Pay",
    status: "inbox",
    createdAt: "2026-05-23 13:45",
    updatedAt: "2026-05-23 13:45",
  },
  {
    id: "t-004",
    title: "Fix crash on iPad landscape",
    status: "blocked",
    assignedTo: "GROZ Builder",
    createdAt: "2026-05-22 16:20",
    updatedAt: "2026-05-23 10:10",
  },
];

export const mockActivity: ActivityEvent[] = [
  {
    id: "a-001",
    timestamp: "14:23",
    agent: "GROZ QA Tester",
    event: "Găsit 2 bug-uri vizuale în build #142",
    level: "warning",
    link: "#",
  },
  {
    id: "a-002",
    timestamp: "13:50",
    agent: "GROZ Builder",
    event: "PR #41 deschis pe groz-ios-app",
    level: "success",
    link: "#",
  },
  {
    id: "a-003",
    timestamp: "13:12",
    agent: "GROZ Proposer",
    event: "Spec draftuit pentru dark mode feature",
    level: "info",
    link: "#",
  },
  {
    id: "a-004",
    timestamp: "12:45",
    agent: "GROZ Orchestrator",
    event: "Trigger ciclu nou — 1 task în inbox",
    level: "info",
  },
  {
    id: "a-005",
    timestamp: "11:23",
    agent: "GROZ Critic",
    event: "Review pe PR #40: scor 8/10, sugerat refactor",
    level: "success",
    link: "#",
  },
  {
    id: "a-006",
    timestamp: "10:08",
    agent: "GROZ QA Tester",
    event: "Build #141 — toate testele pasate",
    level: "success",
  },
  {
    id: "a-007",
    timestamp: "09:30",
    agent: "GROZ Builder",
    event: "Eroare la build — Swift compile error",
    level: "error",
    link: "#",
  },
];

export const mockBugs: BugReport[] = [
  {
    id: "b-001",
    title: "Spacing inconsistent pe Login screen iOS",
    severity: "minor",
    buildId: "#142",
    foundBy: "GROZ QA Tester",
    createdAt: "2026-05-23 14:23",
    status: "open",
  },
  {
    id: "b-002",
    title: "Touch target prea mic pe buton Settings",
    severity: "major",
    buildId: "#142",
    foundBy: "GROZ QA Tester",
    createdAt: "2026-05-23 14:23",
    status: "open",
  },
  {
    id: "b-003",
    title: "Dark mode nu respectă System setting",
    severity: "major",
    buildId: "#140",
    foundBy: "GROZ Critic",
    createdAt: "2026-05-22 18:10",
    status: "in_progress",
  },
  {
    id: "b-004",
    title: "Animație fade prea rapidă (100ms vs 200ms spec)",
    severity: "nitpick",
    buildId: "#139",
    foundBy: "GROZ QA Tester",
    createdAt: "2026-05-22 11:05",
    status: "fixed",
  },
];

export const mockStats = {
  budget: {
    usedToday: 47,
    capToday: 100,
    usedMonth: 1240,
    capMonth: 3000,
  },
  builds: {
    today: 8,
    successRate: 87.5,
    avgDuration: "4m 12s",
  },
  bugs: {
    foundToday: 5,
    openTotal: 12,
    fixedThisWeek: 24,
  },
};
