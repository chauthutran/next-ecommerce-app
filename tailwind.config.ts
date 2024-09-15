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
        "firebrick": "#f01459",


        "color-1": "#4c5973",
        "color-2": "#b7cfdd",
        "color-3": "#637c96",
        "color-4": "#c4dbe9",
        "color-5": "#e0dcde"
      }
    },
  },
  plugins: [],
};
export default config;
