const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        secondary: {
          50: "#fefaec",
          100: "#fcf0c9",
          200: "#f9e08e",
          300: "#f6cb53",
          400: "#f5bb3b",
          500: "#ee9512",
          600: "#d2710d",
          700: "#af4f0e",
          800: "#8e3d12",
          900: "#753312",
          950: "#431905",
        },
        primary: {
          50: "#f3f7f8",
          100: "#e0eaed",
          200: "#c5d7dc",
          300: "#9dbbc3",
          400: "#6d96a3",
          500: "#527a88",
          600: "#466674",
          700: "#3b515c",
          800: "#384952",
          900: "#323f47",
          950: "#1e272e",
        },
        brown: {
          50: "#f5f4f1",
          100: "#e6e3db",
          200: "#cfc7b9",
          300: "#b2a692",
          400: "#9c8b73",
          500: "#8d7b65",
          600: "#766353",
          700: "#625146",
          800: "#54453f",
          900: "#4a3d39",
          950: "#29211f",
        },
      },
    },
    animation: {
      "slide-from-left": "from-left 0.4s ease-out",
      scale: "element-scale 1.2s ease-in-out infinite",
    },
    keyframes: {
      "element-scale": {
        "0%": { scale: "1", opacity: "1" },
        "50%": { scale: "1.3", opacity: "1" },
        "70%": { scale: "1", opacity: "0.6" },
        "100%": { opacity: "0.6" },
      },
      "from-left": {
        "0%": { transform: "translateX(-100%)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }: any) => {
      matchUtilities(
        {
          "animation-delay": (value: any) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
