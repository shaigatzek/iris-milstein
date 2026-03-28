/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark:    '#1C1F20',
        rose:    '#C8A49A',
        'rose-dark': '#A8847A',
        ivory:   '#FAF8F5',
        taupe:   '#F0EBE5',
        charcoal:'#2D2827',
        'text-light': '#6B5E58',
      },
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
        hebrew: ['var(--font-frank)', 'serif'],
        'hebrew-sans': ['var(--font-heebo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
