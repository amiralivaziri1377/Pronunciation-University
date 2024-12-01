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
        'kake': ['KakekakeitalicpersonaluseNmi-Rpz16', 'sans-serif'],
        'rusty': ['RustyHooksRegular-nROER', 'sans-serif'],
        'centuryGothic':['centuryGothic','sans-serif'],
        'Kiddosy':['Kiddosy','sans-serif']
      },
    },
  },
  plugins: [ require('@tailwindcss/typography'), ],
}

