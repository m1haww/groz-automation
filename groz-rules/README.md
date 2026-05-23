# GROZ Rules

Aici stau **regulile pe care le definește Mihai** și pe care agenții GROZ
le respectă obligatoriu.

## Fișiere

| Fișier | Pentru ce | Status |
|---|---|---|
| [CODING_LAWS.md](CODING_LAWS.md) | reguli de cod (Swift, Dart, git, testing) | 🟡 schelet — de completat |
| [UI_GUIDELINES.md](UI_GUIDELINES.md) | reguli vizuale (culori, spacing, typography) | 🟡 schelet — de completat |

## Cum funcționează

1. Mihai editează fișierele și pune regulile lui
2. La fiecare rulare, agenții (Builder, Critic, QA) citesc aceste fișiere
3. Aplică toate regulile în codul / review-ul / analiza lor
4. Dacă o regulă e ambiguă sau lipsește → folosesc default rezonabil + flag

## Versionare

Fișierele astea sunt în Git → orice modificare e tracked.
Critic Agent va observa schimbările și va adapta review-urile.

## Ce să adaugi (cheatsheet pentru Mihai)

**Întreabă-te:**
- Ce naming convenții folosim?
- Ce dependențe sunt OK, care nu?
- Ce pattern arhitectural? (MVVM, BLoC, Riverpod, Coordinator?)
- Ce lints sunt obligatorii?
- Ce face un PR "acceptabil"?
- Ce e considerat bug critical vs nice-to-fix?
- Ce branduri / culori / fonturi NU sunt negociabile?

Toate astea le scrii aici și agenții le respectă fără să le mai repeți.
