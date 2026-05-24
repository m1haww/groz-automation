# Spec: AI Assistant — Chat & Ask

**Task ID:** 20260523-001-ai-chatbot
**Author:** GROZ Proposer
**Date:** 2026-05-24

---

## Problem

Utilizatorul dorește o aplicație mobilă iOS care îi permite să converseze cu un AI (Claude) printr-un
chat interface minimalist, dark-mode first. Nu există autentificare, istoricul nu persistă între sesiuni
și experiența trebuie să fie rapidă și Apple-guideline-compliant.

---

## Solution

Aplicație SwiftUI iOS numită **AI Assistant — Chat & Ask** (Bundle ID: `com.aiassistant.app`).
Flow standard GROZ template (Onboarding A/B → ATT → Push → Rating → Hard Paywall → App real).
Post-paywall: 3 ecrane — Home cu **Starter Cards** (unghiul unic UX), Chat activ, Settings.
Backend: Claude API cu modelul `claude-haiku-4-5` apelat din `Services/ConversationEngine.swift`.

---

## User flow

1. Utilizatorul deschide app-ul → vede **Splash** (logo animat, ~1.5s)
2. Dacă onboarding necomplet → **Onboarding A/B** (5 variante + JP/KR regional)
   - Step final: ATT prompt → Push Notifications permission → Rating request → Hard Paywall
3. Post-paywall → **Home screen** cu 4 **Starter Cards** animat (topic suggestions pre-definite)
4. Utilizatorul tapează un Starter Card sau butonul „New Chat" → deschide **Chat screen**
   - Dacă a ales un card, primul mesaj user este pre-populat din card
5. Utilizatorul scrie/trimite mesaje → AI răspunde în timp real (streaming tokens)
6. Long-press pe orice mesaj AI → opțiune „Copy" / „Rephrase shorter" / „Rephrase formal"
7. Utilizatorul navighează la **Settings** → Clear conversation / About

---

## Technical approach

- **Platform:** iOS Swift / SwiftUI — prioritate. Flutter: out of scope v1.
- **Architecture:** MVVM-C (Coordinator) — distinct față de alte GROZ apps care folosesc MVVM pur
- **Folder structure** (variantă `Features/` pentru uniqueness):
  ```
  AIAssistant/
  ├── App/
  │   ├── AIAssistantApp.swift          # @main
  │   ├── AppOrchestrator.swift         # AppDelegate adaptor
  │   └── SessionCoordinator.swift      # global state (înlocuiește AppViewModel)
  │
  ├── OnboardingABTesting/              # standard GROZ template
  │   ├── OnboardingEntryView.swift
  │   ├── OnboardingShared.swift
  │   ├── OnboardingVariantA–E.swift
  │   ├── OnboardingJapanVariant.swift
  │   ├── OnboardingKoreaVariant.swift
  │   └── JapanOnboardingPaywallView.swift / KoreaOnboardingPaywallView.swift
  │
  ├── Features/
  │   ├── Home/
  │   │   ├── HomeView.swift
  │   │   ├── HomeCoordinator.swift
  │   │   └── StarterCardView.swift     # componenta card-uri topic
  │   ├── Chat/
  │   │   ├── ChatView.swift
  │   │   ├── ChatCoordinator.swift
  │   │   ├── MessageBubbleView.swift
  │   │   └── InputBarView.swift
  │   └── Settings/
  │       ├── SettingsView.swift
  │       └── SettingsCoordinator.swift
  │
  ├── Services/
  │   ├── PaywallGateService.swift      # RevenueCat (înlocuiește SubscriptionService)
  │   └── ConversationEngine.swift      # Claude API wrapper
  │
  ├── Utilities/
  │   ├── EventTracker.swift            # Firebase Analytics (înlocuiește AnalyticsManager)
  │   ├── RemoteVariantManager.swift    # A/B config (înlocuiește OnboardingRemoteConfigManager)
  │   ├── AppleAttributionManager.swift
  │   ├── FeedbackController.swift      # haptics (înlocuiește HapticManager)
  │   ├── AppPalette.swift              # brand colors (înlocuiește ColorTheme)
  │   └── SwiftUIExtras.swift           # extensions (înlocuiește ViewExtensions)
  │
  ├── Models/
  │   ├── ChatMessage.swift
  │   ├── StarterCard.swift
  │   └── Country.swift
  │
  ├── Navigation/
  │   └── AppRoute.swift
  │
  ├── Localization/                     # 15 limbi standard GROZ
  │   └── {ar,cs,en,es-419,...}.lproj/
  │
  ├── Assets.xcassets/
  ├── GoogleService-Info.plist
  ├── Info.plist
  └── codemagic.yaml
  ```

- **Claude API integration (`ConversationEngine.swift`):**
  - Model: `claude-haiku-4-5`
  - Endpoint: `https://api.anthropic.com/v1/messages`
  - Streaming: SSE (Server-Sent Events) via `URLSession` cu `AsyncBytes`
  - Mesajele sesiunii curente păstrate în `[ChatMessage]` în memorie (nu persistate)
  - System prompt: definit în `ConversationEngine` (personalitate asistent)
  - API key: citit din `Info.plist` cheie `CLAUDE_API_KEY` (injectată via Codemagic secret)

- **Feature unic — Starter Cards:**
  - 4 carduri pre-definite în `StarterCard.swift` (topics: "Explain something", "Help me write",
    "Answer a question", "Brainstorm ideas")
  - Animație de intrare: `.interpolatingSpring(stiffness: 160, damping: 14)` — distinct de alte apps
  - Fiecare card are icon SF Symbol + titlu scurt + subtitle prompt hint
  - Tap → pre-populează `InputBarView` cu prompt template și focus automat

- **Feature unic — Rephrase Context Menu:**
  - Long-press pe bubble AI → `contextMenu` cu 3 acțiuni:
    - „Copy" — copiază textul
    - „Shorter ↓" — trimite cerere la Claude să reformuleze mai scurt
    - „More formal ↑" — trimite cerere la Claude să reformuleze formal
  - Rezultatul apare ca mesaj nou AI (nu suprascrie originalul)

- **Dependencies:**

  | Framework | Source | Motivație |
  |---|---|---|
  | Firebase Analytics | SPM | event tracking |
  | Firebase Remote Config | SPM | A/B onboarding |
  | Firebase Messaging | SPM | push notifications |
  | RevenueCat | SPM | subscriptions / IAP |
  | RevenueCatUI | SPM | paywall UI default |
  | AppTrackingTransparency | iOS native | ATT prompt |
  | AdSupport | iOS native | IDFA |

- **Data persistence:** nimic în v1. Mesajele trăiesc doar în memorie pe durata sesiunii.
  UserDefaults: `onboarding_complete` (Bool) și `theme_preference` (String, rezervat v2).

---

## Color design system (din brief — referință Chat Smith)

```swift
// AppPalette.swift
extension Color {
    static let bgPrimary    = Color(hex: "#000000")  // negru pur
    static let bgCard       = Color(hex: "#111111")  // card/panel
    static let bgInput      = Color(hex: "#1A1A1A")  // input field
    static let accentGreen  = Color(hex: "#00C896")  // accent principal
    static let accentPressed = Color(hex: "#00A87E") // pressed state
    static let textPrimary  = Color(hex: "#FFFFFF")
    static let textSecondary = Color(hex: "#8A8A8A") // placeholder
    static let textOnAccent = Color(hex: "#000000")  // text pe butoane verzi
    static let borderSubtle = Color(hex: "#2A2A2A")  // border card-uri
}
```

Aplicare:
- Bubble user: bg `accentGreen`, text `textOnAccent`
- Bubble AI: bg `bgInput`, text `textPrimary`, border `borderSubtle`
- Input bar: bg `bgInput`, border `accentGreen` când focused
- Send button: `accentGreen` cu icon negru (SF Symbol `arrow.up`)
- Tab bar active: `accentGreen` / inactive: `textSecondary`
- Nav bar: bg `bgPrimary`, title `textPrimary`

---

## Firebase & RevenueCat config (uniqueness CODING_LAWS)

- **Firebase project:** `aiassistant-prod` (NU `groz-*`)
- **Remote Config key:** `"chat_onboarding_variant"` → `"a"|"b"|"c"|"d"|"e"`
- **RevenueCat entitlement:** `"chat_premium"` (NU `"Main"`)
- **RevenueCat product IDs:** `com.aiassistant.premium.monthly` / `com.aiassistant.premium.yearly`
- **Analytics events** (distincte):
  - `"conversation_initiated"` (nu `"recording_started"` sau alt app)
  - `"starter_card_tapped"`
  - `"rephrase_requested"`
  - `"message_sent"`

---

## Acceptance criteria

- [ ] App pornește, splash apare ~1.5s, Firebase configurat corect
- [ ] Onboarding A/B servit din Remote Config key `"chat_onboarding_variant"`
- [ ] Ordinea corectă: ATT → Push Notifications → Rating → Hard Paywall
- [ ] Paywall cu entitlement `"chat_premium"` blochează accesul la chat
- [ ] Home screen afișează 4 Starter Cards cu animație spring la prima afișare
- [ ] Tap Starter Card → ChatView deschis cu prompt pre-populat în input
- [ ] Mesaj user trimis → bubble verde `#00C896` text negru, aliniat dreapta
- [ ] Răspuns AI apare streaming (token cu token, nu dintr-o dată)
- [ ] Bubble AI: bg `#1A1A1A`, text alb, border `#2A2A2A`, aliniat stânga
- [ ] Long-press bubble AI → context menu cu „Copy", „Shorter ↓", „More formal ↑"
- [ ] Settings → „Clear Conversation" curăță mesajele din memorie
- [ ] Toate 15 fișiere `.lproj/Localizable.strings` prezente (chei distincte față de alt GROZ app)
- [ ] Niciun crash la trimitere rapidă de mesaje consecutive
- [ ] App compliant Apple HIG (touch targets min 44pt, contrast sufficient)

---

## Out of scope (v1)

- Istoricul conversațiilor persistent între sesiuni
- Autentificare / conturi user
- Export / share conversație
- Voice input / Text-to-speech output
- Multiple chat-uri simultane
- Flutter implementation
- Dark/Light mode toggle (dark-mode only în v1)
- Push notifications cu conținut AI

---

## Estimated effort

- **Builder (iOS scaffold + feature):** 12 ore
  - GROZ template scaffold (onboarding, paywall, firebase): 4 ore
  - ConversationEngine (Claude API streaming): 3 ore
  - Chat UI (bubbles, input bar, streaming display): 3 ore
  - Starter Cards + Rephrase context menu: 2 ore
- **QA:** 3 ore
  - Smoke test flows, Apple HIG check, uniqueness audit

---

## Open questions

1. **API key management:** Claude API key se injectează prin Codemagic secret `CLAUDE_API_KEY`
   sau printr-un proxy server propriu (recomandat pentru securitate)? Proxy = nu expui key în app.
2. **Paywall design:** RevenueCat default UI sau custom hand-coded (ca Japan/Korea variants)?
3. **Starter Cards content:** cele 4 topics propuse sunt ok sau Mihai vrea să le personalizeze?
4. **Streaming UX:** tokenii apar live (ca ChatGPT) sau se afișează după ce răspunsul e complet?
   Live = mai bun UX dar mai complex implementare.
5. **App icon:** flat / 3D / line-art? Elementul principal (bubble chat, robot, stea)?
   Trebuie să fie complet diferit de orice app GROZ existent.

---

## GROZ rules compliance

- **CODING_LAWS uniqueness:** Naming cu prefix tematic `AA` (`AAChatCoordinator`, etc.) sau complet
  descriptiv (`ConversationEngine`, `SessionCoordinator`, `PaywallGateService`) — zero coliziuni
  cu app-urile GROZ existente. Folder structure `Features/` distinct față de `Views/` pattern.
- **IOS_TEMPLATE_BASE:** Template complet respectat — toate cele 5 stadii (Onboarding A/B → ATT →
  Push → Rating → Paywall) prezente, `AppDelegate` cu Firebase/FCM/ATT/RevenueCat init,
  cele 15 limbi `.lproj/`, `codemagic.yaml` inclus în scaffold.
- **UI_GUIDELINES:** Guidelines în schelet (TBD) — spec folosește culorile din brief (Chat Smith
  referință) cu paleta completă definită în `AppPalette.swift`. Spacing 8/16/24pt grid.
  Animații `.interpolatingSpring(stiffness: 160, damping: 14)` — distincte față de alte GROZ apps.
  Touch targets min 44pt conform HIG.
