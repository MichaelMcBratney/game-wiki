import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        wiki: {
          bg: "#0d0d12",
          surface: "#16161d",
          border: "#2a2a35",
          muted: "#6b6b7b",
          accent: "#8b5cf6",
          "accent-hover": "#a78bfa",
          gold: "#d4af37",
          danger: "#dc2626",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
