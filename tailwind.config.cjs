/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2a6066',
        },
        secondary: {
          DEFAULT: '#20a271',
        },
      },
    },
  },
  plugins: [],
}
