# GROZ iOS Template Base

> **Aceasta este structura comună pe care TOATE aplicațiile iOS GROZ o au înainte
> de a adăuga feature-uri specifice app-ului.**
>
> Extras din analiza repo-ului `call-recorder` (referință).

## Filosofia

Orice app GROZ iOS este, în esență, **un gate-system în 3 stadii**:

```
[App Launch] → [Onboarding A/B] → [Phone Registration] → [Hard Paywall] → [App Real]
                     ↑                                          ↑
                Firebase Remote Config              RevenueCat (entitlement "Main")
```

Tot ce e DUPĂ paywall = feature specific app-ului. Tot ce e ÎNAINTE = template comun.

---

## 1. App Entry Point

### Fișiere obligatorii

- `App.swift` — `@main struct ... : App`
- `AppDelegate.swift` — cu `@UIApplicationDelegateAdaptor`
- `AppViewModel.swift` — state global (user, navigation, FCM token)

### Pattern bootstrap

```swift
@main
struct GROZApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate
    @StateObject var appVM = AppViewModel()
    @StateObject var subscriptionService = SubscriptionService()

    var body: some Scene {
        WindowGroup {
            // Conditional routing:
            //   - if !onboardingDone → OnboardingEntryView
            //   - if !phoneRegistered → PhoneSelectionView
            //   - else → ContentView (app-specific)
            //
            // Overlay:
            //   - Splash screen (async data gate)
            //   - .fullScreenCover paywall (subscriptionService.showPaywall)
        }
    }
}
```

### AppDelegate must-haves

- `FirebaseApp.configure()` la `didFinishLaunching`
- `UNUserNotificationCenter.delegate = self`
- `Messaging.delegate = self` (FCM)
- Delayed (2s) request pentru notification permission
- AppTrackingTransparency request
- `Purchases.configure()` (RevenueCat)

---

## 2. Onboarding System (A/B Testing)

### Folder: `OnboardingABTesting/`

Fișiere standard:

| Fișier | Rol |
|---|---|
| `OnboardingEntryView.swift` | router: region gate + variant routing |
| `OnboardingShared.swift` | enum `OnboardingABVariant` + `PhoneSelectionView` |
| `OnboardingVariantA.swift` | variant principal A |
| `OnboardingVariantB.swift` | variant B |
| `OnboardingVariantC.swift` | variant C |
| `OnboardingVariantD.swift` | variant D |
| `OnboardingVariantE.swift` | variant E |
| `OnboardingJapanVariant.swift` | override regional Japan |
| `OnboardingKoreaVariant.swift` | override regional Korea |
| `JapanOnboardingPaywallView.swift` | paywall custom Japan |
| `KoreaOnboardingPaywallView.swift` | paywall custom Korea |

### A/B Testing wiring (Firebase Remote Config)

**Manager:** `Utilities/OnboardingRemoteConfigManager.swift`

```swift
class OnboardingRemoteConfigManager: ObservableObject {
    @Published var onboardingVariant: OnboardingABVariant = .a

    // Key Remote Config: "onboarding_variant" → "a"|"b"|"c"|"d"|"e"
    // minimumFetchInterval = 0 (always fresh in debug)
    // attribuit RevenueCat pentru cohort tracking
}
```

### Variant pattern (pentru fiecare A-E)

- Multi-step carousel (`currentStep` state)
- `.spring()` animations
- `imageScale` / `imageOffset` dynamics
- Haptic feedback la fiecare step
- Notification permission allow la final
- Final → triggers paywall

### Region gating

```swift
if Locale.current.region == "JP" {
    OnboardingJapanVariant()
} else if Locale.current.region == "KR" {
    OnboardingKoreaVariant()
} else {
    // Route to A/B variant from Remote Config
}
```

---

## 3. Hard Paywall (RevenueCat)

### Dependențe

- `import RevenueCat`
- `import RevenueCatUI`

### Structura

**Service:** `Services/SubscriptionService.swift`

```swift
class SubscriptionService: ObservableObject {
    @Published var showPaywall = false
    @Published var isSubscribed = false

    let entitlementId = "Main"  // entitlement principal

    func checkSubscriptionStatus() {
        Purchases.shared.getCustomerInfo { info, _ in
            self.isSubscribed = info?.entitlements[self.entitlementId]?.isActive == true
        }
    }
}
```

### Hard paywall gate

În `OnboardingEntryView` la finalul flow-ului:

```swift
// Post-onboarding:
subscriptionService.showPaywall = true
// Apoi requestReview()
```

În `App.swift`:

```swift
.fullScreenCover(isPresented: $subscriptionService.showPaywall) {
    PaywallView()  // RevenueCat native UI
}
```

### Paywall regional (custom, nu RevenueCat UI)

Japan + Korea au paywall custom cu `Offering` și `Package` manuale:
- `JapanOnboardingPaywallView.swift`
- `KoreaOnboardingPaywallView.swift`

### Opțiuni de paywall (Mihai alege per app)

1. **RevenueCat default UI** (rapid, ușor)
2. **Custom hand-coded** (control total — ca Japan/Korea variants)

---

## 4. Firebase Setup

### Configure la launch (AppDelegate)

```swift
FirebaseApp.configure()
```

### GoogleService-Info.plist

Obligatoriu în root proiect.

### Managers

**`Utilities/AnalyticsManager.swift`** — wrapper Analytics:

```swift
class AnalyticsManager {
    static func logEvent(_ name: String, params: [String: Any] = [:])
    static func setUserId(_ id: String)
    static func setUserProperty(_ value: String?, forName name: String)
}
```

**`Utilities/OnboardingRemoteConfigManager.swift`** — A/B variant assignment

**`Utilities/AppleAttributionManager.swift`** — Apple Search Ads attribution → RevenueCat

---

## 5. Notifications (Push)

### Flow obligatoriu

```
App Launch
  └── AppDelegate.didFinishLaunching
        ├── UNUserNotificationCenter.delegate = self
        ├── Messaging.delegate = self (FCM)
        └── Delay 2s → handleNotificationPermissions()
              ├── request .alert .badge .sound
              ├── application.registerForRemoteNotifications()
              └── FCM token primit → AppViewModel.saveFCMToken()
```

### Allow în onboarding

Cere permission la finalul flow-ului de onboarding (ultimul step), NU la launch direct. Pattern conversion mai bun.

### Payload-to-navigation

```swift
func userNotificationCenter(_:didReceive response:) {
    // Decodează payload → AppViewModel.navigateTo(.someScreen(data))
}
```

---

## 6. Localizare

### Folders `.lproj/` (15 limbi standard GROZ)

`ar`, `cs`, `en`, `es-419`, `es-MX`, `hu`, `ja`, `ko`, `pl`, `pt-BR`, `ro`, `sk`, `th`, `tr`

Fiecare cu `Localizable.strings`.

### Usage în Swift

```swift
Text(String(localized: "onboarding_step_1_title"))
```

---

## 7. Utilities reutilizate

- `HapticManager.swift` — haptic feedback wrapper
- `ColorTheme.swift` — brand colors
- `ViewExtensions.swift` — common SwiftUI extensions
- `SafeSession.swift` — safe URLSession
- `AppleAttributionManager.swift` — ASA → RevenueCat
- `Models/Country.swift` — dial codes, flags pentru PhoneSelectionView

---

## 8. Dependencies obligatorii

| Framework | Sursă | De ce |
|---|---|---|
| Firebase Analytics | SPM | event tracking |
| Firebase Remote Config | SPM | A/B testing onboarding |
| Firebase Messaging | SPM | push notifications |
| RevenueCat | SPM | subscriptions / IAP |
| RevenueCatUI | SPM | paywall UI default |
| AppTrackingTransparency | iOS native | ATT prompt |
| AdSupport | iOS native | IDFA |

Toate prin **Swift Package Manager** (NU CocoaPods, Podfile rămâne gol).

---

## 9. GROZ iOS Template Skeleton (folder tree)

```
GROZApp/
├── App/
│   ├── GROZApp.swift                 # @main
│   ├── AppDelegate.swift             # Firebase, RC, FCM, ATT init
│   └── AppViewModel.swift            # global state
│
├── OnboardingABTesting/
│   ├── OnboardingEntryView.swift     # router: region + A/B
│   ├── OnboardingShared.swift        # enum + PhoneSelectionView
│   ├── OnboardingVariantA.swift
│   ├── OnboardingVariantB.swift
│   ├── OnboardingVariantC.swift
│   ├── OnboardingVariantD.swift
│   ├── OnboardingVariantE.swift
│   ├── OnboardingJapanVariant.swift
│   ├── OnboardingKoreaVariant.swift
│   ├── JapanOnboardingPaywallView.swift
│   └── KoreaOnboardingPaywallView.swift
│
├── Services/
│   ├── SubscriptionService.swift     # RevenueCat
│   ├── UserService.swift             # user registration API
│   └── ServerService.swift           # API base (app-specific endpoints)
│
├── Utilities/
│   ├── AnalyticsManager.swift        # Firebase
│   ├── OnboardingRemoteConfigManager.swift  # A/B variant
│   ├── AppleAttributionManager.swift # ASA
│   ├── HapticManager.swift
│   ├── ColorTheme.swift
│   ├── ViewExtensions.swift
│   └── SafeSession.swift
│
├── Models/
│   ├── Country.swift
│   └── AppleAttributionData.swift
│
├── Navigation/
│   └── NavigationDestination.swift   # OVERRIDE per app
│
├── Views/
│   └── ContentView.swift             # app-specific entry
│
├── Components/                       # app-specific
│
├── Assets.xcassets/
│
├── Localization/
│   ├── ar.lproj/
│   ├── cs.lproj/
│   ├── en.lproj/
│   ├── es-419.lproj/
│   ├── es-MX.lproj/
│   ├── hu.lproj/
│   ├── ja.lproj/
│   ├── ko.lproj/
│   ├── pl.lproj/
│   ├── pt-BR.lproj/
│   ├── ro.lproj/
│   ├── sk.lproj/
│   ├── th.lproj/
│   └── tr.lproj/
│
├── GoogleService-Info.plist
├── Info.plist
└── codemagic.yaml
```

---

## 10. Reguli pentru agenți

### Builder Agent
- Când creezi app nou: **întotdeauna** scaffoldează template-ul ăsta înainte de feature-uri
- NU sări peste onboarding, paywall sau Firebase setup
- Folosește 5 variante A-E pentru A/B + Japan/Korea regional dacă target market cuprinde Asia

### QA Tester
- Verifică obligatoriu:
  - [ ] App pornește, Firebase configurat
  - [ ] Onboarding apare, variantă servită din Remote Config
  - [ ] Notification permission cerută în onboarding (nu la launch)
  - [ ] Hard paywall apare după onboarding (nu se poate skip)
  - [ ] Toate 15 limbile sunt prezente în `.lproj/`
  - [ ] AppTrackingTransparency prompt apare

### Critic Agent
- Pe orice PR: verifică că modificările nu rup template-ul de bază
- Dacă PR atinge `OnboardingABTesting/`, `Services/SubscriptionService.swift`, `AppDelegate.swift` → flag pentru review extra atent

---

**Referință:** `call-recorder` repo este referință vie a acestui template.
**Last updated:** 2026-05-23
