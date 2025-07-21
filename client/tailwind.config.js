/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables dark mode via class strategy
  theme: {
    extend: {
      colors: {
        glassLight: "rgba(255, 255, 255, 0.5)",
        glassDark: "rgba(23, 23, 23, 0.6)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
