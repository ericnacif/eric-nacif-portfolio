/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#161616',
        light: '#f5f4f2',
        accent: '#a52020',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        sans: ['Jost', 'sans-serif'],
        editorial: ['"Times New Roman"', 'serif'],
      },
      transitionDuration: {
        400: '400ms',
        800: '800ms',
      },
      transitionTimingFunction: {
        outExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
