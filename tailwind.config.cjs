/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f3faf9',
          '100': '#d7f0ef',
          '200': '#aee1e0',
          '300': '#7ec8ca',
          '400': '#54a8ad',
          '500': '#3a8c92',
          '600': '#2c6f75',
          '700': '#2a6066',
          '800': '#23474c',
          '900': '#213c40',
          '950': '#0e2125',
        },
        secondary: {
          '50': '#eefbf4',
          '100': '#d5f6e3',
          '200': '#afebcc',
          '300': '#7adbb0',
          '400': '#44c38f',
          '500': '#20a271',
          '600': '#14875e',
          '700': '#106c4e',
          '800': '#0f563f',
          '900': '#0d4735',
          '950': '#06281e',
        },
      },
    },
  },
  plugins: [],
}
