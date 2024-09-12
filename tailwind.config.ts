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


        "color-4": "#b22222",
        "royal-blue": "#00246B",
        "light-gray": "#e2e2e2",
        "deep-green": "#43cb83",
        "lime-green": "#a1d418",
        "color-1": "#45c686",
        "color-3": "#82a84f",
      }
    },
  },
  plugins: [],
};
export default config;
