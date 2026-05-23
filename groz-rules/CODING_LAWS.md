# GROZ Coding Laws

> **Legea de aur:** Fiecare aplicație GROZ TREBUIE să fie unică.
> Apple respinge agresiv apps "spam" (Guideline 4.3) — clone-uri evidente
> ale aceluiași template primesc reject instant.
>
> Aceste reguli previn reject-urile și păstrează diversitatea reală
> între app-urile noastre.

---

## 0. Regula supremă: UNIQUENESS

**Fiecare app GROZ trebuie să fie distinctă la 5 niveluri:**

```
1. Cod (structură, naming, arhitectură)
2. UI (layout, animații, componente)
3. Copy (toate textele, key-uri localizare)
4. Assets (icoane, imagini, ilustrații)
5. Feature (cel puțin un unghi unic în UX)
```

**Dacă două app-uri arată/sună/funcționează identic → reject Apple.**

---

## 1. Bundle IDs și metadata

### Reguli stricte

- ✅ Bundle ID unic per app: `com.groz.<appname>` (NU folosi același)
- ✅ Display name unic, NU variațiuni triviale ("Call Recorder", "Call Recorder Pro" → reject)
- ✅ App Store keywords diferite (NU copy-paste între apps)
- ✅ Screenshots originali per app (NU reciclate cu altă culoare)
- ❌ NICIODATĂ același icon cu doar schimbare de culoare
- ❌ NICIODATĂ aceeași descriere App Store cu un cuvânt schimbat

---

## 2. Cod — Naming și Structură

### A. Numele claselor/struct-urilor

**Fiecare app trebuie să aibă naming distinct:**

- ❌ `AppViewModel` în 2 apps = roșu (Apple scanează codul)
- ✅ Prefix per app: `CRViewModel` (CallRecorder), `MTViewModel` (MealTracker)
- ✅ Sau nume tematic: `RecordingHub`, `MealOrchestrator`

### B. Arhitectura

Chiar dacă template-ul este același, **variază pattern-urile:**

| App 1 | App 2 | App 3 |
|---|---|---|
| MVVM | MVVM-C (Coordinator) | TCA (The Composable Architecture) |
| Combine | async/await | async/await + AsyncStream |
| @StateObject root | @Environment | dependency injection container |

### C. Folder structure

NU păstra exact aceleași foldere între apps. Variază:

- App 1: `Views/`, `ViewModels/`, `Services/`
- App 2: `Features/{Home,Settings,...}/`, `Core/`, `Shared/`
- App 3: `Modules/`, `Domain/`, `Infrastructure/`

### D. Generic helpers

Helper-ele comune (HapticManager, ColorTheme etc.) REDENUMITE per app:

- App 1: `HapticManager`
- App 2: `VibrationEngine`
- App 3: `FeedbackController`

**Logic same, naming different = pass Apple scan.**

---

## 3. UI / Vizual

### A. NU folosi același design pixel-perfect

Chiar dacă ai 5 onboarding variants A-E, **per app variezi:**

- Culori diferite (NU doar accent — toată paleta)
- Tipografie diferită (font family + weights)
- Spacing diferit (8/12/16 grid vs 4/8/16/24)
- Border radius diferit (rounded, sharp, pill)
- Iconografie complet diferită (SF Symbols vs custom illustrations)

### B. Animații

Fiecare app are propriul "vibe" de animații:

- App 1: `.spring(response: 0.4)`
- App 2: `.easeInOut(duration: 0.3)`
- App 3: `.interpolatingSpring(stiffness: 180, damping: 12)`

### C. Componente reutilizate

Buttons, cards, lists — **re-design per app, nu doar re-color:**

- App 1: card flat cu shadow
- App 2: card glassmorphism cu blur
- App 3: card neumorphism cu dual shadow

### D. Onboarding variants A-E

A-E **sunt diferite vizual între ele** (gradient, animație, illustrations) — dar și **fiecare app are setul ei propriu de A-E**, NU re-folosite identic.

---

## 4. Copy / Texte

### A. Localizable.strings

**ZERO copy-paste de chei între apps.**

```
// App 1 — call-recorder
"onboarding_step_1_title" = "Record any call effortlessly";
"onboarding_step_1_subtitle" = "Capture conversations with one tap";

// App 2 — call-recorder clone REJECTED ❌
"onboarding_step_1_title" = "Record calls easily";    // prea similar
"onboarding_step_1_subtitle" = "Capture talks with a tap";

// App 2 — proper rephrasing ✅
"welcome_title" = "Never miss what matters";
"welcome_subtitle" = "Smart conversation capture, always on";
```

### B. Tone of voice

Fiecare app are personalitate distinctă:

- App 1: professional, sec ("Capture professional calls")
- App 2: friendly ("Hey, let's catch every word!")
- App 3: minimalist ("Record. Listen. Repeat.")

### C. Variabile, comentarii, log-uri

Chiar și comentariile interne:

```swift
// App 1
// Save FCM token after registration
func saveFCMToken(_ token: String) { ... }

// App 2
// Persist push identifier post-signup
func persistPushIdentifier(_ id: String) { ... }
```

---

## 5. Assets

### A. App Icon

NICIODATĂ același icon cu schimbare de culoare. Apple are AI care detectează asta.

- Compoziție diferită
- Element principal diferit
- Stil ilustrativ diferit (flat / 3D / line art / glassmorphism)

### B. Onboarding images

- NU folosi aceleași stock photos
- Variază sursa: Unsplash vs custom illustrations vs SF Symbols extended

### C. Imagini in-app

- Naming distinct: `onb1.imageset` la App 1 → `welcome_hero.imageset` la App 2
- Format diferit (PDF vector vs PNG @1x@2x@3x)

---

## 6. Feature — Unghi unic per app

**Cel mai important pentru Apple:** fiecare app trebuie să aibă **cel puțin 1 feature distinct** care o face funcțional diferită.

Exemple:

| Aceeași categorie | App 1 | App 2 | App 3 |
|---|---|---|---|
| Call recorders | basic recording | + AI transcription | + speaker detection |
| Meal trackers | barcode scan | + AI photo recognition | + restaurant menu DB |
| Habit trackers | streak counter | + social accountability | + gamification |

Dacă două apps au exact aceleași features = reject.

---

## 7. Backend / API

### A. Endpoint paths

NU folosi aceleași path-uri:

- App 1: `/api/v1/users/register`
- App 2: `/v2/auth/signup`
- App 3: `/account/create`

### B. Domeniu/subdomain

Idealuri:

- App 1: `api.app1.com`
- App 2: `api.app2.com`

Practică:

- App 1: `groz-api.com/app1/...`
- App 2: `groz-api.com/app2/...`

Dar **NU expune că sunt din același cluster** prin headers / response format identic.

### C. Response format

Variază JSON structure:

```json
// App 1
{ "user": { "id": "...", "phone": "..." } }

// App 2
{ "data": { "userId": "...", "phoneNumber": "..." } }
```

---

## 8. RevenueCat / Paywall

### A. Entitlement IDs

NU folosi același `"Main"` peste tot:

- App 1: entitlement `"premium"`
- App 2: entitlement `"pro_access"`
- App 3: entitlement `"unlock_all"`

### B. Product IDs

- App 1: `com.groz.app1.premium.monthly`
- App 2: `com.groz.app2.pro.yearly`

### C. Paywall design

- App 1: RevenueCat default
- App 2: custom paywall (ca Japan/Korea variants)
- App 3: hybrid (default UI + custom features)

---

## 9. Firebase

### A. Firebase project separate per app

NU folosi același Firebase project pentru toate. Apple verifică `GoogleService-Info.plist`:

- App 1: Firebase project `groz-app1`
- App 2: Firebase project `groz-app2`

### B. Event naming

Distinct între apps:

```swift
// App 1
AnalyticsManager.logEvent("recording_started")

// App 2
AnalyticsManager.logEvent("capture_initiated")
```

### C. Remote Config keys

- App 1: `"onboarding_variant"`
- App 2: `"signup_flow_test"`
- App 3: `"welcome_experiment"`

---

## 10. Git / Repo conventions

### Branch naming

- `feat/<task-id>-<slug>` — features
- `fix/<task-id>-<slug>` — bug fixes
- `release/v<version>` — releases

### Commit messages

Conventional Commits obligatoriu:
- `feat:` feature nou
- `fix:` bug fix
- `refactor:` refactoring
- `test:` adăugare teste
- `docs:` documentație
- `chore:` mentenanță

### NICIODATĂ direct push pe main

PR obligatoriu, review din Critic Agent + Mihai.

---

## 11. Testing

### Min coverage per acceptance criterion

- 1 unit test minimum
- 1 Maestro flow pentru fiecare user journey critic
- Snapshot tests pentru UI principal

### NU copy-paste teste între apps

Chiar dacă logica e similară, **redenumește metode + variabile.**

---

## 12. Common red flags (reject Apple)

### 🚨 Lista de evitat ABSOLUT

- ❌ Același nume de clasă în 2+ apps GROZ
- ❌ Același Localizable.strings key în 2+ apps
- ❌ Același Firebase Remote Config key în 2+ apps
- ❌ Același icon cu altă culoare
- ❌ Aceleași screenshots App Store cu altă culoare
- ❌ Aceeași descriere cu sinonime triviale
- ❌ Același backend endpoint paths
- ❌ Același entitlement RevenueCat
- ❌ Same exact onboarding text reformulat ușor

### ✅ Verificare pre-submit checklist

- [ ] Bundle ID complet diferit
- [ ] Naming clase/struct diferit (Critic Agent verifică automat)
- [ ] Cel puțin 1 feature funcțional unic
- [ ] UI palette + typography distincte
- [ ] Toate copy-urile rephrasate (NU sinonime — rephrasare reală)
- [ ] Assets: app icon, onboarding images, screenshots — toate originale
- [ ] Firebase project separat
- [ ] RevenueCat entitlement/product IDs distincte
- [ ] Backend endpoints distincte
- [ ] Comparați manual cu app-ul anterior care a primit aprobare — diferențe vizibile la 5 secunde

---

## 13. Reguli pentru agenți

### Builder Agent
- **Înainte de scaffold:** citește celelalte app-uri GROZ din GROZ Org pe GitHub
- Verifică ce naming a fost folosit → folosește alternativ
- Aplică regulile de mai sus mecanic
- Dacă găsește un pattern identic în alt app → flag și sugerează variantă

### Critic Agent
- **La fiecare PR pentru app nou:** rulează "uniqueness audit":
  - Compară clase cu apps existente
  - Compară Localizable keys
  - Compară Firebase keys
  - Compară RevenueCat IDs
  - Compară endpoint paths
- Block PR dacă găsește >3 colisiuni evidente

### QA Tester
- Verifică pre-submit Apple checklist (lista de mai sus)
- Generează raport "uniqueness score" 0-100
- Sub 70 = nu se submitește

### Proposer Agent
- Când propune feature pentru app nou:
  - Cercetează apps existente GROZ
  - Identifică unghiul unic
  - Propune cel puțin 1 feature funcțional distinct
  - Nu copia spec din alt app — rescrie cu altă structură

---

## 14. Excepții și aprobare

Pot exista cazuri unde **vrem** consistență (ex: brand portfolio).

**Regula:** Mihai aprobă manual prin task explicit în inbox cu titlu `[OVERRIDE] use shared X across apps`.

Fără aprobare = uniqueness obligatorie.

---

**Status:** ACTIVE
**Last updated:** 2026-05-23
**Owner:** echipa GROZ
