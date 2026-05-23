# Shared Preflight & Reporting (toți agenții GROZ)

> Acest bloc se include la începutul și sfârșitul fiecărui agent prompt
> (Proposer, Builder, Critic, QA Tester). NU se aplică Watchdog (el e cel
> care setează flag-ul).

---

## START — PREFLIGHT (înainte de orice altă acțiune)

```
1. Citește groz-workspace/state.json
2. Verifică: system_enabled == true?
   ❌ NU → output: "System paused by Watchdog. Skipping run." → EXIT
   ✅ DA → continuă

3. Verifică: budget.tokens_used_today / budget.tokens_cap_daily >= 0.25?
   ❌ DA → asta nu ar trebui să se întâmple (Watchdog ar fi oprit deja).
            Dacă vezi totuși >= 25%, EXIT pentru siguranță.
   ✅ NU → continuă

4. Verifică current_lock — dacă alt agent rulează acum (diferit de tine):
   - Așteaptă următoarea rulare. EXIT cu mesaj "Lock held by {agent}"

5. Setează current_lock = {numele tău} și commit (preventiv).
```

---

## END — REPORTING (după ce termini munca)

```
1. Estimează tokens consumate:
   tokens_estimated = (prompt_chars + response_chars) / 4 + iterations × 2000

2. Update groz-workspace/state.json:
   - agents.{tine}.last_run = ISO timestamp now
   - agents.{tine}.last_run_tokens = tokens_estimated
   - agents.{tine}.total_runs_today += 1
   - agents.{tine}.total_tokens_today += tokens_estimated
   - budget.tokens_used_today += tokens_estimated
   - budget.runs_today += 1
   - current_lock = null

3. Append în groz-workspace/conversation/YYYY-MM-DD.md:
   ```
   HH:MM {AgentName} → {what you did} | tokens_used: {N} | result: {ok|fail}
   ```

4. Commit cu mesaj: `chore({agent}): completed task {id} ({tokens_estimated} tokens)`
```

---

## Estimare tokens — formula simplă

```
INPUT tokens  ≈ length(system_prompt) / 4 + length(user_prompt) / 4
OUTPUT tokens ≈ length(response) / 4
TOOL tokens   ≈ N_tool_calls × 1000  (apel mediu)

TOTAL ≈ INPUT + OUTPUT + TOOL
```

Pentru estimare rapidă: `total_chars_processed / 3.5`

---

## De ce e important

- Watchdog se uite la `budget.tokens_used_today` la fiecare 15 min
- Dacă agenții NU raportează, contorul rămâne 0 → Watchdog crede că sistemul nu consumă → nu autopause
- Onestitatea raportării e CRITICĂ pentru funcționarea autopause-ului
