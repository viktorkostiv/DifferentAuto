/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      "Barlow": ["Barlow"],
    },
    extend: {
      colors: {
        'brand-yellow': '#EEBA00',
        'brand-blue': '#0012B1',
        'brand-red': '#AD1414',
        'brand-green': '#0C9200',
        'brand-orange': '#E33A11',
        'brand-gray': '#232323',
        'brand-gray-light': '#EFEFEF',
        'brand-black': '#111110',
      }
    },
  },
  plugins: [],
}

