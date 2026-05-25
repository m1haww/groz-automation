/* global React */
/* ============================================================
   redesign-icons.jsx — small line icon set + brand mark
   Used by all screens. Lucide-style: 1.5px stroke, 24px box.
   ============================================================ */

const { createElement: h } = React;

// Brand mark — knot/clover (carried over from current brand)
window.IconKnot = function IconKnot({ size = 24, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4c2.5 0 4.5 2 4.5 4.5 0 1.5-.7 2.8-1.8 3.6 1.1.8 1.8 2.1 1.8 3.6 0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5c0-1.5.7-2.8 1.8-3.6-1.1-.8-1.8-2.1-1.8-3.6C11.5 6 13.5 4 16 4z" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M4 16c0-2.5 2-4.5 4.5-4.5 1.5 0 2.8.7 3.6 1.8.8-1.1 2.1-1.8 3.6-1.8 2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5c-1.5 0-2.8-.7-3.6-1.8-.8 1.1-2.1 1.8-3.6 1.8C6 20.5 4 18.5 4 16z" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M16 12c2.5 0 4.5 2 4.5 4.5 0 1.5-.7 2.8-1.8 3.6 1.1.8 1.8 2.1 1.8 3.6 0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5c0-1.5.7-2.8 1.8-3.6-1.1-.8-1.8-2.1-1.8-3.6 0-2.5 2-4.5 4.5-4.5z" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
    </svg>
  );
};

// Generic line icon factory
const IconBase = ({ size = 20, color = "currentColor", strokeWidth = 1.6, children }) =>
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{children}</svg>;

window.IconBack = (p) => <IconBase {...p}><path d="M15 18l-6-6 6-6"/></IconBase>;
window.IconClose = (p) => <IconBase {...p}><path d="M18 6L6 18M6 6l12 12"/></IconBase>;
window.IconChevronR = (p) => <IconBase {...p}><path d="M9 18l6-6-6-6"/></IconBase>;
window.IconChevronD = (p) => <IconBase {...p}><path d="M6 9l6 6 6-6"/></IconBase>;
window.IconArrowUp = (p) => <IconBase {...p}><path d="M12 19V5M5 12l7-7 7 7"/></IconBase>;
window.IconArrowUR = (p) => <IconBase {...p}><path d="M7 17L17 7M8 7h9v9"/></IconBase>;
window.IconSearch = (p) => <IconBase {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></IconBase>;
window.IconMic = (p) => <IconBase {...p}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></IconBase>;
window.IconImage = (p) => <IconBase {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 16l-4-4-9 9"/></IconBase>;
window.IconSparkle = (p) => <IconBase {...p}><path d="M12 3l1.8 5L19 9.5l-5.2 1.5L12 16l-1.8-5L5 9.5 10.2 8 12 3z"/><path d="M19 17l.7 1.8L21.5 19.5l-1.8.7L19 22l-.7-1.8L16.5 19.5l1.8-.7L19 17z"/></IconBase>;
window.IconCode = (p) => <IconBase {...p}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></IconBase>;
window.IconBolt = (p) => <IconBase {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></IconBase>;
window.IconBook = (p) => <IconBase {...p}><path d="M4 4h7a4 4 0 014 4v12a3 3 0 00-3-3H4V4zM20 4h-7a4 4 0 00-4 4v12a3 3 0 013-3h8V4z"/></IconBase>;
window.IconBrain = (p) => <IconBase {...p}><path d="M12 5a3 3 0 00-6 0 4 4 0 00-2 7 4 4 0 002 7 3 3 0 006 0V5zM12 5a3 3 0 016 0 4 4 0 012 7 4 4 0 01-2 7 3 3 0 01-6 0"/></IconBase>;
window.IconPen = (p) => <IconBase {...p}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.5 7.5"/><circle cx="11" cy="11" r="2"/></IconBase>;
window.IconMail = (p) => <IconBase {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></IconBase>;
window.IconChat = (p) => <IconBase {...p}><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z"/></IconBase>;
window.IconHash = (p) => <IconBase {...p}><path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/></IconBase>;
window.IconClock = (p) => <IconBase {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></IconBase>;
window.IconUser = (p) => <IconBase {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0114 0v1"/></IconBase>;
window.IconStack = (p) => <IconBase {...p}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></IconBase>;
window.IconGlobe = (p) => <IconBase {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18 14 14 0 010-18z"/></IconBase>;
window.IconCopy = (p) => <IconBase {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></IconBase>;
window.IconRefresh = (p) => <IconBase {...p}><path d="M3 12a9 9 0 0115-6.7L21 8M21 4v4h-4M21 12a9 9 0 01-15 6.7L3 16M3 20v-4h4"/></IconBase>;
window.IconPaperclip = (p) => <IconBase {...p}><path d="M21 12l-9 9a6 6 0 11-8-8l9-9a4 4 0 015 5l-9 9a2 2 0 11-3-3l8-8"/></IconBase>;
window.IconCog = (p) => <IconBase {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 00-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 00-2.1-1.2L14 3h-4l-.4 2.5a7 7 0 00-2.1 1.2l-2.4-.9-2 3.4 2 1.6A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.9a7 7 0 002.1 1.2L10 21h4l.4-2.5a7 7 0 002.1-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/></IconBase>;
window.IconLock = (p) => <IconBase {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></IconBase>;
window.IconLogout = (p) => <IconBase {...p}><path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/></IconBase>;
window.IconCircle = (p) => <IconBase {...p}><circle cx="12" cy="12" r="3" fill="currentColor"/></IconBase>;

// Model avatars — small geometric marks (NOT real brand logos)
window.ModelAvatar = function ModelAvatar({ kind = "g", size = 24 }) {
  const map = {
    g: { fg: "#ffffff", bg: "#1a1a1a", glyph: <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.6" fill="none"/> },          // GPT
    c: { fg: "#d97757", bg: "#1a1410", glyph: <path d="M8 8l8 8M16 8l-8 8" stroke="#d97757" strokeWidth="1.8" strokeLinecap="round"/> }, // Claude
    m: { fg: "#82b0ff", bg: "#0f1420", glyph: <path d="M12 6l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" stroke="#82b0ff" strokeWidth="1.6" fill="none"/> }, // Gemini
    d: { fg: "#7da9ff", bg: "#0f1623", glyph: <path d="M6 14c0-3 3-5 6-5s6 2 6 5c0 1.5-1 3-2 3M9 11l2 2" stroke="#7da9ff" strokeWidth="1.6" strokeLinecap="round" fill="none"/> }, // DeepSeek
    q: { fg: "#a78bfa", bg: "#161024", glyph: <path d="M12 6l4 3v6l-4 3-4-3V9z" stroke="#a78bfa" strokeWidth="1.6" fill="none"/> }, // Qwen
    x: { fg: "#fafafa", bg: "#111", glyph: <path d="M7 7l10 10M17 7L7 17" stroke="#fafafa" strokeWidth="1.8" strokeLinecap="round"/> }, // Grok
    i: { fg: "#b6ff5c", bg: "#101a05", glyph: <path d="M6 18l4-6 3 4 5-7" stroke="#b6ff5c" strokeWidth="1.8" strokeLinecap="round" fill="none"/> }, // Image
  };
  const s = map[kind] || map.g;
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.35,
      background: s.bg, display: "grid", placeItems: "center",
      flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)"
    }}>
      <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24">{s.glyph}</svg>
    </div>
  );
};
