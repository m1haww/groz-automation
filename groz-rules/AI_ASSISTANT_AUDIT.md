# AI Assistant — Audit Complet

> Audit detaliat al sesiunii de dezvoltare AI Assistant prin GROZ Builder.
> Servește ca referință pentru îmbunătățirea regulilor și pentru viitoarele app-uri.

**Repo final:** [m1haww/ai-assistant](https://github.com/m1haww/ai-assistant)
**Backend:** `ai-assistant-ios.up.railway.app` (.NET / OpenAI proxy)
**Bundle ID:** `com.ai.assistant.gpt.app`

---

## 1. Ce am avut de făcut

App iOS "AI Assistant" (chatbot multi-model) după:
- Design custom (`Redesign.html` + JSX) — neon green pe negru
- Backend deja deployed pe Railway cu endpoints `/api/chatgpt/chat`, `/api/grok/chat`, `/api/qwen/chat` etc.
- Cerințe finale: simplu, fără paywall/Firebase/notificări/onboarding

---

## 2. Ce s-a făcut bine din prima

| Aspect | Status |
|---|---|
| 50 fișiere SwiftUI scaffold-uite din spec | ✅ |
| Layout fidel design-ului (composer, cards, tab bar) | ✅ |
| Localizare în 14 limbi (`*.lproj/Localizable.strings`) | ✅ |
| MVVM pattern (Orchestrator + View) | ✅ |
| Naming prefix `AIA` (unic, anti-spam Apple) | ✅ |
| Streaming AI response via `AsyncThrowingStream` | ✅ |
| AppIcon catalog setup | ✅ |

---

## 3. Probleme găsite și rezolvate

### A. Probleme de pipeline / build

| # | Issue | Root cause | Fix |
|---|---|---|---|
| 1 | Builder n-a creat repo separat | MCP restricționat la `groz-automation` | Mihai pre-creează repo, Builder mută |
| 2 | `codemagic.yaml` lipsea | Era listat ca extra, nu obligatoriu | Marcat obligatoriu în `builder.md` |
| 3 | `.maestro/` flows lipseau | Idem | Marcat obligatoriu |
| 4 | `Package.swift` ca `.library` nu app iOS | Builder nu poate scrie `.xcodeproj` binar | Switch la `xcodegen` cu `project.yml` (YAML) |
| 5 | `iPhone 15 Pro` hardcodat în destination | Codemagic builderi au "iPhone 17 Pro" | UDID dinamic via `simctl list devices` |
| 6 | `\|\| true` maschează erori | Defensive scriere | Eliminat din pași critici, `set -e` |
| 7 | `screens/` în designs = screenshots competitor (ChatGPT) | Numele ambiguu | Redenumit → `competitor-refs/` |
| 8 | `.app` fără executabil | Build pentru `generic/platform=iOS Simulator` produce shell gol | Build pentru `id=$DEVICE_UDID` concret după boot |
| 9 | Localizable.strings nu în `.app` bundle | `xcodegen resources: path: en.lproj` nu adaugă variant group | Path explicit `en.lproj/Localizable.strings` + script copy backup |

### B. Bug-uri Swift (de cod)

| # | Issue | Fix |
|---|---|---|
| 10 | `Set.insert()` în `withAnimation` → type inference error | `_ = revealed.insert(i)` |
| 11 | `import AdServices` lipsea (folosea `AAAttribution`) | Adăugat import |
| 12 | `AAAttribution.attributionToken()` apelat cu `await` (nu e async) | Eliminat `await` |
| 13 | `import UserNotifications` lipsea în `OnboardingEntryView` | Adăugat |
| 14 | `Text(...).foregroundStyle().lineSpacing() + Text()` nu compilează | `.foregroundColor()` (returnează Text), `.lineSpacing()` pe expresia agregată |

### C. Crash-uri runtime

| # | Issue | Fix |
|---|---|---|
| 15 | `FirebaseApp.configure()` cu plist placeholder → fatal | Guard: check `apiKey != "REPLACE_WITH_REAL_KEY"` |
| 16 | `Purchases.configure(withAPIKey: "REVENUECAT_PUBLIC_KEY")` cu string literal | Guard cu env var + `Purchases.isConfigured` |
| 17 | `Purchases.shared.customerInfo()` în `PurchaseOrchestrator.init()` → crash | Guard `Purchases.isConfigured` în toate metodele |
| 18 | `RemoteConfig.remoteConfig()` accesează Firebase nelegat → crash | Guard `FirebaseApp.app() != nil` |
| 19 | `Analytics.logEvent()` fără Firebase configurat | Guard în `AnalyticsRelay` |

### D. UX / Logic bugs

| # | Issue | Fix |
|---|---|---|
| 20 | App-ul cere notification permission la launch (după 2s) | Mutat doar la finalul onboarding-ului |
| 21 | "AI CHATBOT" hardcodat în loc de "AI Assistant" | Replace global |
| 22 | "Întreabă orice…" composer pe home arăta ca text input dar deschidea altă pagină | Înlocuit cu buton clar **+ Start new conversation** |
| 23 | TASKS tap → conversație creată, dar chat nu se deschidea automat | `shouldOpenChat` flag + `.onAppear` + `.onChange` în ConversationListView |
| 24 | Stop button în chat era `.disabled(isStreaming)` → tap nu lucra | Permite tap când streaming → cancel task |
| 25 | Al doilea mesaj nu primea răspuns | `Task.checkCancellation()` + `currentStreamTask` cancel preventiv |
| 26 | `updateActiveAndList` suprascria conversația greșită | Update doar dacă `id` match |
| 27 | Like/dislike butoane goale | Eliminate |
| 28 | "USAGE: —" placeholder în settings | Înlocuit cu **CHATS** + **MESSAGES** counter real |
| 29 | Settings PREFERINȚE/SUPORT erau placeholder fără acțiuni | Șterse complet |
| 30 | Model picker tap pe text, nu pe container | `.contentShape(Rectangle())` + `.onTapGesture` pe HStack |
| 31 | Model picker permitea switch oricând | Lock cu icon 🔒 după primul mesaj + hint text |

### E. Decizii de simplificare la cerere

| Eliminat | De ce |
|---|---|
| Firebase (Analytics, RemoteConfig, Messaging) | Nu necesar pentru MVP |
| RevenueCat (paywall, subscription, restore) | App e gratis |
| Onboarding A/B variants (5 fișiere + Japan/Korea) | Direct la chat |
| Push Notifications | Nu trimite notificări |
| ATT prompt | Nu trackuiește |
| Nano Banana model + IMAGE filter în tasks | Image gen amânat |
| Microfon icon | Voice input amânat |
| Galerie / PhotosPicker | Image upload amânat |
| Maestro flows + codemagic.yaml | CI mutat manual local |
| PRO badge / tier=PRO pe modele | Toate FREE |
| GoogleService-Info.plist | Firebase scos |

---

## 4. Reguli de updatat în `builder.md` / `IOS_TEMPLATE_BASE.md`

Pe baza acestui audit, următoarele trebuie adăugate explicit în reguli:

### Builder.md

1. **OBLIGATORIU** Builder generează `project.yml` (xcodegen), NU `Package.swift` ca library.
2. **OBLIGATORIU** Verifică că `.app` are executabil înainte să raporteze success.
3. Toate apelurile la `Set.insert()`, `Dictionary.updateValue()` etc. în context Void → folosește `_ =`.
4. `import` complet pentru toate framework-urile native (UserNotifications, AdServices, StoreKit, etc.).
5. `Text` concatenation: doar `.foregroundColor()` / `.font()` / `.bold()` (returnează Text). NU `.foregroundStyle()` / `.lineSpacing()` în mijlocul `+ Text(...)`.
6. **Defensive init** pentru SDK-uri externe (Firebase, RevenueCat): check that real keys exist înainte să configurezi.
7. NU cere permission-uri (push, ATT) la launch — DOAR la finalul onboarding-ului în ordine: ATT → Push → Rating → Paywall.
8. `Task` în Orchestrator: stochează `currentStreamTask` ca proprietate → permite `cancel()` din UI.
9. `updateConversation`: identifica conversația prin `id`, NU prin snapshot capturat. Update list, update active doar dacă id match.

### IOS_TEMPLATE_BASE.md

1. Bundle ID format: `com.<appname>.<word>.app` (multi-segment, NU `com.groz.*`).
2. `TARGETED_DEVICE_FAMILY: "1,2"` pentru iPhone + iPad implicit.
3. `INFOPLIST_FILE: Info.plist` explicit dacă există Info.plist user-defined; altfel `GENERATE_INFOPLIST_FILE: YES`.
4. Localizable.strings: path explicit per fișier în `resources:`, plus script post-build copiază `.lproj` în `.app` ca backup.
5. AppIcon catalog: dacă există set de PNG-uri ready, Builder le copiază în `Assets.xcassets/AppIcon.appiconset/` + `ASSETCATALOG_COMPILER_APPICON_NAME: AppIcon`.

### CODING_LAWS.md

1. Folderul `competitor-refs/` (NU `screens/`) — strict pentru context, niciodată sursă de implementare.
2. Toate state mutations din async stream task → după `try Task.checkCancellation()` ca să respecte cancel-ul.

---

## 5. Statistici sesiune

| Metrică | Valoare |
|---|---|
| Builduri Codemagic | 12 (8 failed, 4 success) |
| Builduri locale (xcodebuild) | ~30 |
| Erori unice rezolvate | 31 |
| Fișiere Swift inițiale | 50 |
| Fișiere Swift finale | ~25 (după simplificare) |
| Localizări | 14 limbi |
| Modele AI suportate | 4 (GPT-4o-mini, GPT-4o, Grok 2, Qwen Max) |
| Endpoints backend mapate | 8 (chatgpt, grok, qwen, websearch, math, audio, nanoBanana — disabled, file) |

---

## 6. Concluzii pentru viitor

### Ce a mers bine
- xcodegen + project.yml = soluție robustă pentru Builder fără Xcode binary writing
- Streaming SSE prin `AsyncThrowingStream` — natural în Swift concurrency
- Iterație rapidă cu `xcodebuild` local + Codemagic doar pentru CI final
- Codemagic API + token = full automation fără webhook-uri

### Ce trebuie evitat data viitoare
- NU cere Builder să genereze `.xcodeproj` (folosește xcodegen)
- NU lăsa SDK-uri cu placeholder keys să crape app-ul (defensive init)
- NU lăsa butoane cu acțiune goală în UI (audit explicit)
- NU pune fake text inputs care fac altceva la tap

### Recomandare pentru următorul app
- Pre-creează repo pe GitHub înainte de Run pe Builder
- Builder citește direct `competitor-refs/` ca să **evite** copierea pixel-perfect
- Verifică build + install + first screen ÎNAINTE de a adăuga complexitate (Firebase etc.)

---

**Last updated:** 2026-05-26
**Sesiune:** AI Assistant build & polish
**Owner:** Mihai (GROZ)
