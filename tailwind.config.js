/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2fcf5',
          100: '#e1f8e8',
          200: '#c3eed2',
          300: '#94deb2',
          400: '#5dc58d',
          500: '#38a76b',
          600: '#288653',
          700: '#236b44',
          800: '#1f5539',
          900: '#1a4631',
          950: '#0e271c',
        },
        secondary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#9f8275',
          600: '#8a6a5c',
          700: '#725548',
          800: '#5d453b',
          900: '#4e3b34',
          950: '#2a1e1a',
        }
      }
    },
  },
  plugins: [],
}
