# GROZ Automation — Multi-Agent QA System pentru iOS

> Sistemul intern GROZ de Claude agents care construiesc, testează și
> raportează autonom aplicațiile iOS (Swift + Flutter). Rulează 24/7
> pe Anthropic Cloud — folosește doar abonamentul GROZ Claude Max.

---

## 1. Diagrama de ansamblu — GROZ Automation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       USER (echipa GROZ, oriunde)                           │
│                                                                             │
│   ┌────────────────┐         ┌────────────────┐        ┌────────────────┐   │
│   │  Claude.ai     │         │  Telegram /    │        │  GitHub /      │   │
│   │  (chat web)    │         │  Slack mobile  │        │  Notion web    │   │
│   └────────┬───────┘         └────────┬───────┘        └────────┬───────┘   │
└────────────┼──────────────────────────┼─────────────────────────┼───────────┘
             │                          │                         │
             │ Connector                │ Bot                     │ Direct
             ▼                          ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GROZ WORKSPACE (shared state layer)                      │
│                                                                             │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐  │
│   │  GROZ GitHub Org │  │  GROZ Notion     │  │  GROZ State DB           │  │
│   │  - cod proiect   │  │  - inbox/        │  │  (Turso / SQLite edge)   │  │
│   │  - .maestro/     │  │  - outbox/       │  │  - state.json            │  │
│   │  - codemagic.yml │  │  - reports/      │  │  - tokens_used           │  │
│   │  - prompts/      │  │  - screenshots/  │  │  - locks                 │  │
│   └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────────────┘  │
└────────────┼─────────────────────┼───────────────────────┼──────────────────┘
             │                     │                       │
             │ MCP                 │ MCP                   │ MCP
             ▼                     ▼                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│           ANTHROPIC CLOUD — GROZ Routines (pe GROZ Claude Max)              │
│                                                                             │
│                    ┌──────────────────────────┐                             │
│                    │   GROZ Orchestrator      │                             │
│                    │   cron: */30 min         │                             │
│                    │   decide cine ruleaza    │                             │
│                    └────────────┬─────────────┘                             │
│                                 │ trigger via API                           │
│           ┌─────────────────────┼─────────────────────┐                     │
│           ▼                     ▼                     ▼                     │
│   ┌───────────────┐    ┌───────────────┐    ┌───────────────┐               │
│   │  GROZ         │    │  GROZ         │    │  GROZ         │               │
│   │  Proposer     │    │  Builder      │    │  Critic       │               │
│   │               │    │               │    │               │               │
│   │  generează    │    │  implementează│    │  challenge +  │               │
│   │  idei / specs │    │  cod Swift /  │    │  review       │               │
│   │               │    │  Flutter      │    │               │               │
│   └───────┬───────┘    └───────┬───────┘    └───────┬───────┘               │
│           │                    │                    │                       │
│           └────────────────────┼────────────────────┘                       │
│                                ▼                                            │
│                    ┌──────────────────────────┐                             │
│                    │   GROZ QA Tester         │                             │
│                    │   trigger: post-build    │                             │
│                    │                          │                             │
│                    │   - vision analysis      │                             │
│                    │   - Figma comparison     │                             │
│                    │   - bug detection        │                             │
│                    │   - GitHub Issues create │                             │
│                    └────────────┬─────────────┘                             │
└─────────────────────────────────┼───────────────────────────────────────────┘
                                  │ citește artefacte
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                  GROZ CI Pipeline — Codemagic (iOS)                         │
│                                                                             │
│   Trigger: push în GROZ GitHub                                              │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │  macOS Runner (Mac mini M2)                                          │  │
│   │                                                                      │  │
│   │  1. pod install                                                      │  │
│   │  2. xcodebuild → .app                                                │  │
│   │  3. boot iPhone 15 Pro simulator                                     │  │
│   │  4. install .app                                                     │  │
│   │  5. maestro test .maestro/flows/                                     │  │
│   │     ├─ takeScreenshot per pas                                        │  │
│   │     └─ video recording al flow-ului                                  │  │
│   │  6. upload artifacts:                                                │  │
│   │     ├─ screenshots/                                                  │  │
│   │     ├─ videos/                                                       │  │
│   │     ├─ test-results.xml                                              │  │
│   │     └─ logs/                                                         │  │
│   │  7. POST webhook → GROZ QA Tester                                    │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                  GROZ Observability & Alerting                              │
│                                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│   │  Sentry      │  │  Grafana     │  │  Discord     │  │  GitHub      │    │
│   │  (erori)     │  │  Cloud       │  │  webhook     │  │  Issues      │    │
│   │              │  │  (metrici)   │  │  (alerts)    │  │  (bugs)      │    │
│   └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Agenții GROZ — roluri și responsabilități

| Agent GROZ | Rol | Cron | Input | Output |
|-----------|-----|------|-------|--------|
| **GROZ Orchestrator** | dirijor — decide cine vorbește | `*/30 min` | state.json | trigger API la alți agenți |
| **GROZ Proposer** | generează idei, feature specs | on-demand | brief produs | PR cu spec.md |
| **GROZ Builder** | implementează cod | on-demand | spec.md | PR cu cod Swift/Dart |
| **GROZ Critic** | review, challenge, scoring | on-demand | PR | review comments |
| **GROZ QA Tester** | analiză UI/UX, bug hunting | post-build | screenshots + Figma | GitHub Issues |

---

## 3. Auto-approve: GROZ rulează fără click

### Pentru GROZ Routines (cloud):
**Default: auto-approved** — nu există om care să dea accept.

### Pentru Claude Code local (echipa GROZ):
În `.claude/settings.json`:
```json
{
  "permissions": {
    "defaultMode": "bypassPermissions",
    "allow": ["Bash", "Edit", "Write", "Read", "WebFetch"]
  }
}
```

---

## 4. Fluxul GROZ end-to-end

```
1. Echipa GROZ scrie în Claude.ai:
   "Adaugă feature X în app"
        │
        ▼
2. Claude.ai (cu connector Notion) scrie în GROZ inbox/task.md
        │
        ▼
3. GROZ Orchestrator (la următoarea rulare la 30min):
   - citește inbox/
   - vede task nou
   - trigger GROZ Proposer
        │
        ▼
4. GROZ Proposer: scrie spec.md în GROZ GitHub
        │
        ▼
5. GROZ Orchestrator: trigger GROZ Builder
        │
        ▼
6. GROZ Builder: implementează cod, deschide PR
        │
        ▼
7. Push pe branch → Codemagic build automat
   - .ipa build
   - Maestro tests
   - screenshots
        │
        ▼
8. Codemagic webhook → trigger GROZ QA Tester
        │
        ▼
9. GROZ QA Tester:
   - download artifacts
   - vision analysis screenshots
   - compară cu Figma
   - creează GitHub Issues pentru bug-uri
   - Slack alert pe #groz-qa
        │
        ▼
10. GROZ Orchestrator: trigger GROZ Critic (review PR + issues)
        │
        ▼
11. GROZ Critic: comment pe PR cu scoring + recomandări
        │
        ▼
12. Echipa GROZ vede totul pe telefon:
    - Notion: progress
    - GitHub: PR + issues
    - Slack: alerts
```

---

## 5. GROZ Stack tehnic complet

### Compute & AI
| Layer | Tool | Cost |
|-------|------|------|
| Agenți GROZ (toate Routines) | Anthropic Routines | inclus în GROZ Max |
| Orchestration | Routine + HTTP API trigger | inclus |
| Vision (UI analysis) | Claude vision | inclus |

### Build & Test
| Layer | Tool | Cost |
|-------|------|------|
| CI iOS | Codemagic | 500 min/lună gratis |
| Test framework | Maestro | gratis (open source) |
| Real device testing | Firebase Test Lab | free tier (10/zi) |

### State & Storage
| Layer | Tool | Cost |
|-------|------|------|
| Code & configs | GROZ GitHub Org | gratis |
| Inbox/Outbox | GROZ Notion workspace | gratis |
| Structured state | Turso (SQLite edge) | free tier |
| Long-term memory (RAG) | Pinecone / Qdrant Cloud | free tier |

### Communication & MCP
| Layer | Tool | Cost |
|-------|------|------|
| Mobile chat | GROZ Telegram bot | gratis |
| Team alerts | GROZ Slack / Discord | gratis |
| Design source | Figma MCP | gratis |
| Repo access | GitHub MCP | gratis |

### Observability
| Layer | Tool | Cost |
|-------|------|------|
| Errors | Sentry | free tier |
| Metrics | Grafana Cloud | free tier |
| Alerts | Discord webhooks | gratis |

**Total GROZ: $0 - $30/lună** (depinde de build minutes Codemagic)

---

## 6. Optimizări pentru usage minim GROZ Max

| Tehnică | Economie |
|---------|----------|
| Cron rar (30 min vs 1 min) | -95% |
| Prompt scurt, doar fișiere relevante | -50% |
| `max_iterations: 1` per run | -60% |
| Citește doar ultimele 10 mesaje din istoric | scalare liniară |
| Vision doar pe screenshot-uri cheie (max 10/run) | -70% |
| Rulează GROZ QA doar pe `main` și `release/*` | -80% builds |
| Budget cap în Turso → stop dacă > limit zilnic | safeguard |
| Archive vechi → arhivă lunară | previne context bloat |

---

## 7. Structura repo-ului GROZ

```
groz-ios-app/
├── ios-app/                       # codul Swift
│   ├── App/
│   ├── App.xcodeproj/
│   └── ...
│
├── .maestro/                      # teste UI
│   ├── flows/
│   │   ├── 01_onboarding.yaml
│   │   ├── 02_main_feature.yaml
│   │   └── 03_checkout.yaml
│   └── config.yaml
│
├── .github/
│   └── workflows/
│       └── trigger-groz-routine.yml
│
├── groz-prompts/                  # prompturi versionate per agent
│   ├── orchestrator/v1.md
│   ├── proposer/v1.md
│   ├── builder/v1.md
│   ├── critic/v1.md
│   └── qa_tester/v1.md
│
├── groz-scripts/                  # instrucțiuni pentru agenți
│   ├── role_definitions.md
│   ├── coding_standards.md
│   └── ui_guidelines.md
│
├── docs/
│   ├── GROZ_AUTOMATION.md        # acest document
│   ├── figma_links.md
│   └── runbook.md
│
└── codemagic.yaml                 # CI config
```

---

## 8. Roadmap implementare GROZ Automation

### Săptămâna 1 — GROZ Foundation
- [ ] Setup repo GitHub în GROZ Org cu structura de mai sus
- [ ] Conectează Codemagic la repo
- [ ] Scrie `codemagic.yaml` (build .ipa, fără teste încă)
- [ ] Test că build-ul trece

### Săptămâna 2 — GROZ Testing
- [ ] Instalează Maestro local
- [ ] Scrie primele 2-3 flows YAML pentru flow-urile principale
- [ ] Adaugă step Maestro în `codemagic.yaml`
- [ ] Verifică că screenshot-urile se uploadează

### Săptămâna 3 — GROZ First Agent
- [ ] Crează GROZ QA Tester la `claude.ai/code/routines`
- [ ] Conectează MCP-urile: GitHub, Figma, Slack
- [ ] Scrie prompt-ul GROZ QA Tester
- [ ] Configurează webhook Codemagic → Routine
- [ ] Test end-to-end cu un build real

### Săptămâna 4 — GROZ Multi-Agent
- [ ] Adaugă GROZ Builder + GROZ Critic
- [ ] Crează GROZ Orchestrator
- [ ] Setup GROZ Notion inbox/outbox
- [ ] Conectează Claude.ai cu connector Notion
- [ ] Test: scrii task în Claude.ai → vezi cod în GitHub

### Săptămâna 5 — GROZ Observability
- [ ] Sentry pentru error tracking
- [ ] Grafana dashboard GROZ
- [ ] Discord webhook pentru alerts
- [ ] Budget guardrails în Turso

### Săptămâna 6+ — Optimizare
- [ ] A/B testing prompts
- [ ] Versioning prompts în Git
- [ ] Memory layer cu Pinecone
- [ ] Dead-letter queue pentru fail-uri

---

## 9. Limitări reale GROZ Automation

| Vrei | Realitate |
|------|-----------|
| Chat live cu agent din Claude.ai | NU — doar asincron via GROZ workspace |
| Routine să acceseze laptopul tău | NU — rulează izolat pe Anthropic infra |
| 2 Claude care vorbesc instant | NU — minim latență de cron (recomandat 5+ min) |
| Auto-deploy în App Store | Posibil, dar nu recomandat fără human gate |
| Total zero usage GROZ Max | NU — orice rulare consumă, dar puțin |

---

## 10. Diagrama simplificată — GROZ TL;DR

```
       Echipa GROZ            Anthropic Cloud              Codemagic
   ┌────────────┐           ┌──────────────────┐         ┌──────────┐
   │ phone/web/ │  ←─────→  │  GROZ Routines:  │  ←───   │  iOS     │
   │ chat       │           │  - Orchestrator  │   build │  Build + │
   │            │           │  - Proposer      │  ────→  │  Maestro │
   └────────────┘           │  - Builder       │         │  Tests   │
                            │  - QA Tester     │         └──────────┘
                            │  - Critic        │
                            └──────────────────┘
                                     │
                                     ▼
                          GROZ Workspace:
                          GitHub + Notion + Turso
```

---

## 11. GROZ Naming convention

Toate componentele sistemului poartă prefixul **GROZ** pentru identificare:

- **GROZ Orchestrator** — agentul dirijor
- **GROZ Proposer** — agentul de spec-uri
- **GROZ Builder** — agentul de cod
- **GROZ Critic** — agentul de review
- **GROZ QA Tester** — agentul de QA
- **GROZ Workspace** — layer-ul shared state
- **GROZ GitHub Org** — organizația GitHub
- **GROZ Notion** — workspace-ul Notion
- **GROZ State DB** — Turso instance
- **GROZ CI Pipeline** — config Codemagic
- **GROZ Observability** — stack-ul Sentry + Grafana + Discord
- **GROZ Claude Max** — abonamentul Anthropic
- **GROZ Telegram Bot** — interfața mobile
- **GROZ Slack** — alerts și conversație

---

**Document version:** GROZ Automation v1.0
**Last updated:** 2026-05-23
**Owner:** echipa GROZ
**Powered by:** Claude Max + Anthropic Routines
