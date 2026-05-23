import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        groz: {
          bg: "#0a0204",
          surface: "rgba(255,255,255,0.03)",
          border: "rgba(255,80,80,0.10)",
          text: "rgba(255,255,255,0.95)",
          muted: "rgba(255,255,255,0.50)",
          accent: "#ef4444",
          accentDim: "#b91c1c",
          accentBright: "#f87171",
          success: "#dc2626",
          warning: "#f97316",
          danger: "#ef4444",
          info: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float-slow": "float 20s ease-in-out infinite",
        "float-slower": "float 30s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
