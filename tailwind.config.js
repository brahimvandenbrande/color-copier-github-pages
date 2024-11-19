/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'notion-dark': '#191919',
        'notion-light': '#ffffff',
      },
    },
  },
  plugins: [],
}
