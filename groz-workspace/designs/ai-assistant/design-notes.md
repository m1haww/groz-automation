# Design Notes — AI Assistant

> ⚠️ **CRITICAL — Citește înainte de orice:**
>
> - **FOLOSEȘTE pentru implementare:** `Redesign.html` + `*.jsx` + `redesign-tokens.css`
> - **NU FOLOSI:** folderul `competitor-refs/` — sunt screenshots de la ChatGPT, Spark și alți concurenți, doar context pentru designer. Copierea lor = **reject Apple Guideline 4.3 + risc legal**.

## Structura

```
designs/ai-assistant/
├── Redesign.html              ← ENTRY POINT pentru implementare
├── redesign-tokens.css        ← culori, fonturi (TOKENS reale)
├── redesign-shell.jsx         ← phone shell wrapper
├── redesign-screens-a.jsx     ← Onboarding, Home
├── redesign-screens-b.jsx     ← Chats, Models, Chat
├── redesign-screens-c.jsx     ← Tasks, Settings
├── redesign-icons.jsx         ← iconițe custom
├── design-canvas.jsx          ← canvas wrapper
├── tweaks-panel.jsx           ← variante accent (neon)
├── UX Audit.html              ← context decizii design
├── design-notes.md            ← acest fișier
└── competitor-refs/           ⚠️ DON'T USE — screenshots competitori
```

## Color Palette

Citește direct din `redesign-tokens.css`. Token principal:
- **Accent (neon):** variabil prin tweaks panel, default `#5dd935` (lime/teal)
- **Background:** `#f0eee9` (off-white warm)

## Typography

- **Font:** Geist (sans + mono) — Google Fonts
- Detalii complete în `redesign-tokens.css`

## Screens (8 ecrane)

Definite în `redesign-screens-a/b/c.jsx`:
1. Onboarding (single screen, NOT 5 marketing)
2. Home (chat-first)
3. Chats list (full history)
4. Models picker
5. Chat empty state
6. Chat active
7. Tasks
8. Settings (You page)

## Note pentru Builder

- Layout **exact** după JSX
- Animații: spring + soft glow
- Status bar safe area respectată
- Bottom nav cu 3-4 tab-uri
