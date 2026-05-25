/* global React */
/* ============================================================
   redesign-screens-b.jsx — Models picker, Chat empty, Chat active
   ============================================================ */

// =================================================================
// SCREEN 4 — Models picker (vertical, grouped by capability)
// Distinct from Nova's round-avatar grid.
// =================================================================
window.ScreenModels = function ScreenModels() {
  const {
    PhoneScreen, StatusBar, HomeIndicator, TopBar, IconBtn, IconClose, IconSearch,
    ModelDot, SectionLabel
  } = window;

  const Row = ({ id, model, name, sub, tier, active }) => (
    <div style={{
      padding: "14px 16px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 14,
      alignItems: "center",
      background: active ? "rgba(182,255,92,0.04)" : "transparent",
      borderTop: "1px solid var(--line)",
      borderLeft: active ? "2px solid var(--neon)" : "2px solid transparent",
      marginLeft: -20, marginRight: -20,
      paddingLeft: 18, paddingRight: 20,
    }}>
      <ModelDot kind={model} size={10}/>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="mono" style={{ fontSize: 9.5, color: "var(--text-4)", letterSpacing: ".1em" }}>{id}</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-1)" }}>{name}</span>
          {active && <span className="mono upper" style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--neon)" }}>· DEFAULT</span>}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {tier === "free" && <span className="mono upper" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>FREE</span>}
        {tier === "pro"  && <span className="mono upper" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--neon)" }}>PRO</span>}
        {tier === "$$"   && (
          <span style={{ display: "flex", gap: 2 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--neon)" }}/>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--neon)" }}/>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-4)" }}/>
          </span>
        )}
      </div>
    </div>
  );

  const groups = [
    { label: "REASONING & WRITING", count: 3, items: [
      { id: "M-01", model: "g", name: "GPT-5.2",        sub: "OpenAI · best general model",         tier: "pro",  active: true },
      { id: "M-02", model: "c", name: "Claude Sonnet 4.6", sub: "Anthropic · long-form, careful",   tier: "pro" },
      { id: "M-03", model: "d", name: "DeepSeek R1",    sub: "open weights · shows its reasoning",  tier: "free" },
    ]},
    { label: "CODING", count: 2, items: [
      { id: "M-04", model: "q", name: "Qwen Code",      sub: "Alibaba · fast, agentic edits",       tier: "free" },
      { id: "M-05", model: "g", name: "GPT-5 Mini Code", sub: "OpenAI · cheap, fast completions",   tier: "$$" },
    ]},
    { label: "MULTIMODAL", count: 2, items: [
      { id: "M-06", model: "m", name: "Gemini 3 Pro",   sub: "Google · vision + video + audio",     tier: "pro" },
      { id: "M-07", model: "m", name: "Gemini 3 Flash", sub: "Google · fast multimodal",            tier: "free" },
    ]},
    { label: "IMAGE", count: 2, items: [
      { id: "M-08", model: "i", name: "Nano Banana",    sub: "edit + generate in one prompt",       tier: "pro" },
      { id: "M-09", model: "i", name: "FLUX 1.1 Pro",   sub: "photoreal · best for portraits",      tier: "pro" },
    ]},
  ];

  return (
    <PhoneScreen>
      <StatusBar />

      <TopBar
        left={<IconBtn ariaLabel="close"><IconClose size={18}/></IconBtn>}
        title="Choose a model"
        sub="9 AVAILABLE · 1 ACTIVE"
        right={null}
      />

      <div style={{ padding: "4px 20px 4px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", background: "var(--bg-2)",
          border: "1px solid var(--line)", borderRadius: 999
        }}>
          <IconSearch size={16} color="var(--text-3)"/>
          <span style={{ flex: 1, color: "var(--text-3)", fontSize: 14 }}>Filter models…</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 24 }}>
        {groups.map((g, gi) => (
          <div key={g.label} style={{ marginTop: gi === 0 ? 16 : 22 }}>
            <SectionLabel count={g.count}>{g.label}</SectionLabel>
            <div style={{ padding: "0 20px" }}>
              {g.items.map((r, i) => <Row key={r.id} {...r}/>)}
              <div style={{ height: 1, background: "var(--line)", marginLeft: -20, marginRight: -20 }}/>
            </div>
          </div>
        ))}
      </div>

      <HomeIndicator/>
    </PhoneScreen>
  );
};


// =================================================================
// SCREEN 5 — Chat empty state (with starter prompts)
// Addresses the audit's #2 finding.
// =================================================================
window.ScreenChatEmpty = function ScreenChatEmpty() {
  const {
    PhoneScreen, StatusBar, HomeIndicator, IconBtn, IconBack, IconChevronD,
    IconArrowUp, IconMic, IconPaperclip, IconCog, ModelDot
  } = window;

  const prompts = [
    { tag: "REVIEW",  text: "Explain this stack trace — and what to try first." },
    { tag: "REFACTOR", text: "Rewrite this function to be testable." },
    { tag: "DESIGN",  text: "Write a SwiftUI list with pull-to-refresh." },
    { tag: "DEBUG",   text: "Why does my useEffect run twice in dev?" },
  ];

  return (
    <PhoneScreen>
      <StatusBar />

      {/* top bar with model selector */}
      <div style={{ padding: "8px 16px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <IconBtn ariaLabel="back"><IconBack size={18}/></IconBtn>
        <button style={{
          flex: 1, display: "flex", alignItems: "center", gap: 10,
          padding: "8px 12px 8px 10px",
          background: "var(--bg-2)", border: "1px solid var(--line)",
          borderRadius: 12, cursor: "pointer", color: "var(--text-1)"
        }}>
          <ModelDot kind="g" size={10}/>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>MODEL · M-01</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 1 }}>GPT-5.2</div>
          </div>
          <IconChevronD size={14} color="var(--text-3)"/>
        </button>
        <IconBtn ariaLabel="settings"><IconCog size={16}/></IconBtn>
      </div>

      <div className="hairline"/>

      {/* hero */}
      <div style={{ padding: "40px 24px 0" }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--neon)", marginBottom: 14 }}>· NEW CONVERSATION · C-025</div>
        <h2 style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 26,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          margin: 0,
          color: "var(--text-1)"
        }}>
          What can <span style={{ color: "var(--neon)" }}>GPT-5.2</span> do for you?
        </h2>
        <p style={{ fontSize: 13.5, color: "var(--text-3)", marginTop: 10, lineHeight: 1.5, maxWidth: 300 }}>
          Best for reasoning, writing, and analysis. Slow but careful — give it the full picture and it will plan before answering.
        </p>
      </div>

      {/* starter prompts */}
      <div style={{ padding: "26px 20px 0", display: "grid", gap: 8 }}>
        <div className="bracket-row" style={{ margin: "0 4px 4px" }}>
          <span className="label" style={{ flex: "0 0 auto", color: "var(--text-3)" }}>TRY THESE</span>
        </div>
        {prompts.map((p, i) => (
          <div key={i} className="card card-press" style={{
            padding: "12px 14px 12px 16px",
            borderRadius: 12,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 12,
            alignItems: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: 2,
              background: "var(--neon)",
              opacity: 0.0
            }}/>
            <div style={{ minWidth: 0 }}>
              <span className="mono upper" style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--neon)", marginRight: 8 }}>{p.tag}</span>
              <span style={{ fontSize: 14, color: "var(--text-1)", lineHeight: 1.4 }}>{p.text}</span>
            </div>
            <span style={{ color: "var(--text-4)" }}>↩</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}/>

      {/* composer */}
      <div style={{ padding: "12px 16px 24px" }}>
        <div className="composer focused">
          <IconPaperclip size={18} color="var(--text-2)" />
          <input className="input" placeholder="Type or paste your question…" />
          <IconMic size={18} color="var(--text-2)" />
          <button className="send-btn" aria-label="send"><IconArrowUp size={16}/></button>
        </div>
      </div>

      <HomeIndicator/>
    </PhoneScreen>
  );
};


// =================================================================
// SCREEN 6 — Chat active (showing a real exchange)
// =================================================================
window.ScreenChatActive = function ScreenChatActive() {
  const {
    PhoneScreen, StatusBar, HomeIndicator, IconBtn, IconBack, IconChevronD,
    IconArrowUp, IconMic, IconPaperclip, IconCog, IconCopy, IconRefresh, ModelDot
  } = window;

  return (
    <PhoneScreen>
      <StatusBar />

      {/* top bar */}
      <div style={{ padding: "8px 16px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <IconBtn ariaLabel="back"><IconBack size={18}/></IconBtn>
        <button style={{
          flex: 1, display: "flex", alignItems: "center", gap: 10,
          padding: "8px 12px 8px 10px",
          background: "var(--bg-2)", border: "1px solid var(--line)",
          borderRadius: 12, cursor: "pointer", color: "var(--text-1)"
        }}>
          <ModelDot kind="g" size={10}/>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>C-024 · GPT-5.2</div>
            <div style={{ fontSize: 13.5, fontWeight: 500, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>Refactor the OAuth callback handler</div>
          </div>
          <IconChevronD size={14} color="var(--text-3)"/>
        </button>
        <IconBtn ariaLabel="settings"><IconCog size={16}/></IconBtn>
      </div>

      <div className="hairline"/>

      {/* messages */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px 16px 16px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* user message — aligned right, with bracket-corner detail */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{
            maxWidth: "78%",
            position: "relative",
            background: "var(--bg-3)",
            border: "1px solid var(--line)",
            borderRadius: "16px 16px 4px 16px",
            padding: "10px 14px",
            color: "var(--text-1)",
            fontSize: 14.5,
            lineHeight: 1.45
          }}>
            Can you refactor my OAuth callback to validate the state parameter properly? It's currently just comparing strings.
          </div>
        </div>

        {/* AI response — left-aligned, no bubble, doc-style */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <ModelDot kind="g" size={9}/>
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>GPT-5.2 · 1.2s</span>
            <div style={{ flex: 1, height: 1, background: "var(--line-soft)" }}/>
          </div>
          <div style={{ fontSize: 14.5, color: "var(--text-1)", lineHeight: 1.55 }}>
            Yes. The fix has two parts: <span style={{ color: "var(--neon)" }}>constant-time comparison</span> and <span style={{ color: "var(--neon)" }}>nonce binding</span>. Here's the refactor:
          </div>
          <div className="code-block" style={{ marginTop: 10 }}>
            <div><span className="kw">func</span> <span className="fn">validateCallback</span>(req) {"{"}</div>
            <div>&nbsp;&nbsp;<span className="kw">const</span> stored = <span className="fn">session.get</span>(<span className="str">'oauth_state'</span>)</div>
            <div>&nbsp;&nbsp;<span className="cm">// timing-safe compare</span></div>
            <div>&nbsp;&nbsp;<span className="kw">if</span> (!<span className="fn">timingSafeEqual</span>(stored, req.query.state))</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">throw new</span> <span className="fn">AuthError</span>(<span className="str">'bad_state'</span>)</div>
            <div>{"}"}</div>
          </div>
          <div style={{ fontSize: 13.5, color: "var(--text-2)", lineHeight: 1.55, marginTop: 10 }}>
            The first line pulls the original nonce you stored before redirecting. The compare uses <span className="mono" style={{ fontSize: 12, color: "var(--text-1)" }}>timingSafeEqual</span> so attackers can't read response timing.
          </div>

          {/* message actions */}
          <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "5px 9px", borderRadius: 8,
              background: "transparent", border: "1px solid var(--line)",
              color: "var(--text-3)", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase"
            }}><IconCopy size={11}/> COPY</button>
            <button style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "5px 9px", borderRadius: 8,
              background: "transparent", border: "1px solid var(--line)",
              color: "var(--text-3)", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase"
            }}><IconRefresh size={11}/> REGEN</button>
            <div style={{ flex: 1 }}/>
            <button style={{
              padding: "5px 9px", borderRadius: 8,
              background: "transparent", border: "1px solid var(--line)",
              color: "var(--text-3)", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase"
            }}>↑</button>
            <button style={{
              padding: "5px 9px", borderRadius: 8,
              background: "transparent", border: "1px solid var(--line)",
              color: "var(--text-3)", cursor: "pointer",
              fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase"
            }}>↓</button>
          </div>
        </div>

        {/* follow-up user */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{
            maxWidth: "78%",
            background: "var(--bg-3)",
            border: "1px solid var(--line)",
            borderRadius: "16px 16px 4px 16px",
            padding: "10px 14px",
            color: "var(--text-1)",
            fontSize: 14.5,
            lineHeight: 1.45
          }}>
            What about the nonce binding part?
          </div>
        </div>

        {/* typing indicator */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <ModelDot kind="g" size={9}/>
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--neon)" }}>· THINKING</span>
            <div style={{ flex: 1, height: 1, background: "var(--line-soft)" }}/>
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--neon)",
                opacity: i === 1 ? 1 : 0.3
              }}/>
            ))}
          </div>
        </div>
      </div>

      {/* composer */}
      <div style={{ padding: "8px 16px 24px", borderTop: "1px solid var(--line-soft)" }}>
        <div className="composer">
          <IconPaperclip size={18} color="var(--text-3)" />
          <input className="input" placeholder="Reply…" />
          <IconMic size={18} color="var(--text-3)" />
          <button className="send-btn" aria-label="send"><IconArrowUp size={16}/></button>
        </div>
      </div>

      <HomeIndicator/>
    </PhoneScreen>
  );
};
