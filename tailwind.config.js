/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dr: {
          bg: 'rgb(var(--dr-bg) / <alpha-value>)',
          surface: 'rgb(var(--dr-surface) / <alpha-value>)',
          'surface-hover': 'rgb(var(--dr-surface-hover) / <alpha-value>)',
          text: 'rgb(var(--dr-text) / <alpha-value>)',
          'text-muted': 'rgb(var(--dr-text-muted) / <alpha-value>)',
          'text-dim': 'rgb(var(--dr-text-dim) / <alpha-value>)',
          border: 'rgb(var(--dr-border) / <alpha-value>)',
          'border-hover': 'rgb(var(--dr-border-hover) / <alpha-value>)',
          pink: 'rgb(var(--dr-pink) / <alpha-value>)',
          purple: 'rgb(var(--dr-purple) / <alpha-value>)',
          gold: 'rgb(var(--dr-gold) / <alpha-value>)',
          red: 'rgb(var(--dr-red) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
