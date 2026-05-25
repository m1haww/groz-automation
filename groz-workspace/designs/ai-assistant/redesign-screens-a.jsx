/* global React */
/* ============================================================
   redesign-screens-a.jsx — Onboarding, Home, Chats list
   ============================================================ */

const e = React.createElement;

// =================================================================
// SCREEN 1 — Onboarding (single screen replacing the 5-screen tour)
// =================================================================
window.ScreenOnboarding = function ScreenOnboarding() {
  const { PhoneScreen, StatusBar, HomeIndicator, IconKnot, IconBrain, IconPen, IconMail, IconCode, IconArrowUp, IconMic } = window;

  const starters = [
    { icon: <IconBrain size={18}/>, kind: "LEARN", title: "Explain something", sub: "concept · idea · paper" },
    { icon: <IconCode size={18}/>,  kind: "BUILD", title: "Write or debug code", sub: "any language, any framework" },
    { icon: <IconMail size={18}/>,  kind: "WORK",  title: "Draft an email", sub: "reply · cold outreach · ask" },
    { icon: <IconPen size={18}/>,   kind: "WRITE", title: "Brainstorm with me", sub: "open thread, no judgement" },
  ];

  return (
    <PhoneScreen>
      <StatusBar />

      {/* top brand row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconKnot size={20} color="var(--neon)"/>
          <span className="mono upper tiny" style={{ color: "var(--text-2)", letterSpacing: ".18em" }}>AI&nbsp;CHATBOT</span>
        </div>
        <span className="mono upper tiny" style={{ color: "var(--text-3)", letterSpacing: ".14em", cursor: "pointer" }}>SKIP →</span>
      </div>

      {/* hero */}
      <div style={{ padding: "44px 20px 24px" }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--neon)", marginBottom: 18 }}>· 01 / GET STARTED</div>
        <h1 style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 34,
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          margin: 0,
          color: "var(--text-1)"
        }}>
          Pick a starting point.<br/>
          <span style={{ color: "var(--text-3)" }}>Or just type below.</span>
        </h1>
      </div>

      {/* starter cards — full width vertical stack, hairline rows */}
      <div style={{ padding: "8px 20px 16px", display: "grid", gap: 8 }}>
        {starters.map((s, i) => (
          <div key={i} className="card card-press" style={{
            padding: "14px 16px",
            display: "grid",
            gridTemplateColumns: "32px 1fr auto",
            gap: 14,
            alignItems: "center",
            borderRadius: 14
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: "var(--bg-3)", border: "1px solid var(--line)",
              display: "grid", placeItems: "center", color: "var(--neon)"
            }}>{s.icon}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="mono" style={{ fontSize: 9.5, letterSpacing: ".18em", color: "var(--text-3)" }}>{s.kind}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-1)", marginTop: 2 }}>{s.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 1 }}>{s.sub}</div>
            </div>
            <IconArrowUp size={16} color="var(--text-3)" />
          </div>
        ))}
      </div>

      {/* divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 24px" }}>
        <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
        <span className="mono upper tiny" style={{ color: "var(--text-4)", letterSpacing: ".18em" }}>OR</span>
        <div style={{ flex: 1, height: 1, background: "var(--line)" }}/>
      </div>

      {/* composer */}
      <div style={{ padding: "16px 16px 0" }}>
        <div className="composer">
          <IconMic size={18} color="var(--text-3)" />
          <input className="input" placeholder="Ask anything..." />
          <button className="send-btn" aria-label="send"><IconArrowUp size={16}/></button>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      {/* footer */}
      <div style={{ padding: "12px 24px 30px", textAlign: "center" }}>
        <span className="mono upper tiny" style={{ color: "var(--text-4)", letterSpacing: ".14em" }}>
          NO ACCOUNT REQUIRED · YOUR CHATS STAY ON-DEVICE
        </span>
      </div>

      <HomeIndicator/>
    </PhoneScreen>
  );
};


// =================================================================
// SCREEN 2 — Home (chat-first, distinct from Nova's bot-grid)
// =================================================================
window.ScreenHome = function ScreenHome() {
  const { PhoneScreen, StatusBar, HomeIndicator, TabBar, IconKnot, IconCog, IconArrowUp, IconMic, IconPaperclip, IconArrowUR, ModelDot, SectionLabel } = window;

  const recents = [
    { id: "C-024", model: "g", title: "Refactor the OAuth callback handler",        time: "now",  preview: "Yes — extracting the state validation into..." },
    { id: "C-023", model: "c", title: "Outline a 5-min talk on async I/O",          time: "12m",  preview: "Here's a tight outline you can riff on..." },
    { id: "C-022", model: "m", title: "What's a good RAG eval set for legal docs?", time: "1h",   preview: "Start with three buckets — retrieval-only..." },
    { id: "C-021", model: "d", title: "Why does my SwiftUI list re-render?",        time: "Yest", preview: "It's almost certainly the @State binding..." },
  ];

  return (
    <PhoneScreen>
      <StatusBar />

      {/* top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconKnot size={20} color="var(--neon)"/>
          <span className="mono upper tiny" style={{ color: "var(--text-2)", letterSpacing: ".18em" }}>AI&nbsp;CHATBOT</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="mono upper" style={{ fontSize: 9.5, letterSpacing: ".16em", color: "var(--text-3)" }}>PRO · 42 LEFT</span>
          <button style={{
            width: 32, height: 32, borderRadius: 999, background: "var(--bg-2)", border: "1px solid var(--line)",
            color: "var(--text-2)", display: "grid", placeItems: "center", cursor: "pointer"
          }}><IconCog size={16}/></button>
        </div>
      </div>

      {/* greeting */}
      <div style={{ padding: "32px 20px 18px" }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--text-3)" }}>· FRIDAY 09:41 · GMT-7</div>
        <h1 style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 30,
          lineHeight: 1.1,
          letterSpacing: "-0.022em",
          margin: "6px 0 0",
          color: "var(--text-1)"
        }}>
          Ready when<br/>
          <span style={{ color: "var(--neon)" }}>you are.</span>
        </h1>
      </div>

      {/* composer — primary action */}
      <div style={{ padding: "0 16px 18px" }}>
        <div style={{
          padding: 16,
          background: "var(--bg-2)",
          border: "1px solid var(--line)",
          borderRadius: 20,
          boxShadow: "0 0 0 4px rgba(182,255,92,0.04)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <ModelDot kind="g"/>
            <span className="mono" style={{ fontSize: 11, color: "var(--text-2)", letterSpacing: ".05em" }}>GPT-5.2</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--text-4)" }}>·</span>
            <span className="mono upper" style={{ fontSize: 9.5, letterSpacing: ".18em", color: "var(--neon)" }}>READY</span>
            <div style={{ flex: 1 }}/>
            <span className="mono upper" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)", cursor: "pointer" }}>CHANGE →</span>
          </div>
          <div style={{ fontSize: 17, color: "var(--text-3)", padding: "4px 0 14px", lineHeight: 1.3 }}>Ask anything…</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ width: 32, height: 32, borderRadius: 10, background: "transparent", border: "1px solid var(--line)", color: "var(--text-2)", display: "grid", placeItems: "center", cursor: "pointer" }}><IconPaperclip size={16}/></button>
            <button style={{ width: 32, height: 32, borderRadius: 10, background: "transparent", border: "1px solid var(--line)", color: "var(--text-2)", display: "grid", placeItems: "center", cursor: "pointer" }}><IconMic size={16}/></button>
            <div style={{ flex: 1 }}/>
            <button className="send-btn" aria-label="send"><IconArrowUp size={16}/></button>
          </div>
        </div>
      </div>

      {/* recents */}
      <SectionLabel count={4} action="ALL">RECENT</SectionLabel>
      <div style={{ flex: 1, overflow: "hidden", padding: "0 20px", display: "flex", flexDirection: "column", gap: 0 }}>
        {recents.map((r, i) => (
          <div key={r.id} style={{
            padding: "13px 0",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 12,
            alignItems: "start",
            borderTop: i === 0 ? "1px solid var(--line)" : "none",
            borderBottom: "1px solid var(--line)"
          }}>
            <div style={{ marginTop: 5 }}><ModelDot kind={r.model}/></div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="mono" style={{ fontSize: 9.5, color: "var(--text-4)", letterSpacing: ".1em" }}>{r.id}</span>
                <span className="mono" style={{ fontSize: 9.5, color: "var(--text-3)" }}>·</span>
                <span className="mono upper" style={{ fontSize: 9.5, color: "var(--text-3)", letterSpacing: ".14em" }}>{r.time}</span>
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-1)", marginTop: 3, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.preview}</div>
            </div>
            <div style={{ alignSelf: "center", color: "var(--text-4)" }}><IconArrowUR size={14}/></div>
          </div>
        ))}
      </div>

      <TabBar active="chat"/>
      <HomeIndicator/>
    </PhoneScreen>
  );
};


// =================================================================
// SCREEN 3 — Chats list (full history, time-grouped)
// =================================================================
window.ScreenChatsList = function ScreenChatsList() {
  const { PhoneScreen, StatusBar, HomeIndicator, TabBar, IconKnot, IconSearch, IconArrowUR, ModelDot, SectionLabel } = window;

  const groups = [
    { label: "TODAY", count: 3, items: [
      { id: "C-024", model: "g", title: "Refactor the OAuth callback handler", snippet: "Yes — extracting the state validation into…", time: "09:38" },
      { id: "C-023", model: "c", title: "Outline a 5-min talk on async I/O",   snippet: "Here's a tight outline you can riff on…",      time: "09:25" },
      { id: "C-022", model: "m", title: "What's a good RAG eval set for legal docs?", snippet: "Start with three buckets — retrieval-only…", time: "08:14" },
    ]},
    { label: "YESTERDAY", count: 2, items: [
      { id: "C-021", model: "d", title: "Why does my SwiftUI list re-render?",  snippet: "It's almost certainly the @State binding…", time: "Yest 18:02" },
      { id: "C-020", model: "i", title: "Logo variations — neon lime, mark-only", snippet: "Here are 6 directions, ordered by…", time: "Yest 14:11" },
    ]},
    { label: "THIS WEEK", count: 2, items: [
      { id: "C-019", model: "c", title: "Press release for v2 launch",          snippet: "Below — punchy lede + three quotes…", time: "Wed" },
      { id: "C-018", model: "q", title: "Migration plan: Postgres → Aurora",    snippet: "Three phases, rollback after each…",   time: "Tue" },
    ]},
  ];

  return (
    <PhoneScreen>
      <StatusBar />

      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconKnot size={20} color="var(--neon)"/>
          <span className="mono upper tiny" style={{ color: "var(--text-2)", letterSpacing: ".18em" }}>CHATS</span>
        </div>
        <span className="mono upper tiny" style={{ color: "var(--text-3)", letterSpacing: ".14em" }}>24 TOTAL</span>
      </div>

      {/* search */}
      <div style={{ padding: "16px 20px 8px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", background: "var(--bg-2)",
          border: "1px solid var(--line)", borderRadius: 999
        }}>
          <IconSearch size={16} color="var(--text-3)"/>
          <span style={{ flex: 1, color: "var(--text-3)", fontSize: 14 }}>Search chats…</span>
          <span className="mono" style={{ fontSize: 10, color: "var(--text-4)", border: "1px solid var(--line)", padding: "2px 5px", borderRadius: 4 }}>⌘ K</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 100 }}>
        {groups.map((g, gi) => (
          <div key={g.label} style={{ marginTop: gi === 0 ? 12 : 24 }}>
            <SectionLabel count={g.count}>{g.label}</SectionLabel>
            <div style={{ padding: "0 20px" }}>
              {g.items.map((r, i) => (
                <div key={r.id} style={{
                  padding: "14px 0",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: 12,
                  alignItems: "start",
                  borderTop: i === 0 ? "1px solid var(--line)" : "none",
                  borderBottom: "1px solid var(--line)"
                }}>
                  <div style={{ marginTop: 5 }}><ModelDot kind={r.model}/></div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span className="mono" style={{ fontSize: 9.5, color: "var(--text-4)", letterSpacing: ".1em" }}>{r.id}</span>
                      <span className="mono" style={{ fontSize: 9.5, color: "var(--text-3)" }}>·</span>
                      <span className="mono" style={{ fontSize: 9.5, color: "var(--text-3)", letterSpacing: ".08em" }}>{r.time}</span>
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-1)", marginTop: 3, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.snippet}</div>
                  </div>
                  <div style={{ alignSelf: "center", color: "var(--text-4)" }}><IconArrowUR size={14}/></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TabBar active="chat"/>
      <HomeIndicator/>
    </PhoneScreen>
  );
};
