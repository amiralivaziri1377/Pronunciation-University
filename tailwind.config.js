/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        kake: ['Kake', 'sans-serif'],
        rusty: ['Rusty', 'sans-serif'],
      },
    },
  },
  plugins: [ require('@tailwindcss/typography'), ],
}

