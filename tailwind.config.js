/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win-gray': '#c0c0c0',
        'win-blue': '#000080',
        'win-gray-light': '#dfdfdf',
        'win-gray-dark': '#808080',
      },
      fontFamily: {
        'pixel': ['"Pixelify Sans"', 'cursive'],
        'mono': ['"Courier New"', 'monospace'],
      },
      boxShadow: {
        'win-out': 'inset -1px -1px 0 0 #000000, inset 1px 1px 0 0 #dfdfdf, 1px 1px 0 0 #000000',
        'win-in': 'inset 1px 1px 0 0 #000000, inset -1px -1px 0 0 #dfdfdf, 1px 1px 0 0 #dfdfdf',
      }
    },
  },
  plugins: [],
}
