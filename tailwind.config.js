/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto Slab", "sans-serif"],
        noto: ["Noto Sans", "sans-serif"],
        
      },
    },
  },
  plugins: [],
}