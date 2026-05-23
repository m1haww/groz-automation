# GROZ Automation

Sistem multi-agent autonom pentru dezvoltarea, testarea și QA-ul aplicațiilor iOS (Swift + Flutter).
Rulează 24/7 pe Anthropic Cloud. Folosește doar GROZ Claude Max subscription.

```
┌─────────────────────────────────────────────────────────┐
│  GROZ Control Panel  (localhost / Vercel)               │
│         ↓                                               │
│  GROZ Workspace  (GitHub + Notion + Turso)              │
│         ↓                                               │
│  5 Agenți pe Anthropic Cloud:                           │
│  Orchestrator · Proposer · Builder · Critic · QA Tester │
│         ↓                                               │
│  Codemagic CI  (build iOS + Maestro tests)              │
└─────────────────────────────────────────────────────────┘
```

## Structură proiect

```
GROZ-Automation/
├── README.md                ← acest fișier
├── SETUP.md                 ← pași concreți pentru lansare
│
├── control-panel/           ← Next.js admin UI (rulează pe localhost)
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── README.md
│
├── routines/                ← prompturile celor 5 agenți
│   ├── orchestrator.md
│   ├── proposer.md
│   ├── builder.md
│   ├── critic.md
│   └── qa-tester.md
│
├── ci/
│   └── codemagic.yaml.template
│
├── maestro/                 ← teste UI iOS
│   ├── config.yaml
│   └── flows/
│       ├── 01_launch.yaml
│       ├── 02_onboarding.yaml
│       └── 03_main_flow.yaml
│
├── docs/
│   └── GROZ_AUTOMATION.md   ← documentația arhitecturii
│
└── scripts/                 ← (gol momentan)
```

## Quick start — vezi Control Panel-ul în 60 de secunde

```bash
cd ~/Desktop/GROZ-Automation/control-panel
npm install
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000)

Vezi imediat: Dashboard, Agents, Tasks, Activity, Settings cu mock data.

## Următorii pași

Vezi [SETUP.md](SETUP.md) pentru ghidul complet de lansare.

## Status componente

| Componentă | Status | Locație |
|---|---|---|
| Documentație arhitectură | ✅ gata | `docs/GROZ_AUTOMATION.md` |
| Control Panel (UI) | ✅ gata cu mock data | `control-panel/` |
| Prompts agenți | ✅ gata | `routines/` |
| Codemagic CI template | ✅ gata | `ci/codemagic.yaml.template` |
| Maestro flow exemple | ✅ gata | `maestro/flows/` |
| GitHub repo GROZ | ⏳ tu îl creezi | — |
| Routines pe Anthropic | ⏳ tu le creezi | claude.ai/code/routines |
| Notion workspace | ⏳ tu îl creezi | notion.so |
| Turso DB | ⏳ tu o creezi | turso.tech |
| Integration Control Panel ↔ Routines | ⏳ urmează | — |

## Stack

- **AI/Agents:** Anthropic Claude (Routines pe GROZ Max)
- **Frontend:** Next.js 15, React 19, Tailwind, TypeScript
- **CI/CD:** Codemagic (iOS)
- **Testing:** Maestro
- **State:** Turso (SQLite edge), GitHub, Notion
- **Observability:** Sentry, Discord webhooks

---

**Brand:** GROZ
**Owner:** echipa GROZ (Mihai + coleg)
**Version:** v0.1.0 (foundation)
**Date:** 2026-05-23
