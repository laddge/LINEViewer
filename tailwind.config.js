/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

