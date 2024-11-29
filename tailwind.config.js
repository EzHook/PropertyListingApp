/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Includes all files in the app directory
    "./components/**/*.{js,jsx,ts,tsx}", // Includes all files in the components directory
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0D34BF",
        secondary: "#252D4B",
        heading: "#252D4B",
        background: "#F5F7FE",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
