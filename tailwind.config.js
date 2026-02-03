/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fad7ac',
          300: '#f6ba77',
          400: '#f19340',
          500: '#ed751a',
          600: '#de5b10',
          700: '#b84410',
          800: '#933615',
          900: '#772f14',
        },
        gold: {
          50: '#fdfbf0',
          100: '#faf5da',
          200: '#f4e9b5',
          300: '#ecd888',
          400: '#e3c258',
          500: '#dba835',
          600: '#c08f22',
          700: '#9e6f1c',
          800: '#81581b',
          900: '#6b491a',
        }
      },
      fontFamily: {
        chinese: ['"Noto Serif SC"', 'serif']
      }
    },
  },
  plugins: [],
}
