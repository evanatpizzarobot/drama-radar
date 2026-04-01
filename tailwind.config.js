/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dr: {
          bg: {
            primary: '#0D0D0F',
            secondary: '#1A1A2E',
            tertiary: '#16213E',
          },
          accent: {
            primary: '#E84393',
            secondary: '#A855F7',
            breaking: '#FF3838',
            exclusive: '#FDCB6E',
          },
          text: {
            primary: '#F5F5F5',
            secondary: '#A0A0B0',
            accent: '#E84393',
          },
          border: {
            DEFAULT: '#2A2A3E',
            accent: '#E84393',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
