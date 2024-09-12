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
        "firebrick": "#b22222",
        "vivid-red": "#ef2300",

        "royal-blue": "#00246B",

        "light-gray": "#e2e2e2",
      }
    },
  },
  plugins: [],
};
export default config;
