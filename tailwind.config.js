/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        primary: "#0000ff",
        "primary-light": "#4169E1",
        "primary-bright": "#1E90FF"
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
        serif: ["Palatino Linotype", "Book Antiqua", "Palatino", "serif"],
        display: ["Georgia", "serif"]
      },
      boxShadow: {
        hero: "0 15px 40px rgba(0, 0, 255, 0.2), 0 5px 20px rgba(0, 0, 0, 0.1)"
      }
    }
  },
  plugins: []
};
