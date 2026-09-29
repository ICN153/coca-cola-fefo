/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coca: {
          red: "#F40009",
          darkRed: "#A80006",
          lightRed: "#FF2A30",
          black: "#111111",
          gray: "#F8F9FA",
          softGray: "#E5E7EB",
        },
      },
    },
  },
  plugins: [],
};
