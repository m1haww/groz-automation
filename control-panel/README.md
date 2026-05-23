# GROZ Control Panel

Web UI pentru sistemul multi-agent GROZ Automation.

## Rulare locală

```bash
cd control-panel
npm install
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000)

## Stack

- Next.js 15 (App Router)
- React 19 RC
- Tailwind CSS
- TypeScript
- lucide-react (icons)

## Structură

```
control-panel/
├── app/
│   ├── page.tsx           # Dashboard
│   ├── agents/page.tsx    # Lista agenți
│   ├── tasks/page.tsx     # Task inbox
│   ├── activity/page.tsx  # Activity log + bugs
│   └── settings/page.tsx  # Configurare
├── components/
│   ├── Sidebar.tsx
│   ├── AgentCard.tsx
│   ├── StatusBadge.tsx
│   ├── StatCard.tsx
│   └── ActivityFeed.tsx
└── lib/
    ├── types.ts
    ├── mock-data.ts
    └── utils.ts
```

## Status actual

- ✅ UI complet cu mock data
- ⏳ Integrare cu Anthropic Routines API
- ⏳ Conectare la Turso (state DB)
- ⏳ Auth pentru echipă (Clerk / Supabase)
- ⏳ Realtime updates (SSE)
