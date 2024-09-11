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
        "royal-blue": "#00246B",
        "ghost-white": "#eff0f3",
        "firebrick": "#cc3333",
        "pale-robin-egg-blue": "#b6dcdc",
        "navy-blue": "#003366",
        "vivid-red": "#ef2300",



        "pale-spring-bud": "#dde9d1",
        "light_sky_blue": "#d1eafe",
        "color-13": "#eff3f6",
        "color-12": "#3d6188",
        



        "pink-lace": "#ecd8d9",
        "color-9": "#f8f9fa",
        "color-7": "#0a3718",
        "deep-gray": "#909090",
        "dark-gray": "#999999",
        "light-gray": "#e2e2e2",
        "alice-blue": "#eef3f7",
        "moss-green": "#87b041",
        "pale_sage": "#d4ddc5",
        "lime_green": "#bfed5d",
        "light_khaki": "#eff1c5",
        "light_buttercream": "#faf5c4",
        "lavender_blush": "#f3daf4",
        "soft_mint_green": "#91c39c",


        "yellow-1": "#ffbf00",
        "yellow-2": "#ffd700",
        "yellow-3": "#ffe600",
        "yellow-4": "#f0fb43",
        
        "maroon-1": "#4d0834",
        "maroon-2": "#7a1354",
        "maroon-3": "#af1f72",
        "maroon-4": "#e82a89",

        "color-1": "#f6e1d6",
        "color-2": "#b3b4b0",
        "color-3": "#ed6094",
        "color-4": "#f6f3ee",

        
        "color-5": "#696d62",
        "color-8": "#d43683",
        "color-6": "#09ad09",

      },
      rotate: {
        '-15': '-5deg',
        '15': '15deg',
      },
      backgroundImage: {
        'wave': "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 1440 320%27%3E%3Cpath fill=%27%230053af%27 fill-opacity=%271%27 d=%27M0,128L48,144C96,160,192,192,288,208C384,224,480,224,576,213.3C672,203,768,181,864,160C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%27%3E%3C/path%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
};
export default config;
