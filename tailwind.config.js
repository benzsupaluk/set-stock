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
        primary: {
          50: "#fff9eb",
          100: "#feeec7",
          200: "#fddb8a",
          300: "#fcc24d",
          400: "#fbb034",
          500: "#f5870b",
          600: "#d96206",
          700: "#b44209",
          800: "#92330e",
          900: "#782b0f",
          950: "#451403",
        },
      },
    },
  },
  plugins: [],
};
