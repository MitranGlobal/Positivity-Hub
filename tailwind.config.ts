import type { Config } from "tailwindcss";

/**
 * Positivity Hub design tokens.
 * Palette idea: "first light after rain" — deep sea ink, rain-washed mist,
 * lagoon teal for calm, and marigold as the single warm accent.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#17324D",
          soft: "#4A6178",
          faint: "#7D8FA0",
        },
        mist: {
          DEFAULT: "#EEF3F1",
          deep: "#DCE7E3",
          line: "#C9D8D3",
        },
        lagoon: {
          DEFAULT: "#2F7F7A",
          deep: "#1F5C58",
          night: "#143E3C",
        },
        marigold: {
          DEFAULT: "#F5B83D",
          deep: "#B87A0E",
          soft: "#FCE7B8",
        },
        blush: {
          DEFAULT: "#F6D3C4",
        },
      },
      fontFamily: {
        display: ['"Young Serif"', "Georgia", "serif"],
        sans: ['"Figtree Variable"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Modular scale (~1.25) for body, larger steps for display.
        "display-xl": ["clamp(2.75rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.1rem, 4.6vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.6rem, 3vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        panel: "28px",
        tile: "18px",
        chip: "10px",
      },
      boxShadow: {
        lift: "0 24px 60px -28px rgba(23, 50, 77, 0.35)",
        glow: "0 18px 40px -16px rgba(245, 184, 61, 0.55)",
      },
      maxWidth: {
        prose: "62ch",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(0.86)", opacity: "0.7" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        breathe: "breathe 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
