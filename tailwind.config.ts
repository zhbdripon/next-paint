import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        'app-main': 'calc(100% - 4rem)',
      },
      width: {
        'canvas': 'calc(100% - 8rem)',
      },
    },
  },
  plugins: [],
} satisfies Config;
