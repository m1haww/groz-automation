/* global React */
/* ============================================================
   redesign-shell.jsx — status bar, home indicator, phone shell
   ============================================================ */

window.StatusBar = function StatusBar({ time = "9:41", dark = false }) {
  const color = dark ? "#000" : "#fafafa";
  return (
    <div className="status-bar" style={{ color }}>
      <div>{time}</div>
      <div className="right">
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill={color}>
          <rect x="0"  y="8" width="3" height="4" rx=".5"/>
          <rect x="5"  y="5" width="3" height="7" rx=".5"/>
          <rect x="10" y="2" width="3" height="10" rx=".5"/>
          <rect x="15" y="0" width="3" height="12" rx=".5"/>
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}>
          <path d="M8.5 0a13 13 0 018.5 3.2l-1.5 1.6A11 11 0 008.5 2.2 11 11 0 001.5 4.8L0 3.2A13 13 0 018.5 0z"/>
          <path d="M8.5 4a9 9 0 015.7 2l-1.5 1.6a7 7 0 00-8.4 0L2.8 6A9 9 0 018.5 4z"/>
          <path d="M8.5 8a5 5 0 012.8.9L8.5 12 5.7 8.9A5 5 0 018.5 8z"/>
        </svg>
        {/* battery */}
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
          <rect x="0.5" y="0.5" width="24" height="11" rx="3" stroke={color} strokeOpacity=".5"/>
          <rect x="2"   y="2"   width="21" height="8"  rx="1.5" fill={color}/>
          <rect x="25.5" y="3.5" width="2" height="5" rx="1" fill={color} fillOpacity=".5"/>
        </svg>
      </div>
    </div>
  );
};

window.HomeIndicator = function HomeIndicator() {
  return <div className="home-indicator"></div>;
};

// PhoneScreen — provides a fixed 390x844 device screen container
// Children fill it. Background defaults to bg-0 (pure black).
window.PhoneScreen = function PhoneScreen({ children, dark = true, grid = false, style }) {
  return (
    <div className={`app-screen ${grid ? "bg-grid" : ""}`} style={{ width: 390, height: 844, ...style }}>
      {children}
    </div>
  );
};

// Section label with brackets — hallmark
window.SectionLabel = function SectionLabel({ children, count, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span className="label" style={{ color: "var(--text-3)" }}>[</span>
        <span className="label" style={{ color: "var(--text-2)" }}>{children}</span>
        {count !== undefined && <span className="label" style={{ color: "var(--text-4)" }}>· {count}</span>}
        <span className="label" style={{ color: "var(--text-3)" }}>]</span>
      </div>
      {action && <span className="label" style={{ color: "var(--neon)" }}>{action} →</span>}
    </div>
  );
};

// TopBar — used by sub-pages (chat, models, etc.)
window.TopBar = function TopBar({ left, title, sub, right }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 16px 16px", flexShrink: 0
    }}>
      <div style={{ width: 36 }}>{left}</div>
      <div style={{ flex: 1, textAlign: "center", minWidth: 0 }}>
        {title && <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>}
        {sub && <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-3)", marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ width: 36, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
};

window.IconBtn = function IconBtn({ children, ariaLabel, onClick, style }) {
  return (
    <button onClick={onClick} aria-label={ariaLabel} style={{
      width: 36, height: 36, borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--line)",
      color: "var(--text-1)", display: "grid", placeItems: "center", cursor: "pointer", ...style
    }}>{children}</button>
  );
};

// Tab bar — Chat / Tasks / You
window.TabBar = function TabBar({ active = "chat" }) {
  const { IconChat, IconStack, IconUser } = window;
  return (
    <div className="tabbar">
      <div className={`tab ${active === "chat" ? "active" : ""}`}>
        <IconChat size={20}/>
        <span>Chat</span>
      </div>
      <div className={`tab ${active === "tasks" ? "active" : ""}`}>
        <IconStack size={20}/>
        <span>Tasks</span>
      </div>
      <div className={`tab ${active === "you" ? "active" : ""}`}>
        <IconUser size={20}/>
        <span>You</span>
      </div>
    </div>
  );
};

// ModelDot — small colored disc per model brand
window.ModelDot = function ModelDot({ kind = "g", size = 8 }) {
  const colors = { g:"#ffffff", c:"#d97757", m:"#82b0ff", d:"#7da9ff", q:"#a78bfa", x:"#fafafa", i:"#b6ff5c", a:"#f0b541" };
  return <span style={{
    display: "inline-block", width: size, height: size, borderRadius: "50%",
    background: colors[kind] || colors.g, boxShadow: `0 0 0 1px rgba(255,255,255,0.06)`
  }}/>;
};
