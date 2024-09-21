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

        "color-1": "#ddeffd",
        "color-2": "#4961a5",
        "color-13": "#3287fc",
        "color-8": "#eff9ff",
        "color-7": "#f8b500",
        "color-11": "#faa01b",
        "color-17": "#ff4a9e",

        
        "color-3": "#5a7ebd",
        "color-6": "#d6effd",
        "color-4": "#81afde",
        "color-5": "#eef8fe",
        "color-9": "#507cbf",
        "color-10": "#273c9a",
        "color-12": "#a6cced",
        "color-14": "#f37421",
        "color-15": "#f79e16",
        "color-16": "#ffdf05",
        "color-18": "#521f96",
        "color-19": "#ffe1ec",
        "dark-pink": "#e33c89"
      }
    },
  },
  plugins: [],
};
export default config;
