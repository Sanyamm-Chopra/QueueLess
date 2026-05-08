/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c2d3ff',
          300: '#94b0ff',
          400: '#6086ff',
          500: '#3b5fff',
          600: '#2040f5',
          700: '#1a30d8',
          800: '#1a2aae',
          900: '#0F2A5E',
          950: '#091a3e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
