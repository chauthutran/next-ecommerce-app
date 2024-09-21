import type { Config } from "tailwindcss";

const config: Config = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', "./app/**/*.{js,ts,jsx,tsx,mdx}",],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ghost-white": "#eff0f3",
        "mustard-yellow": "#f7bc04",
        "bright-yellow": "#fbd309",
        "firebrick": "#f01459"
      }
    },
  },
  plugins: [],
};
export default config;
