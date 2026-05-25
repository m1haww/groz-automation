# GROZ Builder — Lessons Learned

> Probleme reale găsite la rulările Builder-ului și ce trebuie corectat în reguli.
> La fiecare problemă nouă, adăugăm aici. La revizia regulilor, mutăm în `builder.md` / `IOS_TEMPLATE_BASE.md`.

---

## Format

Fiecare problemă are 4 secțiuni:
- **Issue:** ce s-a întâmplat
- **Impact:** de ce e o problemă
- **Root cause:** de ce s-a întâmplat
- **Fix în reguli:** ce să adăugăm în docs ca să nu se repete

---

## 1. Builder nu a creat repo separat pe GitHub

**Issue:** Builder a pus codul în `groz-workspace/builds/ai-assistant/` în groz-automation, nu a creat `m1haww/ai-assistant`.

**Impact:** Trebuie mutate manual fișierele (5 min de muncă pe rulare).

**Root cause:** GitHub Integration MCP de pe claude.ai e restricționat la repo-ul groz-automation, nu poate crea repos noi.

**Fix în reguli:** ✅ DONE — Builder are instrucțiunea, dar limitarea MCP rămâne. Soluție: Mihai pre-creează repo-ul gol înainte de Run. Adăugat în PUNCT 0 din builder.md.

**Status:** Workaround documentat, nu e fix real (depinde de claude.ai).

---

## 2. Builder a omis `codemagic.yaml`

**Issue:** Builder a generat 50 fișiere Swift dar nu a inclus `codemagic.yaml`.

**Impact:** Codemagic nu știa cum să facă build → trebuia adăugat manual.

**Root cause:** În prima versiune a builder.md, `codemagic.yaml` era listat la final ca "extra", nu obligatoriu.

**Fix în reguli:** ✅ DONE — marcat PUNCT 5 ca **OBLIGATORIU**, cu mențiunea "Nu poți considera task-ul completat fără".

---

## 3. Builder a omis folderul `.maestro/`

**Issue:** Nu a creat flow-uri de teste vizuale.

**Impact:** Fără flow-uri = fără screenshots = nu poți face QA automat.

**Root cause:** Nu erau menționate în builder.md.

**Fix în reguli:** ✅ DONE — adăugat PUNCT 5B cu template de 3 flow-uri minime (`01_onboarding`, `02_paywall`, `03_{feature}`).

---

## 4. Builder a creat doar `Package.swift` (library), nu app iOS

**Issue:** `Package.swift` definește `.library(name: "AIAssistant")` — Codemagic nu poate compila ca app iOS real, doar bibliotecă.

**Impact:** Build-ul "trece" cu success dar fără să producă un `.app` bundle real → simulator nu poate instala nimic → Maestro nu are ce testa → 0 screenshots.

**Root cause:** Builder nu generează `.xcodeproj`. Posibilități:
- a) În `IOS_TEMPLATE_BASE.md` nu e clar că trebuie Xcode project
- b) Builder nu poate scrie format binar `.pbxproj`

**Fix în reguli:** ❌ TODO
1. Adaugă în builder.md: **OBLIGATORIU** `project.yml` pentru xcodegen
2. Builder scrie `project.yml` în loc de încercare de `.xcodeproj`
3. `codemagic.yaml` rulează `brew install xcodegen && xcodegen generate` înainte de build

---

## 5. `codemagic.yaml` folosește "iPhone 15 Pro" — nu există pe builderi

**Issue:** Step "Boot iPhone simulator" a eșuat cu "Invalid device or device pair: iPhone 15 Pro".

**Impact:** Maestro a primit 0 dispozitive → screenshots = 0.

**Root cause:** Codemagic builderii folosesc Xcode latest care poate avea "iPhone 16 Pro" sau alte device-uri. Numele hardcodat e fragil.

**Fix în reguli:** ❌ TODO

În codemagic.yaml folosim **device UDID dinamic**, nu nume:
```bash
DEVICE_UDID=$(xcrun simctl list devices available | grep "iPhone " | head -1 | grep -oE '\([A-F0-9-]{36}\)' | tr -d '()')
xcrun simctl boot "$DEVICE_UDID"
xcrun simctl bootstatus "$DEVICE_UDID"
```

---

## 6. `codemagic.yaml` are `|| true` peste tot — maschează erorile

**Issue:** Maestro a eșuat dar step-ul apare ca "success" pentru că avem `maestro test ... || true`.

**Impact:** Imposibil de debugat. Build apare verde, dar nimic nu funcționează.

**Root cause:** Am pus `|| true` defensiv să nu blocheze build-ul.

**Fix în reguli:** ❌ TODO

În codemagic.yaml elimină `|| true` din step-uri critice:
- Build iOS app: NU `|| true`
- Boot simulator: NU `|| true`
- Maestro test: NU `|| true`

Doar pe pași opționali (ex: "Post results") păstrăm `|| true`.

---

## Status fixes

| # | Issue | Fix în builder.md | Fix în template |
|---|---|---|---|
| 1 | Repo nou nu se creează | ✅ doc workaround | — |
| 2 | Lipsește codemagic.yaml | ✅ obligatoriu | — |
| 3 | Lipsește .maestro/ | ✅ obligatoriu | — |
| 4 | Doar Package.swift, nu .xcodeproj | ❌ TODO | ❌ TODO |
| 5 | Device name hardcodat | ❌ TODO | ❌ TODO |
| 6 | `\|\| true` maschează erori | ❌ TODO | ❌ TODO |

---

**Last updated:** 2026-05-25
