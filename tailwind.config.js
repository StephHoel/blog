/** @type { import('tailwindcss').Config } */
export const purge = ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html']
export const theme = {
  extend: {
    darkMode: 'class',
    screens: {
      sm: { max: '768px' },
      lg: { min: '768px' },
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    colors: {
      french: '#B8A598',
      error: '#CD001A',
    },
  },
}
