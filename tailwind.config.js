/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
}
