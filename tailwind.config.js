/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          bg: '#0a0a0b',
          surface: '#131316',
          surface2: '#1a1a1e',
          text: '#f5f5f5',
          muted: '#8a8a8f',
          accent: '#ff4d1c',
          'accent-dim': '#c93a14',
          gold: '#e8b04b',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};
