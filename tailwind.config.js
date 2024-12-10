/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      blur: {
        "50px": "50px",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
      fontFamily: {
        beatrice: ['"Beatrice Deck"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
