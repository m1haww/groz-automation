# GROZ Coding Laws

> **Acest fișier definește toate regulile pe care agenții GROZ TREBUIE să le respecte
> când scriu sau modifică cod.**
>
> Mihai îl umple cu regulile lui. Până atunci, lăsăm gol — agenții vor folosi
> default-uri rezonabile.

## 1. Reguli generale (TBD — definite de Mihai)

<!-- Exemple de reguli pe care le poți adăuga aici:
- Nicio dependență nouă fără approval Mihai
- Toate funcțiile publice trebuie documentate
- Maxim 80 caractere per linie
- Niciun TODO commit-uit în main
-->

## 2. Swift / iOS (TBD)

<!-- Exemple:
- SwiftUI peste UIKit unde se poate
- Niciun force unwrap (`!`, `try!`, `as!`)
- `@MainActor` pe view-models
- Naming: camelCase pentru proprietăți, PascalCase pentru tipuri
- async/await peste closures unde se poate
-->

## 3. Flutter / Dart (TBD)

<!-- Exemple:
- Riverpod / Provider / Bloc — care e standardul vostru?
- const constructori obligatorii
- Lints: respect strict analysis_options.yaml
-->

## 4. Git workflow (TBD)

<!-- Exemple:
- Conventional commits obligatorii
- Branch naming: feat/TASK-ID-slug
- Niciun direct push pe main
- PR cu min 1 review (uman sau Critic Agent)
-->

## 5. Testing (TBD)

<!-- Exemple:
- Min 1 test per acceptance criterion
- Snapshot testing pentru UI
- Maestro flow pentru fiecare user flow critic
-->

## 6. UI / UX standards (TBD)

<!-- Exemple:
- Spacing 8/16/24 grid
- Touch targets min 44pt
- Dark mode obligatoriu
- Loading + error states peste tot
-->

## 7. Performance (TBD)

<!-- Exemple:
- Cold start < 2s
- 60fps constant
- Imagini lazy loaded
- Memory < 200MB
-->

## 8. Security (TBD)

<!-- Exemple:
- Niciun secret hardcoded
- Keychain pentru tokens iOS
- HTTPS only
-->

---

**Status:** schelet gol — Mihai îl va completa.
**Cum se folosește:** Agenții (Builder, Critic, QA) citesc acest fișier la fiecare rulare și aplică regulile. Dacă o regulă lipsește, folosesc default rezonabil.
