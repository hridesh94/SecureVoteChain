
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1D1D1F",
          hover: "#2D2D2F",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F5F5F7",
          foreground: "#1D1D1F",
        },
        success: {
          DEFAULT: "#06C167",
          foreground: "#FFFFFF",
        },
        error: {
          DEFAULT: "#FF3B30",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.8)",
          foreground: "#1D1D1F",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms ease",
        contentShow: "contentShow 150ms ease",
        fadeIn: "fadeIn 200ms ease",
        slideUp: "slideUp 200ms ease",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
