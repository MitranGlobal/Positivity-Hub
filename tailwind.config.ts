import type { Config } from "tailwindcss";

/**
 * Positivity Hub design tokens.
 * Colours follow the MiTran Global brand sites: black stage, ivory paper, gold accent.
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
        // Palette matches the MiTran Global sites (see Parent-Live-Sessions-Landing-Page):
        // near-black stage, warm ivory paper, and MiTran gold as the single accent.
        ink: {
          DEFAULT: "#08090c", // text on light surfaces
          soft: "#4a4c55",
          faint: "#6b6d76",
        },
        ivory: "#f5f4ef", // text on dark surfaces
        mist: {
          DEFAULT: "#f5f4ef", // "paper" page background
          deep: "#ebe8df",
          line: "#dcd8cc",
        },
        stage: {
          DEFAULT: "#08090c", // near-black bands
          soft: "#0e1015",
          card: "#12141a",
        },
        gold: {
          DEFAULT: "#e9c46a",
          bright: "#f5d17a",
          deep: "#c99b3a",
          text: "#7a5a12", // gold for small text on light surfaces (readable contrast)
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f5d17a 0%, #e9c46a 40%, #c99b3a 100%)",
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
        lift: "0 24px 60px -28px rgba(8, 9, 12, 0.45)",
        glow: "0 0 60px -12px rgba(233, 196, 106, 0.45)",
      },
      maxWidth: {
        prose: "62ch",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
