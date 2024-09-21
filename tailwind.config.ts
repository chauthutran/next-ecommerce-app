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


        "color-1": "#242323",
        "color-2": "#652a31",
        "color-3": "#e79e77",
        "color-4": "#fc43aa",
        "color-5": "#f5981e",
        "color-6": "#90c745",
        "color-7": "#c16476",
        "color-8": "#90c745",
        "color-9": "#2184de"
      }
    },
  },
  plugins: [],
};
export default config;
