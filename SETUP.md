# GROZ Automation — Setup Guide

Ghid pas cu pas pentru lansarea sistemului GROZ Automation, de la zero la funcțional.

---

## Faza 0 — Verifică Control Panel-ul local (5 min)

**Scop:** vezi cu ochii tăi cum arată sistemul înainte să conectezi orice.

```bash
cd ~/Desktop/GROZ-Automation/control-panel

# Instalează dependențele
npm install

# Pornește dev server
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000) în browser.

Ce vei vedea:
- **Dashboard** — stats, 5 agenți cu status, activity feed
- **Agents** — listă completă, butoane Trigger/Pause
- **Tasks** — inbox cu task-uri demo
- **Activity** — log de evenimente + bug reports
- **Settings** — budget caps, integrări, team

Toate datele sunt mock (în `lib/mock-data.ts`). În Faza 4 conectăm la date reale.

✅ **Done când:** vezi UI-ul funcțional în browser

---

## Faza 1 — GitHub Setup (15 min)

**Scop:** ai un repo unde stă tot codul GROZ.

### 1.1 Creează repo privat

- Pe github.com → New repository
- Nume: `groz-automation`
- Visibility: **Private**
- NU init cu README (avem deja)

### 1.2 Push proiectul

```bash
cd ~/Desktop/GROZ-Automation
git init
git add .
git commit -m "Initial GROZ Automation setup"
git remote add origin git@github.com:YOUR_USER/groz-automation.git
git branch -M main
git push -u origin main
```

### 1.3 Invită colegul

- Repo → Settings → Collaborators → Add people
- Adaugă email/username coleg

✅ **Done când:** ambii vedeți repo-ul pe GitHub

---

## Faza 2 — Claude Routine "Hello GROZ" (10 min)

**Scop:** verifici că Routines funcționează pe contul tău Max.

### 2.1 Deschide Routines

Mergi la [claude.ai/code/routines](https://claude.ai/code/routines)

### 2.2 Crează prima Routine

- New Routine
- Name: `GROZ Hello`
- Schedule: `Manual` (pentru test)
- Prompt:
  ```
  Spune "Hello echipa GROZ!" și data de azi.
  Apoi listează toate fișierele din folder-ul curent.
  ```

### 2.3 Rulează

- Apasă "Run now"
- Așteaptă 30-60 secunde
- Vezi output-ul

✅ **Done când:** rezultatul confirmă că Routine merge

---

## Faza 3 — Prima Routine reală: GROZ Orchestrator (30 min)

**Scop:** primul agent GROZ funcțional, conectat la GitHub.

### 3.1 Creează Routine

- Name: `GROZ Orchestrator`
- Schedule: `*/30 * * * *` (la 30 min)
- Prompt: copiază tot din `routines/orchestrator.md`

### 3.2 Conectează MCP GitHub

În setting-urile Routine:
- Add connector → GitHub
- Authorize → selectează repo-ul `groz-automation`

### 3.3 Test manual

- Crează un fișier în repo: `groz-workspace/inbox/test-task-001.md`
  ```markdown
  # Test task
  Vreau să verific dacă Orchestrator vede task-ul.
  ```
- Apasă "Run now" pe Routine
- Verifică în output că Orchestrator a citit task-ul

✅ **Done când:** Orchestrator citește din GitHub și decide ce agent să declanșeze

---

## Faza 4 — QA Tester + CI integration (1h)

**Scop:** primul flow complet: build iOS → QA analizează automat.

### 4.1 Creează Codemagic account

- codemagic.io → Sign up cu GitHub
- Conectează repo-ul `groz-automation` (sau un repo iOS real)

### 4.2 Adaugă codemagic.yaml

```bash
cp ~/Desktop/GROZ-Automation/ci/codemagic.yaml.template path/to/ios-repo/codemagic.yaml
```

Înlocuiește placeholder-ele:
- `{APP_NAME}` → numele workspace-ului iOS
- `{BUNDLE_ID}` → bundle ID-ul
- `{SCHEME}` → schema build
- `{ROUTINE_ID}` → ID-ul Routine GROZ QA Tester (după ce o creezi)

### 4.3 Creează Routine GROZ QA Tester

- Name: `GROZ QA Tester`
- Schedule: API trigger (no cron)
- Prompt: copiază din `routines/qa-tester.md`
- MCP: GitHub, Figma, Slack

### 4.4 Adaugă Maestro flows

Copiază `maestro/flows/*.yaml` în root-ul repo-ului iOS, sub `.maestro/flows/`.

Editează `appId` din fiecare flow ca să fie bundle ID-ul real.

### 4.5 Push și test

```bash
git add codemagic.yaml .maestro/
git commit -m "Add GROZ CI + Maestro tests"
git push
```

Codemagic rulează automat → după build, declanșează QA Routine.

✅ **Done când:** vezi un Issue auto-creat pe GitHub de QA Routine

---

## Faza 5 — Notion Workspace (20 min)

**Scop:** comunicare prin shared workspace între tine și agenți.

### 5.1 Creează Notion workspace

- notion.so → New workspace: `GROZ`
- Crează pagini:
  - `inbox/`
  - `outbox/`
  - `reports/`
  - `screenshots/`
  - `conversation/`

### 5.2 Conectează Notion în Routines

- În fiecare Routine GROZ → Settings → Connectors → Notion
- Authorize → permite acces la workspace GROZ

### 5.3 Conectează Notion în Claude.ai

- claude.ai → Settings → Connectors → Notion
- Autorizează → când vorbești cu Claude.ai în chat, poate scrie în workspace

### 5.4 Test end-to-end

În Claude.ai chat (web), scrie:
> "Scrie în Notion GROZ workspace, pagina inbox, un task nou:
> Titlu: 'Adaugă buton de logout'.
> Conținut: 'Vreau un buton roșu de logout pe ecranul Settings.'"

Așteaptă rularea următoare Orchestrator (la 30 min).
Vezi că Orchestrator preia task-ul și declanșează Proposer.

✅ **Done când:** task scris din Claude.ai → procesat de agenți → spec apare în GitHub

---

## Faza 6 — Restul agenților (1h)

Repetă Faza 3 pentru:
- `GROZ Proposer` (`routines/proposer.md`)
- `GROZ Builder` (`routines/builder.md`)
- `GROZ Critic` (`routines/critic.md`)

Pentru fiecare:
1. Creează Routine pe `claude.ai/code/routines`
2. Schedule: `Manual` (Orchestrator îi declanșează prin API)
3. Copiază prompt-ul din `routines/<name>.md`
4. Conectează MCP-urile necesare
5. Test manual cu un task fake

✅ **Done când:** toți 5 agenți rulează și se declanșează reciproc

---

## Faza 7 — Conectează Control Panel la date reale (2-3h)

**Scop:** Control Panel arată date live, nu mock.

### 7.1 Setup Turso

- turso.tech → Sign up
- `turso db create groz-state`
- Get URL + auth token
- În `control-panel/.env.local`:
  ```
  TURSO_DATABASE_URL=libsql://...
  TURSO_AUTH_TOKEN=...
  ```

### 7.2 Schema DB

```sql
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT,
  status TEXT,
  last_run TIMESTAMP,
  runs_today INTEGER DEFAULT 0
);

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  title TEXT,
  status TEXT,
  assigned_to TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE activity (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMP,
  agent TEXT,
  event TEXT,
  level TEXT
);

CREATE TABLE budget (
  date DATE PRIMARY KEY,
  tokens_used INTEGER,
  runs_count INTEGER
);
```

### 7.3 Înlocuiește mock data cu queries

În `control-panel/lib/`:
- Adaugă `db.ts` cu client Turso
- Modifică paginile să citească din DB în loc de `mock-data.ts`

### 7.4 Endpoint API pentru Routines

În `control-panel/app/api/`:
- `events/route.ts` — POST endpoint unde Routines trimit log-urile lor
- `agents/[id]/trigger/route.ts` — POST endpoint care declanșează un Routine

✅ **Done când:** Control Panel arată date reale, agenții scriu în DB

---

## Faza 8 — Observability (1h)

- Sentry: project nou `groz-automation` → DSN în `.env.local`
- Discord webhook: server GROZ → channel #alerts → webhook URL în Turso config
- Grafana Cloud: dashboard cu metrici din Turso

✅ **Done când:** primești ping pe Discord la fiecare bug critical

---

## Roadmap recapitulare

```
✅ Faza 0 — Control Panel local pe localhost
✅ Faza 1 — GitHub repo + invitație coleg
✅ Faza 2 — "Hello" Routine
✅ Faza 3 — GROZ Orchestrator funcțional
✅ Faza 4 — GROZ QA Tester + Codemagic CI
✅ Faza 5 — Notion workspace + Claude.ai connector
✅ Faza 6 — Restul agenților (Proposer, Builder, Critic)
✅ Faza 7 — Control Panel cu date reale
✅ Faza 8 — Observability stack
```

---

## Cost estimat lunar

| Serviciu | Cost |
|---|---|
| GROZ Claude Max (Mihai) | $20-100 |
| GROZ Claude Max (coleg) | $20-100 |
| Codemagic | $0 (până la 500 min/lună gratis) |
| Turso | $0 (free tier) |
| Notion | $0 (personal) |
| Sentry | $0 (free tier) |
| Discord | $0 |
| **Total** | **$40-200/lună** |

---

## Următorul pas pentru tine

**Acum:** rulează Faza 0 (Control Panel local).

```bash
cd ~/Desktop/GROZ-Automation/control-panel
npm install
npm run dev
```

Și deschide [http://localhost:3000](http://localhost:3000).

După ce vezi UI-ul, treci la Faza 1.
