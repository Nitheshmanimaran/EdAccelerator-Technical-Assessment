import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"]
      },
      colors: {
        ink: {
          900: "#0b0f1a",
          800: "#131a2a",
          700: "#1f2a44",
          600: "#2f3c5c",
          500: "#3f4f74",
          400: "#5c6b8a",
          300: "#8896b3",
          200: "#b7c1d6",
          100: "#e6ebf2"
        },
        tide: {
          700: "#0e6b73",
          600: "#138a8a",
          500: "#1aa6a4",
          400: "#48bfb8",
          300: "#7fd5c8",
          200: "#b9e8dc",
          100: "#e6f7f1"
        },
        sun: {
          700: "#c95b1b",
          600: "#e46f2a",
          500: "#f58c3b",
          400: "#f8a664",
          300: "#fbc08f",
          200: "#fde0c4",
          100: "#fff2e4"
        }
      },
      boxShadow: {
        "soft-xl": "0 20px 60px -40px rgba(12, 18, 30, 0.8)",
        "soft-lg": "0 18px 45px -30px rgba(12, 18, 30, 0.65)",
        glow: "0 0 0 1px rgba(26, 166, 164, 0.2), 0 10px 30px -15px rgba(26, 166, 164, 0.6)"
      },
      backgroundImage: {
        "mesh": "radial-gradient(circle at 10% 20%, rgba(26, 166, 164, 0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(245, 140, 59, 0.2), transparent 50%), radial-gradient(circle at 80% 90%, rgba(92, 107, 138, 0.18), transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;
