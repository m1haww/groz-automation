# GROZ Workspace

Acest folder este "biroul partajat" între tine și agenții GROZ.

## Structură

```
groz-workspace/
├── inbox/           ← TU scrii task-uri noi aici
├── outbox/          ← AGENȚII scriu rezultate aici
├── specs/           ← spec-uri generate de Proposer
├── reports/         ← rapoarte QA și sumar săptămânal
├── screenshots/     ← bug-uri vizuale (auto-uploaded)
├── conversation/    ← istoricul "discuțiilor" între agenți
└── state.json       ← starea curentă a sistemului
```

## Cum scrii un task în inbox

Crează un fișier nou în `inbox/` cu format `YYYYMMDD-XXX-titlu.md`:

```markdown
# Title task

**Created by:** Mihai
**Priority:** low / medium / high
**Type:** feature / bug / research / design

## Brief
{Descrie pe scurt ce vrei}

## Context
{De ce, pentru cine, când}

## Constraints
- {constraint 1}
- {constraint 2}
```

Agenții vor prelua automat în ciclul următor.

## state.json

Sistemul actualizează acest fișier automat. NU edita manual decât pentru:
- `system_enabled: false` ca să oprești totul
- `budget.tokens_cap_daily` ca să schimbi limita
