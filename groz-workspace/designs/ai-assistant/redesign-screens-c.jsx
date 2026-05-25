/* global React */
/* ============================================================
   redesign-screens-c.jsx — Tasks, Settings
   ============================================================ */

// =================================================================
// SCREEN 7 — Tasks (manifest-style, NOT illustrated posters)
// Distinct from Nova's bot-grid AND from the original's posters.
// =================================================================
window.ScreenTasks = function ScreenTasks() {
  const {
    PhoneScreen, StatusBar, HomeIndicator, TabBar, IconKnot, IconSearch,
    IconBrain, IconCode, IconPen, IconBolt, IconBook, IconMail, IconImage, IconGlobe,
    IconArrowUR, SectionLabel
  } = window;

  const Chip = ({ children, active }) => (
    <span style={{
      padding: "6px 12px",
      borderRadius: 999,
      background: active ? "var(--neon)" : "transparent",
      color: active ? "#000" : "var(--text-2)",
      border: active ? "0" : "1px solid var(--line)",
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      fontWeight: 500,
      cursor: "pointer"
    }}>{children}</span>
  );

  const TaskRow = ({ id, icon, tag, title, sub, runs }) => (
    <div className="card-press" style={{
      padding: "16px 18px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 14,
      alignItems: "center",
      borderBottom: "1px solid var(--line)",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: "var(--bg-3)", border: "1px solid var(--line)",
        display: "grid", placeItems: "center", color: "var(--neon)"
      }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="mono" style={{ fontSize: 9.5, color: "var(--text-4)", letterSpacing: ".1em" }}>{id}</span>
          <span className="mono upper" style={{ fontSize: 9, letterSpacing: ".18em", color: "var(--neon)" }}>{tag}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-1)", marginTop: 2 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 1 }}>{sub}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="mono" style={{ fontSize: 9.5, color: "var(--text-4)", letterSpacing: ".12em" }}>{runs} RUNS</div>
        <div style={{ color: "var(--text-3)", marginTop: 4, display: "flex", justifyContent: "flex-end" }}><IconArrowUR size={14}/></div>
      </div>
    </div>
  );

  return (
    <PhoneScreen>
      <StatusBar />

      {/* top */}
      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconKnot size={20} color="var(--neon)"/>
          <span className="mono upper tiny" style={{ color: "var(--text-2)", letterSpacing: ".18em" }}>TASKS</span>
        </div>
        <span className="mono upper tiny" style={{ color: "var(--text-3)", letterSpacing: ".14em" }}>24 TEMPLATES</span>
      </div>

      {/* hero */}
      <div style={{ padding: "26px 20px 16px" }}>
        <h1 style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: 28,
          lineHeight: 1.12,
          letterSpacing: "-0.022em",
          margin: 0,
          color: "var(--text-1)"
        }}>
          Pre-built prompts<br/>
          <span style={{ color: "var(--text-3)" }}>tuned for one job.</span>
        </h1>
      </div>

      {/* filter chips */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 6, overflowX: "auto" }}>
        <Chip active>ALL</Chip>
        <Chip>BUILD</Chip>
        <Chip>WRITE</Chip>
        <Chip>LEARN</Chip>
        <Chip>IMAGE</Chip>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 100 }}>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          <TaskRow id="T-01" icon={<IconCode size={18}/>}  tag="BUILD" title="Pair-program a feature"     sub="JS, Python, Swift, Go — your choice"   runs="12" />
          <TaskRow id="T-02" icon={<IconBook size={18}/>}  tag="LEARN" title="Snap a problem, get steps"  sub="Photo math + handwritten work"          runs="48" />
          <TaskRow id="T-03" icon={<IconMail size={18}/>}  tag="WRITE" title="Reply to this email"        sub="Match tone · 3 options · word limits"   runs="91" />
          <TaskRow id="T-04" icon={<IconPen size={18}/>}   tag="WRITE" title="Outline a talk or essay"    sub="From a blank page to a usable outline"  runs="6"  />
          <TaskRow id="T-05" icon={<IconBolt size={18}/>}  tag="BUILD" title="Roast my landing page"      sub="Paste a URL — get sharp, honest notes"  runs="3"  />
          <TaskRow id="T-06" icon={<IconBrain size={18}/>} tag="LEARN" title="Explain like I'm five"      sub="Then again at expert level"             runs="22" />
          <TaskRow id="T-07" icon={<IconGlobe size={18}/>} tag="WRITE" title="Translate, preserving tone" sub="40+ languages · cultural notes"         runs="14" />
          <TaskRow id="T-08" icon={<IconImage size={18}/>} tag="IMAGE" title="Generate or edit an image"  sub="Nano Banana · FLUX · DALL-E 3"          runs="37" />
        </div>
      </div>

      <TabBar active="tasks"/>
      <HomeIndicator/>
    </PhoneScreen>
  );
};


// =================================================================
// SCREEN 8 — Settings (clean, no upsell wall)
// =================================================================
window.ScreenSettings = function ScreenSettings() {
  const {
    PhoneScreen, StatusBar, HomeIndicator, TabBar, IconKnot, IconChevronR,
    IconUser, IconStack, IconBolt, IconLock, IconLogout, IconArrowUR, ModelDot, SectionLabel
  } = window;

  const Row = ({ icon, label, value, danger, last }) => (
    <div style={{
      padding: "14px 18px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto auto",
      gap: 14,
      alignItems: "center",
      borderBottom: last ? "0" : "1px solid var(--line)",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: "var(--bg-3)", border: "1px solid var(--line)",
        display: "grid", placeItems: "center",
        color: danger ? "var(--err)" : "var(--text-2)"
      }}>{icon}</div>
      <div style={{ fontSize: 14.5, color: danger ? "var(--err)" : "var(--text-1)" }}>{label}</div>
      {value && <span className="mono" style={{ fontSize: 11.5, color: "var(--text-3)" }}>{value}</span>}
      <IconChevronR size={14} color="var(--text-4)"/>
    </div>
  );

  return (
    <PhoneScreen>
      <StatusBar />

      <div style={{ padding: "12px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconKnot size={20} color="var(--neon)"/>
          <span className="mono upper tiny" style={{ color: "var(--text-2)", letterSpacing: ".18em" }}>YOU</span>
        </div>
        <span className="mono upper tiny" style={{ color: "var(--text-3)", letterSpacing: ".14em" }}>V 2.0.0</span>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 100 }}>
        {/* profile / plan card */}
        <div style={{ padding: "26px 20px 8px" }}>
          <div className="card" style={{ padding: 18, borderRadius: 18, position: "relative", overflow: "hidden" }}>
            {/* corner brackets — hallmark */}
            <span style={{ position: "absolute", top: 8, left: 8, width: 10, height: 10, borderLeft: "1px solid var(--neon-dim)", borderTop: "1px solid var(--neon-dim)" }}/>
            <span style={{ position: "absolute", top: 8, right: 8, width: 10, height: 10, borderRight: "1px solid var(--neon-dim)", borderTop: "1px solid var(--neon-dim)" }}/>
            <span style={{ position: "absolute", bottom: 8, left: 8, width: 10, height: 10, borderLeft: "1px solid var(--neon-dim)", borderBottom: "1px solid var(--neon-dim)" }}/>
            <span style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderRight: "1px solid var(--neon-dim)", borderBottom: "1px solid var(--neon-dim)" }}/>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: "var(--bg-3)", border: "1px solid var(--line)",
                display: "grid", placeItems: "center",
                color: "var(--neon)", fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 500
              }}>K</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>ACCOUNT</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--text-1)", marginTop: 2 }}>kanat.j@gmail.com</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
              <div>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>PLAN</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--neon)", marginTop: 2 }}>PRO</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>USAGE</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-1)", marginTop: 2 }}>458 / 1000</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".14em", color: "var(--text-3)" }}>RENEWS</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-1)", marginTop: 2 }}>Jun 24</div>
              </div>
            </div>

            {/* tiny usage bar */}
            <div style={{ marginTop: 12, height: 3, background: "var(--bg-3)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: "45.8%", height: "100%", background: "var(--neon)", boxShadow: "0 0 8px var(--neon-glow)" }}/>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <SectionLabel>PREFERENCES</SectionLabel>
          <div style={{ background: "var(--bg-1)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <Row icon={<IconUser size={14}/>}  label="Profile"          value="K · she/her" />
            <Row icon={<IconStack size={14}/>} label="Default model"    value="GPT-5.2"    />
            <Row icon={<IconBolt size={14}/>}  label="Appearance"       value="NEON LIME"  />
            <Row icon={<IconLock size={14}/>}  label="Privacy & data"   value="ON-DEVICE"  last />
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <SectionLabel>SUPPORT</SectionLabel>
          <div style={{ background: "var(--bg-1)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <Row icon={<IconArrowUR size={14}/>} label="Send feedback"    value="" />
            <Row icon={<IconArrowUR size={14}/>} label="Help & FAQ"       value="" />
            <Row icon={<IconArrowUR size={14}/>} label="What's new"       value="v 2.0.0" last />
          </div>
        </div>

        <div style={{ marginTop: 22, paddingBottom: 16 }}>
          <div style={{ background: "var(--bg-1)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <Row icon={<IconLogout size={14}/>} label="Sign out" danger value="" last />
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "16px 20px 0" }}>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".18em", color: "var(--text-4)" }}>
            AI CHATBOT · 2.0.0 (1042) · BUILT WITH CARE
          </div>
        </div>
      </div>

      <TabBar active="you"/>
      <HomeIndicator/>
    </PhoneScreen>
  );
};
