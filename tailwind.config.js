/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#30677E',   // Azul Petróleo Técnico
        'brand-orange': '#F48423', // Naranja Vibrante
        'slate-950': '#030712',    // Fondo Base
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}